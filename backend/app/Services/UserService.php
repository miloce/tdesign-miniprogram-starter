<?php

declare(strict_types=1);

namespace Yzd\Services;

final class UserService
{
    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function get(string $openid, array $profile = []): array
    {
        $users = $this->all();
        $dirty = false;
        if (!isset($users[$openid])) {
            $users[$openid] = $this->defaultUser($openid);
            $dirty = true;
        }
        $profile = array_filter($profile, fn ($value) => $value !== '' && $value !== null);
        if ($profile !== []) {
            $users[$openid] = array_replace($users[$openid], $profile);
            $dirty = true;
        }
        if ($dirty) {
            $this->storage->write('users.json', array_values($users));
        }
        return $users[$openid];
    }

    public function save(array $user): array
    {
        $openid = (string)($user['openid'] ?? '');
        if ($openid === '') {
            $openid = 'dev_openid';
        }
        $users = $this->all();
        $users[$openid] = array_replace($users[$openid] ?? $this->defaultUser($openid), $user);
        $this->storage->write('users.json', array_values($users));
        return $users[$openid];
    }

    public function all(): array
    {
        $raw = $this->storage->read('users.json', []);
        $users = [];
        foreach ($raw as $key => $user) {
            if (!is_array($user)) {
                continue;
            }
            $openid = (string)($user['openid'] ?? $key);
            $users[$openid] = $user;
        }
        return $users;
    }

    public function openid(): string
    {
        $header = request()->header('Authorization', '');
        if (stripos($header, 'Bearer ') === 0) {
            return trim(substr($header, 7));
        }
        return (string)(request()->param('openid') ?: 'dev_openid');
    }

    public function adminOpenid(): string
    {
        return getenv('YZD_ADMIN_OPENID') ?: 'oL8I43flaski-3Q2shkh4olGQEn4';
    }

    public function isAdmin(): bool
    {
        return $this->openid() === $this->adminOpenid();
    }

    private function defaultUser(string $openid): array
    {
        return [
            'openid' => $openid,
            'nickname' => '云栈点用户',
            'avatar' => '/static/avatar1.png',
            'role' => $openid === $this->adminOpenid() ? 'admin' : 'user',
            'status' => 'active',
            'points' => 1280,
            'quota' => 3,
            'isVip' => false,
            'vipExpireAt' => '',
            'records' => [],
            'createdAt' => date(DATE_ATOM),
            'lastLoginAt' => date(DATE_ATOM),
        ];
    }
}
