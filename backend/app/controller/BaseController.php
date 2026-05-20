<?php

declare(strict_types=1);

namespace app\controller;

use think\Response;
use Yzd\Services\UserService;

abstract class BaseController
{
    protected function ok(array $data = [], string $message = 'success'): Response
    {
        return json([
            'code' => 200,
            'success' => true,
            'message' => $message,
            'data' => [
                'code' => 200,
                'message' => $message,
                'data' => $data,
            ],
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

    protected function baseUrl(): string
    {
        return rtrim(getenv('YZD_PUBLIC_BASE_URL') ?: request()->domain(), '/');
    }

    protected function shortBaseUrl(): string
    {
        return rtrim(getenv('YZD_SHORT_BASE_URL') ?: $this->baseUrl(), '/');
    }
}
