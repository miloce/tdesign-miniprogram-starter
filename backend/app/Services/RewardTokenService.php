<?php

declare(strict_types=1);

namespace Yzd\Services;

final class RewardTokenService
{
    private const STORE = 'reward_tokens.json';
    private const TOKEN_TTL = 900;

    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function issue(string $openid, string $templateId): string
    {
        $token = bin2hex(random_bytes(24));
        $this->storage->update(self::STORE, [], function (array $tokens) use ($token, $openid, $templateId): array {
            $tokens = $this->activeTokensFrom($tokens);
            $tokens[] = [
                'hash' => hash('sha256', $token),
                'openid' => $openid,
                'templateId' => $templateId,
                'usedAt' => '',
                'createdAt' => date(DATE_ATOM),
                'expiresAt' => date(DATE_ATOM, time() + self::TOKEN_TTL),
            ];
            return $tokens;
        });

        return $token;
    }

    public function consume(string $token, string $openid, string $templateId): bool
    {
        $consumed = false;
        $this->storage->update(self::STORE, [], function (array $tokens) use ($token, $openid, $templateId, &$consumed): array {
            $tokens = $this->activeTokensFrom($tokens, false);
            $index = $this->findConsumableIndex($tokens, $token, $openid, $templateId);
            if ($index !== null) {
                $tokens[$index]['usedAt'] = date(DATE_ATOM);
                $consumed = true;
            }
            return $tokens;
        });
        return $consumed;
    }

    public function isValid(string $token, string $openid, string $templateId): bool
    {
        return $this->findConsumableIndex($this->activeTokens(false), $token, $openid, $templateId) !== null;
    }

    private function activeTokens(bool $dropUsed = true): array
    {
        return $this->activeTokensFrom($this->storage->read(self::STORE, []), $dropUsed);
    }

    private function activeTokensFrom(array $tokens, bool $dropUsed = true): array
    {
        $now = time();
        return array_values(array_filter($tokens, function ($row) use ($dropUsed, $now): bool {
            if (!is_array($row)) {
                return false;
            }
            $expiresAt = strtotime((string)($row['expiresAt'] ?? ''));
            if ($expiresAt !== false && $expiresAt + 3600 < $now) {
                return false;
            }
            return !$dropUsed || (string)($row['usedAt'] ?? '') === '';
        }));
    }

    private function findConsumableIndex(array $tokens, string $token, string $openid, string $templateId): ?int
    {
        $hash = hash('sha256', trim($token));
        $now = time();

        foreach ($tokens as $index => $row) {
            if ((string)($row['hash'] ?? '') !== $hash) {
                continue;
            }
            if ((string)($row['openid'] ?? '') !== $openid || (string)($row['templateId'] ?? '') !== $templateId) {
                return null;
            }
            if ((string)($row['usedAt'] ?? '') !== '' || strtotime((string)($row['expiresAt'] ?? '')) < $now) {
                return null;
            }

            return $index;
        }

        return null;
    }
}
