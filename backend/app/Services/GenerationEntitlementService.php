<?php

declare(strict_types=1);

namespace Yzd\Services;

use RuntimeException;

final class GenerationEntitlementService
{
    public static function make(): self
    {
        return new self();
    }

    public function consume(string $openid, string $templateId, string $outTradeNo = '', string $rewardToken = ''): array
    {
        $userService = UserService::make();
        $user = $userService->get($openid);
        if ((string)($user['status'] ?? 'active') === 'disabled') {
            throw new RuntimeException('账号已被禁用，无法生成');
        }

        if ($this->isVipActive($user)) {
            return ['method' => 'vip', 'user' => $userService->publicInfo($user)];
        }

        if ($outTradeNo !== '') {
            $orderService = OrderService::make();
            $order = $orderService->get($outTradeNo);
            if (!$order || !$orderService->isPaidUsable($order, $openid, 'code')) {
                throw new RuntimeException('支付订单无效或已使用');
            }
            $context = is_array($order['context'] ?? null) ? $order['context'] : [];
            if ((string)($context['templateId'] ?? '') !== '' && (string)$context['templateId'] !== $templateId) {
                throw new RuntimeException('支付订单与当前模板不匹配');
            }
            if (!$orderService->consumePaid($outTradeNo, $openid, 'code')) {
                throw new RuntimeException('支付订单无效或已使用');
            }
            return ['method' => 'paid', 'user' => $userService->publicInfo($user)];
        }

        if ($rewardToken !== '' && RewardTokenService::make()->consume($rewardToken, $openid, $templateId)) {
            return ['method' => 'reward_ad', 'user' => $userService->publicInfo($user)];
        }

        if ((int)($user['quota'] ?? 0) > 0) {
            $user = $userService->mutate($openid, function (array $current): array {
                if ((int)($current['quota'] ?? 0) <= 0) {
                    throw new RuntimeException('可用次数不足，请稍后重试');
                }
                $current['quota'] = (int)$current['quota'] - 1;
                array_unshift($current['records'], [
                    'id' => 'Q' . date('YmdHis') . random_int(100, 999),
                    'type' => 'quota_generate',
                    'sourceDesc' => '制作消耗次数',
                    'createTime' => date('Y-m-d H:i'),
                    'changeValue' => 1,
                    'changeText' => '-',
                ]);
                return $current;
            });
            return ['method' => 'quota', 'user' => $userService->publicInfo($user)];
        }

        $config = AppConfigService::make()->get();
        $rewardAdEnabled = !empty($config['enableRewardAd']) && (string)($config['rewardAdUnitId'] ?? '') !== '';
        $paymentEnabled = !empty($config['enablePayment']) && (float)($config['price'] ?? 0) > 0;

        if ($rewardAdEnabled) {
            throw new RuntimeException('请先观看完整广告或开通VIP');
        }
        if ($paymentEnabled) {
            throw new RuntimeException('请先完成支付或开通VIP');
        }

        return ['method' => 'free', 'user' => $userService->publicInfo($user)];
    }

    private function isVipActive(array $user): bool
    {
        if (empty($user['isVip'])) {
            return false;
        }

        $expireAt = (string)($user['vipExpireAt'] ?? '');
        if ($expireAt === '' || strtolower($expireAt) === 'forever') {
            return true;
        }

        $timestamp = strtotime($expireAt);
        return $timestamp === false || $timestamp >= time();
    }
}
