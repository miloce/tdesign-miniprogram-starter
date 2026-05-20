<?php

declare(strict_types=1);

namespace app\controller\Admin;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\UserService;

final class ViewController extends BaseController
{
    public function index(): Response
    {
        return $this->html($this->layout('控制台', '<div class="layui-card"><div class="layui-card-header">云栈点后台</div><div class="layui-card-body"><div class="layui-row layui-col-space16"><div class="layui-col-md4"><div class="stat" id="users">用户 -</div></div><div class="layui-col-md4"><div class="stat" id="templates">模板 -</div></div><div class="layui-col-md4"><div class="stat" id="records">生成 -</div></div></div></div></div>', "api('/admin/dashboard').then(function(data){var d=data||{};users.innerText='用户 '+(d.users||0);templates.innerText='模板 '+(d.templates||0);records.innerText='生成 '+(d.records||0);});"));
    }

    public function login(): Response
    {
        $admin = htmlspecialchars(UserService::make()->adminOpenid(), ENT_QUOTES, 'UTF-8');
        return $this->html($this->layout('登录', '<div class="layui-card"><div class="layui-card-header">管理员 Token</div><div class="layui-card-body"><input id="token" class="layui-input" value="' . $admin . '"><button class="layui-btn" style="margin-top:12px" onclick="localStorage.setItem(\'yzd_admin_token\',token.value);layer.msg(\'已保存\')">保存</button></div></div>', ''));
    }

    public function templates(): Response
    {
        $body = '<div class="layui-card"><div class="layui-card-header">模板管理 <button class="layui-btn layui-btn-sm" onclick="saveTemplate()">保存模板</button></div><div class="layui-card-body"><table class="layui-table"><thead><tr><th>ID</th><th>标题</th><th>分类</th><th>状态</th><th>排序</th></tr></thead><tbody id="rows"></tbody></table><hr><div class="layui-form"><input id="id" class="layui-input" placeholder="模板ID"><input id="title" class="layui-input" placeholder="标题" style="margin-top:8px"><input id="category" class="layui-input" placeholder="分类" style="margin-top:8px"><input id="cover" class="layui-input" placeholder="封面路径" style="margin-top:8px"><textarea id="subtitle" class="layui-textarea" placeholder="副标题" style="margin-top:8px"></textarea></div></div></div>';
        $script = "function load(){api('/admin/templates').then(function(data){rows.innerHTML=(data.list||[]).map(function(i){return '<tr><td>'+i.id+'</td><td>'+i.title+'</td><td>'+i.category+'</td><td>'+i.status+'</td><td>'+i.sort+'</td></tr>'}).join('')})}function saveTemplate(){api('/admin/templates',{method:'POST',body:JSON.stringify({template:{id:id.value,title:title.value,category:category.value,cover:cover.value,subtitle:subtitle.value,status:'enabled',sort:100,tags:[],fields:[],defaults:{}}})}).then(function(){layer.msg('已保存');load()})}load();";
        return $this->html($this->layout('模板管理', $body, $script));
    }

    public function config(): Response
    {
        $body = '<div class="layui-card"><div class="layui-card-header">平台配置 <button class="layui-btn layui-btn-sm" onclick="saveConfig()">保存</button></div><div class="layui-card-body"><div class="layui-form"><input id="price" class="layui-input" placeholder="生成价格"><input id="rewardAdUnitId" class="layui-input" placeholder="激励广告ID" style="margin-top:8px"><input id="enablePayment" type="checkbox" title="启用支付" lay-skin="primary"><input id="enableRewardAd" type="checkbox" title="启用广告" lay-skin="primary"></div></div></div>';
        $script = "layui.form.render();api('/admin/config').then(function(data){var c=data.appConfig||{};price.value=c.price||0;rewardAdUnitId.value=c.rewardAdUnitId||'';enablePayment.checked=!!c.enablePayment;enableRewardAd.checked=!!c.enableRewardAd;layui.form.render();});function saveConfig(){api('/admin/config',{method:'POST',body:JSON.stringify({appConfig:{price:Number(price.value)||0,rewardAdUnitId:rewardAdUnitId.value,enablePayment:enablePayment.checked,enableRewardAd:enableRewardAd.checked}})}).then(function(){layer.msg('已保存')})}";
        return $this->html($this->layout('平台配置', $body, $script));
    }

    private function html(string $html): Response
    {
        return Response::create($html, 'html')->header(['Content-Type' => 'text/html; charset=utf-8']);
    }

    private function layout(string $title, string $body, string $script): string
    {
        return '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . $title . '</title><link rel="stylesheet" href="https://unpkg.com/layui@2.9.21/dist/css/layui.css"><style>body{background:#f6f7fb}.wrap{padding:20px}.nav{margin-bottom:16px}.stat{background:#fff;border:1px solid #eee;padding:24px;border-radius:6px;font-size:20px}</style></head><body><div class="wrap"><div class="nav layui-btn-container"><a class="layui-btn layui-btn-primary" href="/admin-ui">控制台</a><a class="layui-btn layui-btn-primary" href="/admin/templates-page">模板</a><a class="layui-btn layui-btn-primary" href="/admin/config-page">配置</a><a class="layui-btn layui-btn-primary" href="/admin/login">Token</a></div>' . $body . '</div><script src="https://unpkg.com/layui@2.9.21/dist/layui.js"></script><script>var layer=layui.layer;function api(url,opt){opt=opt||{};opt.headers=Object.assign({Authorization:\"Bearer \"+(localStorage.getItem(\"yzd_admin_token\")||\"' . UserService::make()->adminOpenid() . '\"),\"Content-Type\":\"application/json\"},opt.headers||{});return fetch(url,opt).then(function(r){return r.json()}).then(function(res){if(!res.success){layer.msg(res.message||\"请求失败\");throw res}return res.data&&res.data.data!==undefined?res.data.data:res.data})}' . $script . '</script></body></html>';
    }
}
