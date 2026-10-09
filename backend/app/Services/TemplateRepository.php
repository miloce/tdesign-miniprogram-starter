<?php

declare(strict_types=1);

namespace Yzd\Services;

final class TemplateRepository
{
    private const STORE = 'templates.json';
    private const SUMMARY_STORE = 'templates_summary.json';

    public function __construct(private readonly string $storageDir)
    {
        if (!is_dir($this->storageDir)) {
            mkdir($this->storageDir, 0777, true);
        }
    }

    public function all(string $baseUrl, array $defaults, bool $includeMetrics = true): array
    {
        return $this->allWithMode($baseUrl, $defaults, true, $includeMetrics);
    }

    public function summaryList(string $baseUrl, array $defaults, bool $includeMetrics = true): array
    {
        return $this->allWithMode($baseUrl, $defaults, false, $includeMetrics);
    }

    private function allWithMode(string $baseUrl, array $defaults, bool $includeDetails, bool $includeMetrics): array
    {
        $templates = $includeDetails ? $this->read() : $this->readSummaries();
        $stats = $includeMetrics ? TemplateMetricsService::make()->stats($baseUrl) : [];

        return array_values(array_map(
            fn (array $template): array => $this->formatListTemplate($template, $stats, $baseUrl, $includeDetails),
            array_filter($templates, fn ($item): bool => is_array($item) && (string)($item['status'] ?? 'enabled') !== 'deleted')
        ));
    }

    public function adminList(string $baseUrl, array $defaults, bool $includeMetrics = true): array
    {
        $templates = $this->all($baseUrl, $defaults, $includeMetrics);
        return $this->sortAdminList($templates);
    }

    public function adminSummaryList(string $baseUrl, array $defaults, bool $includeMetrics = true): array
    {
        $templates = $this->summaryList($baseUrl, $defaults, $includeMetrics);
        return $this->sortAdminList($templates);
    }

    private function sortAdminList(array $templates): array
    {
        foreach ($templates as $index => $template) {
            $templates[$index]['sort'] = (int)($template['sort'] ?? ($index + 1) * 10);
            $templates[$index]['status'] = (string)($template['status'] ?? 'enabled');
        }

        usort($templates, function (array $a, array $b): int {
            return ((int)($a['sort'] ?? 0) <=> (int)($b['sort'] ?? 0)) ?: strcmp((string)$a['id'], (string)$b['id']);
        });

        return $templates;
    }

    public function rebuildSummaryCache(string $baseUrl, array $defaults): int
    {
        $templates = $this->adminList($baseUrl, $defaults, false);
        $this->writeSummary($this->forSummaryStorage($templates));
        return count($templates);
    }

    public function loadFromTemplateFiles(string $baseUrl, array $defaults): array
    {
        $files = WebTemplateService::make()->pageDefinitions(true);
        $templates = $this->read();
        $positions = [];
        foreach ($templates as $index => $template) {
            if (!is_array($template)) {
                continue;
            }
            $id = (string)($template['id'] ?? pathinfo((string)($template['templateFile'] ?? ''), PATHINFO_FILENAME));
            if ($id !== '') {
                $positions[$id] = $index;
            }
        }

        $inserted = 0;
        $updated = 0;
        $skipped = 0;

        foreach ($files as $fileTemplate) {
            if (!is_array($fileTemplate)) {
                continue;
            }
            $id = (string)($fileTemplate['id'] ?? '');
            if ($id === '') {
                continue;
            }

            if (array_key_exists($id, $positions)) {
                $index = $positions[$id];
                $existing = is_array($templates[$index] ?? null) ? $templates[$index] : [];
                if ((string)($existing['status'] ?? '') === 'deleted') {
                    $skipped++;
                    continue;
                }
                $merged = $this->mergeLoadedTemplate($fileTemplate, $existing);
                if ($this->forStorage([$existing]) !== $this->forStorage([$merged])) {
                    $updated++;
                }
                $templates[$index] = $merged;
                continue;
            }

            $templates[] = $fileTemplate;
            $positions[$id] = count($templates) - 1;
            $inserted++;
        }

        $this->write($this->forStorage(array_filter($templates, fn ($item): bool => is_array($item))));
        $list = $this->adminSummaryList($baseUrl, $defaults);

        return [
            'inserted' => $inserted,
            'updated' => $updated,
            'skipped' => $skipped,
            'files' => count($files),
            'total' => count($list),
            'list' => $list,
        ];
    }

