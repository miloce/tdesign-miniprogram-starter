<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\MusicLibraryService;

final class MusicController extends BaseController
{
    public function index(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $service = MusicLibraryService::make();
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
            $item = MusicLibraryService::make()->save($this->input());
        } catch (\InvalidArgumentException $exception) {
            return $this->fail($exception->getMessage());
        }

        return $this->ok(['item' => $item, 'list' => MusicLibraryService::make()->items()]);
    }

    public function delete(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        MusicLibraryService::make()->delete((string)request()->param('id'));
        return $this->ok(['list' => MusicLibraryService::make()->items()]);
    }

    public function import(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $data = MusicLibraryService::make()->importFromFile();
        return $this->ok([
            'categories' => $data['categories'] ?? [],
            'list' => $data['items'] ?? [],
        ]);
    }
}
