<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AppConfigService;
use Yzd\Services\UserService;

final class ConfigController extends BaseController
{
    public function read(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $user = UserService::make()->get(UserService::make()->openid());
        return $this->ok([
            'adminOpenid' => UserService::make()->adminOpenid(),
            'appConfig' => AppConfigService::make()->get(),
            'userState' => ['points' => $user['points'], 'quota' => $user['quota'], 'isVip' => $user['isVip']],
        ]);
    }

    public function save(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }
        $input = $this->input();
        $config = AppConfigService::make()->save(is_array($input['appConfig'] ?? null) ? $input['appConfig'] : $input);
        if (isset($input['userState']) && is_array($input['userState'])) {
            $service = UserService::make();
            $service->mutate($service->openid(), function (array $user) use ($input): array {
                $user['points'] = (int)($input['userState']['points'] ?? $user['points']);
                $user['quota'] = (int)($input['userState']['quota'] ?? $user['quota']);
                $user['isVip'] = (bool)($input['userState']['isVip'] ?? $user['isVip']);
                return $user;
            });
        }
        return $this->ok(['appConfig' => $config]);
    }
}