    public function publicList(string $baseUrl, array $defaults, bool $includeMetrics = true): array
    {
        return array_values(array_filter($this->adminList($baseUrl, $defaults, $includeMetrics), function (array $template): bool {
            return ($template['status'] ?? 'enabled') === 'enabled';
        }));
    }

    public function publicSummaryList(string $baseUrl, array $defaults, bool $includeMetrics = true): array
    {
        return array_values(array_filter($this->adminSummaryList($baseUrl, $defaults, $includeMetrics), function (array $template): bool {
            return ($template['status'] ?? 'enabled') === 'enabled';
        }));
    }

    public function findPublic(string $id, string $baseUrl, array $defaults, bool $includeMetrics = true): ?array
    {
        $template = $this->findRawById($id);
        if (!$this->isPublicTemplate($template)) {
            return null;
        }

        $stats = $includeMetrics ? TemplateMetricsService::make()->stats($baseUrl) : [];
        return $this->formatListTemplate($template, $stats, $baseUrl, true);
    }

    public function firstPublic(string $baseUrl, array $defaults, bool $includeMetrics = true): ?array
    {
        $selected = null;
        foreach ($this->read() as $template) {
            if (!$this->isPublicTemplate($template)) {
                continue;
            }
            if ($selected === null || $this->compareSort($template, $selected) < 0) {
                $selected = $template;
            }
        }

        if ($selected === null) {
            return null;
        }

        $stats = $includeMetrics ? TemplateMetricsService::make()->stats($baseUrl) : [];
        return $this->formatListTemplate($selected, $stats, $baseUrl, true);
    }

    public function findPublicByDefaultValue(string $key, string $value, string $baseUrl, array $defaults, bool $includeMetrics = true): ?array
    {
        if ($key === '' || $value === '') {
            return null;
        }

        foreach ($this->read() as $template) {
            if (!$this->isPublicTemplate($template)) {
                continue;
            }
            $templateDefaults = is_array($template['defaults'] ?? null) ? $template['defaults'] : [];
            if ((string)($templateDefaults[$key] ?? '') === $value) {
                $stats = $includeMetrics ? TemplateMetricsService::make()->stats($baseUrl) : [];
                return $this->formatListTemplate($template, $stats, $baseUrl, true);
            }
        }

        return null;
    }

    public function save(array $template, string $baseUrl, array $defaults): array
    {
        $templates = $this->adminList($baseUrl, $defaults);
        $template = $this->preserveExistingText($template, $templates);
        $stats = TemplateMetricsService::make()->stats($baseUrl);
        $template = $this->withUrls($this->withMetrics($this->normalize($template), $stats), $baseUrl);
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

        $this->write($this->forStorage($templates));

        return $template;
    }

    public function delete(string $id, string $baseUrl, array $defaults): void
    {
        $id = trim($id);
        if ($id === '') {
            return;
        }

        $templates = $this->adminList($baseUrl, $defaults);
        $found = false;
        foreach ($templates as $index => $template) {
            if ((string)($template['id'] ?? '') === $id) {
                $templates[$index]['status'] = 'deleted';
                $found = true;
                break;
            }
        }
        if (!$found) {
            $templates[] = [
                'id' => $id,
                'title' => $id,
                'templateFile' => $id,
                'status' => 'deleted',
            ];
        }

        $this->write($this->forStorage($templates));
    }

    public function reset(array $defaults): void
    {
        $this->write([]);
    }

    private function path(): string
    {
        return $this->storageDir . '/templates.json';
    }

    private function read(): array
    {
        return Storage::make()->read(self::STORE, []);
    }

    private function readSummaries(): array
    {
        $summaries = Storage::make()->read(self::SUMMARY_STORE, []);
        if ($summaries !== []) {
            return $summaries;
        }

        $templates = $this->read();
        $summaries = $this->forSummaryStorage($templates);
        $this->writeSummary($summaries);
        return $summaries;
    }

    private function write(array $templates): void
    {
        $templates = array_values($templates);
        Storage::make()->write(self::STORE, $templates);
        $this->writeSummary($this->forSummaryStorage($templates));
    }

