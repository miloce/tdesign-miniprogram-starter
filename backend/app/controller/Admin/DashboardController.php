<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\OrderService;
use Yzd\Services\RecordService;
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
            'templates' => count((new TemplateRepository(root_path('storage')))->adminList($this->baseUrl(), [])),
            'records' => count(RecordService::make()->all($this->shortBaseUrl())),
            'orders' => count(OrderService::make()->all()),
        ]);
    }

    public function users(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $service = UserService::make();
        return $this->ok(['list' => array_values(array_map([$service, 'adminInfo'], $service->all()))]);
    }

    public function orders(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        return $this->ok(['list' => OrderService::make()->all()]);
    }

    public function records(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        return $this->ok(['list' => RecordService::make()->all($this->shortBaseUrl())]);
    }

    public function createRecord(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $input = $this->input();
        $templateId = trim((string)($input['templateId'] ?? ''));
        $form = is_array($input['form'] ?? null) ? $input['form'] : [];
        $openid = trim((string)($input['openid'] ?? ''));
        if ($openid === '') {
            $openid = UserService::make()->adminOpenid();
        }

        $templates = (new TemplateRepository(root_path('storage')))->adminList($this->baseUrl(), []);
        $template = null;
        foreach ($templates as $item) {
            if ((string)($item['id'] ?? '') === $templateId) {
                $template = $item;
                break;
            }
        }

        if ($template === null) {
            return $this->fail('模板不存在', 404);
        }

        $record = RecordService::make()->create($template, $form, $openid, $this->shortBaseUrl());
        return $this->ok(['record' => $record, 'list' => RecordService::make()->all($this->shortBaseUrl())]);
    }
}
