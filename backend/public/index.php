<?php

declare(strict_types=1);

error_reporting(E_ALL & ~E_DEPRECATED);

$root = dirname(__DIR__);

require_once $root . '/vendor/autoload.php';

$app = new think\App($root);
$http = $app->http;
$response = $http->run();
$response->send();
$http->end($response);
