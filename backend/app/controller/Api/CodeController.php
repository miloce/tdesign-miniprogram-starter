<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AppConfigService;
use Yzd\Services\AssetUrlService;
use Yzd\Services\BackgroundLibraryService;
use Yzd\Services\ContentSecurityException;
use Yzd\Services\ContentSecurityService;
use Yzd\Services\GenerationEntitlementService;
use Yzd\Services\MusicLibraryService;
use Yzd\Services\OrderService;
use Yzd\Services\PaymentGatewayService;
use Yzd\Services\RecordService;
use Yzd\Services\RewardTokenService;
use Yzd\Services\TemplateMetricsService;
use Yzd\Services\TemplateRepository;
use Yzd\Services\TextLibraryService;
use Yzd\Services\UserAssetService;
use Yzd\Services\UserService;
use RuntimeException;

final class CodeController extends BaseController
{
    public function templates(): Response
    {
        $list = $this->templateRepo()->publicSummaryList($this->baseUrl(), [], false);
        $page = max(1, (int)request()->param('page', 1));
        $pageSize = max(1, min(30, (int)request()->param('pageSize', 10)));
        $category = trim((string)request()->param('category', ''));
        $keyword = trim((string)request()->param('keyword', ''));
        $filtered = array_values(array_filter(
            $list,
            fn (array $template): bool => $this->templateMatches($template, $category, $keyword)
        ));
        $offset = ($page - 1) * $pageSize;

        return $this->ok([
            'categories' => $this->categories($list),
            'list' => array_map([$this, 'templateSummary'], array_slice($filtered, $offset, $pageSize)),
            'page' => $page,
            'pageSize' => $pageSize,
            'total' => count($filtered),
            'hasMore' => $offset + $pageSize < count($filtered),
        ]);
    }

    public function prefetchHome(): Response
    {
        $list = $this->templateRepo()->publicSummaryList($this->baseUrl(), [], false);
        $pageSize = 10;

        return $this->ok([
            'version' => 1,
            'generatedAt' => date(DATE_ATOM),
            'home' => [
                'templates' => [
                    'categories' => $this->categories($list),
                    'list' => array_map([$this, 'templateSummary'], array_slice($list, 0, $pageSize)),
                    'page' => 1,
                    'pageSize' => $pageSize,
                    'total' => count($list),
                    'hasMore' => $pageSize < count($list),
                    'category' => '全部',
                    'keyword' => '',
                ],
            ],
        ]);
    }

    public function templateDetail(): Response
    {
        $template = $this->findTemplate((string)request()->param('id'));
        return $template === null ? $this->fail('模板不存在或已停用', 404) : $this->ok($template);
    }

    public function config(): Response
    {
        $config = AppConfigService::make()->get();
        $service = UserService::make();
        $openid = $service->authenticatedOpenid();
        $config['user'] = $openid !== null ? $service->publicInfo($service->get($openid)) : null;
        return $this->ok($config);
    }

    public function textLibrary(): Response
    {
        return $this->ok([
            'categories' => $this->assetCategories('text'),
            'list' => $this->pagedAssets('text'),
            'page' => max(1, (int)request()->param('page', 1)),
        ]);
    }

    public function imageLibrary(): Response
    {
        return $this->ok([
            'categories' => $this->assetCategories('background'),
            'list' => $this->pagedAssets('background'),
            'page' => max(1, (int)request()->param('page', 1)),
        ]);
    }

    public function musicLibrary(): Response
    {
        return $this->ok([
            'categories' => $this->assetCategories('music'),
            'list' => $this->pagedAssets('music'),
            'page' => max(1, (int)request()->param('page', 1)),
        ]);
    }

