<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AssetUrlService;
use Yzd\Services\RecordService;
use Yzd\Services\TemplateMetricsService;
use Yzd\Services\TemplateRepository;
use Yzd\Services\WebTemplateService;

final class PageController extends BaseController
{
    public function preview(string $id): Response
    {
        $id = $this->pathTemplateId($id, 'preview');
        if ((string)request()->param('miniActions', '') === '1') {
            return $this->html($this->withMiniProgramActions($id));
        }

        $template = $this->findTemplate($id);
        if ($template === null) {
            return $this->missingPage();
        }
        TemplateMetricsService::make()->track((string)$template['id']);
        return $this->render('预览效果', $template, request()->param());
    }

    public function previewHyphen(string $prefix, string $suffix): Response
    {
        return $this->preview($prefix . '-' . $suffix);
    }

    public function finalPage(string $id): Response
    {
        $id = $this->pathTemplateId($id, 'code');
        $template = $this->findTemplate($id);
        if ($template === null) {
            return $this->missingPage();
        }
        TemplateMetricsService::make()->track((string)$template['id']);
        return $this->render('专属链接', $template, request()->param());
    }

    public function finalPageHyphen(string $prefix, string $suffix): Response
    {
        return $this->finalPage($prefix . '-' . $suffix);
    }

    public function shortLink(string $shortCode): Response
    {
        $record = RecordService::make()->findByShortCode($shortCode, $this->shortBaseUrl());
        if (!$record) {
            return $this->missingPage();
        }
        $template = $this->findTemplate((string)$record['templateId']);
        if ($template === null) {
            return $this->missingPage();
        }
        TemplateMetricsService::make()->track((string)$template['id']);
        return $this->render('专属链接', $template, is_array($record['form'] ?? null) ? $record['form'] : []);
    }

    public function remoteTemplateAsset(string $path): Response
    {
        $path = ltrim($path, '/');
        if (!preg_match('/^template\/[A-Za-z0-9_.\/-]+$/', $path)) {
            return $this->html('Not Found', 404);
        }

        $local = realpath(root_path('public') . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $path));
        $templateRoot = realpath(root_path('public') . DIRECTORY_SEPARATOR . 'template');
        $isLocalTemplate = $local && $templateRoot && (
            $local === $templateRoot
            || str_starts_with($local, $templateRoot . DIRECTORY_SEPARATOR)
        );
        if ($isLocalTemplate && is_file($local)) {
            if ($this->mustBeServedDirectly($local)) {
                return $this->html('Static media must be served by Nginx/COS/CDN', 404);
            }

            return $this->templateAssetResponse((string)file_get_contents($local), $path);
        }

