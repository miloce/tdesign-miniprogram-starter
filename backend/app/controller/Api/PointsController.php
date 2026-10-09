<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use RuntimeException;
use Yzd\Services\AppConfigService;
use Yzd\Services\UserService;

final class PointsController extends BaseController
{
    public function summary(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $config = AppConfigService::make()->get();
        $user = UserService::make()->get($this->authOpenid());
        return $this->ok([
            'points' => (int)$user['points'],
            'quota' => (int)$user['quota'],
            'isVip' => (bool)$user['isVip'],
            'vipInfo' => UserService::make()->vipInfo($user),
            'paymentEnabled' => (bool)($config['enablePayment'] ?? false),
            'rewardAdUnitId' => $this->rewardAdAvailable($config) ? (string)($config['rewardAdUnitId'] ?? '') : '',
            'records' => $user['records'] ?? [],
            'earnOptions' => $this->earnOptions($user, $config),
            'exchangeItems' => $config['exchangeItems'] ?? [],
        ]);
    }

    public function earn(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $config = AppConfigService::make()->get();
        $type = (string)(request()->param('type') ?: 'daily_sign');
        $pointsMap = ['daily_sign' => 10, 'watch_ad' => 20, 'invite_friend' => 50];
        if (!array_key_exists($type, $pointsMap)) {
            return $this->fail('任务类型不存在', 404);
        }
        if ($type === 'watch_ad' && !$this->rewardAdAvailable($config)) {
            return $this->fail('激励广告暂未开启', 422);
        }
        if ($type === 'watch_ad' && (string)request()->param('adCompleted', '') !== '1') {
            return $this->fail('请先完整观看激励广告', 422);
        }
        $points = $pointsMap[$type];
        $service = UserService::make();
        try {
            $user = $service->mutate($this->authOpenid(), function (array $current) use ($type, $points): array {
                if ($message = $this->earnLimitMessage($current, $type)) {
                    throw new RuntimeException($message, 429);
                }
                $current['points'] = (int)$current['points'] + $points;
                $current['records'] = is_array($current['records'] ?? null) ? $current['records'] : [];
                array_unshift($current['records'], ['id' => 'P' . date('YmdHis') . random_int(100, 999), 'type' => $type, 'sourceDesc' => $this->earnSourceDesc($type), 'createTime' => date('Y-m-d H:i'), 'changeValue' => $points, 'changeText' => '+']);
                return $current;
            });
        } catch (RuntimeException $exception) {
            return $this->fail($exception->getMessage(), $exception->getCode() ?: 422);
        }
        return $this->ok([
            'message' => '积分已到账',
            'points' => $user['points'],
            'quota' => $user['quota'],
            'records' => $user['records'],
            'earnOptions' => $this->earnOptions($user, $config),
        ]);
    }

    public function exchange(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $id = (string)request()->param('id');
        $items = AppConfigService::make()->get()['exchangeItems'] ?? [];
        $item = null;
        foreach ($items as $candidate) {
            if ((string)($candidate['id'] ?? '') === $id) {
                $item = $candidate;
                break;
            }
        }
        if (!$item) {
            return $this->fail('兑换项不存在', 404);
        }
        $service = UserService::make();
        $cost = (int)($item['points'] ?? 0);
        if ($cost <= 0) {
            return $this->fail('兑换积分配置错误', 422);
        }
        try {
            $user = $service->mutate($this->authOpenid(), function (array $current) use ($item, $cost): array {
                if ((int)$current['points'] < $cost) {
                    throw new RuntimeException('积分不足', 422);
                }
                $current['points'] -= $cost;
                if (($item['type'] ?? 'quota') === 'vip') {
                    $current['isVip'] = true;
                    $current['vipExpireAt'] = date(DATE_ATOM, strtotime('+' . max(1, (int)($item['days'] ?? 7)) . ' days'));
                } else {
                    $current['quota'] = (int)$current['quota'] + max(1, (int)($item['quota'] ?? 1));
                }
                $current['records'] = is_array($current['records'] ?? null) ? $current['records'] : [];
                array_unshift($current['records'], ['id' => 'P' . date('YmdHis') . random_int(100, 999), 'type' => 'exchange', 'sourceDesc' => (string)$item['name'], 'createTime' => date('Y-m-d H:i'), 'changeValue' => $cost, 'changeText' => '-']);
                return $current;
            });
        } catch (RuntimeException $exception) {
            return $this->fail($exception->getMessage(), $exception->getCode() ?: 422);
        }
        return $this->ok([
            'message' => '兑换成功',
            'points' => $user['points'],
            'quota' => $user['quota'],
            'isVip' => $user['isVip'],
            'vipInfo' => $service->vipInfo($user),
            'records' => $user['records'],
        ]);
    }

    private function earnLimitMessage(array $user, string $type): string
    {
        $records = array_values(array_filter(is_array($user['records'] ?? null) ? $user['records'] : [], fn ($record): bool => is_array($record)));
        $today = date('Y-m-d');
        $todayRecords = array_values(array_filter($records, fn (array $record): bool => str_starts_with((string)($record['createTime'] ?? ''), $today)));
        $sameTypeToday = array_values(array_filter($todayRecords, fn (array $record): bool => (string)($record['type'] ?? '') === $type));

        if ($type === 'daily_sign' && count($sameTypeToday) > 0) {
            return '今日已签到';
        }
        if ($type === 'watch_ad' && count($sameTypeToday) >= 5) {
            return '今日广告奖励已达上限';
        }
        if ($type === 'invite_friend' && count($sameTypeToday) >= 1) {
            return '今日邀请奖励已领取';
        }

        return '';
    }

    private function earnSourceDesc(string $type): string
    {
        return match ($type) {
            'watch_ad' => '观看激励广告',
            'invite_friend' => '邀请好友',
            default => '每日签到',
        };
    }

    private function earnOptions(array $user, array $config): array
    {
        $records = array_values(array_filter(is_array($user['records'] ?? null) ? $user['records'] : [], fn ($record): bool => is_array($record)));
        $today = date('Y-m-d');
        $todayRecords = array_values(array_filter($records, fn (array $record): bool => str_starts_with((string)($record['createTime'] ?? ''), $today)));
        $dailySigned = count(array_filter($todayRecords, fn (array $record): bool => (string)($record['type'] ?? '') === 'daily_sign')) > 0;
        $rewardAdAvailable = $this->rewardAdAvailable($config);

        return [
            [
                'id' => 'daily_sign',
                'type' => 'daily_sign',
                'name' => '每日签到',
                'points' => 10,
                'isActive' => !$dailySigned,
                'rewardText' => $dailySigned ? '已签到' : '+10',
                'disabledReason' => $dailySigned ? '今日已签到' : '',
            ],
            [
                'id' => 'watch_ad',
                'type' => 'watch_ad',
                'name' => '观看激励广告',
                'points' => 20,
                'isActive' => $rewardAdAvailable,
                'rewardText' => $rewardAdAvailable ? '+20' : '未开启',
                'disabledReason' => $rewardAdAvailable ? '' : '激励广告暂未开启',
            ],
            [
                'id' => 'invite_friend',
                'type' => 'invite_friend',
                'name' => '邀请好友',
                'points' => 50,
                'isActive' => true,
                'rewardText' => '+50',
                'disabledReason' => '',
            ],
        ];
    }

    private function rewardAdAvailable(array $config): bool
    {
        return !empty($config['enableRewardAd']) && (string)($config['rewardAdUnitId'] ?? '') !== '';
    }
}
