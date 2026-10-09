<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AssetUrlService;

final class UtilityController extends BaseController
{
    public function searchHistory(): Response
    {
        return $this->ok(['historyWords' => ['表白代码', '生日祝福', '烟花', '照片墙', '挽回文案', '节日祝福']], '请求成功');
    }

    public function searchPopular(): Response
    {
        return $this->ok(['popularWords' => ['520表白网页', '生日快乐代码', '闺蜜友情相册', '道歉挽回链接', '节日祝福模板', '烟花动画']], '请求成功');
    }

    public function personalInfo(): Response
    {
        return $this->ok([
            'name' => '云栈点用户',
            'avatar' => AssetUrlService::make()->url('/static/avatar1.png', $this->baseUrl()),
            'gender' => 2,
            'birth' => '2000-01-01',
            'address' => ['110000', '110100'],
            'introduction' => '用云栈点生成专属代码。',
            'photos' => [],
        ]);
    }

    public function dataCenter(): Response
    {
        $path = request()->pathinfo();
        $map = [
            'dataCenter/member' => [['name' => '浏览量', 'number' => '202W'], ['name' => 'PV', 'number' => '233W'], ['name' => 'UV', 'number' => '102W']],
            'dataCenter/interaction' => [['name' => '浏览量', 'number' => '919'], ['name' => '点赞量', 'number' => '887'], ['name' => '分享量', 'number' => '104'], ['name' => '收藏', 'number' => '47']],
            'dataCenter/complete-rate' => [['time' => '12:00', 'percentage' => '80'], ['time' => '14:00', 'percentage' => '60'], ['time' => '16:00', 'percentage' => '85']],
            'dataCenter/area' => [['标题' => '表白代码', '全球' => '4442', '华北' => '456', '华东' => '456']],
        ];
        return $this->ok(['list' => $map[$path] ?? []]);
    }
}
