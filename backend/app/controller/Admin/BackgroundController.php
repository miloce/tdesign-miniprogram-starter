<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\BackgroundLibraryService;

final class BackgroundController extends BaseController
{
    public function index(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $service = BackgroundLibraryService::make();
        return $this->ok([
            'categories' => $service->categories(),
            'list' => $service->items(max(0, (int)request()->param('cid', 0))),
        ]);
    }

    public function save(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        try {
            $item = BackgroundLibraryService::make()->save($this->input());
        } catch (\InvalidArgumentException $exception) {
            return $this->fail($exception->getMessage());
        }

        return $this->ok(['item' => $item, 'list' => BackgroundLibraryService::make()->items()]);
    }

    public function delete(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        BackgroundLibraryService::make()->delete((string)request()->param('id'));
        return $this->ok(['list' => BackgroundLibraryService::make()->items()]);
    }

    public function import(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $data = BackgroundLibraryService::make()->importFromFile();
        return $this->ok([
            'categories' => $data['categories'] ?? [],
            'list' => $data['items'] ?? [],
        ]);
    }
}
