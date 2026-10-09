<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AppConfigService;
use Yzd\Services\OrderService;
use Yzd\Services\PaymentGatewayService;
use Yzd\Services\UserService;
use RuntimeException;

final class VipController extends BaseController
{
    public function packages(): Response
    {
        return $this->ok(AppConfigService::make()->get()['vipPackages'] ?? []);
    }

    public function pay(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $input = $this->input();
        $package = $this->findPackage((string)($input['packageId'] ?? ''));
        if ($package === null) {
            return $this->fail('会员套餐不存在', 404);
        }

        $openid = $this->authOpenid();
        $order = OrderService::make()->create(
            'vip',
            $openid,
            $this->yuanToCents($package['currentPrice'] ?? 0),
            '云栈点' . (string)$package['name'],
            [
                'packageId' => (string)$package['id'],
                'packageName' => (string)$package['name'],
                'days' => $this->packageDays($package),
            ]
        );

        if ((int)$order['amountCents'] <= 0) {
            OrderService::make()->markPaid((string)$order['outTradeNo'], 'free');
            return $this->ok(['paid' => true, 'outTradeNo' => (string)$order['outTradeNo'], 'free' => true]);
        }

        try {
            return $this->ok(PaymentGatewayService::make()->createGoodsPayment(
                $order,
                $openid,
                trim((string)($input['loginCode'] ?? '')),
                (string)($package['productId'] ?? ''),
                'vip:' . (string)($package['id'] ?? ''),
                $this->clientContext($input)
            ));
        } catch (RuntimeException $exception) {
            return $this->fail($exception->getMessage(), 502);
        }
    }

    public function confirm(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $outTradeNo = trim((string)request()->param('outTradeNo', ''));
        $order = $outTradeNo !== '' ? OrderService::make()->get($outTradeNo) : null;
        if (!$order || (string)$order['openid'] !== $this->authOpenid() || (string)$order['type'] !== 'vip') {
            return $this->fail('订单不存在', 404);
        }

        if (!in_array((string)$order['status'], ['paid', 'consumed'], true)) {
            try {
                $payment = PaymentGatewayService::make()->confirmOrder($order);
                if (empty($payment['paid'])) {
                    return $this->ok([
                        'paid' => false,
                        'status' => (int)($payment['status'] ?? 1),
                        'tradeState' => (string)($payment['tradeState'] ?? ''),
                    ]);
                }
                $order = $payment['localOrder'] ?? (OrderService::make()->get($outTradeNo) ?? $order);
            } catch (RuntimeException $exception) {
                return $this->fail($exception->getMessage(), 502);
            }
        }

        OrderService::make()->fulfillVip($order);
        $service = UserService::make();
        $user = $service->get($this->authOpenid());
        return $this->ok([
            'paid' => true,
            'userInfo' => $service->publicInfo($user),
        ]);
    }

    public function status(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $service = UserService::make();
        $user = $service->get($this->authOpenid());
        return $this->ok($service->publicInfo($user));
    }

    private function findPackage(string $id): ?array
    {
        $packages = AppConfigService::make()->get()['vipPackages'] ?? [];
        foreach ($packages as $package) {
            if (is_array($package) && (string)($package['id'] ?? '') === $id) {
                return $package;
            }
        }

        if ($id === '') {
            return is_array($packages[0] ?? null) ? $packages[0] : null;
        }

        return null;
    }

    private function packageDays(array $package): int
    {
        if (isset($package['days']) && (int)$package['days'] > 0) {
            return (int)$package['days'];
        }

        $id = (string)($package['id'] ?? '');
        return match ($id) {
            'vip_month' => 30,
            'vip_forever' => 36500,
            default => 365,
        };
    }

    private function yuanToCents(mixed $amount): int
    {
        return max(0, (int)round((float)$amount * 100));
    }
}
