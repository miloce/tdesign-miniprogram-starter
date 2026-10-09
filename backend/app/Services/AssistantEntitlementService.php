<?php

declare(strict_types=1);

namespace Yzd\Services;

use RuntimeException;

final class AssistantEntitlementService
{
    private const REWARD_SCOPE = 'assistant';

    public static function make(): self
    {
        return new self();
    }

    public function issueRewardToken(string $openid): string
    {
        return RewardTokenService::make()->issue($openid, self::REWARD_SCOPE);
    }

    public function authorize(string $openid, string $outTradeNo = '', string $rewardToken = ''): array
    {
        $userService = UserService::make();
        $user = $userService->get($openid);

        if ((string)($user['status'] ?? 'active') === 'disabled') {
            throw new RuntimeException('账号已被禁用，当前无法使用');
        }

        if ($this->isVipActive($user)) {
            return ['method' => 'vip', 'user' => $userService->publicInfo($user)];
        }

        $outTradeNo = trim($outTradeNo);
        if ($outTradeNo !== '') {
            $order = OrderService::make()->get($outTradeNo);
            if (!$order || !OrderService::make()->isPaidUsable($order, $openid, 'assistant')) {
                throw new RuntimeException('支付订单无效或已使用');
            }

            return [
                'method' => 'paid',
                'user' => $userService->publicInfo($user),
                'outTradeNo' => $outTradeNo,
            ];
        }

        $rewardToken = trim($rewardToken);
        if ($rewardToken !== '') {
            if (!RewardTokenService::make()->isValid($rewardToken, $openid, self::REWARD_SCOPE)) {
                throw new RuntimeException('广告权益已失效，请重新观看后再试');
            }

            return [
                'method' => 'reward_ad',
                'user' => $userService->publicInfo($user),
                'rewardToken' => $rewardToken,
            ];
        }

        if ((int)($user['quota'] ?? 0) > 0) {
            return ['method' => 'quota', 'user' => $userService->publicInfo($user)];
        }

        $config = AppConfigService::make()->get();
        $rewardAdEnabled = !empty($config['enableRewardAd']) && (string)($config['rewardAdUnitId'] ?? '') !== '';
        $paymentEnabled = !empty($config['enablePayment']) && (float)($config['price'] ?? 0) > 0;

        if ($rewardAdEnabled && $paymentEnabled) {
            throw new RuntimeException('请先观看完整广告、完成支付或开通VIP');
        }
        if ($rewardAdEnabled) {
            throw new RuntimeException('请先观看完整广告或开通VIP');
        }
        if ($paymentEnabled) {
            throw new RuntimeException('请先完成支付或开通VIP');
        }

        return ['method' => 'free', 'user' => $userService->publicInfo($user)];
    }

    public function finalize(string $openid, array $authorization): array
    {
        $method = (string)($authorization['method'] ?? '');
        $userService = UserService::make();
        $user = $userService->get($openid);

        if ($method === 'paid') {
            $outTradeNo = trim((string)($authorization['outTradeNo'] ?? ''));
            $order = $outTradeNo !== '' ? OrderService::make()->get($outTradeNo) : null;
            if (!$order || !OrderService::make()->isPaidUsable($order, $openid, 'assistant')) {
                throw new RuntimeException('支付订单无效或已使用');
            }
            if (!OrderService::make()->consumePaid($outTradeNo, $openid, 'assistant')) {
                throw new RuntimeException('支付订单无效或已使用');
            }
            return ['method' => 'paid', 'user' => $userService->publicInfo($user)];
        }

        if ($method === 'reward_ad') {
            $rewardToken = trim((string)($authorization['rewardToken'] ?? ''));
            if (!RewardTokenService::make()->consume($rewardToken, $openid, self::REWARD_SCOPE)) {
                throw new RuntimeException('广告权益已失效，请重新观看后再试');
            }
            return ['method' => 'reward_ad', 'user' => $userService->publicInfo($user)];
        }

        if ($method === 'quota') {
            $user = $userService->mutate($openid, function (array $current): array {
                if ((int)($current['quota'] ?? 0) <= 0) {
                    throw new RuntimeException('可用次数不足，请稍后重试');
                }
                $current['quota'] = (int)$current['quota'] - 1;
                array_unshift($current['records'], [
                    'id' => 'A' . date('YmdHis') . random_int(100, 999),
                    'type' => 'assistant_consume',
                    'sourceDesc' => '小助手消耗次数',
                    'createTime' => date('Y-m-d H:i'),
                    'changeValue' => 1,
                    'changeText' => '-',
                ]);
                return $current;
            });
            return ['method' => 'quota', 'user' => $userService->publicInfo($user)];
        }

        return ['method' => $method !== '' ? $method : 'free', 'user' => $userService->publicInfo($user)];
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
