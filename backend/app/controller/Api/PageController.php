<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\RecordService;
use Yzd\Services\TemplateDefaults;
use Yzd\Services\TemplateRepository;

final class PageController extends BaseController
{
    public function preview(string $id): Response
    {
        return $this->render('预览效果', $this->findTemplate($id), request()->param());
    }

    public function finalPage(string $id): Response
    {
        return $this->render('专属链接', $this->findTemplate($id), request()->param());
    }

    public function shortLink(string $shortCode): Response
    {
        $record = RecordService::make()->findByShortCode($shortCode, $this->shortBaseUrl());
        if (!$record) {
            return Response::create('短链不存在', 'html', 404);
        }
        return $this->render('专属链接', $this->findTemplate((string)$record['templateId']), is_array($record['form'] ?? null) ? $record['form'] : []);
    }

    private function findTemplate(string $id): array
    {
        $list = (new TemplateRepository(root_path('storage')))->publicList($this->baseUrl(), TemplateDefaults::all($this->baseUrl()));
        foreach ($list as $template) {
            if ((string)$template['id'] === $id) {
                return $template;
            }
        }
        return $list[0];
    }

    private function render(string $heading, array $template, array $input): Response
    {
        $title = htmlspecialchars((string)$template['title'], ENT_QUOTES, 'UTF-8');
        $subtitle = htmlspecialchars((string)$template['subtitle'], ENT_QUOTES, 'UTF-8');
        $fields = [];
        foreach (($template['fields'] ?? []) as $field) {
            $value = (string)($input[$field['key']] ?? $template['defaults'][$field['key']] ?? '');
            $fields[] = '<div class="field"><span>' . htmlspecialchars((string)$field['label'], ENT_QUOTES, 'UTF-8') . '</span><strong>' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '</strong></div>';
        }
        $html = '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . $title . '</title><style>
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f6f7fb;color:#1f2937}
.page{min-height:100vh;padding:32px 20px;box-sizing:border-box;background:linear-gradient(160deg,#fff 0%,#ffe9f2 45%,#eaf4ff 100%)}
.card{max-width:560px;margin:0 auto;background:rgba(255,255,255,.92);border-radius:20px;padding:28px;box-shadow:0 20px 60px rgba(31,41,55,.14)}
.eyebrow{font-size:14px;color:#e03997;font-weight:700}.title{font-size:34px;line-height:1.15;margin:12px 0}.sub{color:#5f6b7a;line-height:1.7}
.field{display:flex;justify-content:space-between;gap:18px;padding:16px 0;border-bottom:1px solid #edf0f5}.field span{color:#6b7280}.field strong{text-align:right}
.heart{font-size:52px;margin:26px 0 8px;animation:pulse 1.2s infinite}.btn{display:block;margin-top:24px;padding:14px 18px;border-radius:12px;background:#e03997;color:#fff;text-align:center;text-decoration:none;font-weight:700}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}</style></head><body><main class="page"><section class="card"><div class="eyebrow">' . htmlspecialchars($heading, ENT_QUOTES, 'UTF-8') . '</div><h1 class="title">' . $title . '</h1><p class="sub">' . $subtitle . '</p><div class="heart">♥</div>' . implode('', $fields) . '<a class="btn" href="javascript:history.back()">返回小程序</a></section></main></body></html>';
        return Response::create($html, 'html')->header(['Content-Type' => 'text/html; charset=utf-8']);
    }
}
