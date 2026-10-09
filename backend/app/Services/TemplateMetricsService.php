<?php

declare(strict_types=1);

namespace Yzd\Services;

final class TemplateMetricsService
{
    private const STORE = 'template_metrics.json';
    private const QUEUE_FILE = 'template_metrics_queue.log';

    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function track(string $templateId): void
    {
        if ($templateId === '') {
            return;
        }

        $this->enqueue($templateId, 'view');
    }

    public function trackUsage(string $templateId): void
    {
        if ($templateId === '') {
            return;
        }

        $this->storage->update(self::STORE, [], function (array $metrics) use ($templateId): array {
            $row = is_array($metrics[$templateId] ?? null) ? $metrics[$templateId] : [];
            $row['used'] = max(0, (int)($row['used'] ?? 0)) + 1;
            $row['updatedAt'] = date('Y-m-d H:i:s');
            $metrics[$templateId] = $row;
            return $metrics;
        });
    }

    public function stats(string $shortBaseUrl): array
    {
        $stats = [];
        foreach ($this->storage->read(self::STORE, []) as $templateId => $row) {
            if (!is_array($row)) {
                continue;
            }

            $views = max(0, (int)($row['views'] ?? 0));
            $used = max(0, (int)($row['used'] ?? 0));
            $stats[(string)$templateId] = [
                'views' => $views,
                'used' => $used,
                'hot' => $views + $used,
            ];
        }

        foreach ($this->queuedStats() as $templateId => $row) {
            $stats[$templateId] ??= ['views' => 0, 'used' => 0, 'hot' => 0];
            $stats[$templateId]['views'] += (int)($row['views'] ?? 0);
            $stats[$templateId]['used'] += (int)($row['used'] ?? 0);
            $stats[$templateId]['hot'] = $stats[$templateId]['views'] + $stats[$templateId]['used'];
        }

        return $stats;
    }

    public function flushQueue(): array
    {
        $queue = $this->queuePath();
        if (!is_file($queue) || filesize($queue) === 0) {
            return ['events' => 0, 'templates' => 0];
        }

        $processing = $queue . '.' . getmypid() . '.' . date('YmdHis') . '.tmp';
        if (!@rename($queue, $processing)) {
            return ['events' => 0, 'templates' => 0];
        }

        $summary = $this->eventStats([$processing]);
        if ($summary['counts'] !== []) {
            $this->storage->update(self::STORE, [], function (array $metrics) use ($summary): array {
                foreach ($summary['counts'] as $templateId => $row) {
                    $metrics[$templateId] = is_array($metrics[$templateId] ?? null) ? $metrics[$templateId] : [];
                    $metrics[$templateId]['views'] = max(0, (int)($metrics[$templateId]['views'] ?? 0)) + (int)($row['views'] ?? 0);
                    $metrics[$templateId]['used'] = max(0, (int)($metrics[$templateId]['used'] ?? 0)) + (int)($row['used'] ?? 0);
                    $metrics[$templateId]['updatedAt'] = date('Y-m-d H:i:s');
                }
                return $metrics;
            });
        }

        @unlink($processing);

        return [
            'events' => $summary['events'],
            'templates' => count($summary['counts']),
        ];
    }

    public function rebuildUsage(string $shortBaseUrl): array
    {
        $metrics = $this->storage->read(self::STORE, []);
        $usage = [];
        $recordCount = 0;

        foreach (RecordService::make()->all($shortBaseUrl) as $record) {
            $templateId = (string)($record['templateId'] ?? '');
            if ($templateId === '') {
                continue;
            }

            $recordCount++;
            $usage[$templateId] = ($usage[$templateId] ?? 0) + 1;
        }

        foreach ($usage as $templateId => $used) {
            $row = is_array($metrics[$templateId] ?? null) ? $metrics[$templateId] : [];
            $row['used'] = $used;
            $row['updatedAt'] = date('Y-m-d H:i:s');
            $metrics[$templateId] = $row;
        }

        foreach ($metrics as $templateId => $row) {
            if (!is_array($row)) {
                continue;
            }
            if (!isset($usage[(string)$templateId])) {
                $row['used'] = 0;
                $metrics[$templateId] = $row;
            }
        }

        $this->storage->write(self::STORE, $metrics);

        return [
            'records' => $recordCount,
            'templates' => count($usage),
        ];
    }

    private function enqueue(string $templateId, string $event): void
    {
        $templateId = trim(str_replace(["\r", "\n", "\t"], '', $templateId));
        if ($templateId === '') {
            return;
        }

        $payload = json_encode([
            'templateId' => $templateId,
            'event' => $event,
            'at' => time(),
        ], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        if (!is_string($payload)) {
            return;
        }

        @file_put_contents($this->queuePath(), $payload . "\n", FILE_APPEND | LOCK_EX);
    }

    private function queuedStats(): array
    {
        return $this->eventStats([$this->queuePath()])['counts'];
    }

    /**
     * @param array<int, string> $paths
     * @return array{events:int, counts:array<string,array{views:int,used:int}>}
     */
    private function eventStats(array $paths): array
    {
        $counts = [];
        $events = 0;

        foreach ($paths as $path) {
            if (!is_file($path) || !is_readable($path)) {
                continue;
            }

            $handle = fopen($path, 'rb');
            if ($handle === false) {
                continue;
            }

            try {
                while (($line = fgets($handle)) !== false) {
                    $event = json_decode(trim($line), true);
                    if (!is_array($event)) {
                        continue;
                    }
                    $templateId = trim((string)($event['templateId'] ?? ''));
                    if ($templateId === '') {
                        continue;
                    }

                    $type = (string)($event['event'] ?? 'view');
                    $counts[$templateId] ??= ['views' => 0, 'used' => 0];
                    if ($type === 'used') {
                        $counts[$templateId]['used']++;
                    } else {
                        $counts[$templateId]['views']++;
                    }
                    $events++;
                }
            } finally {
                fclose($handle);
            }
        }

        return ['events' => $events, 'counts' => $counts];
    }

    private function queuePath(): string
    {
        return $this->storage->path(self::QUEUE_FILE);
    }
}
