<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\UserService;

final class UserController extends BaseController
{
    public function update(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $input = $this->input();
        $openid = trim((string)($input['openid'] ?? ''));
        if ($openid === '') {
            return $this->fail('缺少用户 OpenID', 422);
        }

        $service = UserService::make();
        $users = $service->all();
        if (!isset($users[$openid])) {
            return $this->fail('用户不存在', 404);
        }

        $saved = $service->mutate($openid, function (array $user) use ($input): array {
            foreach (['nickname', 'avatar', 'role', 'status', 'vipExpireAt', 'phone', 'remark'] as $key) {
                if (array_key_exists($key, $input)) {
                    $user[$key] = trim((string)$input[$key]);
                }
            }
            if (array_key_exists('points', $input)) {
                $user['points'] = max(0, (int)$input['points']);
            }
            if (array_key_exists('quota', $input)) {
                $user['quota'] = max(0, (int)$input['quota']);
            }
            if (array_key_exists('isVip', $input)) {
                $user['isVip'] = filter_var($input['isVip'], FILTER_VALIDATE_BOOLEAN);
            }

            $user['role'] = in_array((string)($user['role'] ?? 'user'), ['admin', 'user'], true) ? $user['role'] : 'user';
            $user['status'] = in_array((string)($user['status'] ?? 'active'), ['active', 'disabled'], true) ? $user['status'] : 'active';
            return $user;
        });

        return $this->ok(['user' => $service->adminInfo($saved)]);
    }

    public function delete(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $openid = trim((string)request()->param('openid'));
        if ($openid === '') {
            return $this->fail('缺少用户 OpenID', 422);
        }

        $service = UserService::make();
        if ($openid === $service->adminOpenid()) {
            return $this->fail('不能删除当前管理员账号', 422);
        }

        if (!$service->delete($openid)) {
            return $this->fail('用户不存在', 404);
        }

        return $this->ok();
    }
}
