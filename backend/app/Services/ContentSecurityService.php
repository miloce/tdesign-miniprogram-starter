<?php

declare(strict_types=1);

namespace Yzd\Services;

final class ContentSecurityService
{
    private const TOKEN_STORAGE = 'wechat_access_token.json';
    private const AUDIT_STORAGE = 'content_security_records.json';

    private const TEXT_CHUNK_LENGTH = 1800;
    private const MEDIA_RESUBMIT_SECONDS = 86400;

    private const TEXT_SKIP_KEYS = [
        'id',
        'templateId',
        'templateKey',
        'opacity',
        'fontSize',
        'fontSpeed',
        'txtType',
        'sort',
        'payType',
        'autoplay',
        'autobtn',
        'color',
        'fontColor',
        'pcWidth',
        'viewport',
    ];

    private const IMAGE_KEYS = [
        'avatar',
        'avatarUrl',
        'cover',
        'coverImg',
        'background',
        'backgroundImg',
        'confirmImg',
        'image',
        'img',
        'photo',
        'picture',
    ];

    private const AUDIO_KEYS = [
        'audio',
        'music',
        'bgm',
        'sound',
    ];

    private const RISK_ERRCODES = [87014];

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function __construct(private readonly Storage $storage)
    {
    }

    public function enabled(): bool
    {
        $flag = getenv('YZD_CONTENT_SECURITY_ENABLED');
        if ($flag !== false && trim((string)$flag) !== '') {
            return $this->truthy((string)$flag) && $this->hasWechatCredentials();
        }

        return $this->hasWechatCredentials();
    }

    public function assertProfileSafe(array $profile, string $openid): void
    {
        $nickname = trim((string)($profile['nickname'] ?? ''));
        if ($nickname !== '') {
            $this->assertTextBatch([['path' => 'nickname', 'text' => $nickname]], $openid, 'profile', 1);
        }
    }

    public function assertFormSafe(array $form, string $openid, string $source = 'form'): void
    {
        $segments = $this->extractTextSegments($form);
        if ($segments !== []) {
            $this->assertTextBatch($segments, $openid, $source, 2);
        }

        foreach ($this->extractMediaTargets($form) as $target) {
            $this->submitMediaAsync($target['url'], $target['type'], $openid, $source . '.' . $target['path'], false);
        }
    }

    public function assertFormLocallySafe(array $form, string $source = 'form'): void
    {
        $content = $this->combinedText($this->extractTextSegments($form));
        if ($content === '') {
            return;
        }

        $localRisk = $this->scanLocalPolicy($content);
        if ($localRisk !== []) {
            throw new ContentSecurityException('内容包含敏感词，请修改后再提交', 422, [
                'source' => $source,
                'matches' => array_map(fn (array $item): string => (string)($item['wordHash'] ?? ''), $localRisk),
            ]);
        }
    }

    public function assertUploadedImageSafe(string $path, string $openid, string $source = 'image'): void
    {
        if (!is_file($path) || !is_readable($path)) {
            throw new ContentSecurityException('图片读取失败，请重新上传', 422, ['source' => $source]);
        }

        if (!$this->enabled()) {
            $this->recordAudit([
                'kind' => 'image',
                'source' => $source,
                'openid' => $openid,
                'targetHash' => hash_file('sha256', $path) ?: '',
                'status' => 'pass',
                'reviewStatus' => 'unreviewed',
                'response' => ['errmsg' => 'wechat security disabled'],
            ]);
            return;
        }

        $response = $this->withAccessToken(function (string $token) use ($path): array {
            return $this->postMultipart(
                'https://api.weixin.qq.com/wxa/img_sec_check?access_token=' . rawurlencode($token),
                'media',
                $path
            );
        });

        $this->recordAudit([
            'kind' => 'image',
            'source' => $source,
            'openid' => $openid,
            'targetHash' => hash_file('sha256', $path) ?: '',
            'status' => $this->suggestionStatus($response),
            'reviewStatus' => $this->reviewStatusForStatus($this->suggestionStatus($response)),
            'response' => $this->compactResponse($response),
        ]);
        $this->assertWechatResponsePass($response, '图片内容安全检测未通过，请更换图片', $source);
    }

