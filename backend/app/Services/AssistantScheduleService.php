<?php

declare(strict_types=1);

namespace Yzd\Services;

use DateTimeImmutable;
use DateTimeZone;
use RuntimeException;

final class AssistantScheduleService
{
    private const STORE = 'assistant_schedules.json';
    private const RUN_LOCK = 'assistant_schedules_run.lock';
    private const TIMEZONE = 'Asia/Shanghai';
    private const MAX_RUN_ATTEMPTS = 3;
    private const RETRY_DELAYS_MINUTES = [10, 30];

    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function publicStatus(string $openid): array
    {
        $schedule = $this->scheduleFor($openid);

        return [
            'enabled' => (bool)($schedule['enabled'] ?? false),
            'account' => (string)($schedule['account'] ?? ''),
            'stepsMin' => (string)($schedule['stepsMin'] ?? '20000'),
            'stepsMax' => (string)($schedule['stepsMax'] ?? '20000'),
            'time' => (string)($schedule['time'] ?? '08:00'),
            'subscribed' => (bool)($schedule['subscribed'] ?? false),
            'subscribeStatus' => (string)($schedule['subscribeStatus'] ?? ''),
            'lastRunAt' => (string)($schedule['lastRunAt'] ?? ''),
            'lastResult' => is_array($schedule['lastResult'] ?? null) ? $schedule['lastResult'] : null,
            'nextRunAt' => (string)($schedule['nextRunAt'] ?? ''),
            'retryCount' => (int)($schedule['retryCount'] ?? 0),
            'updatedAt' => (string)($schedule['updatedAt'] ?? ''),
            'templateId' => SubscribeMessageService::ASSISTANT_TEMPLATE_ID,
        ];
    }

    public function save(string $openid, array $input): array
    {
        $this->assertVip($openid);

        $enabled = filter_var($input['enabled'] ?? false, FILTER_VALIDATE_BOOLEAN);
        $account = trim((string)($input['account'] ?? ''));
        $password = trim((string)($input['password'] ?? ''));
        $stepsMin = trim((string)($input['stepsMin'] ?? '20000'));
        $stepsMax = trim((string)($input['stepsMax'] ?? '20000'));
        $time = trim((string)($input['time'] ?? '08:00'));
        $existing = $this->scheduleFor($openid);

        if ($enabled) {
            if ($account === '') {
                throw new RuntimeException('请填写自动任务账号');
            }
            if ($password === '' && (string)($existing['password'] ?? '') === '') {
                throw new RuntimeException('请填写自动任务密码');
            }
            if (!$this->validStepRange($stepsMin, $stepsMax)) {
                throw new RuntimeException('请输入1000-98800之间的随机范围，且最小值不能大于最大值');
            }
            if (!$this->validTime($time)) {
                throw new RuntimeException('请选择有效执行时间');
            }
        }

        $schedule = array_replace($existing, [
            'openid' => $openid,
            'enabled' => $enabled,
            'account' => $account !== '' ? $account : (string)($existing['account'] ?? ''),
            'stepsMin' => $stepsMin,
            'stepsMax' => $stepsMax,
            'time' => $this->validTime($time) ? $time : (string)($existing['time'] ?? '08:00'),
            'updatedAt' => date(DATE_ATOM),
        ]);

        if ($password !== '') {
            $schedule['password'] = $this->encrypt($password);
        }

        $schedule['nextRunAt'] = $enabled ? $this->nextRunAt((string)$schedule['time']) : '';
        $schedule['retryCount'] = 0;
        $schedule['activeSteps'] = '';
        $this->writeSchedule($openid, $schedule);

        return $this->publicStatus($openid);
    }

    public function recordSubscription(string $openid, string $status): array
    {
        $schedule = $this->scheduleFor($openid);
        $schedule['openid'] = $openid;
        $schedule['subscribeStatus'] = $status;
        $schedule['subscribed'] = in_array($status, ['accept', 'acceptWithAudio', 'acceptWithAlert'], true);
        $schedule['subscribedAt'] = date(DATE_ATOM);
        $schedule['updatedAt'] = date(DATE_ATOM);
        $this->writeSchedule($openid, $schedule);

        return $this->publicStatus($openid);
    }

    public function looksLikeSubscribeMessageEvent(array $payload): bool
    {
        return in_array((string)($payload['Event'] ?? $payload['event'] ?? ''), [
            'subscribe_msg_popup_event',
            'subscribe_msg_change_event',
        ], true);
    }

