<?php

declare(strict_types=1);

namespace Yzd\Services;

final class WebTemplateService
{
    private const FILE_CACHE = 'template_file_cache.json';
    private const FILE_SUMMARY_CACHE = 'template_file_summary_cache.json';

    public function __construct(private readonly string $dir)
    {
    }

    public static function make(): self
    {
        $templatesRoot = function_exists('root_path')
            ? root_path('templates')
            : dirname(__DIR__, 2) . DIRECTORY_SEPARATOR . 'templates';

        return new self(rtrim($templatesRoot, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'web');
    }

    public function renderPage(string $templateId, array $context): ?string
    {
        $exactFile = $this->fileByKey((string)($context['templateFile'] ?? $templateId));
        return $exactFile === null ? null : $this->render((string)file_get_contents($exactFile), $context);
    }

    public function files(bool $includeHints = true): array
    {
        $files = $this->templateFiles();
        $signature = $this->fileSignature($files);
        $cacheName = $includeHints ? self::FILE_CACHE : self::FILE_SUMMARY_CACHE;
        $cache = Storage::make()->read($cacheName, []);

        if (($cache['signature'] ?? null) === $signature && is_array($cache['items'] ?? null)) {
            return $cache['items'];
        }

        $items = [];

        foreach ($files as $file) {
            $content = (string)file_get_contents($file);
            $meta = $this->meta($content);
            $id = pathinfo($file, PATHINFO_FILENAME);
            $items[] = [
                'id' => $id,
                'name' => (string)($meta['name'] ?? $id),
                'type' => (string)($meta['type'] ?? 'page'),
                'file' => basename($file),
                'path' => $file,
                'cover' => (string)($meta['cover'] ?? ''),
                'category' => (string)($meta['category'] ?? '全部'),
                'fields' => $this->fieldHintsFromContent($content, $meta),
                'defaults' => $this->defaultHintsFromContent($content, $meta),
                'priority' => (int)($meta['priority'] ?? 0),
            ];
        }

        usort($items, fn (array $a, array $b): int => strcmp((string)$a['id'], (string)$b['id']));
        $summaryItems = $this->summaryItems($items);
        Storage::make()->write(self::FILE_CACHE, [
            'signature' => $signature,
            'updatedAt' => date(DATE_ATOM),
            'items' => $items,
        ]);
        Storage::make()->write(self::FILE_SUMMARY_CACHE, [
            'signature' => $signature,
            'updatedAt' => date(DATE_ATOM),
            'items' => $summaryItems,
        ]);

        return $includeHints ? $items : $summaryItems;
    }

    public function clearCache(): void
    {
        Storage::make()->write(self::FILE_CACHE, []);
        Storage::make()->write(self::FILE_SUMMARY_CACHE, []);
    }

    public function pageDefinitions(bool $includeHints = true): array
    {
        return array_values(array_map(function (array $file) use ($includeHints): array {
            return [
                'id' => (string)$file['id'],
                'title' => (string)($file['name'] ?? $file['id']),
                'subtitle' => '',
                'cover' => (string)($file['cover'] ?? ''),
                'category' => (string)($file['category'] ?? '全部'),
                'templateFile' => (string)$file['id'],
                'tags' => [],
                'fieldCount' => (int)($file['fieldCount'] ?? (is_array($file['fields'] ?? null) ? count($file['fields']) : 0)),
                'fields' => $includeHints && is_array($file['fields'] ?? null) ? $file['fields'] : [],
                'defaults' => $includeHints && is_array($file['defaults'] ?? null) ? $file['defaults'] : [],
                'status' => 'enabled',
                'sort' => ((int)($file['priority'] ?? 0)) > 0 ? (int)$file['priority'] : 100,
            ];
        }, array_filter($this->files($includeHints), fn (array $file): bool => (string)($file['type'] ?? 'page') === 'page')));
    }

    public function fieldHints(string $key): array
    {
        $file = $this->fileByKey($key);
        if ($file === null) {
            return ['fields' => [], 'defaults' => []];
        }

        $content = (string)file_get_contents($file);
        $meta = $this->meta($content);
        return [
            'fields' => $this->fieldHintsFromContent($content, $meta),
            'defaults' => $this->defaultHintsFromContent($content, $meta),
        ];
    }

    public function renderMissing(array $context = []): ?string
    {
        foreach (['missing-404.html', '404.html'] as $name) {
            $file = $this->dir . DIRECTORY_SEPARATOR . $name;
            if (is_file($file) && is_readable($file)) {
                return $this->render((string)file_get_contents($file), $context);
            }
        }

        $templates = $this->templates('missing');
        if ($templates === []) {
            return null;
        }

        return $this->render($templates[0]['content'], $context);
    }

    public function templates(string $type): array
    {
        $files = $this->templateFiles();
        $templates = [];

        foreach ($files as $file) {
            $content = (string)file_get_contents($file);
            $meta = $this->meta($content);
            if (($meta['type'] ?? '') !== $type) {
                continue;
            }

            $templates[] = [
                'file' => $file,
                'meta' => $meta,
                'content' => $content,
                'priority' => (int)($meta['priority'] ?? 0),
            ];
        }

        usort($templates, fn (array $a, array $b): int => $b['priority'] <=> $a['priority']);
        return $templates;
    }

    private function templateFiles(): array
    {
        $files = glob($this->dir . DIRECTORY_SEPARATOR . '*.html') ?: [];
        sort($files, SORT_STRING);
        return $files;
    }

    private function fileSignature(array $files): array
    {
        return [
            'dir' => $this->dir,
            'files' => array_map(static fn (string $file): array => [
                'name' => basename($file),
                'mtime' => is_file($file) ? (int)filemtime($file) : 0,
                'size' => is_file($file) ? (int)filesize($file) : 0,
            ], $files),
        ];
    }

    private function summaryItems(array $items): array
    {
        return array_values(array_map(static function (array $item): array {
            $item['fieldCount'] = is_array($item['fields'] ?? null) ? count($item['fields']) : 0;
            unset($item['path'], $item['fields'], $item['defaults']);
            return $item;
        }, $items));
    }

    private function meta(string $content): array
    {
        if (!preg_match('/<!--\s*YZD_TEMPLATE\s*(\{.*?\})\s*-->/s', $content, $match)) {
            return [];
        }

        $data = json_decode($match[1], true);
        return is_array($data) ? $data : [];
    }

    private function fileByKey(string $key): ?string
    {
        $key = trim($key);
        if ($key === '') {
            return null;
        }

        $name = pathinfo($key, PATHINFO_FILENAME);
        foreach ([$name . '.html', $key] as $candidate) {
            $path = $this->dir . DIRECTORY_SEPARATOR . $candidate;
            if (is_file($path) && is_readable($path)) {
                return $path;
            }
        }

        return null;
    }

    private function fieldHintsFromContent(string $content, array $meta): array
    {
        if (is_array($meta['fields'] ?? null)) {
            return array_values($meta['fields']);
        }

        $fields = [];
        $keys = [];
        if (preg_match_all('/\{\{\s*field\.([a-zA-Z0-9_.-]+)\s*\}\}/', $content, $matches)) {
            $keys = array_merge($keys, $matches[1]);
        }
        if (str_contains($content, '{{{urlJson}}}') || preg_match('/\{\{\s*url\s*\}\}/', $content)) {
            array_unshift($keys, 'url');
        }

        foreach (array_values(array_unique($keys)) as $key) {
            $fields[] = [
                'key' => $key,
                'label' => $key === 'url' ? '链接地址' : $key,
                'type' => $key === 'url' ? 'url' : 'text',
                'placeholder' => $key === 'url' ? 'https://example.com/path' : '',
                'required' => true,
            ];
        }

        return $fields;
    }

    private function defaultHintsFromContent(string $content, array $meta): array
    {
        if (is_array($meta['defaults'] ?? null)) {
            return $meta['defaults'];
        }

        if (str_contains($content, '{{{urlJson}}}') || preg_match('/\{\{\s*url\s*\}\}/', $content)) {
            return ['url' => 'https://support.weixin.qq.com/cgi-bin/mmsupport-bin/showredpacket?receiveuri=NU_zx2m8EANoBN&check_type=2#wechat_redirect'];
        }

        return [];
    }

    private function render(string $content, array $context): string
    {
        $content = preg_replace('/<!--\s*YZD_TEMPLATE\s*\{.*?\}\s*-->\s*/s', '', $content) ?? $content;

        foreach ($context as $key => $value) {
            if (!is_scalar($value) && $value !== null) {
                continue;
            }

            $content = str_replace('{{{' . $key . '}}}', (string)$value, $content);
        }

        $content = (string)preg_replace_callback('/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/', function (array $match) use ($context): string {
            $value = $context[$match[1]] ?? '';
            return htmlspecialchars((string)$value, ENT_QUOTES, 'UTF-8');
        }, $content);

        $content = $this->withCopiedFrameRuntimeData($content);
        return AssetUrlService::make()->rewriteHtml($this->withCopiedFrameAutoOpen($content));
    }

    private function withCopiedFrameAutoOpen(string $content): string
    {
        if (!str_contains($content, 'copiedFrame') || str_contains($content, 'yzdAutoOpenCopiedFrame')) {
            return $content;
        }

        $script = <<<'HTML'
<script>
(function(){
  function tryOpen(frame) {
    try {
      var view = frame && frame.contentWindow;
      if (!view) return;
      if (hasNativeEntry(frame)) {
        return;
      }
      if (typeof view.onOpenClcik === 'function') {
        view.onOpenClcik();
        return;
      }
      if (typeof view.onOpenClick === 'function') {
        view.onOpenClick();
        return;
      }
      if (typeof view.printText === 'function') {
        view.printText();
      }
    } catch (error) {}
  }
  function templateData() {
    try {
      return JSON.parse(window.localStorage.getItem('templateDate') || '{}') || {};
    } catch (error) {
      return {};
    }
  }
  function cloudMsgHtml(data) {
    var html = data && data.msgHtml ? String(data.msgHtml).trim() : '';
    if (!html) return '';
    return html
      .replace(/https?:\/\/v1\.20it\.cn/g, '')
      .replace(/\/\/v1\.20it\.cn/g, '')
      .replace(/https?:\/\/wechat\.360wb\.cn/g, '')
      .replace(/https?:\/\/static\.360wb\.cn/g, '');
  }
  function hasNativeEntry(frame) {
    try {
      var doc = frame && frame.contentWindow && frame.contentWindow.document;
      if (!doc || !doc.getElementById) return false;
      return !!(
        doc.getElementById('entryScreen') ||
        doc.getElementById('entry-screen') ||
        doc.getElementById('entryMask') ||
        doc.getElementById('entry-mask') ||
        doc.getElementById('entry-button')
      );
    } catch (error) {
      return false;
    }
  }
  function frameReady(frame) {
    try {
      var doc = frame && frame.contentWindow && frame.contentWindow.document;
      return !!(doc && doc.body && (doc.readyState === 'interactive' || doc.readyState === 'complete'));
    } catch (error) {
      return false;
    }
  }
  function playMedia(frame) {
    try {
      var data = templateData();
      var view = frame && frame.contentWindow;
      var doc = view && view.document;
      var audio = doc && (doc.getElementById('music') || doc.getElementById('bgMusic') || doc.querySelector('audio'));
      if (audio && data.music && !audio.src) audio.src = data.music;
      if (audio) audio.play().catch(function(){});
    } catch (error) {}
  }
  function showCloudOpen(frame) {
    if (hasNativeEntry(frame) || document.getElementById('yzdCloudOpen')) return false;
    var data = templateData();
    var html = cloudMsgHtml(data);
    if (!html) return false;

    var css = '.yzd-cloud-open{background:#000;position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#000;font-size:15px;text-align:center}.yzd-cloud-open img{width:7rem;margin-bottom:2rem;animation:yzdHeartbeat 2s cubic-bezier(0,0,0,1.74) .5s infinite}.yzd-cloud-open .text{max-width:76vw;font-size:1.2rem;font-weight:800;line-height:1.7;margin:0 auto;color:#000;white-space:pre-wrap;word-break:break-word}.yzd-cloud-open .panel{min-width:12rem;max-width:82vw;padding:2rem 1.4rem 1.5rem;border-radius:1.2rem;background:#fff}.yzd-cloud-open .btn,.open-main .btn{background:#07c160;color:#fff;border:0;padding:.7rem 3.2rem;font-size:1.2rem;cursor:pointer;margin-top:2rem;border-radius:10px}.open-main{background-color:#000;position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#000;font-size:15px;text-align:center}.open-main p{font-size:1.2rem;font-weight:800;margin:1rem}.open-main img{width:7rem;margin-bottom:2rem;animation:yzdHeartbeat 2s cubic-bezier(0,0,0,1.74) .5s infinite}.open-box img{max-width:70vw}.liwu img{width:5rem!important;margin:0 auto 150px}.liwu .text{font-size:1.2rem;color:#000;word-wrap:break-word;overflow-wrap:break-word;text-align:center;margin:-8rem auto 0 auto}@keyframes yzdHeartbeat{0%,100%{transform:scale(.95)}50%{transform:scale(1)}}';
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var open = document.createElement('div');
    open.id = 'yzdCloudOpen';
    open.innerHTML = html;
    open.addEventListener('click', function(){
      open.remove();
      tryOpen(frame);
      playMedia(frame);
      try { window.parent.postMessage({ source: 'pages', type: 'showBtn' }, '*'); } catch (error) {}
    }, { once: true });
    document.body.appendChild(open);
    return true;
  }
  window.yzdAutoOpenCopiedFrame = function(frame) {
    [180, 600, 1200].forEach(function(delay) {
      setTimeout(function(){ tryOpen(frame); }, delay);
    });
  };
  function handleFrame(frame, attempt) {
    attempt = attempt || 0;
    if (!frameReady(frame) && attempt < 20) {
      setTimeout(function(){ handleFrame(frame, attempt + 1); }, 100);
      return;
    }
    if (showCloudOpen(frame)) return;
    window.yzdAutoOpenCopiedFrame(frame);
  }
  var frame = document.getElementById('copiedFrame');
  if (frame) {
    frame.addEventListener('load', function(){ handleFrame(frame, 0); });
    setTimeout(function(){ handleFrame(frame, 0); }, 700);
  }
})();
</script>
HTML;

        if (str_contains($content, '</body>')) {
            return str_replace('</body>', $script . "\n</body>", $content);
        }

        return $content . $script;
    }

    private function withCopiedFrameRuntimeData(string $content): string
    {
        if (!str_contains($content, 'copiedFrame') || str_contains($content, 'window.templateData = dataInfo')) {
            return $content;
        }

        return str_replace(
            "    try { window.localStorage.setItem('templateDate', JSON.stringify(dataInfo)); } catch (error) {}",
            "    window.templateData = dataInfo;\n    try { window.localStorage.setItem('templateDate', JSON.stringify(dataInfo)); } catch (error) {}",
            $content
        );
    }
}
