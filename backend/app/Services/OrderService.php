<?php

declare(strict_types=1);

namespace Yzd\Services;

final class OrderService
{
    private const STORE = 'orders.json';

    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function create(string $type, string $openid, int $amountCents, string $description, array $context = []): array
    {
        $order = [
            'outTradeNo' => $this->outTradeNo($type),
            'type' => $type,
            'openid' => $openid,
            'amountCents' => max(0, $amountCents),
            'description' => $description,
            'status' => 'pending',
            'context' => $context,
            'transactionId' => '',
            'createdAt' => date(DATE_ATOM),
            'updatedAt' => date(DATE_ATOM),
            'paidAt' => '',
            'consumedAt' => '',
            'fulfilledAt' => '',
            'refundedAt' => '',
            'raw' => [],
        ];

        $this->storage->update(self::STORE, [], function (array $orders) use ($order): array {
            $orders = array_values(array_filter($orders, fn ($item): bool => is_array($item)));
            array_unshift($orders, $order);
            return array_values(array_map([$this, 'normalize'], $orders));
        });

        return $order;
    }

    public function all(): array
    {
        return array_values(array_filter($this->storage->read(self::STORE, []), fn ($order): bool => is_array($order)));
    }

    public function get(string $outTradeNo): ?array
    {
        foreach ($this->all() as $order) {
            if ((string)($order['outTradeNo'] ?? '') === $outTradeNo) {
                return $this->normalize($order);
            }
        }

        return null;
    }

    public function markPaid(string $outTradeNo, string $transactionId = '', array $raw = []): ?array
    {
        return $this->update($outTradeNo, function (array $order) use ($transactionId, $raw): array {
            if (!in_array((string)($order['status'] ?? ''), ['consumed', 'refunded'], true)) {
                $order['status'] = 'paid';
            }
            $order['transactionId'] = $transactionId !== '' ? $transactionId : (string)($order['transactionId'] ?? '');
            $order['paidAt'] = (string)($order['paidAt'] ?? '') ?: date(DATE_ATOM);
            $order['raw'] = $this->mergeRaw((array)($order['raw'] ?? []), $raw);
            return $order;
        });
    }

    public function mergeContext(string $outTradeNo, array $context): ?array
    {
        return $this->update($outTradeNo, function (array $order) use ($context): array {
            $order['context'] = array_replace_recursive((array)($order['context'] ?? []), $context);
            return $order;
        });
    }

    public function consumePaid(string $outTradeNo, string $openid, string $type): ?array
    {
        $consumed = null;
        $this->update($outTradeNo, function (array $order) use ($openid, $type, &$consumed): array {
            if (!$this->isPaidUsable($order, $openid, $type)) {
                return $order;
            }
            $order['status'] = 'consumed';
            $order['consumedAt'] = (string)($order['consumedAt'] ?? '') ?: date(DATE_ATOM);
            $consumed = $order;
            return $order;
        });
        return $consumed;
    }

    public function markFulfilled(string $outTradeNo): ?array
    {
        return $this->update($outTradeNo, function (array $order): array {
            $order['fulfilledAt'] = (string)($order['fulfilledAt'] ?? '') ?: date(DATE_ATOM);
            return $order;
        });
    }

    public function markRefunded(string $outTradeNo, array $raw = []): ?array
    {
        return $this->update($outTradeNo, function (array $order) use ($raw): array {
            $order['status'] = 'refunded';
            $order['refundedAt'] = (string)($order['refundedAt'] ?? '') ?: date(DATE_ATOM);
            $order['raw'] = $this->mergeRaw((array)($order['raw'] ?? []), $raw);
            return $order;
        });
    }

    public function fail(string $outTradeNo, array $raw = []): ?array
    {
        return $this->update($outTradeNo, function (array $order) use ($raw): array {
            if ((string)($order['status'] ?? '') !== 'refunded') {
                $order['status'] = 'failed';
            }
            $order['raw'] = $this->mergeRaw((array)($order['raw'] ?? []), $raw);
            return $order;
        });
    }

    public function isPaidUsable(array $order, string $openid, string $type): bool
    {
        $order = $this->normalize($order);
        return (string)$order['openid'] === $openid
            && (string)$order['type'] === $type
            && (string)$order['status'] === 'paid'
            && (string)$order['consumedAt'] === '';
    }

    public function fulfillVip(array $order): ?array
    {
        $order = $this->normalize($order);
        if ((string)$order['type'] !== 'vip' || (string)$order['fulfilledAt'] !== '') {
            return $order;
        }

        $service = UserService::make();
        $context = is_array($order['context'] ?? null) ? $order['context'] : [];
        $days = (int)($context['days'] ?? 365);
        $service->mutate((string)$order['openid'], function (array $user) use ($days): array {
            $user['isVip'] = true;
            $user['vipExpireAt'] = $days >= 36500 ? 'forever' : date(DATE_ATOM, strtotime('+' . max(1, $days) . ' days'));
            return $user;
        });

        return $this->markFulfilled((string)$order['outTradeNo']);
    }

    private function update(string $outTradeNo, callable $mutator): ?array
    {
        $updatedOrder = null;
        $this->storage->update(self::STORE, [], function (array $orders) use ($outTradeNo, $mutator, &$updatedOrder): array {
            $orders = array_values(array_filter($orders, fn ($item): bool => is_array($item)));
            foreach ($orders as $index => $order) {
                $order = $this->normalize($order);
                if ((string)$order['outTradeNo'] !== $outTradeNo) {
                    $orders[$index] = $order;
                    continue;
                }

                $order = $this->normalize($mutator($order));
                $order['updatedAt'] = date(DATE_ATOM);
                $orders[$index] = $order;
                $updatedOrder = $order;
            }
            return $orders;
        });

        return $updatedOrder;
    }

    private function normalize(array $order): array
    {
        $order['outTradeNo'] = (string)($order['outTradeNo'] ?? '');
        $order['type'] = (string)($order['type'] ?? '');
        $order['openid'] = (string)($order['openid'] ?? '');
        $order['amountCents'] = max(0, (int)($order['amountCents'] ?? 0));
        $order['description'] = (string)($order['description'] ?? '');
        $order['status'] = (string)($order['status'] ?? 'pending');
        $order['context'] = is_array($order['context'] ?? null) ? $order['context'] : [];
        $order['transactionId'] = (string)($order['transactionId'] ?? '');
        $order['createdAt'] = (string)($order['createdAt'] ?? date(DATE_ATOM));
        $order['updatedAt'] = (string)($order['updatedAt'] ?? date(DATE_ATOM));
        $order['paidAt'] = (string)($order['paidAt'] ?? '');
        $order['consumedAt'] = (string)($order['consumedAt'] ?? '');
        $order['fulfilledAt'] = (string)($order['fulfilledAt'] ?? '');
        $order['refundedAt'] = (string)($order['refundedAt'] ?? '');
        $order['raw'] = is_array($order['raw'] ?? null) ? $order['raw'] : [];
        return $order;
    }

    private function mergeRaw(array $existing, array $incoming): array
    {
        if ($incoming === []) {
            return $existing;
        }

        if ($existing === []) {
            return $incoming;
        }

        return array_replace_recursive($existing, $incoming);
    }

    private function outTradeNo(string $type): string
    {
        $prefix = strtoupper(preg_replace('/[^a-z0-9]/i', '', $type) ?: 'YZD');
        return 'YZD' . substr($prefix, 0, 4) . date('YmdHis') . random_int(10000, 99999);
    }
}