    public function handleSubscribeMessageEvent(array $payload): array
    {
        $openid = (string)($payload['FromUserName'] ?? $payload['fromUserName'] ?? '');
        if ($openid === '') {
            return ['handled' => false, 'message' => 'missing openid'];
        }

        $status = '';
        foreach ($this->subscribeEventItems($payload) as $item) {
            if ((string)($item['TemplateId'] ?? $item['templateId'] ?? '') !== SubscribeMessageService::ASSISTANT_TEMPLATE_ID) {
                continue;
            }

            $status = (string)($item['SubscribeStatusString'] ?? $item['subscribeStatusString'] ?? '');
            break;
        }

        if ($status === '') {
            return ['handled' => false, 'openid' => $openid, 'message' => 'template not found'];
        }

        $this->recordSubscription($openid, $status);

        return [
            'handled' => true,
            'openid' => $openid,
            'status' => $status,
        ];
    }

    public function runDue(int $limit = 50): array
    {
        $lock = fopen($this->storage->path(self::RUN_LOCK), 'c');
        if ($lock === false || !flock($lock, LOCK_EX | LOCK_NB)) {
            if (is_resource($lock)) {
                fclose($lock);
            }

            return [
                'checkedAt' => date(DATE_ATOM),
                'count' => 0,
                'items' => [],
                'skipped' => 'locked',
            ];
        }

        try {
            return $this->runDueUnlocked($limit);
        } finally {
            flock($lock, LOCK_UN);
            fclose($lock);
        }
    }

    private function runDueUnlocked(int $limit): array
    {
        $items = $this->items();
        $now = time();
        $results = [];

        foreach ($items as $schedule) {
            if (count($results) >= $limit) {
                break;
            }
            if (!$this->isDue($schedule, $now)) {
                continue;
            }

            $results[] = $this->runSchedule($schedule);
        }

        return [
            'checkedAt' => date(DATE_ATOM),
            'count' => count($results),
            'items' => $results,
        ];
    }

    private function runSchedule(array $schedule): array
    {
        $openid = (string)($schedule['openid'] ?? '');
        $taskId = 'AS' . date('YmdHis') . random_int(1000, 9999);
        $completedAt = $this->nowShanghai()->format('Y-m-d H:i:s');
        $attempt = min(self::MAX_RUN_ATTEMPTS, max(1, (int)($schedule['retryCount'] ?? 0) + 1));
        $runSteps = $this->stepsForRun($schedule);
        if ((string)($schedule['activeSteps'] ?? '') !== $runSteps) {
            $schedule['activeSteps'] = $runSteps;
            $schedule['updatedAt'] = date(DATE_ATOM);
            $this->writeSchedule($openid, $schedule);
        }

        $disableSchedule = false;
        try {
            $this->assertVip($openid);
            $password = $this->decrypt((string)($schedule['password'] ?? ''));
            if ($openid === '' || (string)($schedule['account'] ?? '') === '' || $password === '') {
                throw new RuntimeException('自动任务配置不完整');
            }

            $result = LegacyAssistantGatewayService::make()->submit(
                (string)$schedule['account'],
                $password,
                $runSteps
            );
            $message = (string)($result['message'] ?? '设置成功');
            $notice = $this->sendRunNotice(
                $schedule,
                $openid,
                $taskId,
                $completedAt,
                true,
                '本次数值 ' . $runSteps . '，' . $message
            );

            $runResult = [
                'taskId' => $taskId,
                'success' => true,
                'message' => $message,
                'steps' => $runSteps,
                'notice' => $notice,
                'attempt' => $attempt,
                'willRetry' => false,
                'completedAt' => date(DATE_ATOM),
            ];
        } catch (\Throwable $exception) {
            $message = $exception->getMessage();
            // 只有「会员失效」才停用任务；上游透传的 403（如边缘防护）不得误杀用户任务
            $disableSchedule = $exception instanceof MembershipRequiredException;
            $willRetry = !$disableSchedule && $attempt < self::MAX_RUN_ATTEMPTS;
            $retryAt = $willRetry ? $this->retryAt($attempt) : '';
            $runResult = [
                'taskId' => $taskId,
                'success' => false,
                'message' => $message,
                'steps' => $runSteps,
                'notice' => $willRetry
                    ? null
                    : $this->sendRunNotice(
                        $schedule,
                        $openid,
                        $taskId,
                        $completedAt,
                        false,
                        '本次数值 ' . $runSteps . '，' . $message
                    ),
                'attempt' => $attempt,
                'willRetry' => $willRetry,
                'retryAt' => $retryAt,
                'completedAt' => date(DATE_ATOM),
            ];
        }

        $schedule['lastRunAt'] = date(DATE_ATOM);
        $schedule['lastResult'] = $runResult;
        if ($disableSchedule) {
            $schedule['enabled'] = false;
            $schedule['retryCount'] = 0;
            $schedule['nextRunAt'] = '';
            $schedule['activeSteps'] = '';
        } elseif (!empty($runResult['willRetry'])) {
            $schedule['retryCount'] = $attempt;
            $schedule['nextRunAt'] = (string)$runResult['retryAt'];
        } else {
            $schedule['retryCount'] = 0;
            $schedule['nextRunAt'] = $this->nextRunAt((string)($schedule['time'] ?? '08:00'));
            $schedule['activeSteps'] = '';
        }
        $schedule['updatedAt'] = date(DATE_ATOM);
        $this->writeSchedule($openid, $schedule);

        return array_replace(['openid' => $openid], $runResult);
    }

