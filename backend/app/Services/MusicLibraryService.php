<?php

declare(strict_types=1);

namespace Yzd\Services;

final class MusicLibraryService
{
    private const STORAGE_NAME = 'music_library.json';

    public static function make(): self
    {
        return new self();
    }

    public function categories(): array
    {
        return $this->data()['categories'];
    }

    public function items(int $categoryId = 0): array
    {
        $data = $this->data();
        $items = $data['items'];
        $order = is_array($data['byCategory'][(string)$categoryId] ?? null) ? $data['byCategory'][(string)$categoryId] : [];
        if ($order === []) {
            return $categoryId > 0
                ? array_values(array_filter($items, fn (array $item): bool => (int)($item['categoryId'] ?? 0) === $categoryId))
                : $items;
        }

        $indexed = [];
        foreach ($items as $item) {
            $indexed[(string)($item['id'] ?? '')] = $item;
        }

        $ordered = [];
        $seen = [];
        foreach ($order as $id) {
            $key = (string)$id;
            if (isset($indexed[$key])) {
                $ordered[] = $indexed[$key];
                $seen[$key] = true;
            }
        }

        if ($categoryId === 0) {
            foreach ($items as $item) {
                $key = (string)($item['id'] ?? '');
                if ($key !== '' && !isset($seen[$key])) {
                    $ordered[] = $item;
                }
            }
        }

        return $ordered;
    }

    public function save(array $input): array
    {
        $data = $this->data();
        $item = $this->normalizeItem($input);
        if ($item['title'] === '' || $item['url'] === '') {
            throw new \InvalidArgumentException('音乐标题和链接必填');
        }
        if ((string)$item['id'] === '') {
            $item['id'] = $this->nextId($data['items']);
        }
        $this->fillCategoryName($item, $data['categories']);

        $found = false;
        foreach ($data['items'] as $index => $existing) {
            if ((string)($existing['id'] ?? '') === (string)$item['id']) {
                $data['items'][$index] = $item;
                $found = true;
                break;
            }
        }
        if (!$found) {
            array_unshift($data['items'], $item);
        }

        $data = $this->rebuild($data);
        Storage::make()->write(self::STORAGE_NAME, $data);
        return $item;
    }

    public function delete(string $id): void
    {
        $id = trim($id);
        if ($id === '') {
            return;
        }

        $data = $this->data();
        $data['items'] = array_values(array_filter(
            $data['items'],
            fn (array $item): bool => (string)($item['id'] ?? '') !== $id
        ));
        Storage::make()->write(self::STORAGE_NAME, $this->rebuild($data));
    }

    public function importFromFile(): array
    {
        $data = $this->defaultData();
        Storage::make()->write(self::STORAGE_NAME, $data);
        return $data;
    }

    public function data(): array
    {
        return $this->rebuild(Storage::make()->read(self::STORAGE_NAME, $this->defaultData()));
    }

    private function defaultData(): array
    {
        $file = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'storage' . DIRECTORY_SEPARATOR . self::STORAGE_NAME;
        if (is_file($file) && is_readable($file)) {
            $data = json_decode((string)file_get_contents($file), true);
            if (is_array($data) && is_array($data['items'] ?? null)) {
                return $this->rebuild($data);
            }
        }

        return $this->rebuild([
            'updatedAt' => date(DATE_ATOM),
            'source' => 'built-in',
            'categories' => [
                ['id' => 0, 'name' => '全部', 'isNew' => 0],
                ['id' => 14, 'name' => '生日', 'isNew' => 0],
                ['id' => 15, 'name' => '恋爱', 'isNew' => 0],
                ['id' => 16, 'name' => '节日', 'isNew' => 0],
                ['id' => 17, 'name' => '搞笑', 'isNew' => 0],
                ['id' => 18, 'name' => '其他', 'isNew' => 0],
            ],
            'items' => [
                ['id' => 159, 'title' => 'Dear D', 'lyric' => '亲爱的 告诉你 我有许多小淘气', 'artist' => '亲爱的 告诉你 我有许多小淘气', 'url' => 'https://hw.a.yximgs.com/bs2/ost/MTg2MzE3MjU0NDY2XzIwMzA0NzA2ODQ.m4a', 'note' => '', 'categoryId' => 15, 'categoryName' => '恋爱'],
            ],
        ]);
    }