    public function submitMediaAsync(string $mediaUrl, string $mediaType, string $openid, string $source = 'media', bool $required = true): ?array
    {
        $mediaUrl = $this->absolutePublicUrl($mediaUrl);
        $mediaType = $this->normalizeMediaType($mediaType);
        if ($mediaUrl === '' || $mediaType === '') {
            return null;
        }

        if (!$this->enabled()) {
            return null;
        }

        $cached = $this->latestMediaAudit($mediaUrl, $mediaType);
        if ($cached !== null) {
            $status = (string)($cached['status'] ?? '');
            if (in_array($status, ['risky', 'review'], true)) {
                throw new ContentSecurityException('素材内容安全检测未通过，请更换后再提交', 422, [
                    'source' => $source,
                    'traceId' => (string)($cached['traceId'] ?? ''),
                ]);
            }
            if (in_array($status, ['pending', 'pass'], true) && time() - (int)($cached['createdAtTs'] ?? 0) < self::MEDIA_RESUBMIT_SECONDS) {
                return $cached;
            }
        }

        $payload = [
            'openid' => $openid,
            'scene' => 2,
            'version' => 2,
            'media_url' => $mediaUrl,
            'media_type' => $mediaType === 'audio' ? 1 : 2,
        ];

        try {
            $response = $this->withAccessToken(function (string $token) use ($payload): array {
                return $this->postJson(
                    'https://api.weixin.qq.com/wxa/media_check_async?access_token=' . rawurlencode($token),
                    $payload
                );
            });
        } catch (ContentSecurityException $exception) {
            $record = $this->recordAudit([
                'kind' => 'media_async',
                'source' => $source,
                'openid' => $openid,
                'mediaType' => $mediaType,
                'target' => $mediaUrl,
                'targetHash' => hash('sha256', $mediaUrl),
                'status' => 'failed',
                'reviewStatus' => 'pending',
                'request' => $payload,
                'response' => ['errmsg' => $exception->getMessage()],
            ]);
            if ($required && !$this->failOpen()) {
                throw $exception;
            }
            return $record;
        }

        $ok = (int)($response['errcode'] ?? -1) === 0;
        $record = $this->recordAudit([
            'kind' => 'media_async',
            'source' => $source,
            'openid' => $openid,
            'mediaType' => $mediaType,
            'target' => $mediaUrl,
            'targetHash' => hash('sha256', $mediaUrl),
            'traceId' => (string)($response['trace_id'] ?? ''),
            'status' => $ok ? 'pending' : 'failed',
            'reviewStatus' => $this->reviewStatusForStatus($ok ? 'pending' : 'failed'),
            'request' => $payload,
            'response' => $this->compactResponse($response),
        ]);

        if (!$ok && $required && !$this->failOpen()) {
            throw new ContentSecurityException('素材内容安全检测提交失败，请稍后再试', 503, [
                'source' => $source,
                'errcode' => $response['errcode'] ?? null,
                'errmsg' => $response['errmsg'] ?? '',
            ]);
        }

        return $record;
    }

    public function handleMediaCallback(array $payload): void
    {
        $traceId = trim((string)($payload['trace_id'] ?? $payload['TraceId'] ?? ''));
        if ($traceId === '') {
            return;
        }

        $this->storage->update(self::AUDIT_STORAGE, [], function (array $data) use ($traceId, $payload): array {
            $items = [];
            $updated = false;
            foreach ($this->auditItems($data) as $item) {
                if ((string)($item['traceId'] ?? '') === $traceId) {
                    $item['status'] = $this->suggestionStatus($payload);
                    if (!in_array((string)($item['reviewStatus'] ?? ''), ['approved', 'rejected'], true)) {
                        $item['reviewStatus'] = $this->reviewStatusForStatus((string)$item['status']);
                    }
                    $item['callback'] = $payload;
                    $item['updatedAt'] = date(DATE_ATOM);
                    $updated = true;
                }
                $items[] = $item;
            }

            if (!$updated) {
                $items[] = [
                    'id' => $this->auditId(),
                    'kind' => 'media_async_callback',
                    'traceId' => $traceId,
                    'status' => $this->suggestionStatus($payload),
                    'reviewStatus' => $this->reviewStatusForStatus($this->suggestionStatus($payload)),
                    'callback' => $payload,
                    'createdAt' => date(DATE_ATOM),
                    'updatedAt' => date(DATE_ATOM),
                    'createdAtTs' => time(),
                ];
            }

            return ['updatedAt' => date(DATE_ATOM), 'items' => array_slice($items, -5000)];
        });
    }

