<?php

declare(strict_types=1);

namespace Yzd\Services;

final class RecordService
{
    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function all(string $shortBaseUrl): array
    {
        return array_values(array_map(function (array $record) use ($shortBaseUrl): array {
            if (empty($record['shortCode'])) {
                $record['shortCode'] = $this->shortCode();
            }
            $record['link'] = rtrim($shortBaseUrl, '/') . '/' . $record['shortCode'];
            return $record;
        }, $this->storage->read('records.json', [])));
    }

    public function create(array $template, array $form, string $openid, string $shortBaseUrl, array $meta = []): array
    {
        $record = [];
        $this->storage->update('records.json', [], function (array $records) use ($template, $form, $openid, $shortBaseUrl, $meta, &$record): array {
            $records = array_values(array_filter($records, 'is_array'));
            $record = [
                'id' => 'R' . date('YmdHis') . random_int(100, 999),
                'openid' => $openid,
                'shortCode' => $this->shortCode($records),
                'title' => (string)$template['title'],
                'templateId' => (string)$template['id'],
                'createdAt' => date('Y-m-d H:i:s'),
                'status' => '已生成',
                'form' => $form,
                'meta' => $meta,
            ];
            $record['link'] = rtrim($shortBaseUrl, '/') . '/' . $record['shortCode'];
            array_unshift($records, $record);
            return $records;
        });
        TemplateMetricsService::make()->trackUsage((string)$record['templateId']);
        return $record;
    }

    public function findByShortCode(string $code, string $shortBaseUrl): ?array
    {
        foreach ($this->storage->read('records.json', []) as $record) {
            if (!is_array($record)) {
                continue;
            }
            if ((string)($record['shortCode'] ?? '') === $code) {
                return $this->withLink($record, $shortBaseUrl);
            }
        }
        return null;
    }

    public function findById(string $id, string $shortBaseUrl): ?array
    {
        foreach ($this->storage->read('records.json', []) as $record) {
            if (!is_array($record)) {
                continue;
            }
            if ((string)($record['id'] ?? '') === $id) {
                return $this->withLink($record, $shortBaseUrl);
            }
        }
        return null;
    }

    private function withLink(array $record, string $shortBaseUrl): array
    {
        if (empty($record['shortCode'])) {
            $record['shortCode'] = $this->shortCode();
        }
        $record['link'] = rtrim($shortBaseUrl, '/') . '/' . $record['shortCode'];
        return $record;
    }

    private function shortCode(array $records = []): string
    {
        $used = [];
        foreach ($records as $record) {
            $used[(string)($record['shortCode'] ?? '')] = true;
        }
        do {
            $code = (string)random_int(1000, 9999);
        } while (isset($used[$code]));
        return $code;
    }
}
