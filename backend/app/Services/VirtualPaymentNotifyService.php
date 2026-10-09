<?php

declare(strict_types=1);

namespace Yzd\Services;

final class VirtualPaymentNotifyService
{
    private const STORE = 'virtual_payment_notifications.json';

    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function looksLikeVirtualPaymentEvent(array $payload): bool
    {
        $event = $this->eventName($payload);
        return $event !== '' && str_starts_with($event, 'xpay_');
    }

    public function handle(array $payload): array
    {
        $event = $this->eventName($payload);
        $result = match ($event) {
            'xpay_goods_deliver_notify' => $this->handleGoodsDeliver($payload),
            'xpay_coin_pay_notify' => $this->handleCoinPay($payload),
            'xpay_refund_notify' => $this->handleRefund($payload),
            'xpay_complaint_notify' => $this->handleComplaint($payload),
            default => [
                'handled' => false,
                'event' => $event,
                'message' => 'unsupported virtual payment event',
            ],
        };

        $this->record($payload, $result);
        return $result;
    }

    private function handleGoodsDeliver(array $payload): array
    {
        $outTradeNo = $this->stringValue($payload, ['OutTradeNo', 'MchOrderId']);
        $order = $outTradeNo !== '' ? OrderService::make()->get($outTradeNo) : null;
        $updatedOrder = $order;

        if ($outTradeNo !== '') {
            $updatedOrder = OrderService::make()->markPaid(
                $outTradeNo,
                $this->stringValue($payload, [
                    'WeChatPayInfo.TransactionId',
                    'TransactionId',
                    'WxOrderId',
                ]),
                ['xpayGoodsDeliverNotify' => $payload]
            ) ?? $order;

            if (is_array($updatedOrder) && (string)($updatedOrder['type'] ?? '') === 'vip') {
                $updatedOrder = OrderService::make()->fulfillVip($updatedOrder) ?? $updatedOrder;
            }
        }

        return [
            'handled' => true,
            'event' => 'xpay_goods_deliver_notify',
            'outTradeNo' => $outTradeNo,
            'orderFound' => is_array($order),
            'orderStatus' => (string)($updatedOrder['status'] ?? ''),
            'message' => 'goods deliver notify processed',
        ];
    }

    private function handleCoinPay(array $payload): array
    {
        $outTradeNo = $this->stringValue($payload, ['OutTradeNo', 'MchOrderId']);
        $order = $outTradeNo !== '' ? OrderService::make()->get($outTradeNo) : null;
        $updatedOrder = $order;

        if ($outTradeNo !== '' && is_array($order)) {
            $updatedOrder = OrderService::make()->markPaid(
                $outTradeNo,
                $this->stringValue($payload, [
                    'WeChatPayInfo.TransactionId',
                    'TransactionId',
                    'WxOrderId',
                ]),
                ['xpayCoinPayNotify' => $payload]
            ) ?? $order;
        }

        return [
            'handled' => true,
            'event' => 'xpay_coin_pay_notify',
            'outTradeNo' => $outTradeNo,
            'orderFound' => is_array($order),
            'orderStatus' => (string)($updatedOrder['status'] ?? ''),
            'message' => 'coin pay notify recorded',
        ];
    }

    private function handleRefund(array $payload): array
    {
        $outTradeNo = $this->stringValue($payload, ['MchOrderId', 'OutTradeNo']);
        $retCode = (int)$this->scalarValue($payload, ['RetCode'], -1);
        $order = $outTradeNo !== '' ? OrderService::make()->get($outTradeNo) : null;
        $updatedOrder = $order;

        if ($outTradeNo !== '' && $retCode === 0) {
            $updatedOrder = OrderService::make()->markRefunded(
                $outTradeNo,
                ['xpayRefundNotify' => $payload]
            ) ?? $order;
        }

        return [
            'handled' => true,
            'event' => 'xpay_refund_notify',
            'outTradeNo' => $outTradeNo,
            'refundSuccess' => $retCode === 0,
            'orderFound' => is_array($order),
            'orderStatus' => (string)($updatedOrder['status'] ?? ''),
            'message' => $this->stringValue($payload, ['RetMsg']) ?: 'refund notify processed',
        ];
    }