    public function auditList(string $status = '', string $reviewStatus = ''): array
    {
        $items = array_reverse($this->auditData()['items']);
        return array_values(array_filter(array_map(function (array $item): array {
            return array_replace($item, [
                'statusText' => $this->statusText((string)($item['status'] ?? '')),
                'reviewStatusText' => $this->reviewStatusText((string)($item['reviewStatus'] ?? 'unreviewed')),
                'labelText' => $this->labelText((int)($item['response']['result']['label'] ?? $item['callback']['result']['label'] ?? 0)),
            ]);
        }, $items), function (array $item) use ($status, $reviewStatus): bool {
            if ($status !== '' && (string)($item['status'] ?? '') !== $status) {
                return false;
            }
            if ($reviewStatus !== '' && (string)($item['reviewStatus'] ?? 'unreviewed') !== $reviewStatus) {
                return false;
            }
            return true;
        }));
    }

    public function auditSummary(): array
    {
        $summary = [
            'total' => 0,
            'pending' => 0,
            'risky' => 0,
            'review' => 0,
            'failed' => 0,
            'pass' => 0,
        ];
        foreach ($this->auditData()['items'] as $item) {
            $summary['total']++;
            $status = (string)($item['status'] ?? '');
            if (isset($summary[$status])) {
                $summary[$status]++;
            }
            if ((string)($item['reviewStatus'] ?? 'unreviewed') === 'pending') {
                $summary['pending']++;
            }
        }
        return $summary;
    }

    public function updateAudit(string $id, string $reviewStatus, string $note, string $reviewer): ?array
    {
        $reviewStatus = match ($reviewStatus) {
            'approved', 'rejected', 'pending', 'unreviewed' => $reviewStatus,
            default => '',
        };
        if ($id === '' || $reviewStatus === '') {
            return null;
        }

        $updated = null;
        $this->storage->update(self::AUDIT_STORAGE, [], function (array $data) use ($id, $reviewStatus, $note, $reviewer, &$updated): array {
            $items = $this->auditItems($data);
            foreach ($items as $index => $item) {
                if ((string)($item['id'] ?? '') !== $id) {
                    continue;
                }
                $item['reviewStatus'] = $reviewStatus;
                $item['reviewNote'] = $note;
                $item['reviewer'] = $reviewer;
                $item['reviewedAt'] = date(DATE_ATOM);
                $item['updatedAt'] = date(DATE_ATOM);
                $items[$index] = $item;
                $updated = $item;
                break;
            }
            return ['updatedAt' => date(DATE_ATOM), 'items' => $items];
        });
        return $updated;
    }

    public function clearAuditRecords(string $scope): ?array
    {
        $scope = match ($scope) {
            'pass', 'resolved', 'all' => $scope,
            default => '',
        };
        if ($scope === '') {
            return null;
        }

        $before = 0;
        $left = 0;
        $this->storage->update(self::AUDIT_STORAGE, [], function (array $data) use ($scope, &$before, &$left): array {
            $current = $this->auditItems($data);
            $before = count($current);
            $items = array_values(array_filter($current, function (array $item) use ($scope): bool {
                if ($scope === 'all') {
                    return false;
                }
                if ($scope === 'pass') {
                    return (string)($item['status'] ?? '') !== 'pass';
                }

                return !in_array((string)($item['reviewStatus'] ?? 'unreviewed'), ['approved', 'rejected'], true);
            }));
            $left = count($items);
            return ['updatedAt' => date(DATE_ATOM), 'items' => $items];
        });

        return [
            'scope' => $scope,
            'removed' => $before - $left,
            'left' => $left,
        ];
    }

