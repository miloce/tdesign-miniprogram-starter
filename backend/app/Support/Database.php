<?php

declare(strict_types=1);

namespace Yzd\Support;

use PDO;

final class Database
{
    private static ?PDO $pdo = null;
    private static ?array $config = null;

    public static function config(): array
    {
        if (self::$config === null) {
            self::$config = require dirname(__DIR__, 2) . '/config/database.php';
        }
        return self::$config;
    }

    public static function pdo(): PDO
    {
        if (self::$pdo !== null) {
            return self::$pdo;
        }

        $config = self::config();
        $dsn = sprintf(
            'mysql:host=%s;port=%d;dbname=%s;charset=%s',
            $config['host'],
            $config['port'],
            $config['database'],
            $config['charset']
        );

        self::$pdo = new PDO($dsn, $config['username'], $config['password'], [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]);

        return self::$pdo;
    }

    public static function table(string $name): string
    {
        $prefix = (string)(self::config()['prefix'] ?? '');
        return '`' . str_replace('`', '``', $prefix . $name) . '`';
    }
}