    private function handleComplaint(array $payload): array
    {
        $outTradeNo = $this->stringValue($payload, ['MchOrderId', 'OutTradeNo']);
        $order = $outTradeNo !== '' ? OrderService::make()->get($outTradeNo) : null;

        return [
            'handled' => true,
            'event' => 'xpay_complaint_notify',
            'outTradeNo' => $outTradeNo,
            'orderFound' => is_array($order),
            'complaintId' => $this->stringValue($payload, ['ComplaintId']),
            'message' => 'complaint notify recorded',
        ];
    }

    private function record(array $payload, array $result): void
    {
        $eventId = $this->eventId($payload);
        $now = date(DATE_ATOM);
        $record = [
            'id' => $eventId,
            'event' => $this->eventName($payload),
            'openId' => $this->stringValue($payload, ['OpenId']),
            'outTradeNo' => $this->stringValue($payload, ['OutTradeNo', 'MchOrderId']),
            'wxOrderId' => $this->stringValue($payload, ['WxOrderId']),
            'mchRefundId' => $this->stringValue($payload, ['MchRefundId']),
            'complaintId' => $this->stringValue($payload, ['ComplaintId']),
            'retryTimes' => (int)$this->scalarValue($payload, ['RetryTimes'], 0),
            'result' => $result,
            'payload' => $payload,
            'updatedAt' => $now,
        ];

        $this->storage->update(self::STORE, [], function (array $data) use ($eventId, $now, $record): array {
            $items = is_array($data['items'] ?? null) ? array_values(array_filter($data['items'], 'is_array')) : [];
            $nextRecord = $record;
            $updated = false;
            foreach ($items as $index => $item) {
                if ((string)($item['id'] ?? '') !== $eventId) {
                    continue;
                }

                $nextRecord['createdAt'] = (string)($item['createdAt'] ?? $now);
                $nextRecord['seenCount'] = max(1, (int)($item['seenCount'] ?? 1) + 1);
                $items[$index] = array_replace($item, $nextRecord);
                $updated = true;
                break;
            }

            if (!$updated) {
                $nextRecord['createdAt'] = $now;
                $nextRecord['seenCount'] = 1;
                $items[] = $nextRecord;
            }

            return ['updatedAt' => $now, 'items' => array_slice($items, -5000)];
        });
    }

    private function eventId(array $payload): string
    {
        $parts = array_values(array_filter([
            $this->eventName($payload),
            $this->stringValue($payload, ['RequestId', 'ComplaintId', 'MchRefundId', 'WxRefundId']),
            $this->stringValue($payload, ['OutTradeNo', 'MchOrderId']),
            $this->stringValue($payload, ['WeChatPayInfo.TransactionId', 'TransactionId', 'WxOrderId']),
            (string)$this->scalarValue($payload, ['CreateTime', 'ComplaintTime', 'RefundSuccTimestamp'], 0),
        ], fn (string $value): bool => $value !== ''));

        $seed = $parts !== [] ? implode('|', $parts) : $this->jsonEncode($payload);
        return 'VPN' . strtoupper(substr(sha1($seed), 0, 24));
    }

    private function eventName(array $payload): string
    {
        return trim((string)($payload['Event'] ?? $payload['event'] ?? ''));
    }

    private function stringValue(array $payload, array $paths): string
    {
        $value = $this->scalarValue($payload, $paths, '');
        return is_scalar($value) ? trim((string)$value) : '';
    }

    private function scalarValue(array $payload, array $paths, mixed $default = null): mixed
    {
        foreach ($paths as $path) {
            $value = $payload;
            foreach (explode('.', $path) as $segment) {
                if (!is_array($value) || !array_key_exists($segment, $value)) {
                    $value = null;
                    break;
                }
                $value = $value[$segment];
            }

            if ($value !== null) {
                return $value;
            }
        }

        return $default;
    }

    private function jsonEncode(array $payload): string
    {
        $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        return $json === false ? serialize($payload) : $json;
    }
}