    private function assertTextSafe(string $content, string $openid, string $source, int $scene): void
    {
        $this->assertTextBatch([['path' => $source, 'text' => $content]], $openid, $source, $scene);
    }

    private function assertTextBatch(array $segments, string $openid, string $source, int $scene): void
    {
        $content = $this->combinedText($segments);
        if ($content === '') {
            return;
        }
        $paths = array_values(array_filter(array_map(fn (array $segment): string => (string)($segment['path'] ?? ''), $segments)));

        $localRisk = $this->scanLocalPolicy($content);
        if ($localRisk !== []) {
            $this->recordAudit([
                'kind' => 'text_batch',
                'source' => $source,
                'openid' => $openid,
                'targetHash' => hash('sha256', $content),
                'fields' => $paths,
                'contentPreview' => $this->previewText($content),
                'status' => 'risky',
                'reviewStatus' => 'pending',
                'response' => ['errmsg' => 'local policy matched', 'detail' => $localRisk],
            ]);
            throw new ContentSecurityException('内容包含敏感词，请修改后再提交', 422, [
                'source' => $source,
                'matches' => array_map(fn (array $item): string => (string)($item['wordHash'] ?? ''), $localRisk),
            ]);
        }
        if (!$this->enabled()) {
            $this->recordAudit([
                'kind' => 'text_batch',
                'source' => $source,
                'openid' => $openid,
                'targetHash' => hash('sha256', $content),
                'fields' => $paths,
                'contentPreview' => $this->previewText($content),
                'status' => 'pass',
                'reviewStatus' => 'unreviewed',
                'response' => ['errmsg' => 'wechat security disabled'],
            ]);
            return;
        }

        $responses = [];
        $finalStatus = 'pass';
        $finalResponse = ['errcode' => 0, 'errmsg' => 'ok', 'result' => ['suggest' => 'pass', 'label' => 100]];
        try {
            foreach ($this->splitText($content) as $chunk) {
                $payload = [
                    'openid' => $openid,
                    'scene' => $scene,
                    'version' => 2,
                    'content' => $chunk,
                ];
                $response = $this->withAccessToken(function (string $token) use ($payload): array {
                    return $this->postJson(
                        'https://api.weixin.qq.com/wxa/msg_sec_check?access_token=' . rawurlencode($token),
                        $payload
                    );
                });
                $status = $this->suggestionStatus($response);
                $responses[] = array_replace($this->compactResponse($response), ['chunkHash' => hash('sha256', $chunk)]);
                if ($this->statusRank($status) > $this->statusRank($finalStatus)) {
                    $finalStatus = $status;
                    $finalResponse = $response;
                }
                if ($status !== 'pass') {
                    break;
                }
            }
        } catch (ContentSecurityException $exception) {
            $this->recordAudit([
                'kind' => 'text_batch',
                'source' => $source,
                'openid' => $openid,
                'targetHash' => hash('sha256', $content),
                'fields' => $paths,
                'contentPreview' => $this->previewText($content),
                'status' => 'failed',
                'reviewStatus' => 'pending',
                'response' => ['errmsg' => $exception->getMessage(), 'items' => $responses],
            ]);
            if ($this->failOpen()) {
                return;
            }
            throw $exception;
        }

        $this->recordAudit([
            'kind' => 'text_batch',
            'source' => $source,
            'openid' => $openid,
            'targetHash' => hash('sha256', $content),
            'fields' => $paths,
            'contentPreview' => $this->previewText($content),
            'status' => $finalStatus,
            'reviewStatus' => $this->reviewStatusForStatus($finalStatus),
            'response' => array_replace($this->compactResponse($finalResponse), ['items' => $responses]),
        ]);

        if ($finalStatus === 'failed' && !$this->failOpen()) {
            throw new ContentSecurityException('内容安全检测暂不可用，请稍后再试', 503, [
                'source' => $source,
                'errcode' => $finalResponse['errcode'] ?? null,
                'errmsg' => (string)($finalResponse['errmsg'] ?? ''),
            ]);
        }
        if (in_array($finalStatus, ['risky', 'review'], true)) {
            $this->assertWechatResponsePass($finalResponse, '内容安全检测未通过，请修改后再提交', $source);
        }
    }

