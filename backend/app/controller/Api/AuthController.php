<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AppConfigService;
use Yzd\Services\UserService;

final class AuthController extends BaseController
{
    public function login(): Response
    {
        $code = (string)(request()->param('code') ?: '');
        $openid = $code !== '' ? 'wx_' . substr(sha1($code), 0, 24) : UserService::make()->openid();
        $user = UserService::make()->get($openid);

        return json([
            'code' => 1,
            'msg' => 'success',
            'success' => true,
            'data' => [
                'token' => $openid,
                'userinfo' => [
                'openid' => $openid,
                'nickname' => $user['nickname'],
                'avatar' => $user['avatar'],
                'isVip' => (bool)$user['isVip'],
                'quota' => (int)$user['quota'],
                'points' => (int)$user['points'],
                ],
                'config' => AppConfigService::make()->get(),
                'ad' => ['rewardAdUnitId' => AppConfigService::make()->get()['rewardAdUnitId'] ?? ''],
            ],
        ]);
    }

    public function loginTime(): Response
    {
        return $this->ok(['status' => 1]);
    }
}
