<?php

declare(strict_types=1);

namespace Yzd\Services;

final class SquareService
{
    private const FILE = 'square_posts.json';

    private const TYPES = [
        'feedback' => ['label' => '反馈', 'status' => '待处理', 'icon' => 'chat'],
        'suggestion' => ['label' => '建议', 'status' => '待采纳', 'icon' => 'app'],
        'discussion' => ['label' => '讨论', 'status' => '交流中', 'icon' => 'usergroup'],
    ];

    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function types(): array
    {
        return array_map(
            fn (string $value, array $item): array => [
                'value' => $value,
                'label' => $item['label'],
                'status' => $item['status'],
                'icon' => $item['icon'],
            ],
            array_keys(self::TYPES),
            self::TYPES
        );
    }

    public function all(string $viewerOpenid = ''): array
    {
        $posts = array_map(fn (array $post): array => $this->normalizePost($post), $this->rawPosts());
        $posts = array_values(array_filter($posts, fn (array $post): bool => !$this->isHidden($post)));
        usort($posts, fn (array $left, array $right): int => strcmp((string)$right['createdAt'], (string)$left['createdAt']));
        return array_map(fn (array $post): array => $this->publicPost($post, $viewerOpenid), $posts);
    }

    public function adminList(): array
    {
        $posts = array_map(fn (array $post): array => $this->normalizePost($post), $this->rawPosts());
        usort($posts, fn (array $left, array $right): int => strcmp((string)$right['createdAt'], (string)$left['createdAt']));
        return array_map(fn (array $post): array => $this->adminPost($post), $posts);
    }

    public function find(string $id, string $viewerOpenid = ''): ?array
    {
        foreach ($this->rawPosts() as $post) {
            $normalized = $this->normalizePost($post);
            if ((string)$normalized['id'] === $id) {
                if ($this->isHidden($normalized)) {
                    return null;
                }
                return $this->publicPost($normalized, $viewerOpenid, true);
            }
        }

        return null;
    }

    public function create(array $input, array $author, string $openid): array
    {
        $type = $this->normalizeType((string)($input['type'] ?? 'feedback'));
        $content = $this->limitText((string)($input['content'] ?? ''), 500);
        $title = $this->limitText((string)($input['title'] ?? ''), 40);
        if ($title === '') {
            $title = $this->limitText($content, 24);
        }

        $publishMode = (int)($input['publishMode'] ?? 1);
        $post = $this->normalizePost([
            'id' => 'sq_' . date('YmdHis') . '_' . random_int(1000, 9999),
            'type' => $type,
            'title' => $title,
            'content' => $content,
            'authorOpenid' => $openid,
            'authorName' => $publishMode === 2 ? '匿名用户' : (string)($author['nickname'] ?? '云栈点用户'),
            'authorAvatar' => $publishMode === 2 ? '' : (string)($author['avatar'] ?? ''),
            'status' => self::TYPES[$type]['status'],
            'tags' => $this->limitText((string)($input['tags'] ?? ''), 80),
            'images' => $this->normalizeImages($input['images'] ?? $input['imgList'] ?? []),
            'publishMode' => $publishMode,
            'likedOpenids' => [],
            'supervisedOpenids' => [],
            'comments' => [],
            'createdAt' => date(DATE_ATOM),
            'updatedAt' => date(DATE_ATOM),
        ]);

        $this->storage->update(self::FILE, [], function (array $posts) use ($post): array {
            $posts = array_values(array_filter($posts, 'is_array'));
            array_unshift($posts, $post);
            return $posts;
        });

        return $this->publicPost($post, $openid);
    }

    public function addComment(string $id, string $content, array $author, string $openid): ?array
    {
        $updated = $this->updatePost($id, function (array $normalized) use ($content, $author, $openid): ?array {
            if ($this->isHidden($normalized)) {
                return null;
            }

            $normalized['comments'][] = $this->normalizeComment([
                'id' => 'sc_' . date('YmdHis') . '_' . random_int(1000, 9999),
                'content' => $this->limitText($content, 300),
                'authorOpenid' => $openid,
                'authorName' => (string)($author['nickname'] ?? '云栈点用户'),
                'authorAvatar' => (string)($author['avatar'] ?? ''),
                'createdAt' => date(DATE_ATOM),
            ]);
            $normalized['updatedAt'] = date(DATE_ATOM);
            return $normalized;
        });
        return $updated === null ? null : $this->publicPost($updated, $openid, true);
    }

