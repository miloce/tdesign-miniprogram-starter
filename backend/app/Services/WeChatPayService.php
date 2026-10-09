<?php

declare(strict_types=1);

namespace Yzd\Services;

use RuntimeException;

final class WeChatPayService
{
    private const API_BASE = 'https://api.mch.weixin.qq.com';

    public static function make(): self
    {
        return new self();
    }

    public function configured(): bool
    {
        return $this->appId() !== ''
            && $this->mchId() !== ''
            && $this->serialNo() !== ''
            && $this->privateKeyPath() !== ''
            && is_file($this->privateKeyPath());
    }

    public function mockEnabled(): bool
    {
        return filter_var(getenv('YZD_PAYMENT_MOCK') ?: false, FILTER_VALIDATE_BOOLEAN);
    }

    public function createJsapiOrder(array $order, string $openid): array
    {
        if ($this->mockEnabled()) {
            OrderService::make()->markPaid((string)$order['outTradeNo'], 'mock');
            return [
                'paid' => true,
                'mockPay' => true,
                'outTradeNo' => (string)$order['outTradeNo'],
            ];
        }

        $this->assertConfigured();
        $path = '/v3/pay/transactions/jsapi';
        $body = [
            'appid' => $this->appId(),
            'mchid' => $this->mchId(),
            'description' => $this->limitDescription((string)$order['description']),
            'out_trade_no' => (string)$order['outTradeNo'],
            'notify_url' => $this->notifyUrl(),
            'amount' => ['total' => max(1, (int)$order['amountCents']), 'currency' => 'CNY'],
            'payer' => ['openid' => $openid],
        ];

        $response = $this->wechatRequest('POST', $path, json_encode($body, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?: '{}');
        $prepayId = (string)($response['prepay_id'] ?? '');
        if ($prepayId === '') {
            throw new RuntimeException((string)($response['message'] ?? '微信支付下单失败'));
        }

        $package = 'prepay_id=' . $prepayId;
        $timeStamp = (string)time();
        $nonceStr = bin2hex(random_bytes(16));

        return [
            'paid' => false,
            'outTradeNo' => (string)$order['outTradeNo'],
            'timeStamp' => $timeStamp,
            'nonceStr' => $nonceStr,
            'package' => $package,
            'signType' => 'RSA',
            'paySign' => $this->sign($this->appId() . "\n" . $timeStamp . "\n" . $nonceStr . "\n" . $package . "\n"),
        ];
    }

    public function queryByOutTradeNo(string $outTradeNo): array
    {
        if ($this->mockEnabled()) {
            $order = OrderService::make()->get($outTradeNo);
            return $order && in_array((string)$order['status'], ['paid', 'consumed'], true)
                ? ['trade_state' => 'SUCCESS', 'out_trade_no' => $outTradeNo]
                : ['trade_state' => 'NOTPAY', 'out_trade_no' => $outTradeNo];
        }

        $this->assertConfigured();
        $path = '/v3/pay/transactions/out-trade-no/' . rawurlencode($outTradeNo) . '?mchid=' . rawurlencode($this->mchId());
        return $this->wechatRequest('GET', $path, '');
    }

    public function decryptNotification(string $body): array
    {
        $data = json_decode($body, true);
        if (!is_array($data) || !is_array($data['resource'] ?? null)) {
            throw new RuntimeException('支付回调格式错误');
        }

        $resource = $data['resource'];
        $ciphertext = base64_decode((string)($resource['ciphertext'] ?? ''), true);
        if (!is_string($ciphertext) || strlen($ciphertext) <= 16) {
            throw new RuntimeException('支付回调密文错误');
        }

        $tag = substr($ciphertext, -16);
        $encrypted = substr($ciphertext, 0, -16);
        $plain = openssl_decrypt(
            $encrypted,
            'aes-256-gcm',
            $this->apiV3Key(),
            OPENSSL_RAW_DATA,
            (string)($resource['nonce'] ?? ''),
            $tag,
            (string)($resource['associated_data'] ?? '')
        );
        if (!is_string($plain) || $plain === '') {
            throw new RuntimeException('支付回调解密失败');
        }

        $payload = json_decode($plain, true);
        if (!is_array($payload)) {
            throw new RuntimeException('支付回调内容错误');
        }

        return $payload;
    }

    public function verifyNotifySignature(string $body, string $timestamp, string $nonce, string $signature): bool
    {
        $publicKeyPath = $this->publicKeyPath();
        if ($publicKeyPath === '' || !is_file($publicKeyPath)) {
            return false;
        }

        $publicKey = openssl_pkey_get_public((string)file_get_contents($publicKeyPath));
        if ($publicKey === false) {
            return false;
        }

        $message = $timestamp . "\n" . $nonce . "\n" . $body . "\n";
        $decodedSignature = base64_decode($signature, true);
        if (!is_string($decodedSignature)) {
            return false;
        }

        return openssl_verify($message, $decodedSignature, $publicKey, OPENSSL_ALGO_SHA256) === 1;
    }

    private function wechatRequest(string $method, string $path, string $body): array
    {
        if (!function_exists('curl_init')) {
            throw new RuntimeException('PHP cURL 扩展未启用');
        }
        $timestamp = (string)time();
        $nonce = bin2hex(random_bytes(16));
        $authorization = $this->authorization($method, $path, $timestamp, $nonce, $body);
        $url = self::API_BASE . $path;

        $curl = curl_init($url);
        if ($curl === false) {
            throw new RuntimeException('无法初始化支付请求');
        }

        $headers = [
            'Accept: application/json',
            'Authorization: ' . $authorization,
            'User-Agent: yzd-backend',
        ];
        if ($method === 'POST') {
            $headers[] = 'Content-Type: application/json';
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
        }

        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => 15,
        ]);