    private function writeSummary(array $templates): void
    {
        Storage::make()->write(self::SUMMARY_STORE, array_values($templates));
    }

    private function findRawById(string $id): ?array
    {
        $id = trim($id);
        if ($id === '') {
            return null;
        }

        foreach ($this->read() as $template) {
            if (!is_array($template)) {
                continue;
            }
            if ((string)($template['id'] ?? '') === $id) {
                return $template;
            }
        }

        return null;
    }

    private function isPublicTemplate(mixed $template): bool
    {
        return is_array($template)
            && (string)($template['status'] ?? 'enabled') === 'enabled'
            && (string)($template['id'] ?? '') !== '';
    }

    private function compareSort(array $left, array $right): int
    {
        return ((int)($left['sort'] ?? 100) <=> (int)($right['sort'] ?? 100))
            ?: strcmp((string)($left['id'] ?? ''), (string)($right['id'] ?? ''));
    }

    private function formatListTemplate(array $template, array $stats, string $baseUrl, bool $includeDetails): array
    {
        $template = $this->withUrls($this->withMetrics($this->normalize($template), $stats), $baseUrl);
        if (!$includeDetails) {
            unset($template['fields'], $template['defaults']);
        }
        return $template;
    }

    private function mergeLoadedTemplate(array $fileTemplate, array $storedTemplate): array
    {
        $merged = array_replace($fileTemplate, $storedTemplate);
        $merged['id'] = (string)($fileTemplate['id'] ?? $storedTemplate['id'] ?? '');
        $merged['templateFile'] = (string)($fileTemplate['templateFile'] ?? $fileTemplate['id'] ?? $storedTemplate['templateFile'] ?? $merged['id']);

        foreach (['fields', 'defaults', 'fieldCount'] as $key) {
            $existingValue = $storedTemplate[$key] ?? null;
            $isEmptyArray = is_array($existingValue) && $existingValue === [];
            if ($existingValue === null || $existingValue === '' || $isEmptyArray) {
                $merged[$key] = $fileTemplate[$key] ?? $existingValue;
            }
        }

        if (array_key_exists('cover', $storedTemplate)) {
            $merged['cover'] = $this->localCoverOverride(
                (string)$storedTemplate['cover'],
                (string)($fileTemplate['cover'] ?? '')
            );
        }

        if (is_array($merged['defaults'] ?? null)) {
            $merged['defaults'] = $this->mergeStoredDefaults(
                (string)$merged['id'],
                is_array($fileTemplate['defaults'] ?? null) ? $fileTemplate['defaults'] : [],
                $merged['defaults']
            );
        }

        return $merged;
    }

    private function mergeStoredDefaults(string $id, array $fileDefaults, array $storedDefaults): array
    {
        $merged = array_replace($fileDefaults, $storedDefaults);
        if (!str_starts_with($id, 'copied-')) {
            return $merged;
        }

        foreach ($fileDefaults as $key => $fileValue) {
            $storedValue = $storedDefaults[$key] ?? null;
            if ($this->shouldPreferLocalDefault($fileValue, $storedValue)) {
                $merged[$key] = $fileValue;
            }
        }

        return $merged;
    }

    private function shouldPreferLocalDefault(mixed $fileValue, mixed $storedValue): bool
    {
        if (!is_string($fileValue) || !is_string($storedValue)) {
            return false;
        }

        return $this->isLocalPublicAsset($fileValue) && preg_match('/^https?:\/\//i', $storedValue) === 1;
    }

    private function isLocalPublicAsset(string $value): bool
    {
        return str_starts_with($value, '/static/')
            || str_starts_with($value, '/uploads/')
            || str_starts_with($value, '/template/')
            || str_starts_with($value, '/assets/');
    }

    private function localCoverOverride(string $savedCover, string $fileCover): string
    {
        if ($savedCover === '') {
            return $fileCover;
        }

        if (!preg_match('/^https?:\/\//i', $savedCover)) {
            return $savedCover;
        }

        $path = parse_url($savedCover, PHP_URL_PATH);
        if (is_string($path) && str_starts_with($path, '/static/')) {
            return $path;
        }

        if ($fileCover !== '' && !preg_match('/^https?:\/\//i', $fileCover)) {
            return $fileCover;
        }

        if (is_string($path) && preg_match('#/storage/uploads/demo/([^/?#]+)$#i', $path, $match)) {
            $candidate = '/static/templates/copied/covers/copied-' . $match[1];
            $publicPath = dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'public' . str_replace('/', DIRECTORY_SEPARATOR, $candidate);
            if (is_file($publicPath)) {
                return $candidate;
            }
        }

        return $savedCover;
    }

