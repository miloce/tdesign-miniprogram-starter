<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\SessionTokenService;
use Yzd\Services\UserService;

final class AuthController extends BaseController
{
    public function login(): Response
    {
        $input = $this->input();
        $username = trim((string)($input['username'] ?? ''));
        $password = (string)($input['password'] ?? '');
        $expectedUsername = (string)(getenv('YZD_ADMIN_USERNAME') ?: 'admin');
        $expectedPassword = (string)(getenv('YZD_ADMIN_PASSWORD') ?: '');

        if ($username === '' || $password === '' || $username !== $expectedUsername || !hash_equals($expectedPassword, $password)) {
            return $this->fail('账号或密码错误', 401);
        }

        return $this->ok([
            'token' => SessionTokenService::make()->issue(UserService::make()->adminOpenid()),
            'username' => $expectedUsername,
        ]);
    }
}
