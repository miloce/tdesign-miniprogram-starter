<?php

declare(strict_types=1);

namespace Yzd\Services;

use RuntimeException;

final class LegacyAssistantGatewayService
{
    private const API_URL = 'https://api.miloce.cn/api/wechat/zeppLifeSteps';
    private const CONNECT_TIMEOUT = 5;
    private const REQUEST_TIMEOUT = 45;
    private const MAX_ATTEMPTS = 3;

    public static function make(): self
    {
        return new self();
    }

    public function submit(string $account, string $password, string $steps): array
    {
        $account = trim($account);
        $password = trim($password);
        $steps = trim($steps);

        if ($account === '' || $password === '') {
            throw new RuntimeException('账号和密码不能为空', 400);
        }

        if ($steps === '' || preg_match('/^\d+$/', $steps) !== 1) {
            throw new RuntimeException('请输入1000-98800之间的数值', 400);
        }

        $response = $this->request([
            'account' => $account,
            'password' => $password,
            'steps' => $steps,
        ]);

        $body = json_decode($response['body'], true);
        if (!is_array($body)) {
            throw new RuntimeException('步数服务返回异常，请稍后重试', 502);
        }

        if (!empty($body['success'])) {
            return [
                'message' => '设置成功',
                'data' => is_array($body['data'] ?? null) ? $body['data'] : [],
            ];
        }

        $message = trim((string)($body['message'] ?? '设置失败，请稍后重试'));
        $status = $response['status'];

        if ($status < 400 || $status > 599) {
            $status = (int)($body['code'] ?? 502);
        }
        if ($status < 400 || $status > 599) {
            $status = 502;
        }

        throw new RuntimeException($message !== '' ? $message : '设置失败，请稍后重试', $status);
    }

    private function request(array $payload): array
    {
        if (!function_exists('curl_init')) {
            throw new RuntimeException('PHP cURL 扩展未启用', 500);
        }

        $body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if (!is_string($body)) {
            throw new RuntimeException('请求参数编码失败', 500);
        }

        for ($attempt = 1; $attempt <= self::MAX_ATTEMPTS; $attempt++) {
            try {
                return $this->sendOnce($body);
            } catch (RuntimeException $exception) {
                // 仅对「连接未建立成功」的瞬时网络抖动做重试；业务超时(504)与业务错误不重试
                $retryable = (int)$exception->getCode() === 503;
                if (!$retryable || $attempt >= self::MAX_ATTEMPTS) {
                    throw $exception;
                }

                usleep(self::retryDelayMicroseconds($attempt));
            }
        }

        throw new RuntimeException('上游服务暂时不可用，请稍后重试', 503);
    }

    /**
     * 单次请求。连接类错误（未建立 TCP/TLS）抛 503 供上层重试，业务类超时抛 504。
     */
    private function sendOnce(string $body): array
    {
        $curl = curl_init(self::API_URL);
        if ($curl === false) {
            throw new RuntimeException('无法初始化网络请求', 500);
        }

        curl_setopt_array($curl, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HEADER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_HTTPHEADER => [
                'Content-Type: application/json',
                'Accept: application/json',
                'Expect:',
            ],
            CURLOPT_CONNECTTIMEOUT => self::CONNECT_TIMEOUT,
            CURLOPT_TIMEOUT => self::REQUEST_TIMEOUT,
            CURLOPT_ENCODING => '',
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_TCP_KEEPALIVE => 1,
            // Vercel 边缘在国内网络下会出现 IPv6 黑洞，强制走 IPv4 提高连接成功率
            CURLOPT_IPRESOLVE => CURL_IPRESOLVE_V4,
        ]);

        $raw = curl_exec($curl);
        $status = (int)curl_getinfo($curl, CURLINFO_HTTP_CODE);
        $headerSize = (int)curl_getinfo($curl, CURLINFO_HEADER_SIZE);
        $errno = curl_errno($curl);
        $error = curl_error($curl);
        curl_close($curl);

        if (!is_string($raw)) {
            // 连接根本没建立起来（国内访问 Vercel 边缘的常见瞬时抖动）→ 抛 503 交给上层重试
            if (in_array($errno, [CURLE_COULDNT_CONNECT, CURLE_COULDNT_RESOLVE_HOST, CURLE_GOT_NOTHING], true)) {
                throw new RuntimeException('上游服务暂时不可用，请稍后重试', 503);
            }

            if ($errno === CURLE_OPERATION_TIMEDOUT || $errno === CURLE_RECV_ERROR) {
                throw new RuntimeException('网络连接超时，请稍后重试', 504);
            }

            throw new RuntimeException($error !== '' ? $error : '网络请求失败', 502);
        }

        return [
            'status' => $status,
            'body' => substr($raw, $headerSize),
        ];
    }

    private static function retryDelayMicroseconds(int $attempt): int
    {
        // 200ms、500ms 递增退避 + 随机抖动，避开上游边缘瞬时抖动
        $base = $attempt === 1 ? 200000 : 500000;
        return $base + random_int(0, 150000);
    }
}