    private function combinedText(array $segments): string
    {
        $lines = [];
        foreach ($segments as $segment) {
            $text = trim((string)($segment['text'] ?? ''));
            if ($text === '') {
                continue;
            }
            $path = trim((string)($segment['path'] ?? 'content'));
            $lines[] = '[' . ($path !== '' ? $path : 'content') . '] ' . $text;
        }
        return trim(implode("\n\n", $lines));
    }

    private function scanLocalPolicy(string $content): array
    {
        $normalized = $this->normalizeForPolicy($content);
        $matches = [];
        foreach ($this->sensitiveWords() as $word) {
            $word = trim($word);
            if ($word === '') {
                continue;
            }
            $needle = $this->normalizeForPolicy($word);
            if ($needle !== '' && str_contains($normalized, $needle)) {
                $matches[] = [
                    'strategy' => 'local_keyword',
                    'suggest' => 'risky',
                    'wordHash' => hash('sha256', $word),
                ];
            }
        }
        return $matches;
    }

    private function normalizeForPolicy(string $value): string
    {
        $value = function_exists('mb_strtolower') ? mb_strtolower($value, 'UTF-8') : strtolower($value);
        return preg_replace('/[\s\p{P}\p{S}_]+/u', '', $value) ?? $value;
    }

    private function sensitiveWords(): array
    {
        $words = [];
        $env = (string)(getenv('YZD_CONTENT_SECURITY_SENSITIVE_WORDS') ?: '');
        if ($env !== '') {
            $words = array_merge($words, preg_split('/[,\r\n|]+/u', $env) ?: []);
        }

        $path = $this->storage->path('sensitive_words.json');
        if (is_file($path)) {
            $data = json_decode((string)file_get_contents($path), true);
            if (is_array($data['words'] ?? null)) {
                $words = array_merge($words, array_map('strval', $data['words']));
            }
        }

        return array_values(array_unique(array_filter(array_map('trim', $words), fn (string $word): bool => $word !== '')));
    }

    private function assertWechatResponsePass(array $response, string $riskMessage, string $source): void
    {
        $errcode = (int)($response['errcode'] ?? -1);
        if (in_array($errcode, self::RISK_ERRCODES, true)) {
            throw new ContentSecurityException($riskMessage, 422, [
                'source' => $source,
                'errcode' => $errcode,
                'errmsg' => (string)($response['errmsg'] ?? ''),
            ]);
        }

        if ($errcode !== 0) {
            if ($this->failOpen()) {
                return;
            }
            throw new ContentSecurityException('内容安全检测暂不可用，请稍后再试', 503, [
                'source' => $source,
                'errcode' => $errcode,
                'errmsg' => (string)($response['errmsg'] ?? ''),
            ]);
        }

        $suggest = (string)($response['result']['suggest'] ?? 'pass');
        if ($suggest !== 'pass') {
            throw new ContentSecurityException($riskMessage, 422, [
                'source' => $source,
                'suggest' => $suggest,
                'label' => $response['result']['label'] ?? null,
                'traceId' => (string)($response['trace_id'] ?? ''),
            ]);
        }
    }

    private function withAccessToken(callable $callback): array
    {
        $response = $callback($this->accessToken());
        $errcode = (int)($response['errcode'] ?? 0);
        if (in_array($errcode, [40001, 42001], true)) {
            $this->clearAccessToken();
            $response = $callback($this->accessToken());
        }
        return $response;
    }

