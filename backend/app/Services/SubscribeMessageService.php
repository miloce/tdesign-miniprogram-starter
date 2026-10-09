<?php

declare(strict_types=1);

namespace Yzd\Services;

use RuntimeException;

final class SubscribeMessageService
{
    public const ASSISTANT_TEMPLATE_ID = 'E72ZydT3J-M2P3RuEHJxyk59a2OPzlsRyTK9srjoaAY';

    public static function make(): self
    {
        return new self();
    }

    public function sendAssistantCompleted(string $openid, array $payload): array
    {
        $openid = trim($openid);
        if ($openid === '') {
            throw new RuntimeException('订阅消息 openid 为空');
        }

        $body = [
            'touser' => $openid,
            'template_id' => self::ASSISTANT_TEMPLATE_ID,
            'page' => 'pages/my/assistant/index',
            'miniprogram_state' => $this->miniprogramState(),
            'lang' => 'zh_CN',
            'data' => [
                'short_thing1' => ['value' => $this->shortThing((string)($payload['title'] ?? '小助手'))],
                'time2' => ['value' => $this->timeValue((string)($payload['completedAt'] ?? date('Y-m-d H:i:s')))],
                'character_string3' => ['value' => $this->characterString((string)($payload['taskId'] ?? ''))],
                'thing4' => ['value' => $this->thing((string)($payload['tip'] ?? '自动任务已完成'))],
            ],
        ];

        return WeChatMiniProgramService::make()->withAccessToken(function (string $accessToken) use ($body): array {
            return $this->postJson('/cgi-bin/message/subscribe/send?access_token=' . rawurlencode($accessToken), $body);
        });
    }

    private function postJson(string $path, array $payload): array
    {
        $body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if (!is_string($body)) {
            throw new RuntimeException('订阅消息编码失败');
        }

        $raw = @file_get_contents('https://api.weixin.qq.com' . $path, false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\nContent-Length: " . strlen($body),
                'content' => $body,
                'timeout' => 15,
                'ignore_errors' => true,
            ],
        ]));

        if ($raw === false) {
            throw new RuntimeException('订阅消息网络请求失败');
        }

        $data = json_decode($raw, true);
        if (!is_array($data)) {
            throw new RuntimeException('订阅消息响应格式错误');
        }

        return $data;
    }

    private function miniprogramState(): string
    {
        $state = strtolower(trim((string)(getenv('YZD_SUBSCRIBE_MESSAGE_STATE') ?: 'formal')));
        return in_array($state, ['developer', 'trial', 'formal'], true) ? $state : 'formal';
    }

    private function shortThing(string $value): string
    {
        return $this->limit($value !== '' ? $value : '小助手', 5);
    }

    private function thing(string $value): string
    {
        return $this->limit($value !== '' ? $value : '自动任务已完成', 20);
    }

    private function characterString(string $value): string
    {
        $value = preg_replace('/[^A-Za-z0-9_-]/', '', $value) ?: '';
        return $this->limit($value !== '' ? $value : ('A' . date('YmdHis')), 32);
    }

    private function timeValue(string $value): string
    {
        $timestamp = strtotime($value);
        return date('Y-m-d H:i:s', $timestamp === false ? time() : $timestamp);
    }

    private function limit(string $value, int $max): string
    {
        if (function_exists('mb_substr')) {
            return mb_substr($value, 0, $max, 'UTF-8');
        }

        return substr($value, 0, $max);
    }
}