    public function toggleLike(string $id, string $openid): ?array
    {
        return $this->toggleOpenid($id, $openid, 'likedOpenids');
    }

    public function toggleSupervise(string $id, string $openid): ?array
    {
        return $this->toggleOpenid($id, $openid, 'supervisedOpenids');
    }

    public function updateStatus(string $id, string $status): ?array
    {
        $status = trim($status);
        $allowed = ['default', '正常', '隐藏', '已处理', '待处理', '待采纳', '交流中'];
        if (!in_array($status, $allowed, true)) {
            return null;
        }

        $updated = $this->updatePost($id, function (array $normalized) use ($status): array {
            $normalized['status'] = $status === 'default' ? self::TYPES[$normalized['type']]['status'] : $status;
            $normalized['updatedAt'] = date(DATE_ATOM);
            return $normalized;
        });
        return $updated === null ? null : $this->adminPost($updated);
    }

    public function delete(string $id): bool
    {
        $removed = false;
        $this->storage->update(self::FILE, [], function (array $posts) use ($id, &$removed): array {
            return array_values(array_filter($posts, function ($post) use ($id, &$removed): bool {
                if (!is_array($post)) {
                    return false;
                }
                if ((string)$this->normalizePost($post)['id'] === $id) {
                    $removed = true;
                    return false;
                }
                return true;
            }));
        });

        return $removed;
    }

    public function deleteComment(string $postId, string $commentId): ?array
    {
        $updated = $this->updatePost($postId, function (array $normalized) use ($commentId): ?array {
            $before = count($normalized['comments']);
            $normalized['comments'] = array_values(array_filter(
                $normalized['comments'],
                fn (array $comment): bool => (string)$comment['id'] !== $commentId
            ));

            if (count($normalized['comments']) === $before) {
                return null;
            }

            $normalized['updatedAt'] = date(DATE_ATOM);
            return $normalized;
        });
        return $updated === null ? null : $this->adminPost($updated);
    }

    private function toggleOpenid(string $id, string $openid, string $field): ?array
    {
        $updated = $this->updatePost($id, function (array $normalized) use ($openid, $field): ?array {
            if ($this->isHidden($normalized)) {
                return null;
            }

            $openids = $normalized[$field];
            $position = array_search($openid, $openids, true);
            if ($position === false) {
                $openids[] = $openid;
            } else {
                array_splice($openids, (int)$position, 1);
            }
            $normalized[$field] = array_values($openids);
            $normalized['updatedAt'] = date(DATE_ATOM);
            return $normalized;
        });
        return $updated === null ? null : $this->publicPost($updated, $openid);
    }

    private function updatePost(string $id, callable $mutator): ?array
    {
        $updated = null;
        $this->storage->update(self::FILE, [], function (array $posts) use ($id, $mutator, &$updated): array {
            $posts = array_values(array_filter($posts, 'is_array'));
            foreach ($posts as $index => $post) {
                $normalized = $this->normalizePost($post);
                $posts[$index] = $normalized;
                if ((string)$normalized['id'] !== $id) {
                    continue;
                }

                $candidate = $mutator($normalized);
                if (is_array($candidate)) {
                    $updated = $this->normalizePost($candidate);
                    $posts[$index] = $updated;
                }
                break;
            }
            return $posts;
        });
        return $updated;
    }

    private function rawPosts(): array
    {
        return array_values(array_filter($this->storage->read(self::FILE, []), fn ($post): bool => is_array($post)));
    }

    private function normalizePost(array $post): array
    {
        $type = $this->normalizeType((string)($post['type'] ?? 'feedback'));
        $likedOpenids = is_array($post['likedOpenids'] ?? null) ? array_values(array_unique(array_map('strval', $post['likedOpenids']))) : [];
        $supervisedOpenids = is_array($post['supervisedOpenids'] ?? null) ? array_values(array_unique(array_map('strval', $post['supervisedOpenids']))) : [];
        $comments = is_array($post['comments'] ?? null) ? $post['comments'] : [];

        return [
            'id' => (string)($post['id'] ?? ('sq_' . date('YmdHis') . '_' . random_int(1000, 9999))),
            'type' => $type,
            'title' => $this->limitText((string)($post['title'] ?? ''), 40),
            'content' => $this->limitText((string)($post['content'] ?? ''), 500),
            'authorOpenid' => (string)($post['authorOpenid'] ?? ''),
            'authorName' => (string)($post['authorName'] ?? '云栈点用户'),
            'authorAvatar' => (string)($post['authorAvatar'] ?? ''),
            'status' => (string)($post['status'] ?? self::TYPES[$type]['status']),
            'tags' => (string)($post['tags'] ?? ''),
            'images' => $this->normalizeImages($post['images'] ?? $post['imgList'] ?? []),
            'publishMode' => max(1, (int)($post['publishMode'] ?? 1)),
            'likedOpenids' => $likedOpenids,
            'supervisedOpenids' => $supervisedOpenids,
            'comments' => array_values(array_map(
                fn (array $comment): array => $this->normalizeComment($comment),
                array_filter($comments, fn ($comment): bool => is_array($comment))
            )),
            'createdAt' => (string)($post['createdAt'] ?? date(DATE_ATOM)),
            'updatedAt' => (string)($post['updatedAt'] ?? date(DATE_ATOM)),
        ];
    }