    public function legacyConfig(): Response
    {
        $config = AppConfigService::make()->get();
        return $this->legacyOk([
            'version' => 1,
            'typevid' => 1,
            'pay' => !empty($config['enablePayment']),
            'enableMobileLogin' => false,
            'apiUrl' => $this->baseUrl() . '/apiv2',
            'demoPreviewUrl' => $this->baseUrl(),
            'sharePreviewUrl' => $this->shortBaseUrl(),
            'staticUrl' => AssetUrlService::make()->url('/static', $this->baseUrl()),
            'shareTitle' => '推荐一款超好用的文案代码制作小程序！',
            'forwardTitle' => '来自 Ta 的一封信~',
            'editNotice' => '禁止涉黄、涉赌、涉毒、谩骂、商业广告等违规内容。',
            'images' => ['user' => ['avatar' => AssetUrlService::make()->url('/static/avatar1.png', $this->baseUrl())]],
            'noAdCount' => 1,
        ]);
    }

    public function legacyCategories(string $type): Response
    {
        return $this->legacyOk($this->assetCategories($this->legacyType($type)));
    }

    public function legacyList(string $type): Response
    {
        return $this->legacyOk($this->legacyItems($this->legacyType($type)));
    }

    public function legacyRandText(): Response
    {
        $items = $this->assetItems('text');
        shuffle($items);
        return $this->legacyOk(array_map(fn (array $item): array => ['content' => (string)$item['content']], array_slice($items, 0, 2)));
    }

    public function legacyDataInfo(): Response
    {
        $template = $this->findTemplateOrFirst((string)request()->param('templateId', ''));
        if ($template === null) {
            return $this->legacyOk([], '模板不存在', 404);
        }

        return $this->legacyOk($this->legacyContentPayload($template, $template['defaults'] ?? [], '620'));
    }

    public function legacyContent(): Response
    {
        $nid = (string)request()->param('nid');
        $record = RecordService::make()->findByShortCode($nid, $this->shortBaseUrl());
        if ($record) {
            $template = $this->findTemplate((string)$record['templateId']);
            if ($template) {
                return $this->legacyOk($this->legacyContentPayload($template, is_array($record['form'] ?? null) ? $record['form'] : [], $nid, $record));
            }
        }

        $template = $this->findTemplateByNid($nid) ?? $this->findTemplateOrFirst('');
        if ($template === null) {
            return $this->legacyOk([], '内容不存在', 404);
        }

        return $this->legacyOk($this->legacyContentPayload($template, $template['defaults'] ?? [], $nid ?: '620'));
    }

    public function legacyAddView(): Response
    {
        $nid = (string)request()->param('nid');
        $record = RecordService::make()->findByShortCode($nid, $this->shortBaseUrl());
        if ($record) {
            TemplateMetricsService::make()->track((string)($record['templateId'] ?? ''));
        }

        return $this->legacyOk(['nid' => $nid, 'views' => 1]);
    }

    public function legacyUserInfo(): Response
    {
        $service = UserService::make();
        $user = $service->get((string)(request()->param('openid') ?: $service->openid()));
        $info = $service->publicInfo($user);
        return $this->legacyOk([
            'id' => $info['id'] ?? 0,
            'appid' => 1,
            'openid' => $info['openid'] ?? '',
            'nickname' => $info['nickname'] ?? '',
            'avatarUrl' => $info['avatar'] ?? '',
            'tel' => $info['phone'] ?? '',
            'isVip' => !empty($info['isVip']) ? 1 : 0,
            'score' => (int)($info['points'] ?? 0),
            'makeCount' => (int)($info['totalCount'] ?? 0),
            'freeCount' => (int)($info['quota'] ?? 0),
            'status' => 1,
            'expireTime' => $info['vipExpireAt'] ?? '',
            'create_time' => date('Y-m-d H:i:s'),
            'update_time' => date('Y-m-d H:i:s'),
        ]);
    }

    public function createPreview(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $input = $this->input();
        $template = $this->findTemplate((string)($input['templateId'] ?? ''));
        if ($template === null) {
            return $this->fail('模板不存在或已停用', 404);
        }
        $form = is_array($input['form'] ?? null) ? $input['form'] : [];
        try {
            ContentSecurityService::make()->assertFormLocallySafe($form, 'createPreview');
        } catch (ContentSecurityException $exception) {
            return $this->fail($exception->getMessage(), $exception->httpStatus());
        }
        return $this->ok([
            'previewUrl' => $this->baseUrl() . '/preview/' . rawurlencode((string)$template['id']) . ($form ? '?' . http_build_query($form) : ''),
        ]);
    }

