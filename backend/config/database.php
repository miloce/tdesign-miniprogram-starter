<?php

declare(strict_types=1);

return [
    'driver' => 'mysql',
    'host' => getenv('YZD_DB_HOST') ?: '134.175.96.191',
    'port' => (int)(getenv('YZD_DB_PORT') ?: 3306),
    'database' => getenv('YZD_DB_DATABASE') ?: 'kyz',
    'username' => getenv('YZD_DB_USERNAME') ?: 'kyz',
    'password' => getenv('YZD_DB_PASSWORD') ?: 'kyz',
    'charset' => 'utf8mb4',
    'prefix' => getenv('YZD_DB_PREFIX') ?: 'yzd_',
];
