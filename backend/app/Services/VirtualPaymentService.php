<?php

declare(strict_types=1);

namespace Yzd\Services;

use RuntimeException;

final class VirtualPaymentService
{
    private const API_BASE = 'https://api.weixin.qq.com';

    public static function make(): self
    {
        return new self();
    }

    public function configured(): bool
    {
        return WeChatMiniProgramService::make()->appId() !== ''
            && $this->offerId() !== ''
            && $this->appKey() !== '';
    }

    public function resolveSessionKey(string $openid, string $loginCode = ''): string
    {
        return WeChatMiniProgramService::make()->resolveSessionKeyForOpenid($openid, $loginCode);
    }

    public function createGoodsPayment(array $order, string $sessionKey, string $productId, string $attach = '', array $clientContext = []): array
    {
        $this->assertConfigured();

        $productId = trim($productId);
        if ($productId === '') {
            throw new RuntimeException('虚拟支付商品ID未配置');
        }

        $outTradeNo = trim((string)($order['outTradeNo'] ?? ''));
        $goodsPrice = max(1, (int)($order['amountCents'] ?? 0));
        if ($outTradeNo === '') {
            throw new RuntimeException('业务订单号不能为空');
        }
        if ($sessionKey === '') {
            throw new RuntimeException('支付登录态已失效，请重新登录后再试');
        }
        $this->assertClientCanPay($clientContext, $goodsPrice);

        $signPayload = [
            'offerId' => $this->offerId(),
            'buyQuantity' => 1,
            'env' => $this->env(),
            'currencyType' => 'CNY',
            'productId' => $productId,
            'goodsPrice' => $goodsPrice,
            'outTradeNo' => $outTradeNo,
            'attach' => $attach !== '' ? $attach : $outTradeNo,
        ];
        $signData = $this->jsonEncode($signPayload);

        return [
            'paid' => false,
            'outTradeNo' => $outTradeNo,
            'mode' => 'short_series_goods',
            'signData' => $signData,
            'paySig' => $this->signPay('requestVirtualPayment', $signData),
            'signature' => $this->signUser($sessionKey, $signData),
        ];
    }

    public function queryOrder(string $openid, string $outTradeNo): array
    {
        $this->assertConfigured();

        $body = $this->jsonEncode([
            'openid' => trim($openid),
            'env' => $this->env(),
            'order_id' => trim($outTradeNo),
        ]);

        $response = WeChatMiniProgramService::make()->withAccessToken(function (string $accessToken) use ($body): array {
            return $this->postJson('/xpay/query_order', $body, $accessToken, true);
        });

        if ((int)($response['errcode'] ?? 0) !== 0) {
            throw new RuntimeException((string)($response['errmsg'] ?? '查询虚拟支付订单失败'));
        }

        return $response;
    }

    public function confirmOrder(array $order): array
    {
        $payment = $this->queryOrder((string)($order['openid'] ?? ''), (string)($order['outTradeNo'] ?? ''));
        $remoteOrder = is_array($payment['order'] ?? null) ? $payment['order'] : [];
        $status = (int)($remoteOrder['status'] ?? -1);

        if (in_array($status, [2, 3, 4], true)) {
            $transactionId = trim((string)($remoteOrder['wxpay_order_id'] ?? $remoteOrder['wx_order_id'] ?? $remoteOrder['channel_order_id'] ?? ''));
            $localOrder = OrderService::make()->markPaid((string)($order['outTradeNo'] ?? ''), $transactionId, $payment) ?? $order;

            return [
                'paid' => true,
                'status' => $status,
                'order' => $remoteOrder,
                'localOrder' => $localOrder,
            ];
        }

        if (in_array($status, [5, 6, 7, 8, 9, 10], true)) {
            OrderService::make()->fail((string)($order['outTradeNo'] ?? ''), $payment);
        }

        return [
            'paid' => false,
            'status' => $status,
            'order' => $remoteOrder,
        ];
    }

