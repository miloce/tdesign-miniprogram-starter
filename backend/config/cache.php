<?php

declare(strict_types=1);

return [
    'default' => 'file',
    'stores' => [
        'file' => [
            'type' => 'File',
            'path' => runtime_path('cache'),
            'prefix' => 'yzd_',
            'expire' => 0,
        ],
    ],
];
