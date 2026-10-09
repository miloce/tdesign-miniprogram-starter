<?php

declare(strict_types=1);

namespace Yzd\Services;

final class ContentSecurityException extends \RuntimeException
{
    public function __construct(string $message, int $httpStatus = 422, private readonly array $context = [])
    {
        parent::__construct($message, $httpStatus);
    }

    public function httpStatus(): int
    {
        $status = $this->getCode();
        return $status >= 400 && $status < 600 ? $status : 422;
    }

    public function context(): array
    {
        return $this->context;
    }
}
