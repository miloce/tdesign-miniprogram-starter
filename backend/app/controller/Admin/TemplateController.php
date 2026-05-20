<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\TemplateDefaults;
use Yzd\Services\TemplateRepository;

final class TemplateController extends BaseController
{
    public function index(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $list = $this->repo()->adminList($this->baseUrl(), TemplateDefaults::all($this->baseUrl()));
        return $this->ok(['categories' => $this->categories($list), 'list' => $list]);
    }

    public function detail(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $id = (string)request()->param('id');
        foreach ($this->repo()->adminList($this->baseUrl(), TemplateDefaults::all($this->baseUrl())) as $template) {
            if ((string)$template['id'] === $id) {
                return $this->ok(['template' => $template]);
            }
        }
        return $this->fail('模板不存在', 404);
    }

    public function save(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $input = $this->input();
        $template = is_array($input['template'] ?? null) ? $input['template'] : $input;
        $saved = $this->repo()->save($template, $this->baseUrl(), TemplateDefaults::all($this->baseUrl()));
        return $this->ok(['template' => $saved, 'list' => $this->repo()->adminList($this->baseUrl(), TemplateDefaults::all($this->baseUrl()))]);
    }

    public function status(): Response
    {
        $input = $this->input();
        $input['status'] = (string)($input['status'] ?? 'enabled');
        return $this->saveWith($input);
    }

    public function delete(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $this->repo()->delete((string)request()->param('id'), $this->baseUrl(), TemplateDefaults::all($this->baseUrl()));
        return $this->ok(['list' => $this->repo()->adminList($this->baseUrl(), TemplateDefaults::all($this->baseUrl()))]);
    }

    public function reset(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $this->repo()->reset(TemplateDefaults::all($this->baseUrl()));
        return $this->ok(['list' => $this->repo()->adminList($this->baseUrl(), TemplateDefaults::all($this->baseUrl()))]);
    }

    private function saveWith(array $input): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $list = $this->repo()->adminList($this->baseUrl(), TemplateDefaults::all($this->baseUrl()));
        foreach ($list as $template) {
            if ((string)$template['id'] === (string)($input['id'] ?? '')) {
                $template = array_replace($template, $input);
                return $this->ok(['template' => $this->repo()->save($template, $this->baseUrl(), TemplateDefaults::all($this->baseUrl()))]);
            }
        }
        return $this->fail('模板不存在', 404);
    }

    private function repo(): TemplateRepository
    {
        return new TemplateRepository(root_path('storage'));
    }

    private function categories(array $templates): array
    {
        return array_values(array_unique(array_merge(['全部'], array_map(fn (array $item): string => (string)($item['category'] ?? '全部'), $templates))));
    }
}
