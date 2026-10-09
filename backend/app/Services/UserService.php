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
        $normalized = $this->normalizeUser($users[$openid], $openid);
        if ($normalized !== $users[$openid]) {
            $users[$openid] = $normalized;
            $dirty = true;
        }
        $profile = array_filter($profile, fn ($value) => $value !== '' && $value !== null);
        if ($profile !== []) {
            $users[$openid] = array_replace($users[$openid], $profile);
            $users[$openid] = $this->normalizeUser($users[$openid], $openid);
            $dirty = true;
        }
        if ($dirty) {
            return $this->mutate($openid, fn (array $current): array => array_replace($current, $profile));
        }
        return $users[$openid];
    }

    public function mutate(string $openid, callable $mutator): array
    {
        $openid = trim($openid) ?: 'dev_openid';
        $updatedUser = null;
        $this->storage->update('users.json', [], function (array $raw) use ($openid, $mutator, &$updatedUser): array {
            $users = $this->normalizeUsers($raw);
            $current = $users[$openid] ?? $this->defaultUser($openid);
            $updatedUser = $this->normalizeUser($mutator($current), $openid);
            $users[$openid] = $updatedUser;
            return array_values($users);
        });
        return $updatedUser;
    }

    public function delete(string $openid): bool
    {
        $openid = trim($openid);
        if ($openid === '') {
            return false;
        }

        $deleted = false;
        $this->storage->update('users.json', [], function (array $raw) use ($openid, &$deleted): array {
            $users = $this->normalizeUsers($raw);
            if (isset($users[$openid])) {
                unset($users[$openid]);
                $deleted = true;
            }
            return array_values($users);
        });
        return $deleted;
    }

    public function all(): array
    {
        return $this->normalizeUsers($this->storage->read('users.json', []));
    }

    private function normalizeUsers(array $raw): array
    {
        $users = [];
        foreach ($raw as $key => $user) {
            if (!is_array($user)) {
                continue;
            }
            $openid = (string)($user['openid'] ?? $key);
            $users[$openid] = $this->normalizeUser($user, $openid);
        }
        return $users;
    }

    public function openid(): string
    {
        $openid = $this->authenticatedOpenid();
        if ($openid !== null) {
            return $openid;
        }

        return (string)(request()->param('openid') ?: 'dev_openid');
    }

    public function authenticatedOpenid(): ?string
    {
        $header = request()->header('Authorization', '');
        if (stripos($header, 'Bearer ') === 0) {
            $token = trim(substr($header, 7));
            if ($token !== '') {
                return SessionTokenService::make()->openid($token);
            }
        }

        return null;
    }

    public function adminOpenid(): string
    {
        return getenv('YZD_ADMIN_OPENID') ?: 'oL8I43flaski-3Q2shkh4olGQEn4';
    }

    public function isAdmin(): bool
    {
        return $this->authenticatedOpenid() === $this->adminOpenid();
    }

    public function isAdminUser(array $user): bool
    {
        return (string)($user['openid'] ?? '') === $this->adminOpenid() || (string)($user['role'] ?? '') === 'admin';
    }

    public function publicInfo(array $user): array
    {
        $user = $this->normalizeUser($user, (string)($user['openid'] ?? 'dev_openid'));
        $isVip = (bool)$user['isVip'];
        $isAdmin = $this->isAdminUser($user);
        $quota = (int)$user['quota'];
        $points = (int)$user['points'];
        $avatar = $this->publicUrl((string)$user['avatar']);

        return [
            'id' => (int)$user['id'],
            'openid' => (string)$user['openid'],
            'nickname' => (string)$user['nickname'],
            'avatar' => $avatar,
            'role' => $isAdmin ? 'admin' : 'user',
            'isVip' => $isVip,
            'isAdmin' => $isAdmin,
            'vipExpireAt' => (string)($user['vipExpireAt'] ?? ''),
            'vipInfo' => $this->vipInfo($user),
            'quota' => $quota,
            'points' => $points,
            'phone' => (string)($user['phone'] ?? ''),
        ];
    }

    public function adminInfo(array $user): array
    {
        $user = $this->normalizeUser($user, (string)($user['openid'] ?? 'dev_openid'));
        return array_replace($this->publicInfo($user), [
            'status' => (string)($user['status'] ?? 'active'),
            'createdAt' => $this->formatDateTime((string)($user['createdAt'] ?? '')),
            'lastLoginAt' => $this->formatDateTime((string)($user['lastLoginAt'] ?? '')),
            'remark' => (string)($user['remark'] ?? ''),
        ]);
    }

    public function vipInfo(array $user): array
    {
        $isVip = (bool)($user['isVip'] ?? false);
        $expireAt = (string)($user['vipExpireAt'] ?? '');

        return [
            'isVip' => $isVip,
            'expireAt' => $expireAt,
            'text' => $isVip ? 'VIP会员' : '普通用户',
        ];
    }

    private function normalizeUser(array $user, string $openid): array
    {
        $default = $this->defaultUser($openid);
        $user = array_replace($default, $user);
        $user['openid'] = (string)($user['openid'] ?: $openid);
        $user['id'] = (int)($user['id'] ?? 0);
        if ($user['id'] <= 0) {
            $user['id'] = $this->userId((string)$user['openid']);
        }
        $user['role'] = $this->isAdminUser($user) ? 'admin' : (string)($user['role'] ?: 'user');
        $user['points'] = (int)$user['points'];
        $user['quota'] = (int)$user['quota'];
        $user['isVip'] = (bool)$user['isVip'];
        $expireAt = (string)($user['vipExpireAt'] ?? '');
        if ($user['isVip'] && $expireAt !== '' && strtolower($expireAt) !== 'forever') {
            $timestamp = strtotime($expireAt);
            if ($timestamp !== false && $timestamp < time()) {
                $user['isVip'] = false;
            }
        }
        $user['records'] = is_array($user['records'] ?? null) ? $user['records'] : [];
        return $user;
    }

    private function userId(string $openid): int
    {
        return abs(crc32($openid)) % 900000 + 100000;
    }

    private function publicUrl(string $path): string
    {
        if ($path === '' || preg_match('/^https?:\/\//', $path)) {
            return $path;
        }

        $baseUrl = rtrim((string)(getenv('YZD_PUBLIC_BASE_URL') ?: ''), '/');
        if ($baseUrl === '' && function_exists('request')) {
            try {
                $baseUrl = rtrim(request()->domain(), '/');
            } catch (\Throwable) {
                $baseUrl = '';
            }
        }

        return $baseUrl === '' ? $path : $baseUrl . '/' . ltrim($path, '/');
    }

    private function formatDateTime(string $value): string
    {
        if ($value === '') {
            return '';
        }

        try {
            return (new \DateTimeImmutable($value))
                ->setTimezone(new \DateTimeZone('Asia/Shanghai'))
                ->format('Y-m-d H:i:s');
        } catch (\Throwable) {
            return $value;
        }
    }

    private function defaultUser(string $openid): array
    {
        return [
            'id' => $this->userId($openid),
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
