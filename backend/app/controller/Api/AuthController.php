<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use RuntimeException;
use think\Response;
use Yzd\Services\AppConfigService;
use Yzd\Services\SessionTokenService;
use Yzd\Services\UserService;
use Yzd\Services\WeChatMiniProgramService;

final class AuthController extends BaseController
{
    public function login(): Response
    {
        $code = (string)(request()->param('code') ?: '');
        $service = UserService::make();
        try {
            $user = $this->resolveUser($code, $service);
        } catch (RuntimeException $exception) {
            return $this->fail($exception->getMessage(), 502);
        }
        $config = AppConfigService::make()->get();

        $accessToken = SessionTokenService::make()->issue((string)$user['openid']);

        return json([
            'code' => 200,
            'message' => 'success',
            'success' => true,
            'data' => [
                'token' => $accessToken,
                'accessToken' => $accessToken,
                'userInfo' => $service->publicInfo($user),
                'config' => $config,
                'ad' => ['rewardAdUnitId' => $config['rewardAdUnitId'] ?? ''],
            ],
        ]);
    }

    public function loginTime(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $service = UserService::make();
        $service->mutate($this->authOpenid(), function (array $user): array {
            $user['lastLoginAt'] = date(DATE_ATOM);
            return $user;
        });
        return $this->ok(['status' => 1]);
    }

    private function resolveUser(string $code, UserService $service): array
    {
        $wechat = WeChatMiniProgramService::make();
        if ($code !== '' && $wechat->hasCredentials()) {
            $session = $wechat->code2Session($code);
            $openid = (string)($session['openid'] ?? '');
            return $service->mutate($openid, function (array $user) use ($session): array {
                $user['sessionKey'] = (string)($session['session_key'] ?? '');
                $user['sessionKeyUpdatedAt'] = date(DATE_ATOM);
                $user['lastLoginAt'] = date(DATE_ATOM);
                return $user;
            });
        }

        $openid = $this->resolveFallbackOpenid($code, $service);
        return $service->mutate($openid, function (array $user): array {
            $user['lastLoginAt'] = date(DATE_ATOM);
            return $user;
        });
    }

    private function resolveFallbackOpenid(string $code, UserService $service): string
    {
        $clientId = trim((string)request()->param('clientId', ''));
        if ($clientId !== '') {
            return 'client_' . substr(sha1($clientId), 0, 24);
        }

        if ($code !== '') {
            return 'wx_' . substr(sha1($code), 0, 24);
        }

        return $service->openid();
    }
}
