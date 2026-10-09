<?php

declare(strict_types=1);

namespace Yzd\Services;

use PDO;
use PDOException;
use JsonException;
use RuntimeException;
use Throwable;

final class Database
{
    private static ?self $instance = null;

    private ?PDO $pdo = null;
    private bool $schemaEnsured = false;

    public static function enabled(): bool
    {
        return (string)(getenv('YZD_DB_HOST') ?: '') !== '' && (string)(getenv('YZD_DB_DATABASE') ?: '') !== '';
    }

    public static function make(): self
    {
        return self::$instance ??= new self();
    }

    public function pdo(): PDO
    {
        if ($this->pdo) {
            return $this->pdo;
        }

        $host = (string)getenv('YZD_DB_HOST');
        $port = (int)(getenv('YZD_DB_PORT') ?: 3306);
        $database = (string)getenv('YZD_DB_DATABASE');
        $charset = (string)(getenv('YZD_DB_CHARSET') ?: 'utf8mb4');
        $username = (string)(getenv('YZD_DB_USERNAME') ?: $database);
        $password = (string)(getenv('YZD_DB_PASSWORD') ?: '');
        $dsn = "mysql:host={$host};port={$port};dbname={$database};charset={$charset}";

        $this->pdo = new PDO($dsn, $username, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_TIMEOUT => 5,
        ]);

        return $this->pdo;
    }

    public function ensureSchema(): void
    {
        if ($this->schemaEnsured) {
            return;
        }

        $this->pdo()->exec(
            "CREATE TABLE IF NOT EXISTS yzd_storage (
                name VARCHAR(120) NOT NULL PRIMARY KEY,
                payload LONGTEXT NOT NULL,
                updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci"
        );
        $this->schemaEnsured = true;
    }

    public function readJson(string $name): ?array
    {
        $stmt = $this->pdo()->prepare('SELECT payload FROM yzd_storage WHERE name = :name LIMIT 1');
        $stmt->execute(['name' => $name]);
        $payload = $stmt->fetchColumn();
        if (!is_string($payload)) {
            return null;
        }

        return $this->decode($name, $payload);
    }

    public function writeJson(string $name, array $data): void
    {
        $payload = $this->encode($data);
        $stmt = $this->pdo()->prepare(
            'INSERT INTO yzd_storage (name, payload) VALUES (:name, :payload)
             ON DUPLICATE KEY UPDATE payload = :updated_payload, updated_at = CURRENT_TIMESTAMP'
        );
        $stmt->execute(['name' => $name, 'payload' => $payload, 'updated_payload' => $payload]);
    }

    public function mutateJson(string $name, array $default, callable $mutator): array
    {
        $pdo = $this->pdo();
        $pdo->beginTransaction();

        try {
            $insert = $pdo->prepare('INSERT IGNORE INTO yzd_storage (name, payload) VALUES (:name, :payload)');
            $insert->execute(['name' => $name, 'payload' => $this->encode($default)]);

            $select = $pdo->prepare('SELECT payload FROM yzd_storage WHERE name = :name FOR UPDATE');
            $select->execute(['name' => $name]);
            $payload = $select->fetchColumn();
            if (!is_string($payload)) {
                throw new RuntimeException("无法锁定存储项：{$name}");
            }

            $updated = $mutator($this->decode($name, $payload));
            if (!is_array($updated)) {
                throw new RuntimeException("存储更新必须返回数组：{$name}");
            }

            $update = $pdo->prepare(
                'UPDATE yzd_storage SET payload = :payload, updated_at = CURRENT_TIMESTAMP WHERE name = :name'
            );
            $update->execute(['name' => $name, 'payload' => $this->encode($updated)]);
            $pdo->commit();
            return $updated;
        } catch (Throwable $exception) {
            if ($pdo->inTransaction()) {
                $pdo->rollBack();
            }
            throw $exception;
        }
    }

    public function status(): array
    {
        if (!self::enabled()) {
            return ['enabled' => false, 'ok' => false, 'message' => 'not configured'];
        }

        try {
            $this->ensureSchema();
            return ['enabled' => true, 'ok' => true, 'message' => 'OK'];
        } catch (PDOException $exception) {
            return ['enabled' => true, 'ok' => false, 'message' => $exception->getMessage()];
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
            throw new RuntimeException("存储项 JSON 已损坏：{$name}", 0, $exception);
        }

        if (!is_array($data)) {
            throw new RuntimeException("存储项不是数组：{$name}");
        }
        return $data;
    }
}
