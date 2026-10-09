<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\ContentSecurityException;
use Yzd\Services\ContentSecurityService;
use Yzd\Services\SquareService;
use Yzd\Services\UserService;

final class SquareController extends BaseController
{
    public function posts(): Response
    {
        $openid = UserService::make()->authenticatedOpenid() ?? '';
        return $this->ok([
            'types' => SquareService::make()->types(),
            'list' => SquareService::make()->all($openid),
        ]);
    }

    public function detail(): Response
    {
        $id = trim((string)request()->param('id', ''));
        if ($id === '') {
            return $this->fail('帖子不存在', 404);
        }

        $post = SquareService::make()->find($id, UserService::make()->authenticatedOpenid() ?? '');
        return $post === null ? $this->fail('帖子不存在', 404) : $this->ok($post);
    }

    public function create(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        $input = $this->input();
        $content = trim((string)($input['content'] ?? ''));
        if ($this->textLength($content) < 5) {
            return $this->fail('内容至少5个字');
        }

        $userService = UserService::make();
        $openid = $this->authOpenid();
        try {
            ContentSecurityService::make()->assertFormSafe([
                'title' => (string)($input['title'] ?? ''),
                'content' => $content,
                'type' => (string)($input['type'] ?? 'feedback'),
            ], $openid, 'squarePost');
        } catch (ContentSecurityException $exception) {
            if ($exception->httpStatus() < 500) {
                return $this->fail($exception->getMessage(), $exception->httpStatus());
            }
        }

        $author = $userService->publicInfo($userService->get($openid));
        return $this->ok(SquareService::make()->create($input, $author, $openid), '发布成功');
    }

    public function like(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        $id = trim((string)($this->input()['id'] ?? ''));
        if ($id === '') {
            return $this->fail('帖子不存在', 404);
        }

        $post = SquareService::make()->toggleLike($id, $this->authOpenid());
        return $post === null ? $this->fail('帖子不存在', 404) : $this->ok($post);
    }

    public function supervise(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        $id = trim((string)($this->input()['id'] ?? ''));
        if ($id === '') {
            return $this->fail('帖子不存在', 404);
        }

        $post = SquareService::make()->toggleSupervise($id, $this->authOpenid());
        return $post === null ? $this->fail('帖子不存在', 404) : $this->ok($post);
    }

    public function comment(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        $input = $this->input();
        $id = trim((string)($input['id'] ?? ''));
        $content = trim((string)($input['content'] ?? ''));
        if ($id === '') {
            return $this->fail('帖子不存在', 404);
        }
        if ($this->textLength($content) < 2) {
            return $this->fail('评论至少2个字');
        }

        $openid = $this->authOpenid();
        try {
            ContentSecurityService::make()->assertFormSafe(['content' => $content], $openid, 'squareComment');
        } catch (ContentSecurityException $exception) {
            if ($exception->httpStatus() < 500) {
                return $this->fail($exception->getMessage(), $exception->httpStatus());
            }
        }

        $userService = UserService::make();
        $author = $userService->publicInfo($userService->get($openid));
        $post = SquareService::make()->addComment($id, $content, $author, $openid);
        return $post === null ? $this->fail('帖子不存在', 404) : $this->ok($post, '评论成功');
    }

    private function textLength(string $value): int
    {
        if (function_exists('mb_strlen')) {
            return mb_strlen($value, 'UTF-8');
        }

        return strlen($value);
    }
}
