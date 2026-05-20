<?php

declare(strict_types=1);

return [
    'default' => 'file',
    'channels' => [
        'file' => [
            'type' => 'File',
            'path' => runtime_path('log'),
            'level' => [],
        ],
    ],
];
