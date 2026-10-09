<?php

declare(strict_types=1);

namespace Yzd\Services;

final class SessionTokenService
{
    private const TOKEN_TTL = 604800;

    public static function make(): self
    {
        return new self();
    }

    public function issue(string $openid): string
    {
        $now = time();
        $payload = [
            'v' => 1,
            'openid' => $openid,
            'iat' => $now,
            'exp' => $now + self::TOKEN_TTL,
            'nonce' => bin2hex(random_bytes(8)),
        ];
        $body = $this->base64UrlEncode(json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) ?: '{}');
        $signature = $this->base64UrlEncode(hash_hmac('sha256', $body, $this->secret(), true));

        return $body . '.' . $signature;
    }

    public function openid(string $token): ?string
    {
        $payload = $this->verify($token);
        return is_array($payload) ? (string)$payload['openid'] : null;
    }

    public function verify(string $token): ?array
    {
        $parts = explode('.', trim($token));
        if (count($parts) !== 2 || $parts[0] === '' || $parts[1] === '') {
            return null;
        }

        [$body, $signature] = $parts;
        $expected = $this->base64UrlEncode(hash_hmac('sha256', $body, $this->secret(), true));
        if (!hash_equals($expected, $signature)) {
            return null;
        }

        $json = $this->base64UrlDecode($body);
        if ($json === null) {
            return null;
        }

        $payload = json_decode($json, true);
        if (!is_array($payload)) {
            return null;
        }

        $openid = (string)($payload['openid'] ?? '');
        $exp = (int)($payload['exp'] ?? 0);
        if ($openid === '' || $exp < time()) {
            return null;
        }

        return $payload;
    }

    private function secret(): string
    {
        $configured = (string)(getenv('YZD_SESSION_SECRET') ?: '');
        if ($configured !== '') {
            return $configured;
        }

        return hash('sha256', implode('|', [
            (string)(getenv('YZD_WECHAT_SECRET') ?: ''),
            (string)(getenv('YZD_WECHAT_API_V3_KEY') ?: ''),
            (string)(getenv('YZD_ADMIN_OPENID') ?: 'oL8I43flaski-3Q2shkh4olGQEn4'),
            dirname(__DIR__, 2),
        ]));
    }

    private function base64UrlEncode(string $value): string
    {
        return rtrim(strtr(base64_encode($value), '+/', '-_'), '=');
    }

    private function base64UrlDecode(string $value): ?string
    {
        $padded = strtr($value, '-_', '+/');
        $padding = strlen($padded) % 4;
        if ($padding > 0) {
            $padded .= str_repeat('=', 4 - $padding);
        }

        $decoded = base64_decode($padded, true);
        return is_string($decoded) ? $decoded : null;
    }
}