    private function sendRunNotice(array $schedule, string $openid, string $taskId, string $completedAt, bool $success, string $message): ?array
    {
        if (empty($schedule['subscribed'])) {
            return null;
        }

        try {
            return SubscribeMessageService::make()->sendAssistantCompleted($openid, [
                'title' => $success ? '小助手' : '设置失败',
                'completedAt' => $completedAt,
                'taskId' => $taskId,
                'tip' => $success ? $message : ('设置失败：' . $message),
            ]);
        } catch (\Throwable $exception) {
            return [
                'errcode' => -1,
                'errmsg' => $exception->getMessage(),
            ];
        }
    }

    private function assertVip(string $openid): void
    {
        $user = UserService::make()->get($openid);
        if (empty($user['isVip'])) {
            throw new MembershipRequiredException('自动定时任务仅会员可用', 403);
        }
    }

    private function isDue(array $schedule, int $now): bool
    {
        if (empty($schedule['enabled'])) {
            return false;
        }

        $nextRunAt = strtotime((string)($schedule['nextRunAt'] ?? ''));
        if ($nextRunAt === false) {
            $nextRunAt = strtotime($this->nextRunAt((string)($schedule['time'] ?? '08:00')));
        }

        return $nextRunAt !== false && $nextRunAt <= $now;
    }

    private function scheduleFor(string $openid): array
    {
        foreach ($this->items() as $schedule) {
            if ((string)($schedule['openid'] ?? '') === $openid) {
                return $this->normalize($schedule);
            }
        }

        return $this->defaultSchedule($openid);
    }

    private function writeSchedule(string $openid, array $schedule): void
    {
        $this->storage->update(self::STORE, [], function (array $raw) use ($openid, $schedule): array {
            $items = array_map(
                fn (array $item): array => $this->normalize($item),
                array_values(array_filter($raw, 'is_array'))
            );
            foreach ($items as $index => $item) {
                if ((string)($item['openid'] ?? '') === $openid) {
                    $items[$index] = $this->normalize($schedule);
                    return $items;
                }
            }

            $items[] = $this->normalize($schedule);
            return $items;
        });
    }

    private function items(): array
    {
        return array_map(
            fn (array $schedule): array => $this->normalize($schedule),
            array_values(array_filter($this->storage->read(self::STORE, []), 'is_array'))
        );
    }

    private function subscribeEventItems(array $payload): array
    {
        $list = $payload['List']
            ?? $payload['SubscribeMsgPopupEvent']['List']
            ?? $payload['SubscribeMsgChangeEvent']['List']
            ?? [];

        if (!is_array($list)) {
            return [];
        }

        if (isset($list['TemplateId']) || isset($list['templateId'])) {
            return [$list];
        }

        return array_values(array_filter($list, 'is_array'));
    }

    private function defaultSchedule(string $openid): array
    {
        return [
            'openid' => $openid,
            'enabled' => false,
            'account' => '',
            'password' => '',
            'stepsMin' => '20000',
            'stepsMax' => '20000',
            'time' => '08:00',
            'subscribed' => false,
            'subscribeStatus' => '',
            'nextRunAt' => '',
            'retryCount' => 0,
            'activeSteps' => '',
            'lastRunAt' => '',
            'lastResult' => null,
            'createdAt' => date(DATE_ATOM),
            'updatedAt' => date(DATE_ATOM),
        ];
    }