    private function normalizeComment(array $comment): array
    {
        return [
            'id' => (string)($comment['id'] ?? ('sc_' . date('YmdHis') . '_' . random_int(1000, 9999))),
            'content' => $this->limitText((string)($comment['content'] ?? ''), 300),
            'authorOpenid' => (string)($comment['authorOpenid'] ?? ''),
            'authorName' => (string)($comment['authorName'] ?? '云栈点用户'),
            'authorAvatar' => (string)($comment['authorAvatar'] ?? ''),
            'createdAt' => (string)($comment['createdAt'] ?? date(DATE_ATOM)),
        ];
    }

    private function publicPost(array $post, string $viewerOpenid, bool $includeComments = false): array
    {
        $post = $this->normalizePost($post);
        $likedOpenids = $post['likedOpenids'];
        $supervisedOpenids = $post['supervisedOpenids'];
        $comments = $post['comments'];
        unset($post['likedOpenids'], $post['supervisedOpenids'], $post['authorOpenid']);

        $public = array_replace($post, [
            'typeLabel' => self::TYPES[$post['type']]['label'],
            'likes' => count($likedOpenids),
            'liked' => $viewerOpenid !== '' && in_array($viewerOpenid, $likedOpenids, true),
            'superviseCount' => count($supervisedOpenids),
            'supervised' => $viewerOpenid !== '' && in_array($viewerOpenid, $supervisedOpenids, true),
            'commentCount' => count($comments),
        ]);

        if ($includeComments) {
            $public['comments'] = array_map(function (array $comment): array {
                unset($comment['authorOpenid']);
                return $comment;
            }, $comments);
            return $public;
        }

        unset($public['comments']);
        return $public;
    }

    private function adminPost(array $post): array
    {
        $post = $this->normalizePost($post);
        $likedOpenids = $post['likedOpenids'];
        $supervisedOpenids = $post['supervisedOpenids'];
        unset($post['likedOpenids'], $post['supervisedOpenids']);

        return array_replace($post, [
            'typeLabel' => self::TYPES[$post['type']]['label'],
            'likes' => count($likedOpenids),
            'superviseCount' => count($supervisedOpenids),
            'commentCount' => count($post['comments']),
        ]);
    }

    private function isHidden(array $post): bool
    {
        return (string)($post['status'] ?? '') === '隐藏';
    }

    private function normalizeType(string $type): string
    {
        if ($type === 'template') {
            return 'suggestion';
        }

        return isset(self::TYPES[$type]) ? $type : 'feedback';
    }

    private function limitText(string $value, int $limit): string
    {
        $value = trim(strip_tags(str_replace(["\r\n", "\r"], "\n", $value)));
        if (function_exists('mb_substr')) {
            return mb_substr($value, 0, $limit, 'UTF-8');
        }

        return substr($value, 0, $limit);
    }

    private function normalizeImages(mixed $images): array
    {
        if (is_string($images)) {
            $images = $images === '' ? [] : [$images];
        }
        if (!is_array($images)) {
            return [];
        }

        return array_values(array_slice(array_filter(array_map(
            fn ($item): string => trim((string)$item),
            $images
        ), fn (string $item): bool => $item !== '' && !$this->isTemporaryImagePath($item)), 0, 9));
    }

    private function isTemporaryImagePath(string $path): bool
    {
        return str_starts_with(strtolower($path), 'wxfile://')
            || preg_match('#^https?://tmp/#i', $path) === 1
            || preg_match('#^https?://(127\.0\.0\.1|localhost)(:\d+)?/__tmp__/#i', $path) === 1
            || str_contains(strtolower($path), '/__tmp__/');
    }
}
