<?php

declare(strict_types=1);

namespace Yzd\Services;

use RuntimeException;
use Throwable;

final class AssistantSubmissionLock
{
    public static function make(): self
    {
        return new self();
    }

    public function run(string $openid, callable $callback): mixed
    {
        $lockName = 'yzd_assistant_' . substr(hash('sha256', $openid), 0, 40);
        if (Database::enabled()) {
            return $this->runWithDatabaseLock($lockName, $callback);
        }

        return $this->runWithFileLock($lockName, $callback);
    }

    private function runWithDatabaseLock(string $lockName, callable $callback): mixed
    {
        $pdo = Database::make()->pdo();
        $statement = $pdo->prepare('SELECT GET_LOCK(:name, 0)');
        $statement->execute(['name' => $lockName]);
        if ((int)$statement->fetchColumn() !== 1) {
            throw new RuntimeException('当前请求正在处理中，请勿重复提交', 409);
        }

        try {
            return $callback();
        } finally {
            try {
                $release = $pdo->prepare('SELECT RELEASE_LOCK(:name)');
                $release->execute(['name' => $lockName]);
            } catch (Throwable) {
                // 连接关闭时 MySQL 会自动释放会话锁，避免覆盖原始业务异常。
            }
        }
    }

    private function runWithFileLock(string $lockName, callable $callback): mixed
    {
        $path = Storage::make()->path($lockName . '.lock');
        $handle = fopen($path, 'c');
        if ($handle === false) {
            throw new RuntimeException('无法创建请求锁', 500);
        }

        if (!flock($handle, LOCK_EX | LOCK_NB)) {
            fclose($handle);
            throw new RuntimeException('当前请求正在处理中，请勿重复提交', 409);
        }

        try {
            return $callback();
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }
}
