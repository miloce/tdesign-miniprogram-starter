<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AppConfigService;
use Yzd\Services\RecordService;
use Yzd\Services\TemplateDefaults;
use Yzd\Services\TemplateRepository;
use Yzd\Services\UserService;

final class CodeController extends BaseController
{
    public function templates(): Response
    {
        $list = $this->templateRepo()->publicList($this->baseUrl(), TemplateDefaults::all($this->baseUrl()));
        return $this->ok([
            'categories' => $this->categories($list),
            'list' => $list,
        ]);
    }

    public function templateDetail(): Response
    {
        return $this->ok($this->findTemplate((string)request()->param('id')));
    }

    public function config(): Response
    {
        $config = AppConfigService::make()->get();
        $openid = UserService::make()->openid();
        $user = UserService::make()->get($openid);
        $config['user'] = [
            'isVip' => (bool)$user['isVip'],
            'quota' => (int)$user['quota'],
            'points' => (int)$user['points'],
            'vipExpireAt' => (string)($user['vipExpireAt'] ?? ''),
        ];
        return $this->ok($config);
    }

    public function createPreview(): Response
    {
        $input = $this->input();
        $template = $this->findTemplate((string)($input['templateId'] ?? ''));
        $form = is_array($input['form'] ?? null) ? $input['form'] : [];
        return $this->ok([
            'previewUrl' => $this->baseUrl() . '/preview/' . rawurlencode((string)$template['id']) . ($form ? '?' . http_build_query($form) : ''),
        ]);
    }

    public function pay(): Response
    {
        $config = AppConfigService::make()->get();
        if (empty($config['enablePayment']) || (float)$config['price'] <= 0) {
            return $this->ok(['paid' => true, 'free' => true]);
        }
        return $this->ok([
            'paid' => false,
            'outTradeNo' => 'MOCK' . date('YmdHis') . random_int(100, 999),
            'mockPay' => true,
        ]);
    }

    public function payConfirm(): Response
    {
        return $this->ok(['paid' => true, 'tradeState' => 'SUCCESS']);
    }

    public function generate(): Response
    {
        $input = $this->input();
        $openid = UserService::make()->openid();
        $template = $this->findTemplate((string)($input['templateId'] ?? ''));
        $form = is_array($input['form'] ?? null) ? $input['form'] : [];
        $record = RecordService::make()->create($template, $form, $openid, $this->shortBaseUrl());
        return $this->ok([
            'id' => $record['id'],
            'shortCode' => $record['shortCode'],
            'title' => $record['title'],
            'link' => $record['link'],
        ]);
    }

    public function records(): Response
    {
        $openid = UserService::make()->openid();
        $records = array_values(array_filter(RecordService::make()->all($this->shortBaseUrl()), fn (array $record): bool => (string)($record['openid'] ?? '') === $openid || UserService::make()->isAdmin()));
        return $this->ok($records);
    }

    public function profile(): Response
    {
        $openid = UserService::make()->openid();
        $user = UserService::make()->get($openid);
        $records = array_values(array_filter(RecordService::make()->all($this->shortBaseUrl()), fn (array $record): bool => (string)($record['openid'] ?? '') === $openid));
        return $this->ok([
            'name' => $user['nickname'],
            'avatar' => $user['avatar'],
            'vipText' => !empty($user['isVip']) ? 'VIP会员' : '免费生成模式',
            'quota' => (int)$user['quota'],
            'points' => (int)$user['points'],
            'isVip' => (bool)$user['isVip'],
            'isAdmin' => UserService::make()->isAdmin(),
            'totalCount' => count($records),
            'todayCount' => count(array_filter($records, fn (array $item): bool => str_starts_with((string)($item['createdAt'] ?? ''), date('Y-m-d')))),
        ]);
    }

    private function findTemplate(string $id): array
    {
        $list = $this->templateRepo()->publicList($this->baseUrl(), TemplateDefaults::all($this->baseUrl()));
        foreach ($list as $template) {
            if ((string)$template['id'] === $id) {
                return $template;
            }
        }
        return $list[0];
    }

    private function templateRepo(): TemplateRepository
    {
        return new TemplateRepository(root_path('storage'));
    }

    private function categories(array $templates): array
    {
        return array_values(array_unique(array_merge(['全部'], array_map(fn (array $item): string => (string)($item['category'] ?? '全部'), $templates))));
    }
}
