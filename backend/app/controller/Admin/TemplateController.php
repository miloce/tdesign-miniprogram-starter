<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\TemplateRepository;

final class TemplateController extends BaseController
{
    public function index(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $list = $this->repo()->adminSummaryList($this->baseUrl(), []);
        return $this->ok(['categories' => $this->categories($list), 'list' => $list]);
    }

    public function detail(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $id = (string)request()->param('id');
        foreach ($this->repo()->adminList($this->baseUrl(), []) as $template) {
            if ((string)$template['id'] === $id) {
                return $this->ok(['template' => $template]);
            }
        }
        return $this->fail('模板不存在', 404);
    }

    public function files(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $id = trim((string)request()->param('id', ''));
        if ($id !== '') {
            foreach ($this->repo()->adminList($this->baseUrl(), [], false) as $template) {
                if ((string)($template['id'] ?? '') === $id || (string)($template['templateFile'] ?? '') === $id) {
                    return $this->ok(['file' => $this->templateFileOption($template, true)]);
                }
            }
            return $this->fail('模板不存在，请先点击加载模板', 404);
        }

        return $this->ok(['list' => array_map(
            fn (array $template): array => $this->templateFileOption($template, false),
            $this->repo()->adminSummaryList($this->baseUrl(), [], false)
        )]);
    }

    public function save(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $input = $this->input();
        $template = is_array($input['template'] ?? null) ? $input['template'] : $input;
        $saved = $this->repo()->save($template, $this->baseUrl(), []);
        return $this->ok(['template' => $saved, 'list' => $this->repo()->adminSummaryList($this->baseUrl(), [])]);
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
        $this->repo()->delete((string)request()->param('id'), $this->baseUrl(), []);
        return $this->ok(['list' => $this->repo()->adminSummaryList($this->baseUrl(), [])]);
    }

    public function load(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        return $this->ok($this->repo()->loadFromTemplateFiles($this->baseUrl(), []), '模板已加载');
    }

    private function saveWith(array $input): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $list = $this->repo()->adminList($this->baseUrl(), []);
        foreach ($list as $template) {
            if ((string)$template['id'] === (string)($input['id'] ?? '')) {
                $template = array_replace($template, $input);
                return $this->ok(['template' => $this->repo()->save($template, $this->baseUrl(), [])]);
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

    private function templateFileOption(array $template, bool $includeDetails): array
    {
        $option = [
            'id' => (string)($template['templateFile'] ?? $template['id'] ?? ''),
            'name' => (string)($template['title'] ?? $template['id'] ?? ''),
            'type' => 'page',
            'cover' => (string)($template['cover'] ?? ''),
            'category' => (string)($template['category'] ?? '全部'),
            'fieldCount' => (int)($template['fieldCount'] ?? (is_array($template['fields'] ?? null) ? count($template['fields']) : 0)),
            'priority' => (int)($template['sort'] ?? 100),
        ];

        if ($includeDetails) {
            $option['fields'] = is_array($template['fields'] ?? null) ? $template['fields'] : [];
            $option['defaults'] = is_array($template['defaults'] ?? null) ? $template['defaults'] : [];
        }

        return $option;
    }
}
