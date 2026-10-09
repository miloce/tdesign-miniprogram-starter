<?php

declare(strict_types=1);

namespace Yzd\Services;

use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

final class ObjectStorageService
{
    private const DRIVERS = ['cos', 'lightcos', 'light-cos', 'light_cos'];

    private ?\Qcloud\Cos\Client $client = null;

    public static function make(): self
    {
        return new self();
    }

    public function enabled(): bool
    {
        return in_array($this->driver(), self::DRIVERS, true)
            && $this->bucket() !== ''
            && $this->secretId() !== ''
            && $this->secretKey() !== '';
    }

    public function driver(): string
    {
        return strtolower(trim((string)(getenv('YZD_STORAGE_DRIVER') ?: 'local')));
    }

    public function bucket(): string
    {
        return trim((string)(getenv('YZD_COS_BUCKET') ?: 'miloce-1304499644'));
    }

    public function publicUrl(string $key): string
    {
        $baseUrl = AssetUrlService::make()->baseUrl();
        if ($baseUrl === '') {
            $domain = $this->domain();
            $baseUrl = $domain !== '' ? 'https://' . $domain : '';
        }

        return rtrim($baseUrl, '/') . '/' . $this->encodeKey($this->storageKey($key));
    }

    public function prefix(): string
    {
        return trim(str_replace('\\', '/', (string)(getenv('YZD_COS_PREFIX') ?: 'yzd')), '/');
    }

    public function listFiles(string $prefix = '', int $limit = 100, string $marker = ''): array
    {
        $limit = max(1, min(1000, $limit));
        return $this->enabled()
            ? $this->listRemoteFiles($prefix, $limit, $marker)
            : $this->listLocalFiles($prefix, $limit, $marker);
    }

    public function putFile(string $localPath, string $key, string $contentType = ''): string
    {
        if (!is_file($localPath) || !is_readable($localPath)) {
            throw new \RuntimeException('上传源文件不可读');
        }

        $key = $this->normalizeKey($key);
        $storageKey = $this->storageKey($key);
        $body = fopen($localPath, 'rb');
        if ($body === false) {
            throw new \RuntimeException('上传源文件打开失败');
        }

        $options = [];
        $contentType = $contentType !== '' ? $contentType : $this->contentType($localPath);
        if ($contentType !== '') {
            $options['ContentType'] = $contentType;
        }
        if (($acl = trim((string)(getenv('YZD_COS_ACL') ?: ''))) !== '') {
            $options['ACL'] = $acl;
        }
        if (($storageClass = trim((string)(getenv('YZD_COS_STORAGE_CLASS') ?: ''))) !== '') {
            $options['StorageClass'] = $storageClass;
        }

        try {
            $this->client()->upload($this->bucket(), $storageKey, $body, $options);
        } finally {
            if (is_resource($body)) {
                fclose($body);
            }
        }

        return $this->publicUrl($storageKey);
    }

    public function delete(string $key): void
    {
        try {
            $this->client()->deleteObject([
                'Bucket' => $this->bucket(),
                'Key' => $this->storageKey($key),
            ]);
        } catch (\Throwable) {
        }
    }

    public function uploadDirectory(string $localRoot, string $prefix, bool $dryRun = false): array
    {
        $localRoot = rtrim($localRoot, DIRECTORY_SEPARATOR);
        $prefix = trim(str_replace('\\', '/', $prefix), '/');
        $summary = ['scanned' => 0, 'uploaded' => 0, 'skipped' => 0, 'failed' => 0, 'errors' => []];

        if (!is_dir($localRoot)) {
            return $summary;
        }

        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($localRoot, RecursiveDirectoryIterator::SKIP_DOTS)
        );

