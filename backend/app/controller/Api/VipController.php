<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AppConfigService;
use Yzd\Services\UserService;

final class VipController extends BaseController
{
    public function packages(): Response
    {
        return $this->ok(AppConfigService::make()->get()['vipPackages'] ?? []);
    }

    public function pay(): Response
    {
        return $this->ok(['mockPay' => true, 'outTradeNo' => 'VIP' . date('YmdHis') . random_int(100, 999)]);
    }

    public function confirm(): Response
    {
        $service = UserService::make();
        $user = $service->get($service->openid());
        $user['isVip'] = true;
        $user['vipExpireAt'] = date(DATE_ATOM, strtotime('+365 days'));
        $service->save($user);
        return $this->ok(['paid' => true, 'isVip' => true, 'vipExpireAt' => $user['vipExpireAt']]);
    }

    public function status(): Response
    {
        $user = UserService::make()->get(UserService::make()->openid());
        return $this->ok(['isVip' => (bool)$user['isVip'], 'vipExpireAt' => (string)($user['vipExpireAt'] ?? '')]);
    }
}
