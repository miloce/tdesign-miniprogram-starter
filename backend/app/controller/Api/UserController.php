<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\ContentSecurityException;
use Yzd\Services\ContentSecurityService;
use Yzd\Services\ObjectStorageService;
use Yzd\Services\UserAssetService;
use Yzd\Services\UserService;

final class UserController extends BaseController
{
    public function profile(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $input = $this->input();
        $service = UserService::make();
        $nickname = trim((string)($input['nickname'] ?? ''));
        if ($nickname === '') {
            return $this->fail('请输入昵称', 422);
        }
        try {
            ContentSecurityService::make()->assertProfileSafe(['nickname' => $nickname], $this->authOpenid());
        } catch (ContentSecurityException $exception) {
            return $this->fail($exception->getMessage(), $exception->httpStatus());
        }

        $nickname = function_exists('mb_substr') ? mb_substr($nickname, 0, 30) : substr($nickname, 0, 30);
        $avatar = trim((string)($input['avatar'] ?? ''));
        $user = $service->mutate($this->authOpenid(), function (array $current) use ($nickname, $avatar): array {
            $current['nickname'] = $nickname;
            if ($avatar !== '') {
                $current['avatar'] = $avatar;
            }
            return $current;
        });
        return $this->ok(['userInfo' => $service->publicInfo($user)]);
    }

    public function avatar(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $file = $_FILES['avatar'] ?? null;
        if (!$file || (int)($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            return $this->fail('头像上传失败', 422);
        }

        $extension = strtolower(pathinfo((string)($file['name'] ?? ''), PATHINFO_EXTENSION));
        if (!in_array($extension, ['jpg', 'jpeg', 'png', 'gif', 'webp'], true)) {
            return $this->fail('头像格式不支持', 422);
        }

        $openid = $this->authOpenid();
        try {
            ContentSecurityService::make()->assertUploadedImageSafe((string)$file['tmp_name'], $openid, 'avatar');
        } catch (ContentSecurityException $exception) {
            return $this->fail($exception->getMessage(), $exception->httpStatus());
        }

        $name = md5($openid . microtime(true) . random_int(1000, 9999)) . '.' . $extension;
        $key = 'uploads/avatars/' . $name;
        $saved = $this->saveUploadedFile((string)$file['tmp_name'], $key);
        if ($saved === null) {
            return $this->fail('头像保存失败', 500);
        }

        [$url, $remoteKey, $localTarget] = $saved;
        try {
            ContentSecurityService::make()->submitMediaAsync($url, 'image', $openid, 'avatar', false);
        } catch (ContentSecurityException $exception) {
            if ($remoteKey !== '') {
                ObjectStorageService::make()->delete($remoteKey);
            }
            if ($localTarget !== '' && is_file($localTarget)) {
                unlink($localTarget);
            }
            return $this->fail($exception->getMessage(), $exception->httpStatus());
        }

        return $this->ok(['avatar' => $url]);
    }

    public function upload(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $file = $_FILES['file'] ?? null;
        if (!$file || (int)($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
            return $this->fail('文件上传失败', 422);
        }

        $type = trim((string)request()->param('type', 'file'));
        $extension = strtolower(pathinfo((string)($file['name'] ?? ''), PATHINFO_EXTENSION));
        $allowed = match ($type) {
            'image' => ['jpg', 'jpeg', 'png', 'gif', 'webp'],
            'music', 'audio' => ['mp3', 'm4a', 'wav', 'aac', 'ogg'],
            default => ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp3', 'm4a', 'wav', 'aac', 'ogg', 'txt', 'json'],
        };

        if (!in_array($extension, $allowed, true)) {
            return $this->fail('文件格式不支持', 422);
        }

        $openid = $this->authOpenid();
        if ($type === 'image') {
            try {
                ContentSecurityService::make()->assertUploadedImageSafe((string)$file['tmp_name'], $openid, 'upload.image');
            } catch (ContentSecurityException $exception) {
                return $this->fail($exception->getMessage(), $exception->httpStatus());
            }
        }

        $dirName = in_array($type, ['image', 'music', 'audio'], true) ? ($type === 'audio' ? 'music' : $type) : 'files';
        $name = md5($openid . $type . microtime(true) . random_int(1000, 9999)) . '.' . $extension;
        $key = 'uploads/' . $dirName . '/' . $name;
        $saved = $this->saveUploadedFile((string)$file['tmp_name'], $key);
        if ($saved === null) {
            return $this->fail('文件保存失败', 500);
        }
        [$url, $remoteKey, $localTarget] = $saved;

        try {
            if ($type === 'image') {
                ContentSecurityService::make()->submitMediaAsync($url, 'image', $openid, 'upload.image', false);
            }
            if (in_array($type, ['music', 'audio'], true)) {
                ContentSecurityService::make()->submitMediaAsync($url, 'audio', $openid, 'upload.audio', true);
            }
        } catch (ContentSecurityException $exception) {
            if ($remoteKey !== '') {
                ObjectStorageService::make()->delete($remoteKey);
            }
            if ($localTarget !== '' && is_file($localTarget)) {
                unlink($localTarget);
            }
            return $this->fail($exception->getMessage(), $exception->httpStatus());
        }

        if (in_array($type, ['image', 'music', 'audio'], true)) {
            UserAssetService::make()->add($openid, $type, $url, (string)($file['name'] ?? $name));
        }

        return $this->ok(['url' => $url, 'name' => (string)($file['name'] ?? $name)]);
    }

    /**
     * @return array{0:string,1:string,2:string}|null
     */
    private function saveUploadedFile(string $tmpPath, string $key): ?array
    {
        $objectStorage = ObjectStorageService::make();
        if ($objectStorage->enabled()) {
            try {
                return [$objectStorage->putFile($tmpPath, $key, $objectStorage->contentType($key)), $key, ''];
            } catch (\Throwable) {
                return null;
            }
        }

        $relative = str_replace('/', DIRECTORY_SEPARATOR, ltrim($key, '/'));
        $target = root_path('public') . $relative;
        $dir = dirname($target);
        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        if (!move_uploaded_file($tmpPath, $target)) {
            return null;
        }

        return [$this->baseUrl() . '/' . str_replace(DIRECTORY_SEPARATOR, '/', $relative), '', $target];
    }
}