    private function normalize(array $template): array
    {
        $id = trim((string)($template['id'] ?? ''));
        $templateFile = trim((string)($template['templateFile'] ?? ''));
        if ($id === '') {
            $id = $templateFile !== '' ? pathinfo($templateFile, PATHINFO_FILENAME) : 'tpl_' . date('YmdHis');
        }
        if ($templateFile === '') {
            $templateFile = $id;
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
        $defaults = $this->normalizeTextValues($defaults);

        $normalizedFields = array_values(array_map([$this, 'normalizeField'], array_filter($fields, fn ($item): bool => is_array($item))));
        $fieldCount = $normalizedFields !== []
            ? count($normalizedFields)
            : max(0, (int)($template['fieldCount'] ?? 0));
        foreach ($normalizedFields as $field) {
            $key = (string)($field['key'] ?? '');
            if ($key !== '' && !array_key_exists($key, $defaults) && array_key_exists('default', $field)) {
                $defaults[$key] = $field['default'];
            }
        }

        return [
            'id' => $id,
            'title' => (string)($template['title'] ?? '未命名模板'),
            'subtitle' => (string)($template['subtitle'] ?? ''),
            'cover' => (string)($template['cover'] ?? ''),
            'category' => (string)($template['category'] ?? '全部'),
            'templateFile' => $templateFile,
            'tags' => array_values(array_filter(array_map('trim', array_map('strval', $tags)))),
            'fieldCount' => $fieldCount,
            'fields' => $normalizedFields,
            'defaults' => $defaults,
            'status' => (string)($template['status'] ?? 'enabled'),
            'sort' => (int)($template['sort'] ?? 100),
        ];
    }

    private function preserveExistingText(array $template, array $templates): array
    {
        $id = (string)($template['id'] ?? '');
        if ($id === '') {
            return $template;
        }

        foreach ($templates as $item) {
            if ((string)($item['id'] ?? '') !== $id) {
                continue;
            }

            if (!array_key_exists('subtitle', $template) || trim((string)$template['subtitle']) === '') {
                $template['subtitle'] = (string)($item['subtitle'] ?? '');
            }

            $tags = $template['tags'] ?? null;
            if ($tags === null || $tags === [] || (is_string($tags) && trim($tags) === '')) {
                $template['tags'] = is_array($item['tags'] ?? null) ? $item['tags'] : [];
            }

            break;
        }

        return $template;
    }

    private function normalizeField(array $field): array
    {
        $type = (string)($field['type'] ?? 'text');
        $aliases = [
            'input' => 'text',
            'input2' => 'textarea',
            'range' => 'slider',
            'picker' => 'select',
            'cover' => 'image',
            'background' => 'image',
            'btn' => 'button',
        ];
        $type = $aliases[$type] ?? $type;
        $key = (string)($field['key'] ?? $field['name'] ?? '');
        $label = (string)($field['label'] ?? $field['desc'] ?? $key);
        $lowerKey = strtolower($key);
        if (($lowerKey === 'color' || $lowerKey === 'fontcolor' || str_ends_with($lowerKey, 'color')) && in_array($type, ['text', ''], true)) {
            $type = 'color';
        }

        $normalized = [
            'key' => $key,
            'label' => $label,
            'type' => $type,
            'placeholder' => (string)($field['placeholder'] ?? $field['desc'] ?? ''),
            'required' => (bool)($field['required'] ?? (($field['visible'] ?? null) === 1)),
        ];

        foreach (['tip', 'msg', 'accept', 'start', 'end'] as $extraKey) {
            if (array_key_exists($extraKey, $field)) {
                $normalized[$extraKey] = (string)$field[$extraKey];
            }
        }

        foreach (['visible', 'isShow', 'expand', 'hidden'] as $extraKey) {
            if (array_key_exists($extraKey, $field)) {
                $normalized[$extraKey] = filter_var($field[$extraKey], FILTER_VALIDATE_BOOL, FILTER_NULL_ON_FAILURE) ?? (bool)$field[$extraKey];
            }
        }

        foreach (['maxlength', 'textquantity', 'min', 'max', 'step', 'multiple', 'limit'] as $extraKey) {
            if (array_key_exists($extraKey, $field)) {
                $targetKey = $extraKey === 'textquantity' ? 'maxlength' : $extraKey;
                $normalized[$targetKey] = is_numeric($field[$extraKey]) ? 0 + $field[$extraKey] : $field[$extraKey];
            }
        }

        if (array_key_exists('options', $field)) {
            $normalized['options'] = $this->normalizeOptions($field['options']);
        } elseif (array_key_exists('data', $field) && is_array($field['data'] ?? null)) {
            if ($type === 'select') {
                $normalized['options'] = $this->normalizeOptions($field['data']);
            } elseif ($type === 'slider') {
                $data = array_values($field['data']);
                $normalized['min'] = $data[0] ?? ($normalized['min'] ?? 0);
                $normalized['max'] = $data[1] ?? ($normalized['max'] ?? 100);
                $normalized['default'] = $data[2] ?? ($normalized['default'] ?? $normalized['min']);
                $normalized['step'] = $data[3] ?? ($normalized['step'] ?? 1);
            }
        }

        if (array_key_exists('default', $field)) {
            $normalized['default'] = is_string($field['default']) ? $this->normalizeTextValue($field['default']) : $field['default'];
        }

        return $normalized;
    }

    private function normalizeTextValues(array $values): array
    {
        foreach ($values as $key => $value) {
            if (is_string($value)) {
                $values[$key] = $this->normalizeTextValue($value);
            } elseif (is_array($value)) {
                $values[$key] = $this->normalizeTextValues($value);
            }
        }

        return $values;
    }

    private function normalizeTextValue(string $value): string
    {
        return str_replace(['\\r\\n', '\\n', '\\r'], ["\n", "\n", "\n"], $value);
    }

    private function normalizeOptions(mixed $options): array
    {
        if (!is_array($options)) {
            return [];
        }

        return array_values(array_map(function ($option): array {
            if (is_array($option)) {
                $label = (string)($option['label'] ?? $option['text'] ?? $option['name'] ?? $option['value'] ?? '');
                $value = (string)($option['value'] ?? $option['id'] ?? $label);
                return ['label' => $label, 'value' => $value];
            }

            return ['label' => (string)$option, 'value' => (string)$option];
        }, $options));
    }

    private function withUrls(array $template, string $baseUrl): array
    {
        $template['cover'] = $this->publicAssetUrl((string)($template['cover'] ?? ''), $baseUrl);
        if (is_array($template['defaults'] ?? null)) {
            $template['defaults'] = AssetUrlService::make()->assetValues($template['defaults']);
        }
        $template['previewUrl'] = $baseUrl . '/preview/' . rawurlencode((string)$template['id']);
        $template['finalUrl'] = $baseUrl . '/code/' . rawurlencode((string)$template['id']);
        return $template;
    }

    private function publicAssetUrl(string $url, string $baseUrl): string
    {
        return AssetUrlService::make()->url($url, $baseUrl);
    }

    private function withMetrics(array $template, array $stats): array
    {
        $row = $stats[(string)$template['id']] ?? ['views' => 0, 'used' => 0, 'hot' => 0];
        $template['views'] = (int)($row['views'] ?? 0);
        $template['used'] = (int)($row['used'] ?? 0);
        $template['hot'] = (int)($row['hot'] ?? 0);
        return $template;
    }

    private function forStorage(array $templates): array
    {
        return array_values(array_map(function (array $template): array {
            unset($template['previewUrl'], $template['finalUrl'], $template['views'], $template['used'], $template['hot']);
            return $this->normalize($template);
        }, $templates));
    }

    private function forSummaryStorage(array $templates): array
    {
        return array_values(array_map(function (array $template): array {
            unset($template['previewUrl'], $template['finalUrl'], $template['views'], $template['used'], $template['hot']);
            $template = $this->normalize($template);
            unset($template['fields'], $template['defaults']);
            return $template;
        }, array_filter($templates, fn ($item): bool => is_array($item))));
    }
}
