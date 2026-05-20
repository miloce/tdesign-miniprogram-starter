<?php

declare(strict_types=1);

namespace Yzd\Services;

final class TemplateRepository
{
    public function __construct(private readonly string $storageDir)
    {
        if (!is_dir($this->storageDir)) {
            mkdir($this->storageDir, 0777, true);
        }
    }

    public function all(string $baseUrl, array $defaults): array
    {
        $stored = $this->read();
        $templates = $stored === [] ? $defaults : $stored;

        return array_values(array_map(
            fn (array $template): array => $this->withUrls($this->normalize($template), $baseUrl),
            array_filter($templates, fn ($item): bool => is_array($item))
        ));
    }

    public function adminList(string $baseUrl, array $defaults): array
    {
        $templates = $this->all($baseUrl, $defaults);
        foreach ($templates as $index => $template) {
            $templates[$index]['sort'] = (int)($template['sort'] ?? ($index + 1) * 10);
            $templates[$index]['status'] = (string)($template['status'] ?? 'enabled');
        }

        usort($templates, function (array $a, array $b): int {
            return ((int)($a['sort'] ?? 0) <=> (int)($b['sort'] ?? 0)) ?: strcmp((string)$a['id'], (string)$b['id']);
        });

        return $templates;
    }

    public function publicList(string $baseUrl, array $defaults): array
    {
        return array_values(array_filter($this->adminList($baseUrl, $defaults), function (array $template): bool {
            return ($template['status'] ?? 'enabled') === 'enabled';
        }));
    }

    public function save(array $template, string $baseUrl, array $defaults): array
    {
        $templates = $this->adminList($baseUrl, $defaults);
        $template = $this->withUrls($this->normalize($template), $baseUrl);
        $found = false;

        foreach ($templates as $index => $item) {
            if ((string)$item['id'] === (string)$template['id']) {
                $templates[$index] = $template;
                $found = true;
                break;
            }
        }

        if (!$found) {
            $templates[] = $template;
        }

        $this->write($templates);

        return $template;
    }

    public function delete(string $id, string $baseUrl, array $defaults): void
    {
        $templates = array_values(array_filter($this->adminList($baseUrl, $defaults), function (array $template) use ($id): bool {
            return (string)$template['id'] !== $id;
        }));
        $this->write($templates);
    }

    public function reset(array $defaults): void
    {
        $this->write($defaults);
    }

    private function path(): string
    {
        return $this->storageDir . '/templates.json';
    }

    private function read(): array
    {
        $path = $this->path();
        if (!is_file($path)) {
            return [];
        }

        $data = json_decode((string)file_get_contents($path), true);
        return is_array($data) ? $data : [];
    }

    private function write(array $templates): void
    {
        file_put_contents(
            $this->path(),
            json_encode(array_values($templates), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
        );
    }

    private function normalize(array $template): array
    {
        $id = trim((string)($template['id'] ?? ''));
        if ($id === '') {
            $id = 'tpl_' . date('YmdHis');
        }

        $tags = $template['tags'] ?? [];
        if (is_string($tags)) {
            $tags = preg_split('/[,，\n]/u', $tags) ?: [];
        }

        $fields = $template['fields'] ?? [];
        if (!is_array($fields)) {
            $fields = [];
        }

        $defaults = $template['defaults'] ?? [];
        if (!is_array($defaults)) {
            $defaults = [];
        }

        return [
            'id' => $id,
            'title' => (string)($template['title'] ?? '未命名模板'),
            'subtitle' => (string)($template['subtitle'] ?? ''),
            'cover' => (string)($template['cover'] ?? ''),
            'category' => (string)($template['category'] ?? '全部'),
            'hot' => (int)($template['hot'] ?? 0),
            'used' => (int)($template['used'] ?? 0),
            'tags' => array_values(array_filter(array_map('trim', array_map('strval', $tags)))),
            'fields' => array_values(array_map([$this, 'normalizeField'], array_filter($fields, fn ($item): bool => is_array($item)))),
            'defaults' => $defaults,
            'status' => (string)($template['status'] ?? 'enabled'),
            'sort' => (int)($template['sort'] ?? 100),
        ];
    }

    private function normalizeField(array $field): array
    {
        return [
            'key' => (string)($field['key'] ?? ''),
            'label' => (string)($field['label'] ?? ''),
            'type' => (string)($field['type'] ?? 'text'),
            'placeholder' => (string)($field['placeholder'] ?? ''),
            'required' => (bool)($field['required'] ?? false),
        ];
    }

    private function withUrls(array $template, string $baseUrl): array
    {
        $template['previewUrl'] = $baseUrl . '/preview/' . rawurlencode((string)$template['id']);
        $template['finalUrl'] = $baseUrl . '/code/' . rawurlencode((string)$template['id']);
        return $template;
    }
}
