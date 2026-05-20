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

    public function create(array $template, array $form, string $openid, string $shortBaseUrl): array
    {
        $records = $this->all($shortBaseUrl);
        $record = [
            'id' => 'R' . date('YmdHis') . random_int(100, 999),
            'openid' => $openid,
            'shortCode' => $this->shortCode($records),
            'title' => (string)$template['title'],
            'templateId' => (string)$template['id'],
            'createdAt' => date('Y-m-d H:i'),
            'status' => '已生成',
            'form' => $form,
        ];
        $record['link'] = rtrim($shortBaseUrl, '/') . '/' . $record['shortCode'];
        array_unshift($records, $record);
        $this->storage->write('records.json', $records);
        return $record;
    }

    public function findByShortCode(string $code, string $shortBaseUrl): ?array
    {
        foreach ($this->all($shortBaseUrl) as $record) {
            if ((string)($record['shortCode'] ?? '') === $code) {
                return $record;
            }
        }
        return null;
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
