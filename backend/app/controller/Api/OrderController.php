<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\OrderService;
use Yzd\Services\UserService;

final class OrderController extends BaseController
{
    public function index(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        $openid = $this->authOpenid();
        $isAdmin = UserService::make()->isAdmin();
        $orders = array_values(array_filter(
            OrderService::make()->all(),
            fn (array $order): bool => $isAdmin || (string)($order['openid'] ?? '') === $openid
        ));

        return $this->ok(array_map([$this, 'presentOrder'], $orders));
    }

    private function presentOrder(array $order): array
    {
        $type = (string)($order['type'] ?? '');
        $status = (string)($order['status'] ?? 'pending');

        return [
            'outTradeNo' => (string)($order['outTradeNo'] ?? ''),
            'type' => $type,
            'typeText' => $this->typeText($type),
            'description' => (string)($order['description'] ?? ''),
            'amountCents' => (int)($order['amountCents'] ?? 0),
            'amountYuan' => number_format(((int)($order['amountCents'] ?? 0)) / 100, 2, '.', ''),
            'status' => $status,
            'statusText' => $this->statusText($status),
            'createdAt' => $this->formatDateTime((string)($order['createdAt'] ?? '')),
            'paidAt' => $this->formatDateTime((string)($order['paidAt'] ?? '')),
            'updatedAt' => $this->formatDateTime((string)($order['updatedAt'] ?? '')),
        ];
    }

    private function typeText(string $type): string
    {
        return match ($type) {
            'assistant' => '小助手订单',
            'vip' => '会员订单',
            'code' => '制作订单',
            default => '支付订单',
        };
    }

    private function statusText(string $status): string
    {
        return match ($status) {
            'paid' => '已支付',
            'consumed' => '已使用',
            'failed' => '已关闭',
            default => '待支付',
        };
    }

    private function formatDateTime(string $value): string
    {
        if ($value === '') {
            return '';
        }

        try {
            return (new \DateTimeImmutable($value))
                ->setTimezone(new \DateTimeZone('Asia/Shanghai'))
                ->format('Y-m-d H:i:s');
        } catch (\Throwable) {
            return $value;
        }
    }
}