    public function pay(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $config = AppConfigService::make()->get();
        if (empty($config['enablePayment']) || (float)$config['price'] <= 0) {
            return $this->ok(['paid' => true, 'free' => true]);
        }
        $input = $this->input();
        $template = $this->findTemplate((string)($input['templateId'] ?? ''));
        if ($template === null) {
            return $this->fail('模板不存在或已停用', 404);
        }
        $openid = $this->authOpenid();
        $order = OrderService::make()->create(
            'code',
            $openid,
            $this->yuanToCents($config['price']),
            '云栈点代码生成-' . (string)$template['title'],
            ['templateId' => (string)$template['id']]
        );
        try {
            return $this->ok(PaymentGatewayService::make()->createGoodsPayment(
                $order,
                $openid,
                trim((string)($input['loginCode'] ?? '')),
                (string)($config['codeProductId'] ?? ''),
                'code:' . (string)$template['id'],
                $this->clientContext($input)
            ));
        } catch (RuntimeException $exception) {
            return $this->fail($exception->getMessage(), 502);
        }
    }

    public function rewardClaim(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $template = $this->findTemplate((string)request()->param('templateId', ''));
        if ($template === null) {
            return $this->fail('模板不存在或已停用', 404);
        }

        return $this->ok([
            'rewardToken' => RewardTokenService::make()->issue($this->authOpenid(), (string)$template['id']),
        ]);
    }

    public function payConfirm(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $outTradeNo = trim((string)request()->param('outTradeNo', ''));
        $order = $outTradeNo !== '' ? OrderService::make()->get($outTradeNo) : null;
        if (!$order || (string)$order['openid'] !== $this->authOpenid() || (string)$order['type'] !== 'code') {
            return $this->fail('订单不存在', 404);
        }
        if (in_array((string)$order['status'], ['paid', 'consumed'], true)) {
            return $this->ok(['paid' => true, 'tradeState' => 'SUCCESS', 'outTradeNo' => $outTradeNo]);
        }

        try {
            $payment = PaymentGatewayService::make()->confirmOrder($order);
            if (!empty($payment['paid'])) {
                return $this->ok(['paid' => true, 'tradeState' => 'SUCCESS', 'outTradeNo' => $outTradeNo]);
            }
            return $this->ok([
                'paid' => false,
                'status' => (int)($payment['status'] ?? 1),
                'tradeState' => (string)($payment['tradeState'] ?? ''),
                'outTradeNo' => $outTradeNo,
            ]);
        } catch (RuntimeException $exception) {
            return $this->fail($exception->getMessage(), 502);
        }
    }

    public function generate(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $input = $this->input();
        $openid = $this->authOpenid();
        $template = $this->findTemplate((string)($input['templateId'] ?? ''));
        if ($template === null) {
            return $this->fail('模板不存在或已停用', 404);
        }
        $form = is_array($input['form'] ?? null) ? $input['form'] : [];
        try {
            ContentSecurityService::make()->assertFormSafe($form, $openid, 'generate');
        } catch (ContentSecurityException $exception) {
            return $this->fail($exception->getMessage(), $exception->httpStatus());
        }
        try {
            $entitlement = GenerationEntitlementService::make()->consume(
                $openid,
                (string)$template['id'],
                trim((string)($input['outTradeNo'] ?? '')),
                trim((string)($input['rewardToken'] ?? ''))
            );
        } catch (RuntimeException $exception) {
            return $this->fail($exception->getMessage(), 402);
        }
        $record = RecordService::make()->create($template, $form, $openid, $this->shortBaseUrl(), [
            'entitlement' => (string)$entitlement['method'],
            'outTradeNo' => (string)($input['outTradeNo'] ?? ''),
        ]);
        return $this->ok([
            'id' => $record['id'],
            'shortCode' => $record['shortCode'],
            'title' => $record['title'],
            'link' => $record['link'],
            'entitlement' => $entitlement['method'],
            'userInfo' => $entitlement['user'],
        ]);
    }

