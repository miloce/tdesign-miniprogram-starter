<?php

declare(strict_types=1);

error_reporting(E_ALL & ~E_DEPRECATED);

$root = dirname(__DIR__);

require_once $root . '/vendor/autoload.php';

\Yzd\Services\EnvLoader::load($root);

$uriPath = rawurldecode(parse_url((string)($_SERVER['REQUEST_URI'] ?? ''), PHP_URL_PATH) ?: '');
if ($uriPath === '/favicon.ico') {
    $faviconPath = realpath(__DIR__ . DIRECTORY_SEPARATOR . 'favicon.ico');
    if ($faviconPath && is_file($faviconPath)) {
        serve_public_file($faviconPath, 'favicon.ico');
        exit;
    }
}

foreach (['uploads', 'static', 'template', 'assets'] as $publicDir) {
    if (!str_starts_with($uriPath, '/' . $publicDir . '/')) {
        continue;
    }

    $publicPath = realpath(__DIR__ . DIRECTORY_SEPARATOR . ltrim($uriPath, '/'));
    $publicRoot = realpath(__DIR__ . DIRECTORY_SEPARATOR . $publicDir);
    $isInsideRoot = $publicPath && $publicRoot && (
        $publicPath === $publicRoot
        || str_starts_with($publicPath, $publicRoot . DIRECTORY_SEPARATOR)
    );

    if ($isInsideRoot && is_file($publicPath)) {
        serve_public_file($publicPath, ltrim($uriPath, '/'));
        exit;
    }
}

$app = new think\App($root);
$http = $app->http;
$response = $http->run();
$response->send();
$http->end($response);

function public_content_type(string $path): string
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
        'ogg' => 'audio/ogg',
        'woff' => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf' => 'font/ttf',
        'otf' => 'font/otf',
        'obj' => 'text/plain; charset=utf-8',
        'html', 'htm' => 'text/html; charset=utf-8',
        default => mime_content_type($path) ?: 'application/octet-stream',
    };
}

function serve_public_file(string $path, string $requestPath = ''): void
{
    clearstatcache(true, $path);
    $size = (int)filesize($path);
    $mtime = (int)filemtime($path);
    $etag = '"' . sha1(str_replace('\\', '/', $requestPath) . '|' . $mtime . '|' . $size) . '"';

    header('Content-Type: ' . public_content_type($path));
    header('Cache-Control: ' . public_cache_control($requestPath));
    header('ETag: ' . $etag);
    header('Last-Modified: ' . gmdate('D, d M Y H:i:s', $mtime) . ' GMT');
    header('Accept-Ranges: bytes');

    $ifNoneMatch = trim((string)($_SERVER['HTTP_IF_NONE_MATCH'] ?? ''));
    $ifModifiedSince = trim((string)($_SERVER['HTTP_IF_MODIFIED_SINCE'] ?? ''));
    if ($ifNoneMatch === $etag || ($ifModifiedSince !== '' && strtotime($ifModifiedSince) >= $mtime)) {
        http_response_code(304);
        return;
    }

    if (strtoupper((string)($_SERVER['REQUEST_METHOD'] ?? 'GET')) === 'HEAD') {
        header('Content-Length: ' . $size);
        return;
    }

    $range = trim((string)($_SERVER['HTTP_RANGE'] ?? ''));
    if ($range !== '' && $size > 0 && preg_match('/^bytes=(\d*)-(\d*)$/', $range, $match)) {
        $start = $match[1] === '' ? null : (int)$match[1];
        $end = $match[2] === '' ? null : (int)$match[2];

        if ($start === null) {
            $suffixLength = max(0, (int)($end ?? 0));
            $start = max(0, $size - $suffixLength);
            $end = $size - 1;
        } else {
            $end = $end === null ? $size - 1 : min($end, $size - 1);
        }

        if ($start < 0 || $start >= $size || $end < $start) {
            http_response_code(416);
            header('Content-Range: bytes */' . $size);
            return;
        }

        $length = $end - $start + 1;
        http_response_code(206);
        header('Content-Range: bytes ' . $start . '-' . $end . '/' . $size);
        header('Content-Length: ' . $length);
        stream_public_file($path, $start, $length);
        return;
    }

    header('Content-Length: ' . $size);
    stream_public_file($path, 0, $size);
}

function public_cache_control(string $requestPath): string
{
    $path = str_replace('\\', '/', ltrim($requestPath, '/'));
    if (str_starts_with($path, 'static/vendor/') || str_starts_with($path, 'assets/')) {
        return 'public, max-age=31536000, immutable';
    }

    if (str_starts_with($path, 'static/') || str_starts_with($path, 'template/')) {
        return 'public, max-age=604800';
    }

    if (str_starts_with($path, 'uploads/')) {
        return 'public, max-age=86400';
    }

    return 'public, max-age=3600';
}

function stream_public_file(string $path, int $start, int $length): void
{
    $handle = fopen($path, 'rb');
    if ($handle === false) {
        http_response_code(404);
        return;
    }

    try {
        if ($start > 0) {
            fseek($handle, $start);
        }

        $remaining = $length;
        while ($remaining > 0 && !feof($handle)) {
            $chunk = fread($handle, min(1024 * 1024, $remaining));
            if ($chunk === false || $chunk === '') {
                break;
            }
            echo $chunk;
            $remaining -= strlen($chunk);
            if (function_exists('flush')) {
                flush();
            }
        }
    } finally {
        fclose($handle);
    }
}
