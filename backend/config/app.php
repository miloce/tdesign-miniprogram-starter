<?php

declare(strict_types=1);

return [
    'app_debug' => filter_var(getenv('APP_DEBUG') ?: false, FILTER_VALIDATE_BOOLEAN),
    'with_route' => true,
    'default_app' => '',
];
