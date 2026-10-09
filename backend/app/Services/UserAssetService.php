<?php

declare(strict_types=1);

namespace Yzd\Services;

final class UserAssetService
{
    private const STORAGE_NAME = 'user_assets.json';

    public static function make(): self
    {
        return new self();
    }

    public function add(string $openid, string $type, string $url, string $name = ''): array
    {
        $openid = trim($openid);
        $type = $this->normalizeType($type);
        $url = trim($url);
        if ($openid === '' || $url === '') {
            throw new \InvalidArgumentException('用户和资源链接必填');
        }

        $item = [];
        Storage::make()->update(self::STORAGE_NAME, [], function (array $raw) use ($openid, $type, $url, $name, &$item): array {
            $data = $this->rebuild($raw);
            $item = [
                'id' => $this->nextId($data['items']),
                'openid' => $openid,
                'type' => $type,
                'title' => $name !== '' ? $name : ($type === 'background' ? '我的图片' : '我的音乐'),
                'url' => $url,
                'note' => '',
                'createdAt' => date(DATE_ATOM),
            ];
            array_unshift($data['items'], $item);
            return $this->rebuild($data);
        });
        return $item;
    }

    public function items(string $openid, string $type): array
    {
        $openid = trim($openid);
        $type = $this->normalizeType($type);
        if ($openid === '') {
            return [];
        }

        return array_values(array_filter($this->data()['items'], function (array $item) use ($openid, $type): bool {
            return (string)($item['openid'] ?? '') === $openid && (string)($item['type'] ?? '') === $type;
        }));
    }

    private function data(): array
    {
        return $this->rebuild(Storage::make()->read(self::STORAGE_NAME, [
            'updatedAt' => date(DATE_ATOM),
            'items' => [],
        ]));
    }

    private function rebuild(array $data): array
    {
        $items = [];
        foreach (is_array($data['items'] ?? null) ? $data['items'] : [] as $item) {
            if (!is_array($item)) {
                continue;
            }
            $url = trim((string)($item['url'] ?? ''));
            $openid = trim((string)($item['openid'] ?? ''));
            if ($url === '' || $openid === '') {
                continue;
            }
            $items[] = [
                'id' => is_numeric($item['id'] ?? null) ? (int)$item['id'] : trim((string)($item['id'] ?? '')),
                'openid' => $openid,
                'type' => $this->normalizeType((string)($item['type'] ?? 'background')),
                'title' => trim((string)($item['title'] ?? '我的图片')),
                'url' => $url,
                'note' => trim((string)($item['note'] ?? '')),
                'createdAt' => trim((string)($item['createdAt'] ?? '')),
            ];
        }

        return [
            'updatedAt' => date(DATE_ATOM),
            'items' => $items,
        ];
    }

    private function normalizeType(string $type): string
    {
        return match ($type) {
            'image', 'background' => 'background',
            'audio', 'music' => 'music',
            default => 'file',
        };
    }

    private function nextId(array $items): int
    {
        $max = 0;
        foreach ($items as $item) {
            if (is_numeric($item['id'] ?? null)) {
                $max = max($max, (int)$item['id']);
            }
        }
        return $max + 1;
    }
}
