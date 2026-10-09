<?php

declare(strict_types=1);

use think\facade\Route;
use think\Request;

$call = function (string $class, string $method) {
    return function (...$args) use ($class, $method) {
        return app($class)->$method(...$args);
    };
};

Route::get('health', $call(app\controller\HealthController::class, 'index'));
Route::get('api/health', $call(app\controller\HealthController::class, 'index'));

Route::get('admin', $call(app\controller\Admin\ViewController::class, 'index'));
Route::get('admin-ui', $call(app\controller\Admin\ViewController::class, 'index'));
Route::get('admin/login', $call(app\controller\Admin\ViewController::class, 'login'));
Route::get('admin/users-page', $call(app\controller\Admin\ViewController::class, 'users'));
Route::get('admin/orders-page', $call(app\controller\Admin\ViewController::class, 'orders'));
Route::get('admin/records-page', $call(app\controller\Admin\ViewController::class, 'records'));
Route::get('admin/square-page', $call(app\controller\Admin\ViewController::class, 'square'));
Route::get('admin/templates-page', $call(app\controller\Admin\ViewController::class, 'templates'));
Route::get('admin/text-page', $call(app\controller\Admin\ViewController::class, 'text'));
Route::get('admin/music-page', $call(app\controller\Admin\ViewController::class, 'music'));
Route::get('admin/background-page', $call(app\controller\Admin\ViewController::class, 'background'));
Route::get('admin/files-page', $call(app\controller\Admin\ViewController::class, 'files'));
Route::get('admin/content-security-page', $call(app\controller\Admin\ViewController::class, 'contentSecurity'));
Route::get('admin/config-page', $call(app\controller\Admin\ViewController::class, 'config'));

Route::get('wechat/login', $call(app\controller\Api\AuthController::class, 'login'));
Route::post('wechat/logintime', $call(app\controller\Api\AuthController::class, 'loginTime'));
Route::get('wechat/media-check-callback', $call(app\controller\Api\ContentSecurityController::class, 'mediaCallback'));
Route::post('wechat/media-check-callback', $call(app\controller\Api\ContentSecurityController::class, 'mediaCallback'));
Route::post('wechat/pay-callback', $call(app\controller\Api\PaymentController::class, 'notify'));
Route::get('wechat/getItemStatus', $call(app\controller\Api\CodeController::class, 'itemStatus'));
Route::post('user/profile', $call(app\controller\Api\UserController::class, 'profile'));
Route::post('user/avatar', $call(app\controller\Api\UserController::class, 'avatar'));
Route::post('code/upload', $call(app\controller\Api\UserController::class, 'upload'));