        $raw = curl_exec($curl);
        $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $error = curl_error($curl);
        curl_close($curl);

        if (!is_string($raw)) {
            throw new RuntimeException($error !== '' ? $error : '微信支付请求失败');
        }

        $data = json_decode($raw, true);
        if (!is_array($data)) {
            throw new RuntimeException('微信支付响应格式错误');
        }
        if ($status < 200 || $status >= 300) {
            throw new RuntimeException((string)($data['message'] ?? ('微信支付请求失败 HTTP ' . $status)));
        }

        return $data;
    }

    private function authorization(string $method, string $path, string $timestamp, string $nonce, string $body): string
    {
        $message = strtoupper($method) . "\n" . $path . "\n" . $timestamp . "\n" . $nonce . "\n" . $body . "\n";
        $signature = $this->sign($message);
        return sprintf(
            'WECHATPAY2-SHA256-RSA2048 mchid="%s",nonce_str="%s",timestamp="%s",serial_no="%s",signature="%s"',
            $this->mchId(),
            $nonce,
            $timestamp,
            $this->serialNo(),
            $signature
        );
    }

    private function sign(string $message): string
    {
        $privateKey = openssl_pkey_get_private((string)file_get_contents($this->privateKeyPath()));
        if ($privateKey === false) {
            throw new RuntimeException('微信支付私钥不可用');
        }

        $signature = '';
        if (!openssl_sign($message, $signature, $privateKey, OPENSSL_ALGO_SHA256)) {
            throw new RuntimeException('微信支付签名失败');
        }

        return base64_encode($signature);
    }

    private function assertConfigured(): void
    {
        if (!$this->configured()) {
            throw new RuntimeException('微信支付配置不完整');
        }
    }

    private function limitDescription(string $description): string
    {
        return function_exists('mb_substr') ? mb_substr($description, 0, 127, 'UTF-8') : substr($description, 0, 127);
    }

    private function appId(): string
    {
        return (string)(getenv('YZD_WECHAT_APPID') ?: '');
    }

    private function mchId(): string
    {
        return (string)(getenv('YZD_WECHAT_MCH_ID') ?: '');
    }

    private function serialNo(): string
    {
        return (string)(getenv('YZD_WECHAT_MCH_SERIAL_NO') ?: '');
    }

    private function apiV3Key(): string
    {
        return (string)(getenv('YZD_WECHAT_API_V3_KEY') ?: '');
    }

    private function privateKeyPath(): string
    {
        return $this->resolvePath((string)(getenv('YZD_WECHAT_PRIVATE_KEY_PATH') ?: ''));
    }

    private function publicKeyPath(): string
    {
        return $this->resolvePath((string)(getenv('YZD_WECHAT_PUBLIC_KEY_PATH') ?: ''));
    }

    private function notifyUrl(): string
    {
        $configured = (string)(getenv('YZD_WECHAT_NOTIFY_URL') ?: '');
        if ($configured !== '') {
            return $configured;
        }

        $baseUrl = rtrim((string)(getenv('YZD_PUBLIC_BASE_URL') ?: ''), '/');
        return ($baseUrl !== '' ? $baseUrl : rtrim(request()->domain(), '/')) . '/wechat/pay-callback';
    }

    private function resolvePath(string $path): string
    {
        if ($path === '') {
            return '';
        }
        if (preg_match('/^[A-Za-z]:[\/\\\\]/', $path) || str_starts_with($path, '/')) {
            return $path;
        }

        return dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . str_replace(['/', '\\'], DIRECTORY_SEPARATOR, $path);
    }
}
