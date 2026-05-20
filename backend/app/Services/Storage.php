<?php

declare(strict_types=1);

namespace Yzd\Services;

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
        $path = $this->path($name);
        if (!is_file($path)) {
            $this->write($name, $default);
            return $default;
        }

        $data = json_decode((string)file_get_contents($path), true);
        return is_array($data) ? $data : $default;
    }

    public function write(string $name, array $data): void
    {
        file_put_contents($this->path($name), json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    }

    public function path(string $name): string
    {
        return $this->dir . DIRECTORY_SEPARATOR . $name;
    }
}
