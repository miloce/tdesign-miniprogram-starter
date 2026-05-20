<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\RecordService;
use Yzd\Services\TemplateDefaults;
use Yzd\Services\TemplateRepository;
use Yzd\Services\UserService;

final class DashboardController extends BaseController
{
    public function index(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        return $this->ok([
            'users' => count(UserService::make()->all()),
            'templates' => count((new TemplateRepository(root_path('storage')))->adminList($this->baseUrl(), TemplateDefaults::all($this->baseUrl()))),
            'records' => count(RecordService::make()->all($this->shortBaseUrl())),
            'orders' => 0,
        ]);
    }

    public function users(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        return $this->ok(['list' => array_values(UserService::make()->all())]);
    }

    public function orders(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        return $this->ok(['list' => []]);
    }

    public function records(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        return $this->ok(['list' => RecordService::make()->all($this->shortBaseUrl())]);
    }
}
