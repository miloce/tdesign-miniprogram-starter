<?php

declare(strict_types=1);

namespace app\controller;

use think\Response;
use Yzd\Services\UserService;

abstract class BaseController
{
    protected function ok(array $data = [], string $message = 'success'): Response
    {
        if ($this->isAdminRoute()) {
            $data = $this->formatAdminDateTimes($data);
        }

        return json([
            'code' => 200,
            'success' => true,
            'message' => $message,
            'data' => $data,
        ]);
    }

    protected function fail(string $message, int $code = 400): Response
    {
        return json(['code' => $code, 'success' => false, 'message' => $message], $code);
    }

    protected function input(): array
    {
        $data = request()->param();
        return is_array($data) ? $data : [];
    }

    protected function requireAdmin(): ?Response
    {
        if (!UserService::make()->isAdmin()) {
            return $this->fail('无管理员权限', 403);
        }
        return null;
    }

    protected function requireAuth(): ?Response
    {
        if (UserService::make()->authenticatedOpenid() === null) {
            return $this->fail('请先登录', 401);
        }
        return null;
    }

    protected function authOpenid(): string
    {
        return UserService::make()->authenticatedOpenid() ?? '';
    }

    protected function clientContext(array $input): array
    {
        $context = is_array($input['clientContext'] ?? null) ? $input['clientContext'] : [];

        foreach (['platform', 'system', 'systemVersion', 'wechatVersion', 'sdkVersion'] as $key) {
            if (array_key_exists($key, $input) && !array_key_exists($key, $context)) {
                $context[$key] = $input[$key];
            }
        }

        return $context;
    }

    protected function baseUrl(): string
    {
        return rtrim(getenv('YZD_PUBLIC_BASE_URL') ?: request()->domain(), '/');
    }

    protected function shortBaseUrl(): string
    {
        return rtrim(getenv('YZD_SHORT_BASE_URL') ?: $this->baseUrl(), '/');
    }

    private function isAdminRoute(): bool
    {
        $path = trim((string)request()->pathinfo(), '/');
        return $path === 'admin' || str_starts_with($path, 'admin/');
    }

    private function formatAdminDateTimes(array $data): array
    {
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $data[$key] = $this->formatAdminDateTimes($value);
                continue;
            }

            if ($this->isAdminDateTimeKey((string)$key) && (is_string($value) || is_int($value))) {
                $data[$key] = $this->formatAdminDateTimeValue($value);
            }
        }

        return $data;
    }

    private function isAdminDateTimeKey(string $key): bool
    {
        $normalized = strtolower($key);
        return str_ends_with($key, 'At')
            || str_ends_with($normalized, '_at')
            || in_array($normalized, [
                'createdat',
                'updatedat',
                'paidat',
                'consumedat',
                'fulfilledat',
                'refundedat',
                'reviewedat',
                'expiresat',
                'vipexpireat',
                'lastloginat',
                'sessionkeyupdatedat',
                'subscribedat',
                'lastrunat',
                'nextrunat',
                'checkedat',
                'completedat',
                'generatedat',
                'createtime',
                'create_time',
                'updatetime',
                'update_time',
                'lastmodified',
            ], true);
    }

    private function formatAdminDateTimeValue(string|int $value): string|int
    {
        $raw = is_string($value) ? trim($value) : $value;
        if ($raw === '' || strtolower((string)$raw) === 'forever') {
            return $value;
        }

        try {
            $timezone = new \DateTimeZone('Asia/Shanghai');
            if (is_int($raw)) {
                return (new \DateTimeImmutable('@' . $raw))->setTimezone($timezone)->format('Y-m-d H:i:s');
            }

            return (new \DateTimeImmutable((string)$raw, $timezone))
                ->setTimezone($timezone)
                ->format('Y-m-d H:i:s');
        } catch (\Throwable) {
            return $value;
        }
    }
}