        return $this->html('Template asset not found', 404);
    }

    private function mustBeServedDirectly(string $path): bool
    {
        return in_array(strtolower(pathinfo($path, PATHINFO_EXTENSION)), ['mp4', 'm4a', 'mp3', 'wav', 'ogg', 'webm', 'mov'], true);
    }

    private function templateAssetResponse(string $content, string $path): Response
    {
        return Response::create($content, 'html', 200)->header([
            'Content-Type' => $this->contentType($path),
            'Cache-Control' => 'public, max-age=3600',
            'Access-Control-Allow-Origin' => '*',
        ]);
    }

    private function findTemplate(string $id): ?array
    {
        return (new TemplateRepository(root_path('storage')))->findPublic($id, $this->baseUrl(), [], false);
    }

    private function pathTemplateId(string $fallback, string $prefix): string
    {
        $path = trim((string)request()->pathinfo(), '/');
        $needle = $prefix . '/';
        if (str_starts_with($path, $needle)) {
            $id = trim(substr($path, strlen($needle)), '/');
            if ($id !== '') {
                return rawurldecode($id);
            }
        }

        return $fallback;
    }

    private function render(string $heading, array $template, array $input): Response
    {
        $id = (string)($template['id'] ?? '');
        $defaults = is_array($template['defaults'] ?? null) ? $this->scalarValues($template['defaults']) : [];
        $values = array_replace($defaults, $this->values($template, $input));
        $values = AssetUrlService::make()->assetValues($values);
        $text = implode("\n", array_values(array_filter($values, fn ($value): bool => trim((string)$value) !== '')));
        $context = array_merge([
            'title' => (string)($values['title'] ?? $template['title'] ?? ''),
            'templateFile' => (string)($template['templateFile'] ?? $id),
            'heading' => $heading,
            'content' => $this->primaryText($values, '点击确定，查看专属内容'),
            'intro' => $this->primaryText($values, '点我'),
            'ftitle' => (string)($values['ftitle'] ?? $values['title'] ?? $template['title'] ?? ''),
            'mtitle' => (string)($values['mtitle'] ?? $values['title'] ?? $template['title'] ?? ''),
            'backgroundImg' => (string)($values['backgroundImg'] ?? $values['background'] ?? ''),
            'backgroundImageCss' => $this->cssUrl((string)($values['backgroundImg'] ?? $values['background'] ?? '')),
            'music' => (string)($values['music'] ?? ''),
            'opacity' => (string)($values['opacity'] ?? '90'),
            'opacityRatio' => number_format(max(0, min(100, (float)($values['opacity'] ?? 90))) / 100, 2, '.', ''),
            'festival' => (string)($values['festival'] ?? $template['title'] ?? '节日祝福'),
            'wish' => $this->primaryText($values, '愿你平安顺遂，日日都有好心情。'),
            'messagesJson' => json_encode($this->messages($values), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'valuesTextJson' => json_encode($text, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'dataInfoJson' => json_encode($this->templateRuntimeValues($values), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            'url' => (string)($values['url'] ?? ''),
            'urlJson' => json_encode((string)($values['url'] ?? ''), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
        ], $this->fieldContext($values));

        if ((string)($input['miniActions'] ?? '') === '1') {
            return $this->html($this->withMiniProgramActions((string)($input['templateId'] ?? $id)));
        }

        $html = WebTemplateService::make()->renderPage($id, $context);
        return $this->html($html ?? '<!doctype html><html lang="zh-CN"><meta charset="utf-8"><title>模板不存在</title><body>模板不存在</body></html>', $html === null ? 500 : 200);
    }

    private function withMiniProgramActions(string $templateId): string
    {
        $makePath = '/pages/make/index?id=' . rawurlencode($templateId);
        $makePathJson = json_encode($makePath, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        $query = request()->get();
        unset($query['miniActions'], $query['templateId']);
        $path = '/' . trim((string)request()->pathinfo(), '/');
        $frameUrl = $path . ($query ? '?' . http_build_query($query) : '');
        $frameUrlAttr = htmlspecialchars($frameUrl, ENT_QUOTES, 'UTF-8');

        return <<<HTML
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no,viewport-fit=cover">
  <title>预览效果</title>
  <style>
    *{box-sizing:border-box}
    html,body,#container{width:100%;height:100%;margin:0;overflow:hidden;background:#fff}
    #container{position:relative;height:100vh}
    #yzdFrame{display:block;width:100%;height:100vh;border:0;background:#fff}
    .yzd-shell-btn{position:fixed;bottom:calc(10vh + env(safe-area-inset-bottom));z-index:9999;width:30vw;min-width:112px;max-width:168px;height:50px;border:0;background:#5a95e8;color:#fff;font-size:18px;font-weight:700;line-height:50px;text-align:center;box-shadow:0 6px 16px rgba(36,98,168,.22)}
    .yzd-shell-btn--back{left:0;border-radius:0 25px 25px 0}
    .yzd-shell-btn--make{right:0;border-radius:25px 0 0 25px}
  </style>
</head>
<body>
  <div id="container">
    <iframe id="yzdFrame" src="{$frameUrlAttr}" allow="autoplay; fullscreen"></iframe>
    <button class="yzd-shell-btn yzd-shell-btn--back" type="button" onclick="window.yzdPreviewBack()">返回</button>
    <button class="yzd-shell-btn yzd-shell-btn--make" type="button" onclick="window.yzdPreviewMake()">制作</button>
  </div>
  <script defer src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
  <script>
  (function(){
    var makePath = {$makePathJson};
    window.yzdPreviewBack = function(){
      if (window.wx && wx.miniProgram) {
        wx.miniProgram.navigateBack();
        return;
      }
      history.back();
    };
    window.yzdPreviewMake = function(){
      if (window.wx && wx.miniProgram) {
        wx.miniProgram.navigateTo({url: makePath});
        return;
      }
      location.href = makePath;
    };
  })();
  </script>
</body>
</html>
HTML;
    }

    private function missingPage(): Response
    {
        $template = WebTemplateService::make()->renderMissing();
        if ($template === null) {
            $template = $this->missingTemplate();
        }

        return $this->html($template ?? '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>链接已失效</title><style>
*{box-sizing:border-box}body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:#333}.box{text-align:center;padding:24px}.icon{font-size:58px;margin-bottom:18px}.title{font-size:20px;font-weight:700;margin-bottom:10px}.msg{color:#8a8a8a;font-size:14px;line-height:1.7}.btn{position:fixed;right:0;bottom:150px;width:110px;height:60px;border-radius:30px 0 0 30px;background:rgba(25,137,250,.92);color:#fff;text-decoration:none;display:flex;align-items:center;justify-content:center;font-weight:600;box-shadow:0 4px 14px rgba(25,137,250,.32)}</style></head><body><section class="box"><div class="icon">😢</div><div class="title">链接已失效</div><div class="msg">页面不存在或已被删除，请返回小程序重新生成。</div></section><a class="btn" href="javascript:history.back()">返回</a></body></html>', 404);
    }

    private function missingTemplate(): ?string
    {
        $candidates = [
            rtrim(root_path('templates'), DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . '没有页面404',
            dirname(root_path()) . DIRECTORY_SEPARATOR . '模板' . DIRECTORY_SEPARATOR . '没有页面404',
            dirname(root_path(), 2) . DIRECTORY_SEPARATOR . '模板' . DIRECTORY_SEPARATOR . '没有页面404',
        ];

        foreach ($candidates as $path) {
            if (is_file($path) && is_readable($path)) {
                return (string)file_get_contents($path);
            }
        }

        return null;
    }

    private function html(string $html, int $code = 200): Response
    {
        return Response::create($html, 'html', $code)->header(['Content-Type' => 'text/html; charset=utf-8']);
    }

    private function values(array $template, array $input): array
    {
        $values = [];
        foreach (($template['fields'] ?? []) as $field) {
            $value = (string)($input[$field['key']] ?? $template['defaults'][$field['key']] ?? '');
            $values[(string)$field['key']] = $value;
        }
        return $values;
    }

    private function scalarValues(array $values): array
    {
        return array_filter($values, fn ($value): bool => is_scalar($value) || $value === null);
    }

    private function templateRuntimeValues(array $values): array
    {
        foreach ($values as $key => $value) {
            if (is_string($value)) {
                $values[$key] = preg_replace("/\r\n|\r|\n/", "\r\n", $value) ?? $value;
            }
        }

        return $values;
    }

    private function primaryText(array $values, string $fallback): string
    {
        foreach (['content', 'message', 'wish', 'story', 'reason', 'promise', 'nextContent'] as $key) {
            $value = trim((string)($values[$key] ?? ''));
            if ($value !== '') {
                return $value;
            }
        }

        return $fallback;
    }

    private function messages(array $values): array
    {
        $messages = array_values(array_filter(array_map('trim', array_map('strval', $values))));
        return $messages === [] ? ['保存好心情', '烦恼全消失', '今日加油', '快乐加载中', '记得天天开心'] : $messages;
    }

    private function fieldContext(array $values): array
    {
        $context = [];
        foreach ($values as $key => $value) {
            $context['field.' . $key] = (string)$value;
        }
        return $context;
    }

    private function cssUrl(string $url): string
    {
        $url = trim($url);
        if ($url === '') {
            return 'none';
        }

        return 'url("' . str_replace(['\\', '"', "\n", "\r"], ['\\\\', '\"', '', ''], $url) . '")';
    }

    private function contentType(string $path): string
    {
        return match (strtolower(pathinfo($path, PATHINFO_EXTENSION))) {
            'css' => 'text/css; charset=utf-8',
            'js', 'mjs' => 'application/javascript; charset=utf-8',
            'json', 'map' => 'application/json; charset=utf-8',
            'png' => 'image/png',
            'jpg', 'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'webp' => 'image/webp',
            'svg' => 'image/svg+xml',
            'mp3' => 'audio/mpeg',
            'm4a' => 'audio/mp4',
            'mp4' => 'video/mp4',
            'woff' => 'font/woff',
            'woff2' => 'font/woff2',
            'ttf' => 'font/ttf',
            'otf' => 'font/otf',
            'zip' => 'application/zip',
            'obj' => 'text/plain; charset=utf-8',
            default => 'text/html; charset=utf-8',
        };
    }
}