    private function rebuild(array $data): array
    {
        $categories = $this->normalizeCategories(is_array($data['categories'] ?? null) ? $data['categories'] : []);
        $items = array_values(array_filter(array_map(
            fn (array $item): array => $this->normalizeItem($item),
            array_filter(is_array($data['items'] ?? null) ? $data['items'] : [], 'is_array')
        ), fn (array $item): bool => (string)$item['id'] !== '' && $item['title'] !== '' && $item['url'] !== ''));

        foreach ($items as &$item) {
            $this->fillCategoryName($item, $categories);
        }
        unset($item);

        return [
            'updatedAt' => date(DATE_ATOM),
            'source' => (string)($data['source'] ?? 'admin'),
            'categories' => $categories,
            'items' => $items,
            'byCategory' => $this->categoryOrder($items, is_array($data['byCategory'] ?? null) ? $data['byCategory'] : []),
        ];
    }

    private function normalizeCategories(array $categories): array
    {
        $items = [];
        foreach ($categories as $category) {
            if (!is_array($category)) {
                continue;
            }
            $name = trim((string)($category['name'] ?? ''));
            if ($name === '') {
                continue;
            }
            $items[(string)((int)($category['id'] ?? 0))] = [
                'id' => (int)($category['id'] ?? 0),
                'name' => $name,
                'isNew' => (int)($category['isNew'] ?? 0),
            ];
        }
        if (!isset($items['0'])) {
            $items = ['0' => ['id' => 0, 'name' => '全部', 'isNew' => 0]] + $items;
        }
        return array_values($items);
    }

    private function normalizeItem(array $item): array
    {
        return [
            'id' => is_numeric($item['id'] ?? null) ? (int)$item['id'] : trim((string)($item['id'] ?? '')),
            'title' => trim((string)($item['title'] ?? '')),
            'lyric' => trim((string)($item['lyric'] ?? '')),
            'artist' => trim((string)($item['artist'] ?? $item['note'] ?? '')),
            'url' => preg_replace('/\s+/', '', trim((string)($item['url'] ?? ''))) ?? '',
            'note' => trim((string)($item['note'] ?? '')),
            'categoryId' => (int)($item['categoryId'] ?? 0),
            'categoryName' => trim((string)($item['categoryName'] ?? '')),
        ];
    }

    private function fillCategoryName(array &$item, array $categories): void
    {
        foreach ($categories as $category) {
            if ((int)$category['id'] === (int)$item['categoryId']) {
                $item['categoryName'] = (string)$category['name'];
                return;
            }
        }
        $item['categoryId'] = 0;
        $item['categoryName'] = '全部';
    }

    private function categoryOrder(array $items, array $existingOrder = []): array
    {
        $indexed = [];
        foreach ($items as $item) {
            $id = (string)($item['id'] ?? '');
            if ($id === '') {
                continue;
            }
            $indexed[$id] = $item;
        }

        $order = ['0' => []];
        foreach ($existingOrder as $categoryId => $ids) {
            if (!is_array($ids)) {
                continue;
            }
            $key = (string)((int)$categoryId);
            $order[$key] ??= [];
            foreach ($ids as $id) {
                $id = (string)$id;
                if (!isset($indexed[$id])) {
                    continue;
                }
                if ($key !== '0' && (int)($indexed[$id]['categoryId'] ?? 0) !== (int)$key) {
                    continue;
                }
                $order[$key][] = $id;
            }
        }

        foreach ($items as $item) {
            $id = (string)($item['id'] ?? '');
            if ($id === '') {
                continue;
            }
            if (!in_array($id, $order['0'], true)) {
                $order['0'][] = $id;
            }
            $key = (string)((int)($item['categoryId'] ?? 0));
            $order[$key] ??= [];
            if (!in_array($id, $order[$key], true)) {
                $order[$key][] = $id;
            }
        }
        foreach ($order as $key => $ids) {
            $order[$key] = array_values(array_unique($ids));
        }
        return $order;
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
