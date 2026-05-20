<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AppConfigService;
use Yzd\Services\UserService;

final class PointsController extends BaseController
{
    public function summary(): Response
    {
        $user = UserService::make()->get(UserService::make()->openid());
        return $this->ok([
            'points' => (int)$user['points'],
            'quota' => (int)$user['quota'],
            'isVip' => (bool)$user['isVip'],
            'records' => $user['records'] ?? [],
            'exchangeItems' => AppConfigService::make()->get()['exchangeItems'] ?? [],
        ]);
    }

    public function earn(): Response
    {
        $type = (string)(request()->param('type') ?: 'daily_sign');
        $points = ['watch_ad' => 20, 'invite_friend' => 50][$type] ?? 10;
        $service = UserService::make();
        $user = $service->get($service->openid());
        $user['points'] = (int)$user['points'] + $points;
        array_unshift($user['records'], ['id' => 'P' . date('YmdHis'), 'type' => $type, 'sourceDesc' => '积分奖励', 'createTime' => date('Y-m-d H:i'), 'changeValue' => $points, 'changeText' => '+']);
        $service->save($user);
        return $this->ok(['message' => '积分已到账', 'currentPoints' => $user['points'], 'quota' => $user['quota'], 'records' => $user['records']]);
    }

    public function exchange(): Response
    {
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
        $user = $service->get($service->openid());
        $cost = (int)($item['points'] ?? 0);
        if ((int)$user['points'] < $cost) {
            return $this->fail('积分不足', 422);
        }
        $user['points'] -= $cost;
        if (($item['type'] ?? 'quota') === 'vip') {
            $user['isVip'] = true;
            $user['vipExpireAt'] = date(DATE_ATOM, strtotime('+' . max(1, (int)($item['days'] ?? 7)) . ' days'));
        } else {
            $user['quota'] = (int)$user['quota'] + max(1, (int)($item['quota'] ?? 1));
        }
        array_unshift($user['records'], ['id' => 'P' . date('YmdHis'), 'type' => 'exchange', 'sourceDesc' => (string)$item['name'], 'createTime' => date('Y-m-d H:i'), 'changeValue' => $cost, 'changeText' => '-']);
        $service->save($user);
        return $this->ok(['message' => '兑换成功', 'points' => $user['points'], 'quota' => $user['quota'], 'isVip' => $user['isVip']]);
    }
}