Route::get('api/getContentByNid', $call(app\controller\Api\CodeController::class, 'legacyContent'));
Route::get('api/getContentByNid2', $call(app\controller\Api\CodeController::class, 'legacyContent'));
Route::get('api/addView', $call(app\controller\Api\CodeController::class, 'legacyAddView'));
Route::get('apiv2/getConfig', $call(app\controller\Api\CodeController::class, 'legacyConfig'));
Route::get('apiv2/getRandText', $call(app\controller\Api\CodeController::class, 'legacyRandText'));
Route::get('apiv2/getDataInfo', $call(app\controller\Api\CodeController::class, 'legacyDataInfo'));
Route::get('apiv2/cate/music', fn () => app(app\controller\Api\CodeController::class)->legacyCategories('music'));
Route::get('apiv2/list/music', fn () => app(app\controller\Api\CodeController::class)->legacyList('music'));
Route::get('apiv2/cate/background', fn () => app(app\controller\Api\CodeController::class)->legacyCategories('background'));
Route::get('apiv2/list/background', fn () => app(app\controller\Api\CodeController::class)->legacyList('background'));
Route::get('apiv2/user/list/background', fn () => app(app\controller\Api\CodeController::class)->legacyList('background'));
Route::get('apiv2/cate/:type', $call(app\controller\Api\CodeController::class, 'legacyCategories'));
Route::get('apiv2/list/:type', $call(app\controller\Api\CodeController::class, 'legacyList'));
Route::post('apiv2/user/info', $call(app\controller\Api\CodeController::class, 'legacyUserInfo'));
Route::get('code/templates', $call(app\controller\Api\CodeController::class, 'templates'));
Route::get('prefetch/home', $call(app\controller\Api\CodeController::class, 'prefetchHome'));
Route::get('code/template-detail', $call(app\controller\Api\CodeController::class, 'templateDetail'));
Route::get('code/config', $call(app\controller\Api\CodeController::class, 'config'));
Route::get('code/text-library', $call(app\controller\Api\CodeController::class, 'textLibrary'));
Route::get('code/image-library', $call(app\controller\Api\CodeController::class, 'imageLibrary'));
Route::get('code/music-library', $call(app\controller\Api\CodeController::class, 'musicLibrary'));
Route::post('code/create-preview', $call(app\controller\Api\CodeController::class, 'createPreview'));
Route::post('code/reward/claim', $call(app\controller\Api\CodeController::class, 'rewardClaim'));
Route::post('code/pay', $call(app\controller\Api\CodeController::class, 'pay'));
Route::post('code/pay/confirm', $call(app\controller\Api\CodeController::class, 'payConfirm'));
Route::post('code/generate', $call(app\controller\Api\CodeController::class, 'generate'));
Route::get('code/records', $call(app\controller\Api\CodeController::class, 'records'));
Route::get('code/profile', $call(app\controller\Api\CodeController::class, 'profile'));
Route::get('orders/list', $call(app\controller\Api\OrderController::class, 'index'));
Route::post('assistant/reward/claim', $call(app\controller\Api\AssistantController::class, 'rewardClaim'));
Route::post('assistant/pay', $call(app\controller\Api\AssistantController::class, 'pay'));
Route::post('assistant/pay/confirm', $call(app\controller\Api\AssistantController::class, 'payConfirm'));
Route::post('assistant/submit', $call(app\controller\Api\AssistantController::class, 'submit'));
Route::get('assistant/schedule', $call(app\controller\Api\AssistantController::class, 'schedule'));
Route::post('assistant/schedule', $call(app\controller\Api\AssistantController::class, 'saveSchedule'));
Route::post('assistant/schedule/subscribe', $call(app\controller\Api\AssistantController::class, 'subscribeSchedule'));
Route::get('square/posts', $call(app\controller\Api\SquareController::class, 'posts'));
Route::get('square/posts/detail', $call(app\controller\Api\SquareController::class, 'detail'));
Route::post('square/posts', $call(app\controller\Api\SquareController::class, 'create'));
Route::post('square/posts/like', $call(app\controller\Api\SquareController::class, 'like'));
Route::post('square/posts/supervise', $call(app\controller\Api\SquareController::class, 'supervise'));
Route::post('square/comments', $call(app\controller\Api\SquareController::class, 'comment'));

Route::get('points/summary', $call(app\controller\Api\PointsController::class, 'summary'));
Route::post('points/earn', $call(app\controller\Api\PointsController::class, 'earn'));
Route::post('points/exchange', $call(app\controller\Api\PointsController::class, 'exchange'));

Route::get('vip/packages', $call(app\controller\Api\VipController::class, 'packages'));
Route::post('vip/pay', $call(app\controller\Api\VipController::class, 'pay'));
Route::post('vip/confirm', $call(app\controller\Api\VipController::class, 'confirm'));
Route::get('vip/status', $call(app\controller\Api\VipController::class, 'status'));

Route::get('api/searchHistory', $call(app\controller\Api\UtilityController::class, 'searchHistory'));
Route::get('api/searchPopular', $call(app\controller\Api\UtilityController::class, 'searchPopular'));
Route::get('api/genPersonalInfo', $call(app\controller\Api\UtilityController::class, 'personalInfo'));
Route::get('dataCenter/member', $call(app\controller\Api\UtilityController::class, 'dataCenter'));
Route::get('dataCenter/interaction', $call(app\controller\Api\UtilityController::class, 'dataCenter'));
Route::get('dataCenter/complete-rate', $call(app\controller\Api\UtilityController::class, 'dataCenter'));
Route::get('dataCenter/area', $call(app\controller\Api\UtilityController::class, 'dataCenter'));