    private function accessToken(): string
    {
        $cached = $this->storage->read(self::TOKEN_STORAGE, []);
        $token = (string)($cached['accessToken'] ?? '');
        $expiresAt = (int)($cached['expiresAt'] ?? 0);
        if ($token !== '' && $expiresAt > time() + 300) {
            return $token;
        }

        $appId = (string)(getenv('YZD_WECHAT_APPID') ?: '');
        $secret = (string)(getenv('YZD_WECHAT_SECRET') ?: '');
        if ($appId === '' || $secret === '') {
            throw new ContentSecurityException('内容安全检测未配置小程序凭据', 503);
        }

        $url = 'https://api.weixin.qq.com/cgi-bin/token?' . http_build_query([
            'grant_type' => 'client_credential',
            'appid' => $appId,
            'secret' => $secret,
        ]);
        $response = $this->getJson($url);
        $accessToken = (string)($response['access_token'] ?? '');
        if ($accessToken === '') {
            throw new ContentSecurityException('内容安全检测获取凭据失败', 503, $this->compactResponse($response));
        }

        $ttl = max(60, (int)($response['expires_in'] ?? 7200) - 300);
        $this->storage->write(self::TOKEN_STORAGE, [
            'accessToken' => $accessToken,
            'expiresAt' => time() + $ttl,
            'updatedAt' => date(DATE_ATOM),
        ]);

        return $accessToken;
    }

    private function clearAccessToken(): void
    {
        $this->storage->write(self::TOKEN_STORAGE, []);
    }

    private function getJson(string $url): array
    {
        $raw = @file_get_contents($url, false, stream_context_create([
            'http' => [
                'method' => 'GET',
                'timeout' => 10,
                'ignore_errors' => true,
            ],
        ]));

        if ($raw === false) {
            throw new ContentSecurityException('内容安全检测网络请求失败', 503);
        }

        $data = json_decode($raw, true);
        return is_array($data) ? $data : ['errcode' => -1, 'errmsg' => 'invalid json response'];
    }

