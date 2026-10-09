<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\ContentSecurityService;
use Yzd\Services\UserService;

final class ContentSecurityController extends BaseController
{
    public function index(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $status = trim((string)request()->param('status', ''));
        $reviewStatus = trim((string)request()->param('reviewStatus', ''));
        $service = ContentSecurityService::make();

        return $this->ok([
            'summary' => $service->auditSummary(),
            'list' => array_slice($service->auditList($status, $reviewStatus), 0, 500),
        ]);
    }

    public function update(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $input = $this->input();
        $item = ContentSecurityService::make()->updateAudit(
            trim((string)($input['id'] ?? '')),
            trim((string)($input['reviewStatus'] ?? '')),
            trim((string)($input['note'] ?? '')),
            UserService::make()->openid()
        );

        return $item === null ? $this->fail('审核记录不存在或状态无效', 422) : $this->ok(['item' => $item]);
    }

    public function clear(): Response
    {
        if ($response = $this->requireAdmin()) {
            return $response;
        }

        $result = ContentSecurityService::make()->clearAuditRecords(
            trim((string)($this->input()['scope'] ?? ''))
        );

        return $result === null ? $this->fail('清理范围无效', 422) : $this->ok($result);
    }
}