    public function records(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $openid = $this->authOpenid();
        $records = array_values(array_filter(RecordService::make()->all($this->shortBaseUrl()), fn (array $record): bool => (string)($record['openid'] ?? '') === $openid || UserService::make()->isAdmin()));
        return $this->ok($records);
    }

    public function profile(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }
        $service = UserService::make();
        $openid = $this->authOpenid();
        $user = $service->get($openid);
        $records = array_values(array_filter(RecordService::make()->all($this->shortBaseUrl()), fn (array $record): bool => (string)($record['openid'] ?? '') === $openid));
        return $this->ok(array_replace($service->publicInfo($user), [
            'vipText' => !empty($user['isVip']) ? 'VIP会员' : '免费生成模式',
            'totalCount' => count($records),
            'todayCount' => count(array_filter($records, fn (array $item): bool => str_starts_with((string)($item['createdAt'] ?? ''), date('Y-m-d')))),
        ]));
    }

    public function itemStatus(): Response
    {
        $id = (string)request()->param('id');
        $record = RecordService::make()->findById($id, $this->shortBaseUrl());
        if (!$record) {
            return $this->fail('生成记录不存在', 404);
        }

        return $this->ok([
            'status' => '1',
            'id' => $record['id'],
            'title' => $record['title'],
            'url' => $record['link'],
            'qrcode' => $record['link'],
        ]);
    }

    private function findTemplate(string $id): ?array
    {
        return $this->templateRepo()->findPublic($id, $this->baseUrl(), [], false);
    }

    private function findTemplateOrFirst(string $id): ?array
    {
        $template = $this->findTemplate($id);
        if ($template !== null) {
            return $template;
        }

        return $this->templateRepo()->firstPublic($this->baseUrl(), [], false);
    }

    private function findTemplateByNid(string $nid): ?array
    {
        if ($nid === '') {
            return null;
        }

        return $this->templateRepo()->findPublicByDefaultValue('nid', $nid, $this->baseUrl(), [], false);
    }

    private function templateRepo(): TemplateRepository
    {
        return new TemplateRepository(root_path('storage'));
    }

    private function templateSummary(array $template): array
    {
        return [
            'id' => (string)($template['id'] ?? ''),
            'title' => (string)($template['title'] ?? '未命名模板'),
            'subtitle' => (string)($template['subtitle'] ?? ''),
            'cover' => (string)($template['cover'] ?? ''),
            'category' => (string)($template['category'] ?? '全部'),
            'tags' => is_array($template['tags'] ?? null) ? array_values($template['tags']) : [],
            'fieldCount' => (int)($template['fieldCount'] ?? (is_array($template['fields'] ?? null) ? count($template['fields']) : 0)),
            'views' => (int)($template['views'] ?? 0),
            'used' => (int)($template['used'] ?? 0),
            'hot' => (int)($template['hot'] ?? 0),
            'previewUrl' => (string)($template['previewUrl'] ?? ''),
            'finalUrl' => (string)($template['finalUrl'] ?? ''),
        ];
    }

    private function templateMatches(array $template, string $category, string $keyword): bool
    {
        $templateCategory = (string)($template['category'] ?? '全部');
        if ($category !== '' && $category !== '全部' && $templateCategory !== $category) {
            return false;
        }

        $keyword = strtolower($keyword);
        if ($keyword === '') {
            return true;
        }

        $tags = is_array($template['tags'] ?? null) ? implode(' ', array_map('strval', $template['tags'])) : '';
        $haystack = strtolower(implode(' ', [
            (string)($template['title'] ?? ''),
            (string)($template['subtitle'] ?? ''),
            $templateCategory,
            $tags,
        ]));

        return str_contains($haystack, $keyword);
    }

    private function categories(array $templates): array
    {
        return array_values(array_unique(array_merge(['全部'], array_map(fn (array $item): string => (string)($item['category'] ?? '全部'), $templates))));
    }

    private function legacyOk(array $data = [], string $message = 'success', int $code = 200): Response
    {
        return json([
            'date' => date('Y-m-d H:i:s'),
            'code' => $code,
            'msg' => $message,
            'cache' => false,
            'data' => $data,
            'time' => '0s',
        ], $code === 200 ? 200 : $code);
    }

    private function legacyType(string $type): string
    {
        return match ($type) {
            'background' => 'background',
            'music' => 'music',
            'demo' => 'demo',
            default => 'text',
        };
    }

    private function assetCategories(string $type): array
    {
        return match ($type) {
            'background' => $this->backgroundCategories(),
            'music' => $this->musicCategories(),
            'demo' => [
                ['id' => 0, 'name' => '全部', 'isNew' => 0],
                ['id' => 1, 'name' => '热门', 'isNew' => 0],
            ],
            default => TextLibraryService::make()->categories(),
        };
    }

    private function pagedAssets(string $type): array
    {
        $cid = max(0, (int)request()->param('cid', 0));
        if ($type === 'background') {
            if ($cid === 999) {
                return $this->paginate($this->userBackgroundItems(), max(1, (int)request()->param('page', 1)), 8);
            }
            return $this->paginate($this->backgroundItemsForCategory($cid), max(1, (int)request()->param('page', 1)), 8);
        }
        if ($type === 'music') {
            return $this->paginate($this->musicItemsForCategory($cid), max(1, (int)request()->param('page', 1)), 8);
        }
        if ($type === 'text') {
            return $this->paginate(TextLibraryService::make()->items($cid), max(1, (int)request()->param('page', 1)), 8);
        }

        return $this->paginate($this->assetItems($type), max(1, (int)request()->param('page', 1)), 8);
    }

    private function legacyItems(string $type): array
    {
        if ($type === 'demo') {
            return array_map(function (array $template): array {
                return [
                    'id' => $template['id'],
                    'title' => $template['title'],
                    'ftitle' => '',
                    'dataId' => $template['id'],
                    'nid' => $template['id'],
                    'coverUrl' => $template['cover'] ?: AssetUrlService::make()->url('/static/home/card0.png', $this->baseUrl()),
                    'price' => 0,
                    'isNew' => 1,
                    'note' => '',
                ];
            }, $this->templateRepo()->publicSummaryList($this->baseUrl(), [], false));
        }

        return $this->pagedAssets($type);
    }

    private function paginate(array $items, int $page, int $pageSize): array
    {
        return array_values(array_slice($items, max(0, $page - 1) * $pageSize, $pageSize));
    }

    private function assetItems(string $type): array
    {
        return match ($type) {
            'background' => $this->backgroundItems(),
            'music' => $this->musicItems(),
            default => TextLibraryService::make()->items(),
        };
    }

    private function musicCategories(): array
    {
        return MusicLibraryService::make()->categories();
    }

    private function backgroundCategories(): array
    {
        $categories = BackgroundLibraryService::make()->categories();
        array_splice($categories, 1, 0, [['id' => 999, 'name' => '我的', 'isNew' => 0]]);
        return $categories;
    }

    private function backgroundItems(): array
    {
        return $this->publicAssetItems(BackgroundLibraryService::make()->items());
    }

    private function backgroundItemsForCategory(int $cid): array
    {
        return $this->publicAssetItems(BackgroundLibraryService::make()->items($cid));
    }

    private function userBackgroundItems(): array
    {
        return $this->publicAssetItems(UserAssetService::make()->items(UserService::make()->openid(), 'background'));
    }

    private function musicItems(): array
    {
        return $this->publicAssetItems(MusicLibraryService::make()->items());
    }

    private function musicItemsForCategory(int $cid): array
    {
        return $this->publicAssetItems(MusicLibraryService::make()->items($cid));
    }

    private function publicAssetItems(array $items): array
    {
        $assetUrl = AssetUrlService::make();
        foreach ($items as $index => $item) {
            if (is_array($item) && isset($item['url']) && is_string($item['url'])) {
                $items[$index]['url'] = $assetUrl->url($item['url'], $this->baseUrl());
            }
        }

        return $items;
    }

    private function legacyContentPayload(array $template, array $values, string $nid, array $record = []): array
    {
        $defaults = is_array($template['defaults'] ?? null) ? $template['defaults'] : [];
        $values = array_replace($defaults, $values);
        $values = AssetUrlService::make()->assetValues($values);
        $templatePath = $this->templateRuntimePath($template);

        return [
            'id' => $record['id'] ?? $nid,
            'appid' => 1,
            'domainId' => (int)($values['domainId'] ?? 1),
            'openid' => (string)($record['openid'] ?? UserService::make()->openid()),
            'templateId' => $values['templateId'] ?? $template['id'],
            'msgId' => (int)($values['msgId'] ?? 0),
            'nid' => $nid,
            'url' => $this->shortBaseUrl() . '/' . $nid,
            'title' => (string)($values['title'] ?? $template['title'] ?? ''),
            'ftitle' => (string)($values['ftitle'] ?? ''),
            'ftitle2' => '',
            'ctitle' => (string)($values['ctitle'] ?? ''),
            'mtitle' => (string)($values['mtitle'] ?? ''),
            'content' => (string)($values['content'] ?? $values['message'] ?? ''),
            'nextContent' => (string)($values['nextContent'] ?? ''),
            'sectionContent' => (string)($values['sectionContent'] ?? ''),
            'coverImg' => (string)($values['coverImg'] ?? ''),
            'backgroundImg' => (string)($values['backgroundImg'] ?? ''),
            'video' => (string)($values['video'] ?? ''),
            'confirmImg' => (string)($values['confirmImg'] ?? ''),
            'opacity' => (int)($values['opacity'] ?? 100),
            'music' => (string)($values['music'] ?? ''),
            'printIcon' => (string)($values['printIcon'] ?? ''),
            'color' => (string)($values['color'] ?? ''),
            'fontSize' => (int)($values['fontSize'] ?? 1),
            'fontSpeed' => (int)($values['fontSpeed'] ?? 1),
            'btnTitle1' => (string)($values['btnTitle1'] ?? ''),
            'btnTitle2' => (string)($values['btnTitle2'] ?? ''),
            'password' => (string)($values['password'] ?? ''),
            'status' => 1,
            'payType' => (int)($values['payType'] ?? 0),
            'isDemo' => 1,
            'txtType' => (int)($values['txtType'] ?? 0),
            'sort' => (int)($values['sort'] ?? 0),
            'note' => (string)($values['note'] ?? ''),
            'views' => 0,
            'create_time' => time(),
            'update_time' => time(),
            'templateInfo' => [
                'id' => $values['templateId'] ?? $template['id'],
                'path' => $templatePath,
                'viewport' => (string)($values['viewport'] ?? ''),
                'pcWidth' => (string)($values['pcWidth'] ?? ''),
                'autoplay' => (int)($values['autoplay'] ?? 0),
                'autobtn' => (int)($values['autobtn'] ?? 0),
            ],
            'msgHtml' => (string)($values['msgHtml'] ?? ''),
            'typeId' => (int)($values['typeId'] ?? 2),
            'versionId' => (string)($values['versionId'] ?? '1013'),
            'jump_more' => (string)($values['jump_more'] ?? $this->baseUrl()),
            'jump_make' => (string)($values['jump_make'] ?? ('weixin://dl/business/?appid=' . (getenv('YZD_WECHAT_APPID') ?: '') . '&path=pages/index/index')),
            'server' => (string)($values['server'] ?? 'YZD'),
            '4041' => true,
            'isAllowedDomain1' => (int)($values['isAllowedDomain1'] ?? 1),
        ];
    }

    private function templateRuntimePath(array $template): string
    {
        $file = root_path('templates') . 'web' . DIRECTORY_SEPARATOR . (string)($template['templateFile'] ?? $template['id'] ?? '') . '.html';
        if (is_file($file)) {
            $content = (string)file_get_contents($file);
            if (preg_match('/templateInfo\s*=\s*\{\s*path:\s*"([^"]+)"/', $content, $match)) {
                return $match[1];
            }
        }

        return (string)($template['templateFile'] ?? $template['id'] ?? '');
    }

    private function yuanToCents(mixed $amount): int
    {
        return max(1, (int)round((float)$amount * 100));
    }
}