    private function normalize(array $schedule): array
    {
        $hasValidStepRange = array_key_exists('stepsMin', $schedule)
            && array_key_exists('stepsMax', $schedule)
            && $this->validStepRange((string)$schedule['stepsMin'], (string)$schedule['stepsMax']);
        if (!$hasValidStepRange && $this->validSteps((string)($schedule['steps'] ?? ''))) {
            $legacySteps = (string)$schedule['steps'];
            $schedule['stepsMin'] = $legacySteps;
            $schedule['stepsMax'] = $legacySteps;
            $hasValidStepRange = true;
        }
        $default = $this->defaultSchedule((string)($schedule['openid'] ?? ''));
        $schedule = array_replace($default, $schedule);
        $schedule['enabled'] = (bool)$schedule['enabled'];
        $schedule['subscribed'] = (bool)$schedule['subscribed'];
        $schedule['retryCount'] = max(0, min(self::MAX_RUN_ATTEMPTS - 1, (int)$schedule['retryCount']));
        $schedule['activeSteps'] = $this->validSteps((string)$schedule['activeSteps'])
            ? (string)$schedule['activeSteps']
            : '';
        if (!$hasValidStepRange) {
            $schedule['enabled'] = false;
            $schedule['stepsMin'] = '20000';
            $schedule['stepsMax'] = '20000';
            $schedule['nextRunAt'] = '';
            $schedule['retryCount'] = 0;
            $schedule['activeSteps'] = '';
        }
        $schedule['time'] = $this->validTime((string)$schedule['time']) ? (string)$schedule['time'] : '08:00';
        unset($schedule['steps']);

        return $schedule;
    }

    private function validSteps(string $value): bool
    {
        if ($value === '' || !preg_match('/^\d+$/', $value)) {
            return false;
        }

        $number = (int)$value;
        return $number >= 1000 && $number <= 98800;
    }

    private function validStepRange(string $stepsMin, string $stepsMax): bool
    {
        return $this->validSteps($stepsMin)
            && $this->validSteps($stepsMax)
            && (int)$stepsMin <= (int)$stepsMax;
    }

    private function stepsForRun(array $schedule): string
    {
        $activeSteps = (string)($schedule['activeSteps'] ?? '');
        if ($this->validSteps($activeSteps)) {
            return $activeSteps;
        }

        return (string)random_int((int)$schedule['stepsMin'], (int)$schedule['stepsMax']);
    }

    private function validTime(string $value): bool
    {
        return preg_match('/^(?:[01]\d|2[0-3]):[0-5]\d$/', $value) === 1;
    }

    private function nextRunAt(string $time): string
    {
        if (!$this->validTime($time)) {
            $time = '08:00';
        }

        [$hour, $minute] = array_map('intval', explode(':', $time));
        $now = $this->nowShanghai();
        $next = $now->setTime($hour, $minute);
        if ($next <= $now) {
            $next = $next->modify('+1 day');
        }

        return $next->format(DATE_ATOM);
    }

    private function retryAt(int $attempt): string
    {
        $delayIndex = max(0, min(count(self::RETRY_DELAYS_MINUTES) - 1, $attempt - 1));
        $delayMinutes = self::RETRY_DELAYS_MINUTES[$delayIndex];

        return $this->nowShanghai()->modify('+' . $delayMinutes . ' minutes')->format(DATE_ATOM);
    }

    private function nowShanghai(): DateTimeImmutable
    {
        return new DateTimeImmutable('now', new DateTimeZone(self::TIMEZONE));
    }

    private function encrypt(string $value): string
    {
        $iv = random_bytes(12);
        $tag = '';
        $encrypted = openssl_encrypt($value, 'aes-256-gcm', $this->secretKey(), OPENSSL_RAW_DATA, $iv, $tag);
        if (!is_string($encrypted)) {
            throw new RuntimeException('自动任务密码加密失败');
        }

        return 'v1:' . base64_encode($iv . $tag . $encrypted);
    }

    private function decrypt(string $value): string
    {
        if ($value === '') {
            return '';
        }

        if (!str_starts_with($value, 'v1:')) {
            return $value;
        }

        $raw = base64_decode(substr($value, 3), true);
        if (!is_string($raw) || strlen($raw) <= 28) {
            throw new RuntimeException('自动任务密码格式错误');
        }

        $iv = substr($raw, 0, 12);
        $tag = substr($raw, 12, 16);
        $encrypted = substr($raw, 28);
        $plain = openssl_decrypt($encrypted, 'aes-256-gcm', $this->secretKey(), OPENSSL_RAW_DATA, $iv, $tag);
        if (!is_string($plain)) {
            throw new RuntimeException('自动任务密码解密失败');
        }

        return $plain;
    }

    private function secretKey(): string
    {
        $secret = (string)(getenv('YZD_ASSISTANT_SCHEDULE_SECRET') ?: getenv('YZD_SESSION_SECRET') ?: getenv('YZD_WECHAT_API_V3_KEY') ?: getenv('YZD_WECHAT_SECRET') ?: '');
        if ($secret === '') {
            throw new RuntimeException('自动任务加密密钥未配置');
        }

        return hash('sha256', $secret, true);
    }
}
