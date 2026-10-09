<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\SquareService;

final class SquareController extends BaseController
{
    public function index(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $service = SquareService::make();
        return $this->ok([
            'types' => $service->types(),
            'list' => $service->adminList(),
        ]);
    }

    public function status(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $input = $this->input();
        $id = trim((string)($input['id'] ?? ''));
        $status = trim((string)($input['status'] ?? ''));
        if ($id === '') {
            return $this->fail('帖子不存在', 404);
        }

        $service = SquareService::make();
        $item = $service->updateStatus($id, $status);
        return $item === null
            ? $this->fail('帖子不存在或状态无效', 422)
            : $this->ok(['item' => $item, 'list' => $service->adminList()], '已更新');
    }

    public function delete(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $id = trim((string)($this->input()['id'] ?? ''));
        if ($id === '') {
            return $this->fail('帖子不存在', 404);
        }

        $service = SquareService::make();
        return $service->delete($id)
            ? $this->ok(['list' => $service->adminList()], '已删除')
            : $this->fail('帖子不存在', 404);
    }

    public function deleteComment(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $input = $this->input();
        $postId = trim((string)($input['postId'] ?? ''));
        $commentId = trim((string)($input['commentId'] ?? ''));
        if ($postId === '' || $commentId === '') {
            return $this->fail('评论不存在', 404);
        }

        $service = SquareService::make();
        $item = $service->deleteComment($postId, $commentId);
        return $item === null
            ? $this->fail('评论不存在', 404)
            : $this->ok(['item' => $item, 'list' => $service->adminList()], '已删除');
    }
}
