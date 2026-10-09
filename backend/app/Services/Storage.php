<?php

declare(strict_types=1);

namespace Yzd\Services;

use JsonException;
use RuntimeException;

final class Storage
{
    public function __construct(private readonly string $dir)
    {
        if (!is_dir($this->dir)) {
            mkdir($this->dir, 0777, true);
        }
    }

    public static function make(): self
    {
        return new self(dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'storage');
    }

    public function read(string $name, array $default = []): array
    {
        if ($db = $this->database()) {
            $data = $db->readJson($name);
            if ($data !== null) {
                return $data;
            }

            return $db->mutateJson($name, $default, fn (array $current): array => $current);
        }

        return $this->readFile($name, $default);
    }

    public function write(string $name, array $data): void
    {
        if ($db = $this->database()) {
            $db->writeJson($name, $data);
            return;
        }

        $this->writeFile($name, $data);
    }

    public function update(string $name, array $default, callable $mutator): array
    {
        if ($db = $this->database()) {
            return $db->mutateJson($name, $default, $mutator);
        }

        return $this->updateFile($name, $default, $mutator);
    }

    public function path(string $name): string
    {
        return $this->dir . DIRECTORY_SEPARATOR . $name;
    }

    private function readFile(string $name, array $default): array
    {
        $path = $this->path($name);
        if (!is_file($path)) {
            return $this->updateFile($name, $default, fn (array $current): array => $current);
        }

        $handle = fopen($path, 'rb');
        if ($handle === false) {
            throw new RuntimeException("无法打开存储文件：{$name}");
        }

        try {
            if (!flock($handle, LOCK_SH)) {
                throw new RuntimeException("无法锁定存储文件：{$name}");
            }
            $payload = stream_get_contents($handle);
            flock($handle, LOCK_UN);
        } finally {
            fclose($handle);
        }

        return $this->decode($name, is_string($payload) ? $payload : '');
    }

    private function writeFile(string $name, array $data): void
    {
        $handle = fopen($this->path($name), 'c+b');
        if ($handle === false) {
            throw new RuntimeException("无法打开存储文件：{$name}");
        }

        try {
            if (!flock($handle, LOCK_EX)) {
                throw new RuntimeException("无法锁定存储文件：{$name}");
            }
            $this->replaceFileContents($handle, $name, $this->encode($data));
            flock($handle, LOCK_UN);
        } finally {
            fclose($handle);
        }
    }

    private function updateFile(string $name, array $default, callable $mutator): array
    {
        $path = $this->path($name);
        $created = false;
        $handle = @fopen($path, 'x+b');
        if ($handle !== false) {
            $created = true;
        } else {
            $handle = fopen($path, 'c+b');
        }
        if ($handle === false) {
            throw new RuntimeException("无法打开存储文件：{$name}");
        }

        try {
            if (!flock($handle, LOCK_EX)) {
                throw new RuntimeException("无法锁定存储文件：{$name}");
            }
            rewind($handle);
            $payload = stream_get_contents($handle);
            $current = $created ? $default : $this->decode($name, is_string($payload) ? $payload : '');
            $updated = $mutator($current);
            if (!is_array($updated)) {
                throw new RuntimeException("存储更新必须返回数组：{$name}");
            }
            $this->replaceFileContents($handle, $name, $this->encode($updated));
            flock($handle, LOCK_UN);
            return $updated;
        } finally {
            fclose($handle);
        }
    }

    private function replaceFileContents($handle, string $name, string $payload): void
    {
        rewind($handle);
        if (!ftruncate($handle, 0)) {
            throw new RuntimeException("无法写入存储文件：{$name}");
        }

        $written = 0;
        $length = strlen($payload);
        while ($written < $length) {
            $bytes = fwrite($handle, substr($payload, $written));
            if ($bytes === false || $bytes === 0) {
                throw new RuntimeException("无法写入存储文件：{$name}");
            }
            $written += $bytes;
        }
        if (!fflush($handle)) {
            throw new RuntimeException("无法刷新存储文件：{$name}");
        }
    }

    private function encode(array $data): string
    {
        return json_encode(
            $data,
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT | JSON_THROW_ON_ERROR
        );
    }

    private function decode(string $name, string $payload): array
    {
        try {
            $data = json_decode($payload, true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException $exception) {
            throw new RuntimeException("存储文件 JSON 已损坏：{$name}", 0, $exception);
        }

        if (!is_array($data)) {
            throw new RuntimeException("存储文件不是数组：{$name}");
        }
        return $data;
    }

    private function database(): ?Database
    {
        if (!Database::enabled()) {
            return null;
        }

        return Database::make();
    }
}
