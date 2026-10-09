<?php

declare(strict_types=1);

namespace Yzd\Services;

use RuntimeException;

final class WeChatMiniProgramService
{
    private const TOKEN_STORAGE = 'wechat_access_token.json';

    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function appId(): string
    {
        return (string)(getenv('YZD_WECHAT_APPID') ?: '');
    }

    public function secret(): string
    {
        return (string)(getenv('YZD_WECHAT_SECRET') ?: '');
    }

    public function hasCredentials(): bool
    {
        return $this->appId() !== '' && $this->secret() !== '';
    }

    public function code2Session(string $code): array
    {
        $code = trim($code);
        if ($code === '') {
            throw new RuntimeException('缺少微信登录 code');
        }
        if (!$this->hasCredentials()) {
            throw new RuntimeException('小程序凭据未配置');
        }

        $response = $this->getJson('https://api.weixin.qq.com/sns/jscode2session?' . http_build_query([
            'appid' => $this->appId(),
            'secret' => $this->secret(),
            'js_code' => $code,
            'grant_type' => 'authorization_code',
        ]));

        if ((string)($response['openid'] ?? '') === '' || (string)($response['session_key'] ?? '') === '') {
            throw new RuntimeException((string)($response['errmsg'] ?? '获取微信登录态失败'));
        }

        return $response;
    }

    public function resolveSessionKeyForOpenid(string $openid, string $loginCode = ''): string
    {
        $openid = trim($openid);
        if ($openid === '') {
            throw new RuntimeException('登录态无效，请重新登录后再试');
        }

        if ($loginCode !== '') {
            $session = $this->code2Session($loginCode);
            $sessionOpenid = (string)($session['openid'] ?? '');
            if ($sessionOpenid === '' || $sessionOpenid !== $openid) {
                throw new RuntimeException('登录态已变化，请重新登录后再试');
            }

            $sessionKey = (string)($session['session_key'] ?? '');
            UserService::make()->mutate($openid, function (array $user) use ($sessionKey): array {
                $user['sessionKey'] = $sessionKey;
                $user['sessionKeyUpdatedAt'] = date(DATE_ATOM);
                return $user;
            });

            return $sessionKey;
        }

        $user = UserService::make()->get($openid);
        $sessionKey = trim((string)($user['sessionKey'] ?? ''));
        if ($sessionKey === '') {
            throw new RuntimeException('支付登录态已失效，请重新登录后再试');
        }

        return $sessionKey;
    }

    public function withAccessToken(callable $callback): array
    {
        $response = $callback($this->accessToken());
        $errcode = (int)($response['errcode'] ?? 0);
        if (in_array($errcode, [40001, 42001], true)) {
            $this->clearAccessToken();
            $response = $callback($this->accessToken());
        }

        return $response;
    }

    public function accessToken(): string
    {
        $cached = $this->storage->read(self::TOKEN_STORAGE, []);
        $token = (string)($cached['accessToken'] ?? '');
        $expiresAt = (int)($cached['expiresAt'] ?? 0);
        if ($token !== '' && $expiresAt > time() + 300) {
            return $token;
        }

        if (!$this->hasCredentials()) {
            throw new RuntimeException('小程序凭据未配置');
        }

        $response = $this->getJson('https://api.weixin.qq.com/cgi-bin/token?' . http_build_query([
            'grant_type' => 'client_credential',
            'appid' => $this->appId(),
            'secret' => $this->secret(),
        ]));

        $accessToken = (string)($response['access_token'] ?? '');
        if ($accessToken === '') {
            throw new RuntimeException((string)($response['errmsg'] ?? '获取小程序 access_token 失败'));
        }

        $ttl = max(60, (int)($response['expires_in'] ?? 7200) - 300);
        $this->storage->write(self::TOKEN_STORAGE, [
            'accessToken' => $accessToken,
            'expiresAt' => time() + $ttl,
            'updatedAt' => date(DATE_ATOM),
        ]);

        return $accessToken;
    }

    public function clearAccessToken(): void
    {
        $this->storage->write(self::TOKEN_STORAGE, []);
    }

    private function getJson(string $url): array
    {
        $raw = @file_get_contents($url, false, stream_context_create([
            'http' => [
                'method' => 'GET',
                'timeout' => 10,
                'ignore_errors' => true,
            ],
        ]));

        if ($raw === false) {
            throw new RuntimeException('微信网络请求失败');
        }

        $data = json_decode($raw, true);
        if (!is_array($data)) {
            throw new RuntimeException('微信响应格式错误');
        }

        return $data;
    }
}