Route::get('admin/config', $call(app\controller\Admin\ConfigController::class, 'read'));
Route::post('admin/config', $call(app\controller\Admin\ConfigController::class, 'save'));
Route::post('admin/auth/login', $call(app\controller\Admin\AuthController::class, 'login'));
Route::post('admin/users/update', $call(app\controller\Admin\UserController::class, 'update'));
Route::post('admin/users/delete', $call(app\controller\Admin\UserController::class, 'delete'));
Route::get('admin/templates', $call(app\controller\Admin\TemplateController::class, 'index'));
Route::get('admin/templates/files', $call(app\controller\Admin\TemplateController::class, 'files'));
Route::get('admin/templates/detail', $call(app\controller\Admin\TemplateController::class, 'detail'));
Route::post('admin/templates', $call(app\controller\Admin\TemplateController::class, 'save'));
Route::post('admin/templates/status', $call(app\controller\Admin\TemplateController::class, 'status'));
Route::post('admin/templates/delete', $call(app\controller\Admin\TemplateController::class, 'delete'));
Route::post('admin/templates/load', $call(app\controller\Admin\TemplateController::class, 'load'));
Route::get('admin/text', $call(app\controller\Admin\TextController::class, 'index'));
Route::post('admin/text', $call(app\controller\Admin\TextController::class, 'save'));
Route::post('admin/text/delete', $call(app\controller\Admin\TextController::class, 'delete'));
Route::post('admin/text/import', $call(app\controller\Admin\TextController::class, 'import'));
Route::get('admin/music', $call(app\controller\Admin\MusicController::class, 'index'));
Route::post('admin/music', $call(app\controller\Admin\MusicController::class, 'save'));
Route::post('admin/music/delete', $call(app\controller\Admin\MusicController::class, 'delete'));
Route::post('admin/music/import', $call(app\controller\Admin\MusicController::class, 'import'));
Route::get('admin/background', $call(app\controller\Admin\BackgroundController::class, 'index'));
Route::post('admin/background', $call(app\controller\Admin\BackgroundController::class, 'save'));
Route::post('admin/background/delete', $call(app\controller\Admin\BackgroundController::class, 'delete'));
Route::post('admin/background/import', $call(app\controller\Admin\BackgroundController::class, 'import'));
Route::get('admin/files', $call(app\controller\Admin\FileController::class, 'index'));
Route::post('admin/files/upload', $call(app\controller\Admin\FileController::class, 'upload'));
Route::post('admin/files/delete', $call(app\controller\Admin\FileController::class, 'delete'));
Route::post('admin/files/sync-static', $call(app\controller\Admin\FileController::class, 'syncStatic'));
Route::get('admin/dashboard', $call(app\controller\Admin\DashboardController::class, 'index'));
Route::get('admin/users', $call(app\controller\Admin\DashboardController::class, 'users'));
Route::get('admin/orders', $call(app\controller\Admin\DashboardController::class, 'orders'));
Route::get('admin/records', $call(app\controller\Admin\DashboardController::class, 'records'));
Route::post('admin/records/create', $call(app\controller\Admin\DashboardController::class, 'createRecord'));
Route::get('admin/square', $call(app\controller\Admin\SquareController::class, 'index'));
Route::post('admin/square/status', $call(app\controller\Admin\SquareController::class, 'status'));
Route::post('admin/square/delete', $call(app\controller\Admin\SquareController::class, 'delete'));
Route::post('admin/square/comment-delete', $call(app\controller\Admin\SquareController::class, 'deleteComment'));
Route::get('admin/content-security', $call(app\controller\Admin\ContentSecurityController::class, 'index'));
Route::post('admin/content-security/update', $call(app\controller\Admin\ContentSecurityController::class, 'update'));
Route::post('admin/content-security/clear', $call(app\controller\Admin\ContentSecurityController::class, 'clear'));

Route::get('preview/:prefix-:suffix', $call(app\controller\Api\PageController::class, 'previewHyphen'))->pattern(['prefix' => '[A-Za-z0-9_]+', 'suffix' => '[A-Za-z0-9_]+']);
Route::get('code/:prefix-:suffix', $call(app\controller\Api\PageController::class, 'finalPageHyphen'))->pattern(['prefix' => '[A-Za-z0-9_]+', 'suffix' => '[A-Za-z0-9_]+']);
Route::get('preview/:id', $call(app\controller\Api\PageController::class, 'preview'))->pattern(['id' => '[A-Za-z0-9_]+']);
Route::get('code/:id', $call(app\controller\Api\PageController::class, 'finalPage'))->pattern(['id' => '[A-Za-z0-9_]+']);
Route::get(':shortCode', $call(app\controller\Api\PageController::class, 'shortLink'))->pattern(['shortCode' => '\\d{1,8}']);

Route::miss(function () {
    $path = trim((string)request()->pathinfo(), '/');
    if (str_starts_with($path, 'template/')) {
        return app(app\controller\Api\PageController::class)->remoteTemplateAsset($path);
    }
    if (preg_match('/^\d{1,8}$/', $path)) {
        return app(app\controller\Api\PageController::class)->shortLink($path);
    }
    if (str_starts_with($path, 'preview/')) {
        return app(app\controller\Api\PageController::class)->preview(rawurldecode(substr($path, 8)));
    }
    if (str_starts_with($path, 'code/')) {
        return app(app\controller\Api\PageController::class)->finalPage(rawurldecode(substr($path, 5)));
    }

    return json(['code' => 404, 'success' => false, 'message' => '接口不存在'], 404);
});
