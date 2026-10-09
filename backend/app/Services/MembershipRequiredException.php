<?php

declare(strict_types=1);

namespace Yzd\Services;

/**
 * 会员权益失效（会员过期或非会员）。
 *
 * 与上游透传的 HTTP 403 严格区分：只有本异常会触发自动定时任务停用，
 * 避免上游边缘防护等瞬时 403 误杀用户任务。
 */
final class MembershipRequiredException extends \RuntimeException
{
    public function __construct(string $message = '自动定时任务仅会员可用', int $httpStatus = 403)
    {
        parent::__construct($message, $httpStatus);
    }

    public function httpStatus(): int
    {
        $status = $this->getCode();
        return $status >= 400 && $status < 600 ? $status : 403;
    }
}