    private function postJson(string $url, array $payload): array
    {
        $body = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($body === false) {
            throw new ContentSecurityException('内容安全检测请求编码失败', 503);
        }

        $raw = @file_get_contents($url, false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\nContent-Length: " . strlen($body),
                'content' => $body,
                'timeout' => 15,
                'ignore_errors' => true,
            ],
        ]));

        if ($raw === false) {
            throw new ContentSecurityException('内容安全检测网络请求失败', 503);
        }

        $data = json_decode($raw, true);
        return is_array($data) ? $data : ['errcode' => -1, 'errmsg' => 'invalid json response'];
    }

    private function postMultipart(string $url, string $fieldName, string $path): array
    {
        $content = file_get_contents($path);
        if ($content === false) {
            throw new ContentSecurityException('图片读取失败，请重新上传', 422);
        }

        $boundary = '----yzd' . bin2hex(random_bytes(8));
        $filename = basename($path);
        $mime = $this->mimeType($path);
        $body = "--{$boundary}\r\n"
            . 'Content-Disposition: form-data; name="' . $fieldName . '"; filename="' . addslashes($filename) . '"' . "\r\n"
            . 'Content-Type: ' . $mime . "\r\n\r\n"
            . $content . "\r\n"
            . "--{$boundary}--\r\n";

        $raw = @file_get_contents($url, false, stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: multipart/form-data; boundary={$boundary}\r\nContent-Length: " . strlen($body),
                'content' => $body,
                'timeout' => 20,
                'ignore_errors' => true,
            ],
        ]));

        if ($raw === false) {
            throw new ContentSecurityException('图片内容安全检测网络请求失败', 503);
        }

        $data = json_decode($raw, true);
        return is_array($data) ? $data : ['errcode' => -1, 'errmsg' => 'invalid json response'];
    }

    private function extractTextSegments(array $values, string $path = ''): array
    {
        $segments = [];
        foreach ($values as $key => $value) {
            $currentPath = $path === '' ? (string)$key : $path . '.' . (string)$key;
            if (is_array($value)) {
                $segments = array_merge($segments, $this->extractTextSegments($value, $currentPath));
                continue;
            }
            if (!is_scalar($value)) {
                continue;
            }

            $text = trim((string)$value);
            if ($text === '' || $this->shouldSkipTextKey((string)$key) || $this->looksLikeNonTextValue($text)) {
                continue;
            }

            $segments[] = ['path' => $currentPath, 'text' => $text];
        }

        return $segments;
    }

    private function shouldSkipTextKey(string $key): bool
    {
        return in_array($key, self::TEXT_SKIP_KEYS, true)
            || in_array($key, self::IMAGE_KEYS, true)
            || in_array($key, self::AUDIO_KEYS, true)
            || str_ends_with(strtolower($key), 'url');
    }

    private function looksLikeNonTextValue(string $value): bool
    {
        return preg_match('/^https?:\/\//i', $value) === 1
            || preg_match('/^\/(?:uploads|static|template|assets)\//i', $value) === 1
            || preg_match('/^#[0-9a-f]{3,8}$/i', $value) === 1
            || preg_match('/^[\d\s.:%-]+$/', $value) === 1;
    }

    private function extractMediaTargets(array $values, string $path = ''): array
    {
        $targets = [];
        foreach ($values as $key => $value) {
            $currentPath = $path === '' ? (string)$key : $path . '.' . (string)$key;
            if (is_array($value)) {
                $targets = array_merge($targets, $this->extractMediaTargets($value, $currentPath));
                continue;
            }
            if (!is_scalar($value)) {
                continue;
            }

            $type = $this->mediaTypeForKey((string)$key, (string)$value);
            $url = $this->absolutePublicUrl((string)$value);
            if ($type !== '' && $url !== '') {
                $targets[] = ['path' => $currentPath, 'type' => $type, 'url' => $url];
            }
        }

        return $targets;
    }

    private function mediaTypeForKey(string $key, string $value): string
    {
        if (in_array($key, self::IMAGE_KEYS, true)) {
            return 'image';
        }
        if (in_array($key, self::AUDIO_KEYS, true)) {
            return 'audio';
        }

        $extension = strtolower(pathinfo(parse_url($value, PHP_URL_PATH) ?: '', PATHINFO_EXTENSION));
        if (in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'], true)) {
            return 'image';
        }
        if (in_array($extension, ['mp3', 'm4a', 'wav', 'aac', 'ogg'], true)) {
            return 'audio';
        }

        return '';
    }

    private function normalizeMediaType(string $mediaType): string
    {
        return match ($mediaType) {
            '1', 'audio', 'music' => 'audio',
            '2', 'image', 'background' => 'image',
            default => '',
        };
    }

    private function absolutePublicUrl(string $url): string
    {
        $url = trim($url);
        if ($url === '') {
            return '';
        }
        if (str_starts_with($url, '//')) {
            return 'https:' . $url;
        }
        if (preg_match('/^https?:\/\//i', $url) === 1) {
            return $url;
        }
        if (!str_starts_with($url, '/')) {
            return '';
        }

        $baseUrl = rtrim((string)(getenv('YZD_PUBLIC_BASE_URL') ?: ''), '/');
        if ($baseUrl === '' && function_exists('request')) {
            try {
                $baseUrl = rtrim(request()->domain(), '/');
            } catch (\Throwable) {
                $baseUrl = '';
            }
        }

        return $baseUrl === '' ? '' : $baseUrl . '/' . ltrim($url, '/');
    }

    private function splitText(string $content): array
    {
        if (function_exists('mb_strlen') && function_exists('mb_substr')) {
            $length = mb_strlen($content, 'UTF-8');
            $chunks = [];
            for ($offset = 0; $offset < $length; $offset += self::TEXT_CHUNK_LENGTH) {
                $chunk = trim(mb_substr($content, $offset, self::TEXT_CHUNK_LENGTH, 'UTF-8'));
                if ($chunk !== '') {
                    $chunks[] = $chunk;
                }
            }
            return $chunks;
        }

        return array_values(array_filter(str_split($content, self::TEXT_CHUNK_LENGTH), fn (string $chunk): bool => trim($chunk) !== ''));
    }

    private function suggestionStatus(array $response): string
    {
        $errcode = (int)($response['errcode'] ?? 0);
        if (in_array($errcode, self::RISK_ERRCODES, true)) {
            return 'risky';
        }
        if ($errcode !== 0) {
            return 'failed';
        }
        return (string)($response['result']['suggest'] ?? 'pass');
    }

    private function recordAudit(array $record): array
    {
        $record = array_replace([
            'id' => $this->auditId(),
            'createdAt' => date(DATE_ATOM),
            'updatedAt' => date(DATE_ATOM),
            'createdAtTs' => time(),
            'reviewStatus' => $this->reviewStatusForStatus((string)($record['status'] ?? '')),
        ], $record);
        $this->storage->update(self::AUDIT_STORAGE, [], function (array $data) use ($record): array {
            $items = $this->auditItems($data);
            $items[] = $record;
            return ['updatedAt' => date(DATE_ATOM), 'items' => array_slice($items, -5000)];
        });
        return $record;
    }

    private function auditData(): array
    {
        $data = $this->storage->read(self::AUDIT_STORAGE, [
            'updatedAt' => date(DATE_ATOM),
            'items' => [],
        ]);
        return [
            'updatedAt' => (string)($data['updatedAt'] ?? date(DATE_ATOM)),
            'items' => $this->auditItems($data),
        ];
    }

    private function auditItems(array $data): array
    {
        return is_array($data['items'] ?? null) ? array_values(array_filter($data['items'], 'is_array')) : [];
    }

    private function latestMediaAudit(string $url, string $mediaType): ?array
    {
        $hash = hash('sha256', $url);
        $items = array_reverse($this->auditData()['items']);
        foreach ($items as $item) {
            if ((string)($item['kind'] ?? '') !== 'media_async') {
                continue;
            }
            if ((string)($item['mediaType'] ?? '') === $mediaType && (string)($item['targetHash'] ?? '') === $hash) {
                return $item;
            }
        }
        return null;
    }

    private function compactResponse(array $response): array
    {
        return array_intersect_key($response, array_flip(['errcode', 'errmsg', 'result', 'detail', 'trace_id']));
    }

    private function reviewStatusForStatus(string $status): string
    {
        return in_array($status, ['risky', 'review', 'failed'], true) ? 'pending' : 'unreviewed';
    }

    private function statusRank(string $status): int
    {
        return match ($status) {
            'risky' => 4,
            'review' => 3,
            'failed' => 2,
            'pending' => 1,
            default => 0,
        };
    }

    private function statusText(string $status): string
    {
        return match ($status) {
            'pass' => '通过',
            'risky' => '违规',
            'review' => '建议复核',
            'failed' => '检测失败',
            'pending' => '异步检测中',
            default => $status,
        };
    }

    private function reviewStatusText(string $status): string
    {
        return match ($status) {
            'pending' => '待人工审核',
            'approved' => '人工通过',
            'rejected' => '人工驳回',
            'unreviewed' => '未复核',
            default => $status,
        };
    }

    private function labelText(int $label): string
    {
        return match ($label) {
            100 => '正常',
            20001 => '时政',
            20002 => '色情',
            20006 => '违法犯罪',
            21000 => '其他',
            default => $label > 0 ? (string)$label : '',
        };
    }

    private function previewText(string $value): string
    {
        $value = preg_replace('/\s+/u', ' ', trim($value)) ?? trim($value);
        if (function_exists('mb_substr')) {
            return mb_substr($value, 0, 500, 'UTF-8');
        }
        return substr($value, 0, 500);
    }

    private function auditId(): string
    {
        return 'CS' . date('YmdHis') . random_int(1000, 9999);
    }

    private function mimeType(string $path): string
    {
        $mime = function_exists('mime_content_type') ? mime_content_type($path) : false;
        if (is_string($mime) && $mime !== '') {
            return $mime;
        }
        return match (strtolower(pathinfo($path, PATHINFO_EXTENSION))) {
            'png' => 'image/png',
            'gif' => 'image/gif',
            'webp' => 'image/webp',
            default => 'image/jpeg',
        };
    }

    private function hasWechatCredentials(): bool
    {
        return (string)(getenv('YZD_WECHAT_APPID') ?: '') !== ''
            && (string)(getenv('YZD_WECHAT_SECRET') ?: '') !== '';
    }

    private function failOpen(): bool
    {
        return $this->truthy((string)(getenv('YZD_CONTENT_SECURITY_FAIL_OPEN') ?: ''));
    }

    private function truthy(string $value): bool
    {
        return in_array(strtolower(trim($value)), ['1', 'true', 'yes', 'on'], true);
    }
}