        foreach ($iterator as $file) {
            if (!$file->isFile()) {
                continue;
            }

            $summary['scanned']++;
            $path = $file->getPathname();
            $relative = ltrim(substr($path, strlen($localRoot)), DIRECTORY_SEPARATOR);
            $key = $this->normalizeKey($prefix . '/' . str_replace(DIRECTORY_SEPARATOR, '/', $relative));

            if ($dryRun) {
                $summary['skipped']++;
                continue;
            }

            try {
                $this->putFile($path, $key, $this->contentType($path));
                $summary['uploaded']++;
            } catch (\Throwable $exception) {
                $summary['failed']++;
                $summary['errors'][] = $key . ': ' . $exception->getMessage();
            }
        }

        return $summary;
    }

    public function uploadDirectoryBatch(string $localRoot, string $prefix, int $offset = 0, int $limit = 20, bool $dryRun = false): array
    {
        $localRoot = rtrim($localRoot, DIRECTORY_SEPARATOR);
        $prefix = trim(str_replace('\\', '/', $prefix), '/');
        $offset = max(0, $offset);
        $limit = max(1, min(100, $limit));
        $files = $this->directoryFiles($localRoot);
        $total = count($files);
        $batch = array_slice($files, $offset, $limit);
        $summary = [
            'total' => $total,
            'offset' => $offset,
            'limit' => $limit,
            'nextOffset' => min($total, $offset + count($batch)),
            'hasMore' => $offset + count($batch) < $total,
            'scanned' => count($batch),
            'uploaded' => 0,
            'skipped' => 0,
            'failed' => 0,
            'errors' => [],
        ];

        foreach ($batch as $path) {
            $relative = ltrim(substr($path, strlen($localRoot)), DIRECTORY_SEPARATOR);
            $key = $this->normalizeKey($prefix . '/' . str_replace(DIRECTORY_SEPARATOR, '/', $relative));

            if ($dryRun) {
                $summary['skipped']++;
                continue;
            }

            try {
                $this->putFile($path, $key, $this->contentType($path));
                $summary['uploaded']++;
            } catch (\Throwable $exception) {
                $summary['failed']++;
                $summary['errors'][] = $key . ': ' . $exception->getMessage();
            }
        }

        return $summary;
    }

    public function objectKey(string $key): string
    {
        return $this->storageKey($key);
    }

    public function contentType(string $path): string
    {
        return match (strtolower(pathinfo($path, PATHINFO_EXTENSION))) {
            'css' => 'text/css; charset=utf-8',
            'js', 'mjs' => 'application/javascript; charset=utf-8',
            'json', 'map' => 'application/json; charset=utf-8',
            'png' => 'image/png',
            'jpg', 'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'webp' => 'image/webp',
            'svg' => 'image/svg+xml',
            'ico' => 'image/x-icon',
            'mp3' => 'audio/mpeg',
            'm4a' => 'audio/mp4',
            'mp4' => 'video/mp4',
            'wav' => 'audio/wav',
            'aac' => 'audio/aac',
            'ogg' => 'audio/ogg',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            'otf' => 'font/otf',
            'html', 'htm' => 'text/html; charset=utf-8',
            'txt' => 'text/plain; charset=utf-8',
            default => function_exists('mime_content_type') ? (mime_content_type($path) ?: 'application/octet-stream') : 'application/octet-stream',
        };
    }

    private function client(): \Qcloud\Cos\Client
    {
        if (!$this->enabled()) {
            throw new \RuntimeException('LightCOS 未配置完整，需设置 YZD_STORAGE_DRIVER=lightcos、YZD_COS_SECRET_ID、YZD_COS_SECRET_KEY');
        }

        if ($this->client !== null) {
            return $this->client;
        }

        $this->loadSdk();
        $this->configureCaFile();

        $config = [
            'region' => trim((string)(getenv('YZD_COS_REGION') ?: 'ap-beijing')),
            'scheme' => 'https',
            'timeout' => (int)(getenv('YZD_COS_TIMEOUT') ?: 60),
            'connect_timeout' => (int)(getenv('YZD_COS_CONNECT_TIMEOUT') ?: 10),
            'credentials' => [
                'secretId' => $this->secretId(),
                'secretKey' => $this->secretKey(),
            ],
        ];

        if (($domain = $this->domain()) !== '') {
            $config['domain'] = $domain;
        }
        if (($endpoint = trim((string)(getenv('YZD_COS_ENDPOINT') ?: ''))) !== '') {
            $config['endpoint'] = $endpoint;
        }

        $this->client = new \Qcloud\Cos\Client($config);
        $this->configureHttpClientSsl($this->client);
        return $this->client;
    }

    private function loadSdk(): void
    {
        if (class_exists(\Qcloud\Cos\Client::class)) {
            return;
        }

        $phar = trim((string)(getenv('YZD_COS_SDK_PHAR') ?: $this->defaultPharPath()));
        if ($phar === '' || !is_file($phar)) {
            throw new \RuntimeException('COS SDK phar 不存在: ' . $phar);
        }

        $phar = str_replace('\\', '/', $phar);
        $autoload = 'phar://' . $phar . '/vendor/autoload.php';
        if (is_file($autoload)) {
            require_once $autoload;
            return;
        }

        require_once $phar;
    }

    private function configureCaFile(): void
    {
        $caFile = trim((string)(getenv('YZD_COS_CA_FILE') ?: ''));
        if ($caFile === '' || !is_file($caFile)) {
            return;
        }

        ini_set('curl.cainfo', $caFile);
        ini_set('openssl.cafile', $caFile);
        putenv('CURL_CA_BUNDLE=' . $caFile);
        putenv('SSL_CERT_FILE=' . $caFile);
    }

    private function configureHttpClientSsl(\Qcloud\Cos\Client $client): void
    {
        $verify = $this->sslVerifyOption();
        if ($verify === true) {
            return;
        }

        try {
            foreach ($this->httpClientProperties($client) as $property) {
                $property->setAccessible(true);
                $currentClient = $property->getValue($client);
                $config = method_exists($currentClient, 'getConfig') ? $currentClient->getConfig() : [];
                $config['verify'] = $verify;
                $property->setValue($client, new \GuzzleHttp\Client($config));
            }
        } catch (\Throwable) {
        }
    }

    /**
     * The COS SDK keeps one httpClient on its own class and another on the
     * command service parent. Both must be updated for Guzzle SSL options to
     * apply to signed API requests.
     *
     * @return array<int, \ReflectionProperty>
     */
    private function httpClientProperties(object $client): array
    {
        $properties = [];
        $reflection = new \ReflectionObject($client);
        do {
            if ($reflection->hasProperty('httpClient')) {
                $properties[] = $reflection->getProperty('httpClient');
            }
            $reflection = $reflection->getParentClass();
        } while ($reflection !== false);

        return $properties;
    }

    private function sslVerifyOption(): bool|string
    {
        $raw = strtolower(trim((string)(getenv('YZD_COS_SSL_VERIFY') ?: '')));
        if (in_array($raw, ['0', 'false', 'no', 'off'], true)) {
            return false;
        }

        $caFile = trim((string)(getenv('YZD_COS_CA_FILE') ?: ''));
        if ($caFile !== '' && is_file($caFile)) {
            return $caFile;
        }

        return true;
    }

    private function defaultPharPath(): string
    {
        return dirname(rtrim(root_path(), DIRECTORY_SEPARATOR), 2)
            . DIRECTORY_SEPARATOR . 'JxzyzHelper'
            . DIRECTORY_SEPARATOR . 'cos-sdk-v5.phar';
    }

    private function secretId(): string
    {
        return trim((string)(getenv('YZD_COS_SECRET_ID') ?: getenv('TENCENTCLOUD_SECRET_ID') ?: ''));
    }

    private function secretKey(): string
    {
        return trim((string)(getenv('YZD_COS_SECRET_KEY') ?: getenv('TENCENTCLOUD_SECRET_KEY') ?: ''));
    }

    private function domain(): string
    {
        $domain = trim((string)(getenv('YZD_COS_DOMAIN') ?: 'cos.miloce.cn'));
        if ($domain === '') {
            return '';
        }

        $host = parse_url($domain, PHP_URL_HOST);
        return $host !== null ? $host : preg_replace('#^https?://#i', '', rtrim($domain, '/'));
    }

    private function normalizeKey(string $key): string
    {
        $key = trim(str_replace('\\', '/', $key));
        $key = ltrim($key, '/');
        $parts = array_values(array_filter(explode('/', $key), fn (string $part): bool => $part !== '' && $part !== '.'));
        if ($parts === [] || in_array('..', $parts, true)) {
            throw new \InvalidArgumentException('对象存储 Key 非法');
        }

        return implode('/', $parts);
    }

    private function storageKey(string $key): string
    {
        $key = $this->normalizeKey($key);
        $prefix = $this->prefix();
        if ($prefix === '') {
            return $key;
        }
        if ($key === $prefix || str_starts_with($key, $prefix . '/')) {
            return $key;
        }

        return $prefix . '/' . $key;
    }

    private function listRemoteFiles(string $prefix, int $limit, string $marker): array
    {
        $listPrefix = $this->listPrefix($prefix);
        $args = [
            'Bucket' => $this->bucket(),
            'Prefix' => $listPrefix,
            'MaxKeys' => $limit,
        ];
        if ($marker !== '') {
            $args['Marker'] = $marker;
        }

        $result = $this->client()->listObjects($args);
        $contents = $this->resultList($result, 'Contents');
        $files = [];
        foreach ($contents as $item) {
            $key = (string)$this->itemValue($item, 'Key');
            if ($key === '' || str_ends_with($key, '/')) {
                continue;
            }

            $files[] = [
                'key' => $key,
                'name' => basename($key),
                'url' => $this->publicUrl($key),
                'size' => (int)$this->itemValue($item, 'Size'),
                'lastModified' => (string)$this->itemValue($item, 'LastModified'),
                'etag' => trim((string)$this->itemValue($item, 'ETag'), '"'),
                'storageClass' => (string)$this->itemValue($item, 'StorageClass'),
                'type' => $this->typeFromKey($key),
            ];
        }

        $isTruncated = $this->truthy($this->resultValue($result, 'IsTruncated'));
        $nextMarker = (string)($this->resultValue($result, 'NextMarker') ?: ($isTruncated && $files !== [] ? end($files)['key'] : ''));

        return [
            'driver' => $this->driver(),
            'bucket' => $this->bucket(),
            'prefix' => $listPrefix,
            'publicBaseUrl' => AssetUrlService::make()->baseUrl(),
            'list' => $files,
            'hasMore' => $isTruncated,
            'nextMarker' => $nextMarker,
        ];
    }

    private function listLocalFiles(string $prefix, int $limit, string $marker): array
    {
        $root = rtrim(root_path('public'), DIRECTORY_SEPARATOR);
        $prefix = trim(str_replace('\\', '/', $prefix), '/');
        $cosPrefix = $this->prefix();
        if ($cosPrefix !== '' && ($prefix === $cosPrefix || str_starts_with($prefix, $cosPrefix . '/'))) {
            $prefix = trim(substr($prefix, strlen($cosPrefix)), '/');
        }

        $target = $prefix === '' ? $root : $root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $prefix);
        $files = [];
        if (is_dir($target)) {
            $iterator = new RecursiveIteratorIterator(
                new RecursiveDirectoryIterator($target, RecursiveDirectoryIterator::SKIP_DOTS)
            );
            foreach ($iterator as $file) {
                if (!$file->isFile()) {
                    continue;
                }

                $relative = str_replace(DIRECTORY_SEPARATOR, '/', ltrim(substr($file->getPathname(), strlen($root)), DIRECTORY_SEPARATOR));
                $key = $this->storageKey($relative);
                if ($marker !== '' && strcmp($key, $marker) <= 0) {
                    continue;
                }

                $files[] = [
                    'key' => $key,
                    'name' => basename($key),
                    'url' => $this->publicUrl($key),
                    'size' => $file->getSize(),
                    'lastModified' => date(DATE_ATOM, $file->getMTime()),
                    'etag' => '',
                    'storageClass' => 'LOCAL',
                    'type' => $this->typeFromKey($key),
                ];
            }
        }

        usort($files, fn (array $a, array $b): int => strcmp((string)$a['key'], (string)$b['key']));
        $hasMore = count($files) > $limit;
        $files = array_slice($files, 0, $limit);

        return [
            'driver' => 'local',
            'bucket' => $this->bucket(),
            'prefix' => $this->listPrefix($prefix),
            'publicBaseUrl' => AssetUrlService::make()->baseUrl(),
            'list' => $files,
            'hasMore' => $hasMore,
            'nextMarker' => $hasMore && $files !== [] ? end($files)['key'] : '',
        ];
    }

    private function directoryFiles(string $localRoot): array
    {
        if (!is_dir($localRoot)) {
            return [];
        }

        $files = [];
        $iterator = new RecursiveIteratorIterator(
            new RecursiveDirectoryIterator($localRoot, RecursiveDirectoryIterator::SKIP_DOTS)
        );
        foreach ($iterator as $file) {
            if ($file->isFile()) {
                $files[] = $file->getPathname();
            }
        }

        sort($files, SORT_STRING);
        return $files;
    }

    private function listPrefix(string $prefix): string
    {
        $prefix = trim(str_replace('\\', '/', $prefix), '/');
        $storagePrefix = $prefix === '' ? $this->prefix() : $this->storageKey($prefix);
        return $storagePrefix === '' ? '' : rtrim($storagePrefix, '/') . '/';
    }

    private function typeFromKey(string $key): string
    {
        $extension = strtolower(pathinfo($key, PATHINFO_EXTENSION));
        return match ($extension) {
            'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg' => 'image',
            'mp3', 'm4a', 'wav', 'aac', 'ogg' => 'audio',
            'mp4', 'mov', 'webm' => 'video',
            'html', 'htm', 'css', 'js', 'json', 'txt' => 'text',
            default => 'file',
        };
    }

    private function resultList(mixed $result, string $key): array
    {
        $value = $this->resultValue($result, $key);
        if ($value === null || $value === '') {
            return [];
        }
        if (is_array($value)) {
            if (isset($value[$key]) && is_array($value[$key])) {
                return $value[$key];
            }
            return array_is_list($value) ? $value : [$value];
        }

        return [$value];
    }

    private function resultValue(mixed $result, string $key): mixed
    {
        if (is_array($result) && array_key_exists($key, $result)) {
            return $result[$key];
        }
        if ($result instanceof \ArrayAccess && isset($result[$key])) {
            return $result[$key];
        }
        if (is_object($result) && isset($result->{$key})) {
            return $result->{$key};
        }

        return null;
    }

    private function itemValue(mixed $item, string $key): mixed
    {
        if (is_array($item) && array_key_exists($key, $item)) {
            return $item[$key];
        }
        if ($item instanceof \ArrayAccess && isset($item[$key])) {
            return $item[$key];
        }
        if (is_object($item) && isset($item->{$key})) {
            return $item->{$key};
        }

        return '';
    }

    private function truthy(mixed $value): bool
    {
        if (is_bool($value)) {
            return $value;
        }

        return in_array(strtolower((string)$value), ['true', '1', 'yes'], true);
    }

    private function encodeKey(string $key): string
    {
        return implode('/', array_map('rawurlencode', explode('/', $key)));
    }
}
