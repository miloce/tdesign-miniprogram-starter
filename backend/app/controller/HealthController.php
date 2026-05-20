<?php

declare(strict_types=1);

namespace app\controller;

use think\Response;

final class HealthController extends BaseController
{
    public function index(): Response
    {
        return $this->ok([
            'app' => 'yzd-backend',
            'framework' => 'ThinkPHP',
            'status' => 'ok',
            'time' => date(DATE_ATOM),
            'php' => PHP_VERSION,
        ]);
    }
}