    public function shouldUseWechatPayFallback(array $clientContext, int $goodsPrice): bool
    {
        if (!$this->canUseWechatPayFallback($clientContext)) {
            return false;
        }

        if ($this->env() !== 0) {
            return true;
        }

        if ($goodsPrice < 100) {
            return true;
        }

        $systemVersion = trim((string)($clientContext['systemVersion'] ?? ''));
        if ($systemVersion !== '' && version_compare($systemVersion, '15.0.0', '<')) {
            return true;
        }

        $wechatVersion = trim((string)($clientContext['wechatVersion'] ?? ''));
        if ($wechatVersion !== '' && version_compare($wechatVersion, '8.0.68', '<')) {
            return true;
        }

        return false;
    }

    public function canUseWechatPayFallback(array $clientContext): bool
    {
        return $this->wechatPayFallbackEnabled() && $this->isIosClient($clientContext);
    }

    private function postJson(string $path, string $body, string $accessToken, bool $signedQuery = false): array
    {
        $url = self::API_BASE . $path . '?access_token=' . rawurlencode($accessToken);
        if ($signedQuery) {
            $url .= '&pay_sig=' . rawurlencode($this->signPay($path, $body));
        }

        $raw = @file_get_contents($url, false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\nContent-Length: " . strlen($body),
                'content' => $body,
                'timeout' => 15,
                'ignore_errors' => true,
            ],
        ]));

        if ($raw === false) {
            throw new RuntimeException('虚拟支付网络请求失败');
        }

        $data = json_decode($raw, true);
        if (!is_array($data)) {
            throw new RuntimeException('虚拟支付响应格式错误');
        }

        return $data;
    }

    private function signPay(string $uri, string $signData): string
    {
        return hash_hmac('sha256', $uri . '&' . $signData, $this->appKey());
    }

    private function signUser(string $sessionKey, string $signData): string
    {
        return hash_hmac('sha256', $signData, $sessionKey);
    }

    private function jsonEncode(array $data): string
    {
        $json = json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($json === false) {
            throw new RuntimeException('虚拟支付请求编码失败');
        }

        return $json;
    }

    private function assertConfigured(): void
    {
        if (!$this->configured()) {
            throw new RuntimeException('小程序虚拟支付配置不完整');
        }
    }

    private function assertClientCanPay(array $clientContext, int $goodsPrice): void
    {
        if (!$this->isIosClient($clientContext)) {
            return;
        }

        if ($this->env() !== 0) {
            throw new RuntimeException('iOS 虚拟支付仅支持现网环境，请将 YZD_VIRTUAL_PAYMENT_ENV 配置为 0');
        }

        if ($goodsPrice < 100) {
            throw new RuntimeException('iOS 虚拟支付最低金额为 1 元，请调整商品价格');
        }
    }

    private function isIosClient(array $clientContext): bool
    {
        $platform = strtolower(trim((string)($clientContext['platform'] ?? '')));
        $system = strtolower(trim((string)($clientContext['system'] ?? '')));

        return str_contains($platform, 'ios')
            || str_contains($system, 'ios')
            || str_contains($system, 'iphone')
            || str_contains($system, 'ipad');
    }

    private function offerId(): string
    {
        return trim((string)(getenv('YZD_VIRTUAL_PAYMENT_OFFER_ID') ?: ''));
    }

    private function appKey(): string
    {
        return trim((string)(getenv('YZD_VIRTUAL_PAYMENT_APP_KEY') ?: ''));
    }

    private function env(): int
    {
        return max(0, min(1, (int)(getenv('YZD_VIRTUAL_PAYMENT_ENV') ?: 0)));
    }

    private function wechatPayFallbackEnabled(): bool
    {
        $configured = getenv('YZD_IOS_WECHAT_PAY_FALLBACK');
        if ($configured === false || $configured === '') {
            return true;
        }

        return filter_var($configured, FILTER_VALIDATE_BOOLEAN);
    }
}
