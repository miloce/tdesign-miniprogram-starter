<?php

declare(strict_types=1);

namespace app\middleware;

use Closure;
use think\Request;
use think\Response;

final class Cors
{
    public function handle(Request $request, Closure $next): Response
    {
        if (strtoupper($request->method()) === 'OPTIONS') {
            $response = Response::create('', 'html', 204);
        } else {
            $response = $next($request);
        }

        return $response
            ->header([
                'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Headers' => 'Content-Type, Authorization',
                'Access-Control-Allow-Methods' => 'GET, POST, OPTIONS',
            ]);
    }
}
