<?php

declare(strict_types=1);

namespace Yzd\Services;

use RuntimeException;

final class PaymentGatewayService
{
    public static function make(): self
    {
        return new self();
    }

    public function createGoodsPayment(
        array $order,
        string $openid,
        string $loginCode,
        string $productId,
        string $attach = '',
        array $clientContext = []
    ): array {
        $virtualPayment = VirtualPaymentService::make();
        $amountCents = max(1, (int)($order['amountCents'] ?? 0));

        if ($virtualPayment->shouldUseWechatPayFallback($clientContext, $amountCents)) {
            return $this->createWechatPayment($order, $openid, 'ios_virtual_unsupported');
        }

        try {
            $sessionKey = $virtualPayment->resolveSessionKey($openid, $loginCode);
            $payload = $virtualPayment->createGoodsPayment(
                $order,
                $sessionKey,
                $productId,
                $attach,
                $clientContext
            );
            $this->markPaymentChannel($order, 'virtual');

            return array_replace($payload, ['paymentChannel' => 'virtual']);
        } catch (RuntimeException $exception) {
            if (!$virtualPayment->canUseWechatPayFallback($clientContext)) {
                throw $exception;
            }

            return $this->createWechatPayment($order, $openid, 'ios_virtual_error', $exception->getMessage());
        }
    }

    public function confirmOrder(array $order): array
    {
        $channel = $this->paymentChannel($order);
        if ($channel === 'wechat') {
            return $this->confirmWechatOrder($order);
        }

        return VirtualPaymentService::make()->confirmOrder($order);
    }

    private function createWechatPayment(array $order, string $openid, string $reason, string $message = ''): array
    {
        $this->markPaymentChannel($order, 'wechat', [
            'fallbackReason' => $reason,
            'fallbackMessage' => $message,
        ]);

        $payload = WeChatPayService::make()->createJsapiOrder($order, $openid);

        return array_replace($payload, [
            'paymentChannel' => 'wechat',
            'fallbackReason' => $reason,
        ]);
    }

    private function confirmWechatOrder(array $order): array
    {
        $payment = WeChatPayService::make()->queryByOutTradeNo((string)($order['outTradeNo'] ?? ''));
        $tradeState = (string)($payment['trade_state'] ?? '');

        if ($tradeState === 'SUCCESS') {
            $transactionId = (string)($payment['transaction_id'] ?? '');
            $localOrder = OrderService::make()->markPaid((string)($order['outTradeNo'] ?? ''), $transactionId, [
                'wechatPayQuery' => $payment,
            ]) ?? $order;

            return [
                'paid' => true,
                'tradeState' => $tradeState,
                'localOrder' => $localOrder,
                'order' => $payment,
            ];
        }

        if (in_array($tradeState, ['CLOSED', 'REVOKED', 'PAYERROR'], true)) {
            OrderService::make()->fail((string)($order['outTradeNo'] ?? ''), [
                'wechatPayQuery' => $payment,
            ]);
        }

        return [
            'paid' => false,
            'tradeState' => $tradeState,
            'order' => $payment,
        ];
    }

    private function markPaymentChannel(array $order, string $channel, array $extra = []): void
    {
        $outTradeNo = (string)($order['outTradeNo'] ?? '');
        if ($outTradeNo === '') {
            return;
        }

        $context = array_replace(['paymentChannel' => $channel], $extra);
        OrderService::make()->mergeContext($outTradeNo, $context);
    }

    private function paymentChannel(array $order): string
    {
        $context = is_array($order['context'] ?? null) ? $order['context'] : [];
        return (string)($context['paymentChannel'] ?? 'virtual');
    }
}
