<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\ObjectStorageService;

final class FileController extends BaseController
{
    private const BLOCKED_EXTENSIONS = ['php', 'phtml', 'phar', 'exe', 'bat', 'cmd', 'ps1', 'sh', 'cgi', 'pl'];

    public function index(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $prefix = (string)request()->param('prefix', '');
        $marker = (string)request()->param('marker', '');
        $limit = (int)request()->param('limit', 100);

        try {
            return $this->ok(ObjectStorageService::make()->listFiles($prefix, $limit, $marker));
        } catch (\Throwable $exception) {
            return $this->fail('文件列表读取失败：' . $this->friendlyStorageError($exception), 500);
        }
    }

    public function upload(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $prefix = $this->uploadPrefix((string)request()->param('prefix', 'uploads/files'));
        $files = $this->uploadedFiles();
        if ($files === []) {
            return $this->fail('请选择要上传的文件', 422);
        }

        $storage = ObjectStorageService::make();
        $uploaded = [];
        foreach ($files as $file) {
            if ((int)($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
                return $this->fail('文件上传失败：' . (string)($file['name'] ?? ''), 422);
            }

            $name = $this->safeFileName((string)($file['name'] ?? 'file'));
            $extension = strtolower(pathinfo($name, PATHINFO_EXTENSION));
            if ($extension === '' || in_array($extension, self::BLOCKED_EXTENSIONS, true)) {
                return $this->fail('文件格式不支持：' . $name, 422);
            }

            $key = $prefix . '/' . date('YmdHis') . '-' . substr(md5($name . microtime(true)), 0, 8) . '-' . $name;
            try {
                $url = $storage->enabled()
                    ? $storage->putFile((string)$file['tmp_name'], $key)
                    : $this->saveLocalFile((string)$file['tmp_name'], $key, $storage);
            } catch (\Throwable $exception) {
                return $this->fail('文件保存失败：' . $exception->getMessage(), 500);
            }

            $uploaded[] = [
                'key' => $storage->objectKey($key),
                'name' => $name,
                'url' => $url,
                'size' => (int)($file['size'] ?? 0),
            ];
        }

        return $this->ok(['uploaded' => $uploaded]);
    }

    public function delete(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $key = trim((string)request()->param('key', ''));
        if ($key === '') {
            return $this->fail('文件 Key 必填', 422);
        }

        $storage = ObjectStorageService::make();
        if ($storage->enabled()) {
            $storage->delete($key);
        } else {
            $this->deleteLocalFile($key, $storage);
        }

        return $this->ok();
    }

    public function syncStatic(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $storage = ObjectStorageService::make();
        if (!$storage->enabled()) {
            return $this->fail('LightCOS 未配置完整，无法同步', 422);
        }

        $dir = trim((string)request()->param('dir', 'static'));
        if (!in_array($dir, ['static', 'template', 'assets', 'uploads'], true)) {
            return $this->fail('同步目录不支持', 422);
        }

        $dryRun = filter_var(request()->param('dryRun', false), FILTER_VALIDATE_BOOL);
        $offset = max(0, (int)request()->param('offset', 0));
        $limit = max(1, min(50, (int)request()->param('limit', 15)));
        $root = rtrim(root_path('public'), DIRECTORY_SEPARATOR);

        return $this->ok([
            'dir' => $dir,
            'summary' => $storage->uploadDirectoryBatch($root . DIRECTORY_SEPARATOR . $dir, $dir, $offset, $limit, $dryRun),
        ]);
    }

    private function uploadedFiles(): array
    {
        $files = $_FILES['files'] ?? $_FILES['file'] ?? null;
        if (!is_array($files)) {
            return [];
        }

        if (!is_array($files['name'] ?? null)) {
            return [$files];
        }

        $items = [];
        foreach ($files['name'] as $index => $name) {
            $items[] = [
                'name' => $name,
                'type' => $files['type'][$index] ?? '',
                'tmp_name' => $files['tmp_name'][$index] ?? '',
                'error' => $files['error'][$index] ?? UPLOAD_ERR_NO_FILE,
                'size' => $files['size'][$index] ?? 0,
            ];
        }

        return $items;
    }

    private function friendlyStorageError(\Throwable $exception): string
    {
        $message = $exception->getMessage();
        if (str_contains($message, 'cURL error 60') || str_contains($message, 'SSL certificate problem')) {
            return 'COS HTTPS 证书校验失败。请在服务器 backend/.env 设置 YZD_COS_CA_FILE 为有效 cacert.pem 路径，或临时设置 YZD_COS_SSL_VERIFY=false 后重启 PHP-FPM。原始错误：' . $message;
        }

        return $message;
    }

    private function uploadPrefix(string $prefix): string
    {
        $prefix = trim(str_replace('\\', '/', $prefix), '/');
        if ($prefix === '') {
            return 'uploads/files';
        }

        $cosPrefix = ObjectStorageService::make()->prefix();
        if ($cosPrefix !== '' && ($prefix === $cosPrefix || str_starts_with($prefix, $cosPrefix . '/'))) {
            $prefix = trim(substr($prefix, strlen($cosPrefix)), '/');
        }

        return $prefix !== '' ? $prefix : 'uploads/files';
    }

    private function safeFileName(string $name): string
    {
        $name = trim(basename(str_replace('\\', '/', $name)));
        $name = preg_replace('/[^\pL\pN._-]+/u', '-', $name) ?: 'file';
        $name = trim($name, '.-');
        return $name !== '' ? $name : 'file';
    }

    private function saveLocalFile(string $tmpPath, string $key, ObjectStorageService $storage): string
    {
        $relative = $this->localRelativeKey($storage->objectKey($key), $storage);
        $target = root_path('public') . str_replace('/', DIRECTORY_SEPARATOR, $relative);
        $dir = dirname($target);
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }
        if (!move_uploaded_file($tmpPath, $target)) {
            throw new \RuntimeException('本地文件保存失败');
        }

        return $storage->publicUrl($key);
    }

    private function deleteLocalFile(string $key, ObjectStorageService $storage): void
    {
        $relative = $this->localRelativeKey($key, $storage);
        $target = realpath(root_path('public') . str_replace('/', DIRECTORY_SEPARATOR, $relative));
        $publicRoot = realpath(root_path('public'));
        if (!$target || !$publicRoot || !str_starts_with($target, $publicRoot . DIRECTORY_SEPARATOR) || !is_file($target)) {
            return;
        }

        unlink($target);
    }

    private function localRelativeKey(string $key, ObjectStorageService $storage): string
    {
        $key = trim(str_replace('\\', '/', $key), '/');
        $prefix = $storage->prefix();
        if ($prefix !== '' && ($key === $prefix || str_starts_with($key, $prefix . '/'))) {
            $key = trim(substr($key, strlen($prefix)), '/');
        }

        if ($key === '' || str_contains($key, '..')) {
            throw new \InvalidArgumentException('文件路径非法');
        }

        return $key;
    }
}
