<?php

declare(strict_types=1);

namespace Yzd\Services;

final class AssetUrlService
{
    private const PUBLIC_PREFIXES = ['static', 'uploads', 'template', 'assets'];

    public static function make(): self
    {
        return new self();
    }

    public function url(string $url, ?string $fallbackBaseUrl = null): string
    {
        $url = trim($url);
        if ($url === '' || preg_match('/^[a-z][a-z0-9+.-]*:/i', $url) || str_starts_with($url, '//')) {
            return $url;
        }

        if ($this->isPublicAssetPath($url) && $this->baseUrl() !== '') {
            return $this->baseUrl() . '/' . $this->prefixedPath($url);
        }

        if (str_starts_with($url, '/') && $fallbackBaseUrl !== null && $fallbackBaseUrl !== '') {
            return rtrim($fallbackBaseUrl, '/') . $url;
        }

        return $url;
    }

    public function baseUrl(): string
    {
        $baseUrl = trim((string)(
            getenv('YZD_ASSET_BASE_URL')
            ?: getenv('YZD_COS_PUBLIC_BASE_URL')
            ?: getenv('YZD_COS_DOMAIN')
            ?: ''
        ));

        if ($baseUrl === '') {
            return '';
        }

        if (!preg_match('/^https?:\/\//i', $baseUrl)) {
            $baseUrl = 'https://' . ltrim($baseUrl, '/');
        }

        return rtrim($baseUrl, '/');
    }

    public function rewriteHtml(string $html): string
    {
        if ($this->baseUrl() === '') {
            return $html;
        }

        $html = (string)preg_replace_callback(
            '/(?P<prefix>\b(?:src|href|poster|data-src|data-original)\s*=\s*["\'])(?P<url>\/(?:static|uploads|template|assets)(?:\/[^"\']*)?)(?P<suffix>["\'])/i',
            fn (array $match): string => $match['prefix'] . $this->url($match['url']) . $match['suffix'],
            $html
        );

        $html = (string)preg_replace_callback(
            '/(?P<prefix>url\(\s*["\']?)(?P<url>\/(?:static|uploads|template|assets)(?:\/[^)"\']*)?)(?P<suffix>["\']?\s*\))/i',
            fn (array $match): string => $match['prefix'] . $this->url($match['url']) . $match['suffix'],
            $html
        );

        return (string)preg_replace_callback(
            '/(?P<prefix>["\'])(?P<url>\/(?:static|uploads|template|assets)(?:\/[^"\']*)?)(?P<suffix>["\'])/i',
            function (array $match): string {
                if ($match['url'] === '/template/') {
                    return $match[0];
                }

                return $match['prefix'] . $this->url($match['url']) . $match['suffix'];
            },
            $html
        );
    }

    public function assetValues(array $values): array
    {
        foreach (['background', 'backgroundImg', 'coverImg', 'confirmImg', 'music', 'video', 'printIcon'] as $key) {
            if (isset($values[$key]) && is_string($values[$key])) {
                $values[$key] = $this->url($values[$key]);
            }
        }

        if (isset($values['msgHtml']) && is_string($values['msgHtml'])) {
            $values['msgHtml'] = $this->rewriteHtml($values['msgHtml']);
        }

        return $values;
    }

    private function isPublicAssetPath(string $url): bool
    {
        $path = ltrim($url, '/');
        foreach (self::PUBLIC_PREFIXES as $prefix) {
            if ($path === $prefix || str_starts_with($path, $prefix . '/')) {
                return true;
            }
        }

        return false;
    }

    private function prefixedPath(string $url): string
    {
        $path = ltrim($url, '/');
        $prefix = trim(str_replace('\\', '/', (string)(getenv('YZD_COS_PREFIX') ?: 'yzd')), '/');
        if ($prefix === '' || $path === $prefix || str_starts_with($path, $prefix . '/')) {
            return $path;
        }

        return $prefix . '/' . $path;
    }
}
