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

Route::get('admin-ui', $call(app\controller\Admin\ViewController::class, 'index'));
Route::get('admin/login', $call(app\controller\Admin\ViewController::class, 'login'));
Route::get('admin/templates-page', $call(app\controller\Admin\ViewController::class, 'templates'));
Route::get('admin/config-page', $call(app\controller\Admin\ViewController::class, 'config'));

Route::get('wechat/login', $call(app\controller\Api\AuthController::class, 'login'));
Route::post('wechat/logintime', $call(app\controller\Api\AuthController::class, 'loginTime'));

Route::get('code/templates', $call(app\controller\Api\CodeController::class, 'templates'));
Route::get('code/template-detail', $call(app\controller\Api\CodeController::class, 'templateDetail'));
Route::get('code/config', $call(app\controller\Api\CodeController::class, 'config'));
Route::post('code/create-preview', $call(app\controller\Api\CodeController::class, 'createPreview'));
Route::post('code/pay', $call(app\controller\Api\CodeController::class, 'pay'));
Route::post('code/pay/confirm', $call(app\controller\Api\CodeController::class, 'payConfirm'));
Route::post('code/generate', $call(app\controller\Api\CodeController::class, 'generate'));
Route::get('code/records', $call(app\controller\Api\CodeController::class, 'records'));
Route::get('code/profile', $call(app\controller\Api\CodeController::class, 'profile'));

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
Route::get('admin/templates', $call(app\controller\Admin\TemplateController::class, 'index'));
Route::get('admin/templates/detail', $call(app\controller\Admin\TemplateController::class, 'detail'));
Route::post('admin/templates', $call(app\controller\Admin\TemplateController::class, 'save'));
Route::post('admin/templates/status', $call(app\controller\Admin\TemplateController::class, 'status'));
Route::post('admin/templates/delete', $call(app\controller\Admin\TemplateController::class, 'delete'));
Route::post('admin/templates/reset', $call(app\controller\Admin\TemplateController::class, 'reset'));
Route::get('admin/dashboard', $call(app\controller\Admin\DashboardController::class, 'index'));
Route::get('admin/users', $call(app\controller\Admin\DashboardController::class, 'users'));
Route::get('admin/orders', $call(app\controller\Admin\DashboardController::class, 'orders'));
Route::get('admin/records', $call(app\controller\Admin\DashboardController::class, 'records'));

Route::get('preview/:id', $call(app\controller\Api\PageController::class, 'preview'));
Route::get('code/:id', $call(app\controller\Api\PageController::class, 'finalPage'));
Route::get(':shortCode', $call(app\controller\Api\PageController::class, 'shortLink'))->pattern(['shortCode' => '\\d{4,8}']);

Route::miss(function () {
    return json(['code' => 404, 'success' => false, 'message' => '接口不存在'], 404);
});
