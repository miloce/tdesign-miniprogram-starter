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
        $body = <<<'HTML'
<div class="layui-row layui-col-space16">
  <div class="layui-col-md3"><div class="stat"><span>用户</span><strong id="users">-</strong></div></div>
  <div class="layui-col-md3"><div class="stat"><span>模板</span><strong id="templates">-</strong></div></div>
  <div class="layui-col-md3"><div class="stat"><span>生成</span><strong id="records">-</strong></div></div>
  <div class="layui-col-md3"><div class="stat"><span>订单</span><strong id="orders">-</strong></div></div>
</div>
<div class="layui-card">
  <div class="layui-card-header">运行状态</div>
  <div class="layui-card-body">
    <table class="layui-table">
      <tbody>
        <tr><td>后台框架</td><td>ThinkPHP + Layui</td></tr>
        <tr><td>数据存储</td><td>MySQL 优先，JSON 文件备份</td></tr>
        <tr><td>接口状态</td><td>正常</td></tr>
      </tbody>
    </table>
  </div>
</div>
HTML;
        $script = <<<'JS'
api('/admin/dashboard').then(function(data){
  users.innerText = data.users || 0;
  templates.innerText = data.templates || 0;
  records.innerText = data.records || 0;
  orders.innerText = data.orders || 0;
});
JS;
        return $this->html($this->layout('控制台', 'dashboard', $body, $script));
    }

    public function login(): Response
    {
        $body = <<<'HTML'
<div class="login-page">
  <div class="login-box">
    <h1>云栈点后台</h1>
    <p>管理员登录</p>
    <div class="layui-form">
      <input id="username" class="layui-input" placeholder="账号" value="admin">
      <input id="password" class="layui-input" placeholder="密码" type="password" style="margin-top:14px">
      <button class="layui-btn layui-btn-fluid" style="margin-top:18px" onclick="login()">登录</button>
    </div>
  </div>
</div>
HTML;
        $script = <<<'JS'
function login(){
  fetch('/admin/auth/login', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username: username.value, password: password.value})
  }).then(function(r){return r.json()}).then(function(res){
    if(!res.success){ layer.msg(res.message || '登录失败'); return; }
    localStorage.setItem('yzd_admin_token', res.data.token);
    location.href = '/admin';
  });
}
JS;
        return $this->html($this->layout('登录', 'login', $body, $script, false));
    }

    public function users(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">用户列表</div>
  <div class="layui-card-body">
    <table class="layui-table">
      <thead><tr><th>ID</th><th>头像</th><th>昵称</th><th>OpenID</th><th>角色</th><th>状态</th><th>积分</th><th>次数</th><th>VIP</th><th>注册时间</th><th>操作</th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <div id="userPager" class="table-pager"></div>
  </div>
</div>
<div id="editUserBox" style="display:none;padding:20px">
  <div class="layui-form layui-row layui-col-space12">
    <input id="editOpenid" type="hidden">
    <div class="layui-col-md6"><label>昵称</label><input id="editNickname" class="layui-input"></div>
    <div class="layui-col-md6"><label>头像</label><input id="editAvatar" class="layui-input"></div>
    <div class="layui-col-md4"><label>角色</label><select id="editRole"><option value="user">用户</option><option value="admin">管理员</option></select></div>
    <div class="layui-col-md4"><label>状态</label><select id="editStatus"><option value="active">正常</option><option value="disabled">禁用</option></select></div>
    <div class="layui-col-md4"><label>VIP</label><select id="editVip"><option value="0">否</option><option value="1">是</option></select></div>
    <div class="layui-col-md4"><label>积分</label><input id="editPoints" class="layui-input" type="number"></div>
    <div class="layui-col-md4"><label>次数</label><input id="editQuota" class="layui-input" type="number"></div>
    <div class="layui-col-md4"><label>VIP到期</label><input id="editVipExpireAt" class="layui-input" placeholder="例如 2026-12-31 或 forever"></div>
    <div class="layui-col-md12"><label>备注</label><textarea id="editRemark" class="layui-textarea"></textarea></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var userList = [];
var userPage = 1;
var userPageSize = 10;
function renderUsers(){
  userPage = clampPage(userPage, userList.length, userPageSize);
  var start = (userPage - 1) * userPageSize;
  var pageRows = pageSlice(userList, userPage, userPageSize);
  if(!pageRows.length){
    document.getElementById('rows').innerHTML = '<tr><td colspan="11" style="text-align:center;color:#94a3b8;padding:36px">暂无用户</td></tr>';
  } else {
    document.getElementById('rows').innerHTML = pageRows.map(function(user, offset){
      var index = start + offset;
      return '<tr>'
        + '<td>'+esc(user.id || '')+'</td>'
        + '<td>'+(user.avatar ? '<img src="'+esc(user.avatar)+'" class="avatar">' : '-')+'</td>'
        + '<td>'+esc(user.nickname || '')+'</td>'
        + '<td><code>'+esc(user.openid || '')+'</code></td>'
        + '<td>'+esc(user.role || 'user')+'</td>'
        + '<td>'+esc(user.status || 'active')+'</td>'
        + '<td>'+esc(user.points || 0)+'</td>'
        + '<td>'+esc(user.quota || 0)+'</td>'
        + '<td>'+(user.isVip ? '是' : '否')+'</td>'
        + '<td>'+esc(user.createdAt || '')+'</td>'
        + '<td>'
        + '<button type="button" class="layui-btn layui-btn-xs js-edit-user" data-index="'+index+'">编辑</button>'
        + '<button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-delete-user" data-index="'+index+'">删除</button>'
        + '</td>'
        + '</tr>';
    }).join('');
  }
  renderListPager('userPager', userList.length, userPage, userPageSize, function(page, limit){
    userPage = page;
    userPageSize = limit;
    renderUsers();
  });
}
function loadUsers(keepPage){
  api('/admin/users').then(function(data){
    userList = data.list || [];
    if(!keepPage){ userPage = 1; }
    renderUsers();
  });
}
function openEdit(index){
  var user = userList[index];
  if(!user){return}
  document.getElementById('editOpenid').value = user.openid || '';
  document.getElementById('editNickname').value = user.nickname || '';
  document.getElementById('editAvatar').value = user.avatar || '';
  document.getElementById('editRole').value = user.role || 'user';
  document.getElementById('editStatus').value = user.status || 'active';
  document.getElementById('editVip').value = user.isVip ? '1' : '0';
  document.getElementById('editPoints').value = user.points || 0;
  document.getElementById('editQuota').value = user.quota || 0;
  document.getElementById('editVipExpireAt').value = user.vipExpireAt || '';
  document.getElementById('editRemark').value = user.remark || '';
  layui.form.render();
  layer.open({
    type: 1,
    title: '编辑用户',
    area: ['760px', '560px'],
    content: layui.$('#editUserBox'),
    btn: ['保存', '取消'],
    yes: function(dialogIndex){
      api('/admin/users/update', {
        method: 'POST',
        body: JSON.stringify({
          openid: document.getElementById('editOpenid').value,
          nickname: document.getElementById('editNickname').value,
          avatar: document.getElementById('editAvatar').value,
          role: document.getElementById('editRole').value,
          status: document.getElementById('editStatus').value,
          isVip: document.getElementById('editVip').value === '1',
          points: Number(document.getElementById('editPoints').value) || 0,
          quota: Number(document.getElementById('editQuota').value) || 0,
          vipExpireAt: document.getElementById('editVipExpireAt').value,
          remark: document.getElementById('editRemark').value
        })
      }).then(function(){
        layer.close(dialogIndex);
        layer.msg('已保存');
        loadUsers(true);
      });
    }
  });
}
layui.form.render();
document.addEventListener('click', function(event){
  var editBtn = event.target.closest('.js-edit-user');
  if(editBtn){
    openEdit(Number(editBtn.getAttribute('data-index')));
    return;
  }
  var deleteBtn = event.target.closest('.js-delete-user');
  if(deleteBtn){
    var user = userList[Number(deleteBtn.getAttribute('data-index'))];
    if(!user){return}
    layer.confirm('确认删除用户 '+(user.nickname || user.openid)+'？生成记录会保留。', function(index){
      api('/admin/users/delete', {
        method: 'POST',
        body: JSON.stringify({openid: user.openid})
      }).then(function(){
        layer.close(index);
        layer.msg('已删除');
        loadUsers(true);
      });
    });
  }
});
loadUsers();
JS;
        return $this->html($this->layout('用户列表', 'users', $body, $script));
    }

    public function records(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">生成记录</div>
  <div class="layui-card-body">
    <div class="layui-form layui-row layui-col-space12">
      <div class="layui-col-md3"><label>选择模板</label><select id="recordTemplate" lay-filter="recordTemplate"></select></div>
      <div class="layui-col-md3"><label>用户 OpenID</label><input id="recordOpenid" class="layui-input" placeholder="默认管理员"></div>
      <div class="layui-col-md12"><label>表单 JSON</label><textarea id="recordForm" class="layui-textarea codearea" placeholder='{"url":"https://support.weixin.qq.com/..."}'></textarea></div>
      <div class="layui-col-md12"><button type="button" class="layui-btn" id="btnCreateRecord">生成短链</button></div>
    </div>
  </div>
</div>
<div class="layui-card">
  <div class="layui-card-header">记录列表</div>
  <div class="layui-card-body">
    <table class="layui-table">
      <thead><tr><th>记录ID</th><th>标题</th><th>模板</th><th>用户</th><th>短链</th><th>权益</th><th>状态</th><th>时间</th><th>操作</th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <div id="recordPager" class="table-pager"></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var recordTemplates = [];
var recordList = [];
var recordPage = 1;
var recordPageSize = 10;
function renderRecords(list){
  recordList = list || [];
  recordPage = clampPage(recordPage, recordList.length, recordPageSize);
  var start = (recordPage - 1) * recordPageSize;
  var pageRows = pageSlice(recordList, recordPage, recordPageSize);
  if(!pageRows.length){
    rows.innerHTML = '<tr><td colspan="9" style="text-align:center;color:#94a3b8;padding:36px">暂无记录</td></tr>';
  } else {
    rows.innerHTML = pageRows.map(function(item, offset){
    var index = start + offset;
    var meta = item.meta || {};
    return '<tr>'
      + '<td>'+esc(item.id || '')+'</td>'
      + '<td>'+esc(item.title || '')+'</td>'
      + '<td>'+esc(item.templateId || '')+'</td>'
      + '<td><code>'+esc(item.openid || '')+'</code></td>'
      + '<td>'+(item.link ? '<a target="_blank" href="'+esc(item.link)+'">'+esc(item.shortCode || item.link)+'</a>' : '-')+'</td>'
      + '<td>'+esc(meta.entitlement || '-')+'</td>'
      + '<td>'+esc(item.status || '')+'</td>'
      + '<td>'+esc(item.createdAt || '')+'</td>'
      + '<td><button type="button" class="layui-btn layui-btn-primary layui-btn-xs js-view-record" data-index="'+index+'">JSON</button></td>'
      + '</tr>';
    }).join('');
  }
  renderListPager('recordPager', recordList.length, recordPage, recordPageSize, function(page, limit){
    recordPage = page;
    recordPageSize = limit;
    renderRecords(recordList);
  });
}
function loadRecords(keepPage){
  api('/admin/records').then(function(data){
    if(!keepPage){ recordPage = 1; }
    renderRecords(data.list || []);
  });
}
function loadRecordTemplates(){
  api('/admin/templates').then(function(data){
    recordTemplates = (data.list || []).filter(function(item){ return item.status === 'enabled'; });
    recordTemplate.innerHTML = recordTemplates.map(function(item){
      return '<option value="'+esc(item.id)+'">'+esc(item.id)+' - '+esc(item.title)+'</option>';
    }).join('');
    layui.form.render();
    fillRecordForm();
  });
}
function currentRecordTemplate(){
  var id = recordTemplate.value;
  return recordTemplates.find(function(item){ return item.id === id; });
}
function fillRecordForm(){
  var item = currentRecordTemplate();
  if(!item){ recordForm.value = '{}'; return; }
  recordForm.value = '加载模板 JSON...';
  api('/admin/templates/detail?id=' + encodeURIComponent(item.id)).then(function(data){
    var template = data.template || {};
    var defaults = template.defaults || {};
    if(Object.keys(defaults).length === 0 && Array.isArray(template.fields)){
      template.fields.forEach(function(field){
        if(field && field.key && field.default !== undefined){ defaults[field.key] = field.default; }
      });
    }
    recordForm.value = JSON.stringify(defaults, null, 2);
  }).catch(function(){
    recordForm.value = '{}';
  });
}
function viewRecord(index){
  var item = recordList[index];
  if(!item){return}
  layer.open({
    type: 1,
    title: '生成记录 JSON',
    area: ['820px', '680px'],
    content: '<pre class="json-view">'+esc(JSON.stringify(item, null, 2))+'</pre>'
  });
}
function createRecord(){
  var form = {};
  try { form = recordForm.value.trim() ? JSON.parse(recordForm.value) : {}; } catch(e) { layer.msg('表单 JSON 不合法'); return; }
  if(!recordTemplate.value){ layer.msg('请选择模板'); return; }
  api('/admin/records/create', {
    method: 'POST',
    body: JSON.stringify({templateId: recordTemplate.value, openid: recordOpenid.value.trim(), form: form})
  }).then(function(){
    layer.msg('已生成');
    loadRecords(true);
  });
}
layui.form.on('select(recordTemplate)', fillRecordForm);
btnCreateRecord.addEventListener('click', createRecord);
document.addEventListener('click', function(event){
  var viewBtn = event.target.closest('.js-view-record');
  if(viewBtn){ viewRecord(Number(viewBtn.getAttribute('data-index'))); }
});
layui.form.render();
loadRecordTemplates();
loadRecords();
JS;
        return $this->html($this->layout('生成记录', 'records', $body, $script));
    }

    public function orders(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">订单记录 <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="btnReloadOrders">刷新</button></div>
  <div class="layui-card-body">
    <table class="layui-table">
      <thead><tr><th>订单号</th><th>类型</th><th>状态</th><th>金额</th><th>用户</th><th>业务信息</th><th>支付时间</th><th>创建时间</th><th>操作</th></tr></thead>
      <tbody id="orderRows"></tbody>
    </table>
    <div id="orderPager" class="table-pager"></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var orderList = [];
var orderPage = 1;
var orderPageSize = 10;
function money(cents){
  return '￥' + (Number(cents || 0) / 100).toFixed(2);
}
function orderStatus(status){
  var map = {
    pending: ['待支付', 'layui-bg-orange'],
    paid: ['已支付', 'layui-bg-green'],
    consumed: ['已核销', 'layui-bg-blue'],
    failed: ['失败', 'layui-bg-red']
  };
  var row = map[status] || [status || '-', 'layui-bg-gray'];
  return '<span class="layui-badge '+row[1]+'">'+esc(row[0])+'</span>';
}
function orderType(type){
  return type === 'vip' ? '会员' : type === 'code' ? '生成' : (type || '-');
}
function orderContext(context){
  context = context || {};
  if(context.templateId){ return '模板：' + context.templateId; }
  if(context.packageName){ return '套餐：' + context.packageName; }
  if(context.packageId){ return '套餐：' + context.packageId; }
  return '-';
}
function renderOrders(list){
  orderList = list || [];
  orderPage = clampPage(orderPage, orderList.length, orderPageSize);
  var start = (orderPage - 1) * orderPageSize;
  var pageRows = pageSlice(orderList, orderPage, orderPageSize);
  if(!pageRows.length){
    orderRows.innerHTML = '<tr><td colspan="9" style="text-align:center;color:#94a3b8;padding:36px">暂无订单</td></tr>';
  } else {
    orderRows.innerHTML = pageRows.map(function(item, offset){
    var index = start + offset;
    return '<tr>'
      + '<td><code>'+esc(item.outTradeNo || '')+'</code></td>'
      + '<td>'+esc(orderType(item.type))+'</td>'
      + '<td>'+orderStatus(item.status)+'</td>'
      + '<td>'+esc(money(item.amountCents))+'</td>'
      + '<td><code>'+esc(item.openid || '')+'</code></td>'
      + '<td>'+esc(orderContext(item.context))+'</td>'
      + '<td>'+esc(item.paidAt || '-')+'</td>'
      + '<td>'+esc(item.createdAt || '')+'</td>'
      + '<td><button type="button" class="layui-btn layui-btn-primary layui-btn-xs js-view-order" data-index="'+index+'">JSON</button></td>'
      + '</tr>';
    }).join('');
  }
  renderListPager('orderPager', orderList.length, orderPage, orderPageSize, function(page, limit){
    orderPage = page;
    orderPageSize = limit;
    renderOrders(orderList);
  });
}
function loadOrders(keepPage){
  api('/admin/orders').then(function(data){
    if(!keepPage){ orderPage = 1; }
    renderOrders(data.list || []);
  });
}
function viewOrder(index){
  var item = orderList[index];
  if(!item){return}
  layer.open({
    type: 1,
    title: '订单 JSON',
    area: ['820px', '680px'],
    content: '<pre class="json-view">'+esc(JSON.stringify(item, null, 2))+'</pre>'
  });
}
btnReloadOrders.addEventListener('click', function(){ loadOrders(true); });
document.addEventListener('click', function(event){
  var viewBtn = event.target.closest('.js-view-order');
  if(viewBtn){ viewOrder(Number(viewBtn.getAttribute('data-index'))); }
});
loadOrders();
JS;
        return $this->html($this->layout('订单记录', 'orders', $body, $script));
    }

    public function contentSecurity(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">
    内容审核
    <button type="button" class="layui-btn layui-btn-sm" data-mode="pending">待审核 <span id="pendingCount">0</span></button>
    <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" data-mode="all">全部 <span id="totalCount">0</span></button>
    <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" data-mode="pass">通过 <span id="passCount">0</span></button>
    <span style="float:right">
      <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" data-clear="pass">清理已通过</button>
      <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" data-clear="resolved">清理已处理</button>
      <button type="button" class="layui-btn layui-btn-danger layui-btn-sm" data-clear="all">清空全部</button>
    </span>
  </div>
  <div class="layui-card-body">
    <table class="layui-table">
      <thead><tr><th>内容</th><th style="width:150px">检测</th><th style="width:130px">人工</th><th style="width:190px">操作</th></tr></thead>
      <tbody id="auditRows"></tbody>
    </table>
    <div id="auditPager" class="table-pager"></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var auditMode = 'pending';
var auditList = [];
var auditPage = 1;
var auditPageSize = 10;
function badge(text, status){
  var cls = status === 'risky' || status === 'rejected' || status === 'failed' ? 'layui-bg-red'
    : status === 'review' || status === 'pending' ? 'layui-bg-orange'
    : status === 'approved' || status === 'pass' ? 'layui-bg-green'
    : 'layui-bg-gray';
  return '<span class="layui-badge '+cls+'">'+esc(text || status || '-')+'</span>';
}
function setMode(mode){
  auditMode = mode;
  document.querySelectorAll('[data-mode]').forEach(function(btn){
    var active = btn.getAttribute('data-mode') === mode;
    btn.className = active ? 'layui-btn layui-btn-sm' : 'layui-btn layui-btn-primary layui-btn-sm';
  });
  loadAudits();
}
function renderAuditRows(){
  auditPage = clampPage(auditPage, auditList.length, auditPageSize);
  var pageRows = pageSlice(auditList, auditPage, auditPageSize);
  if(!pageRows.length){
    auditRows.innerHTML = '<tr><td colspan="4" style="text-align:center;color:#94a3b8;padding:36px">暂无审核记录</td></tr>';
  } else {
    auditRows.innerHTML = pageRows.map(function(item){
      var body = item.contentPreview || item.target || item.traceId || '';
      var fields = (item.fields || []).length ? '<div style="margin-top:6px;color:#94a3b8">字段：'+esc((item.fields || []).join('、'))+'</div>' : '';
      var meta = '<div style="margin-top:8px;color:#64748b;font-size:12px">'
        + esc(item.createdAt || '') + ' · ' + esc(item.source || '') + ' · ' + esc(item.kind || '')
        + (item.openid ? ' · ' + esc(item.openid) : '')
        + '</div>';
      if(item.target){
        body = '<a target="_blank" href="'+esc(item.target)+'">'+esc(item.target).slice(0, 120)+'</a>';
      } else {
        body = '<div class="text-preview">'+esc(body)+'</div>';
      }
      return '<tr>'
        + '<td>'+body+fields+meta+'</td>'
        + '<td>'+badge(item.statusText, item.status)+(item.labelText ? '<div style="margin-top:8px;color:#64748b">'+esc(item.labelText)+'</div>' : '')+'</td>'
        + '<td>'+badge(item.reviewStatusText, item.reviewStatus)+'</td>'
        + '<td>'
        + '<button type="button" class="layui-btn layui-btn-xs js-audit-action" data-id="'+esc(item.id)+'" data-status="approved">通过</button>'
        + '<button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-audit-action" data-id="'+esc(item.id)+'" data-status="rejected">驳回</button>'
        + '<button type="button" class="layui-btn layui-btn-primary layui-btn-xs js-audit-action" data-id="'+esc(item.id)+'" data-status="pending">待审</button>'
        + '</td>'
        + '</tr>';
    }).join('');
  }
  renderListPager('auditPager', auditList.length, auditPage, auditPageSize, function(page, limit){
    auditPage = page;
    auditPageSize = limit;
    renderAuditRows();
  });
}
function loadAudits(keepPage){
  var query = new URLSearchParams();
  if(auditMode === 'pending'){ query.set('reviewStatus', 'pending'); }
  if(auditMode === 'pass'){ query.set('status', 'pass'); }
  api('/admin/content-security' + (query.toString() ? '?' + query.toString() : '')).then(function(data){
    var s = data.summary || {};
    totalCount.innerText = s.total || 0;
    pendingCount.innerText = s.pending || 0;
    passCount.innerText = s.pass || 0;
    auditList = data.list || [];
    if(!keepPage){ auditPage = 1; }
    renderAuditRows();
  });
}
function updateAudit(id, reviewStatus){
  layer.prompt({title: '审核备注，可留空', formType: 2}, function(note, index){
    api('/admin/content-security/update', {
      method: 'POST',
      body: JSON.stringify({id: id, reviewStatus: reviewStatus, note: note})
    }).then(function(){
      layer.close(index);
      layer.msg('已更新');
      loadAudits(true);
    });
  });
}
function clearAudits(scope){
  var text = scope === 'all' ? '确认清空全部审核记录？此操作不可恢复。'
    : scope === 'resolved' ? '确认清理已人工通过或驳回的记录？'
    : '确认清理检测结果为通过的记录？';
  layer.confirm(text, {title: '清理记录'}, function(index){
    api('/admin/content-security/clear', {
      method: 'POST',
      body: JSON.stringify({scope: scope})
    }).then(function(data){
      layer.close(index);
      layer.msg('已清理 ' + (data.removed || 0) + ' 条');
      loadAudits(true);
    });
  });
}
document.querySelectorAll('[data-mode]').forEach(function(btn){
  btn.addEventListener('click', function(){ setMode(btn.getAttribute('data-mode')); });
});
document.querySelectorAll('[data-clear]').forEach(function(btn){
  btn.addEventListener('click', function(){ clearAudits(btn.getAttribute('data-clear')); });
});
document.addEventListener('click', function(event){
  var btn = event.target.closest('.js-audit-action');
  if(!btn){ return; }
  updateAudit(btn.getAttribute('data-id'), btn.getAttribute('data-status'));
});
layui.form.render();
setMode('pending');
JS;
        return $this->html($this->layout('内容安全审核', 'content-security', $body, $script));
    }

    public function square(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">
    广场管理
    <span style="float:right">
      <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="btnReloadSquare">刷新</button>
    </span>
  </div>
  <div class="layui-card-body">
    <div class="layui-row layui-col-space12" style="margin-bottom:12px">
      <div class="layui-col-md3"><div class="stat"><span>帖子</span><strong id="squareTotal">0</strong></div></div>
      <div class="layui-col-md3"><div class="stat"><span>隐藏</span><strong id="squareHidden">0</strong></div></div>
      <div class="layui-col-md3"><div class="stat"><span>评论</span><strong id="squareComments">0</strong></div></div>
      <div class="layui-col-md3"><div class="stat"><span>监督</span><strong id="squareSupervise">0</strong></div></div>
    </div>
    <table class="layui-table">
      <thead><tr><th style="width:90px">类型</th><th>内容</th><th style="width:120px">作者</th><th style="width:90px">状态</th><th style="width:160px">数据</th><th style="width:170px">时间</th><th style="width:250px">操作</th></tr></thead>
      <tbody id="squareRows"></tbody>
    </table>
    <div id="squarePager" class="table-pager"></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var squareList = [];
var squarePage = 1;
var squarePageSize = 10;
function squareBadge(status){
  var cls = status === '隐藏' ? 'layui-bg-red' : status === '已处理' ? 'layui-bg-green' : 'layui-bg-blue';
  return '<span class="layui-badge '+cls+'">'+esc(status || '-')+'</span>';
}
function squareContent(item){
  var title = item.title ? '<strong>'+esc(item.title)+'</strong>' : '';
  var content = '<div class="text-preview">'+esc(item.content || '').replace(/\n/g, '<br>')+'</div>';
  var tags = item.tags ? '<div style="margin-top:6px;color:#94a3b8">标签：'+esc(item.tags)+'</div>' : '';
  var images = (item.images || []).length ? '<div style="margin-top:6px;color:#64748b">图片：'+(item.images || []).length+' 张</div>' : '';
  return title + content + tags + images;
}
function renderSquareRows(){
  squareTotal.innerText = squareList.length;
  squareHidden.innerText = squareList.filter(function(item){ return item.status === '隐藏'; }).length;
  squareComments.innerText = squareList.reduce(function(total, item){ return total + Number(item.commentCount || 0); }, 0);
  squareSupervise.innerText = squareList.reduce(function(total, item){ return total + Number(item.superviseCount || 0); }, 0);
  squarePage = clampPage(squarePage, squareList.length, squarePageSize);
  var start = (squarePage - 1) * squarePageSize;
  var pageRows = pageSlice(squareList, squarePage, squarePageSize);
  if(!pageRows.length){
    squareRows.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:36px">暂无广场内容</td></tr>';
  } else {
    squareRows.innerHTML = pageRows.map(function(item, offset){
    var index = start + offset;
    var dataText = '赞 '+(item.likes || 0)+' / 监督 '+(item.superviseCount || 0)+' / 评论 '+(item.commentCount || 0);
    return '<tr>'
      + '<td>'+esc(item.typeLabel || item.type || '')+'</td>'
      + '<td>'+squareContent(item)+'</td>'
      + '<td>'+esc(item.authorName || '')+'<div style="margin-top:6px;color:#94a3b8;font-size:12px">'+esc(item.authorOpenid || '')+'</div></td>'
      + '<td>'+squareBadge(item.status)+'</td>'
      + '<td>'+esc(dataText)+'</td>'
      + '<td>'+esc(item.createdAt || '')+'</td>'
      + '<td>'
      + '<button type="button" class="layui-btn layui-btn-xs js-square-status" data-index="'+index+'" data-status="default">恢复默认</button>'
      + '<button type="button" class="layui-btn layui-btn-normal layui-btn-xs js-square-status" data-index="'+index+'" data-status="已处理">已处理</button>'
      + '<button type="button" class="layui-btn layui-btn-warm layui-btn-xs js-square-status" data-index="'+index+'" data-status="隐藏">隐藏</button>'
      + '<button type="button" class="layui-btn layui-btn-primary layui-btn-xs js-square-comments" data-index="'+index+'">评论</button>'
      + '<button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-square-delete" data-index="'+index+'">删除</button>'
      + '</td>'
      + '</tr>';
    }).join('');
  }
  renderListPager('squarePager', squareList.length, squarePage, squarePageSize, function(page, limit){
    squarePage = page;
    squarePageSize = limit;
    renderSquareRows();
  });
}
function loadSquare(keepPage){
  api('/admin/square').then(function(data){
    squareList = data.list || [];
    if(!keepPage){ squarePage = 1; }
    renderSquareRows();
  });
}
function updateSquareStatus(index, status){
  var item = squareList[index];
  if(!item){ return; }
  api('/admin/square/status', {
    method: 'POST',
    body: JSON.stringify({id: item.id, status: status})
  }).then(function(data){
    squareList = data.list || [];
    renderSquareRows();
    layer.msg('已更新');
  });
}
function deleteSquare(index){
  var item = squareList[index];
  if(!item){ return; }
  layer.confirm('确认删除这条广场内容？评论和互动数据会一并删除。', {title: '删除帖子'}, function(dialogIndex){
    api('/admin/square/delete', {
      method: 'POST',
      body: JSON.stringify({id: item.id})
    }).then(function(data){
      layer.close(dialogIndex);
      squareList = data.list || [];
      renderSquareRows();
      layer.msg('已删除');
    });
  });
}
function openSquareComments(index){
  var item = squareList[index];
  if(!item){ return; }
  var comments = item.comments || [];
  var html = '<div style="padding:18px">';
  if(!comments.length){
    html += '<div style="text-align:center;color:#94a3b8;padding:28px">暂无评论</div>';
  } else {
    html += '<table class="layui-table"><thead><tr><th>评论</th><th style="width:140px">用户</th><th style="width:170px">时间</th><th style="width:80px">操作</th></tr></thead><tbody>';
    html += comments.map(function(comment){
      return '<tr>'
        + '<td><div class="text-preview">'+esc(comment.content || '').replace(/\n/g, '<br>')+'</div></td>'
        + '<td>'+esc(comment.authorName || '')+'<div style="margin-top:6px;color:#94a3b8;font-size:12px">'+esc(comment.authorOpenid || '')+'</div></td>'
        + '<td>'+esc(comment.createdAt || '')+'</td>'
        + '<td><button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-square-comment-delete" data-post-id="'+esc(item.id)+'" data-comment-id="'+esc(comment.id)+'">删除</button></td>'
        + '</tr>';
    }).join('');
    html += '</tbody></table>';
  }
  html += '</div>';
  layer.open({type: 1, title: '评论管理', area: ['860px', '560px'], content: html});
}
function deleteSquareComment(postId, commentId){
  layer.confirm('确认删除这条评论？', {title: '删除评论'}, function(dialogIndex){
    api('/admin/square/comment-delete', {
      method: 'POST',
      body: JSON.stringify({postId: postId, commentId: commentId})
    }).then(function(data){
      layer.close(dialogIndex);
      layer.closeAll('page');
      squareList = data.list || [];
      renderSquareRows();
      layer.msg('已删除');
    });
  });
}
document.addEventListener('click', function(event){
  var statusBtn = event.target.closest('.js-square-status');
  if(statusBtn){
    updateSquareStatus(Number(statusBtn.getAttribute('data-index')), statusBtn.getAttribute('data-status'));
    return;
  }
  var commentBtn = event.target.closest('.js-square-comments');
  if(commentBtn){
    openSquareComments(Number(commentBtn.getAttribute('data-index')));
    return;
  }
  var deleteBtn = event.target.closest('.js-square-delete');
  if(deleteBtn){
    deleteSquare(Number(deleteBtn.getAttribute('data-index')));
    return;
  }
  var commentDeleteBtn = event.target.closest('.js-square-comment-delete');
  if(commentDeleteBtn){
    deleteSquareComment(commentDeleteBtn.getAttribute('data-post-id'), commentDeleteBtn.getAttribute('data-comment-id'));
  }
});
btnReloadSquare.addEventListener('click', function(){ loadSquare(true); });
loadSquare();
JS;
        return $this->html($this->layout('广场管理', 'square', $body, $script));
    }

    public function templates(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">
    模板管理
    <button type="button" class="layui-btn layui-btn-sm" id="btnAddTemplate">新增模板</button>
    <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="btnLoadTemplates">加载模板</button>
  </div>
  <div class="layui-card-body">
    <table class="layui-table">
      <thead><tr><th>ID</th><th>封面</th><th>标题</th><th>分类</th><th>状态</th><th>排序</th><th>热度</th><th>使用量</th><th>预览</th><th>操作</th></tr></thead>
      <tbody id="rows"></tbody>
    </table>
    <div id="templatePager" class="table-pager"></div>
  </div>
</div>
<div id="templateEditor" style="display:none;padding:20px">
  <div class="layui-form layui-row layui-col-space12">
    <div class="layui-col-md4"><label>模板ID</label><input id="tplId" class="layui-input" placeholder="hbfm"></div>
    <div class="layui-col-md4"><label>标题</label><input id="tplTitle" class="layui-input"></div>
    <div class="layui-col-md4"><label>分类</label><input id="tplCategory" class="layui-input"></div>
    <div class="layui-col-md4"><label>页面文件</label><select id="tplFile"></select></div>
    <div class="layui-col-md8"><label>封面路径</label><input id="tplCover" class="layui-input"></div>
    <div class="layui-col-md2"><label>排序</label><input id="tplSort" class="layui-input" type="number"></div>
    <div class="layui-col-md2"><label>状态</label><select id="tplStatus"><option value="enabled">启用</option><option value="disabled">停用</option></select></div>
    <div class="layui-col-md6"><label>字段 JSON</label><textarea id="tplFields" class="layui-textarea codearea" placeholder='[{"key":"name","label":"昵称","type":"text","required":true}]'></textarea></div>
    <div class="layui-col-md6"><label>默认值 JSON</label><textarea id="tplDefaults" class="layui-textarea codearea" placeholder='{"name":"小鹿"}'></textarea></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var templateList = [];
var templateFiles = [];
var templatePage = 1;
var templatePageSize = 10;
function load(keepPage){
  Promise.all([api('/admin/templates'), api('/admin/templates/files')]).then(function(results){
    var data = results[0] || {};
    templateFiles = (results[1] || {}).list || [];
    renderTemplateFileOptions();
    templateList = data.list || [];
    if(!keepPage){ templatePage = 1; }
    renderTemplateRows();
  });
}
function renderTemplateRows(){
  templatePage = clampPage(templatePage, templateList.length, templatePageSize);
  var start = (templatePage - 1) * templatePageSize;
  var pageRows = pageSlice(templateList, templatePage, templatePageSize);
  if(!pageRows.length){
    document.getElementById('rows').innerHTML = '<tr><td colspan="10" style="text-align:center;color:#94a3b8;padding:36px">暂无模板</td></tr>';
  } else {
    document.getElementById('rows').innerHTML = pageRows.map(function(item, offset){
      var index = start + offset;
      return '<tr>'
        + '<td><code>'+esc(item.id)+'</code></td>'
        + '<td>'+(item.cover ? '<img src="'+esc(item.cover)+'" class="avatar">' : '-')+'</td>'
        + '<td>'+esc(item.title)+'</td>'
        + '<td>'+esc(item.category)+'</td>'
        + '<td>'+(item.status === 'enabled' ? '<span class="layui-badge layui-bg-green">启用</span>' : '<span class="layui-badge">停用</span>')+'</td>'
        + '<td>'+esc(item.sort)+'</td>'
        + '<td>'+esc(item.hot || 0)+'</td>'
        + '<td>'+esc(item.used || 0)+'</td>'
        + '<td><a target="_blank" href="'+esc(item.previewUrl)+'">打开</a></td>'
        + '<td>'
        + '<button type="button" class="layui-btn layui-btn-xs js-edit-template" data-index="'+index+'">编辑</button>'
        + '<button type="button" class="layui-btn layui-btn-primary layui-btn-xs js-toggle-template" data-index="'+index+'">'+(item.status === 'enabled' ? '停用' : '启用')+'</button>'
        + '<button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-delete-template" data-index="'+index+'">删除</button>'
        + '</td>'
        + '</tr>';
    }).join('');
  }
  renderListPager('templatePager', templateList.length, templatePage, templatePageSize, function(page, limit){
    templatePage = page;
    templatePageSize = limit;
    renderTemplateRows();
  });
}
function renderTemplateFileOptions(){
  var options = ['<option value="">默认匹配</option>'].concat(templateFiles.filter(function(file){return file.type !== 'missing'}).map(function(file){
    return '<option value="'+esc(file.id)+'">'+esc(file.id)+' - '+esc(file.name || file.id)+'</option>';
  }));
  document.getElementById('tplFile').innerHTML = options.join('');
}
function selectedTemplateFile(id){
  return templateFiles.find(function(file){ return file.id === id; });
}
function parseJsonField(id, fallback){
  var value = document.getElementById(id).value.trim();
  if(!value){return fallback}
  try { return JSON.parse(value); } catch(e) { layer.msg(id + ' 不是合法 JSON'); throw e; }
}
function fillTemplateForm(item){
  item = item || {};
  document.getElementById('tplId').value = item.id || '';
  document.getElementById('tplId').disabled = !!item.id;
  document.getElementById('tplTitle').value = item.title || '';
  document.getElementById('tplCategory').value = item.category || '';
  document.getElementById('tplFile').value = item.templateFile || item.id || '';
  document.getElementById('tplCover').value = item.cover || '';
  document.getElementById('tplSort').value = item.sort || 100;
  document.getElementById('tplStatus').value = item.status || 'enabled';
  document.getElementById('tplFields').value = JSON.stringify(item.fields || [], null, 2);
  document.getElementById('tplDefaults').value = JSON.stringify(item.defaults || {}, null, 2);
  layui.form.render();
}
function collectTemplateForm(){
  return {
    id: document.getElementById('tplId').value.trim(),
    title: document.getElementById('tplTitle').value.trim(),
    category: document.getElementById('tplCategory').value.trim() || '全部',
    templateFile: document.getElementById('tplFile').value.trim(),
    cover: document.getElementById('tplCover').value.trim(),
    status: document.getElementById('tplStatus').value,
    sort: Number(document.getElementById('tplSort').value) || 100,
    fields: parseJsonField('tplFields', []),
    defaults: parseJsonField('tplDefaults', {})
  };
}
function showTemplateEditor(item){
  fillTemplateForm(item);
  layer.open({
    type: 1,
    title: item ? '编辑模板' : '新增模板',
    area: ['920px', '720px'],
    content: layui.$('#templateEditor'),
    btn: ['保存', '取消'],
    yes: function(dialogIndex){
      var template;
      try { template = collectTemplateForm(); } catch(e) { return; }
      if(!template.id || !template.title){ layer.msg('模板ID和标题必填'); return; }
      saveTemplate(template, function(){
        layer.close(dialogIndex);
        layer.msg('已保存');
        load(true);
      });
    }
  });
}
function openTemplateEditor(index){
  if(index === null){
    showTemplateEditor(null);
    return;
  }
  var item = templateList[index];
  if(!item){ return; }
  api('/admin/templates/detail?id=' + encodeURIComponent(item.id)).then(function(data){
    showTemplateEditor(data.template || item);
  });
}
function saveTemplate(template, done){
  api('/admin/templates', {
    method: 'POST',
    body: JSON.stringify({template: template})
  }).then(function(){ if(done){done()} });
}
document.getElementById('btnAddTemplate').addEventListener('click', function(){ openTemplateEditor(null); });
document.getElementById('tplFile').addEventListener('change', function(){
  var value = this.value;
  if(!value){ return; }
  var file = selectedTemplateFile(value) || {};
  if(!document.getElementById('tplId').disabled){
    document.getElementById('tplId').value = value;
  }
  if(!document.getElementById('tplTitle').value.trim()){
    document.getElementById('tplTitle').value = file.name || value;
  }
  api('/admin/templates/files?id=' + encodeURIComponent(value)).then(function(data){
    file = data.file || file;
    var fieldsText = document.getElementById('tplFields').value.trim();
    var defaultsText = document.getElementById('tplDefaults').value.trim();
    if(file.fields && file.fields.length && (!fieldsText || fieldsText === '[]')){
      document.getElementById('tplFields').value = JSON.stringify(file.fields, null, 2);
    }
    if(file.defaults && Object.keys(file.defaults).length && (!defaultsText || defaultsText === '{}')){
      document.getElementById('tplDefaults').value = JSON.stringify(file.defaults, null, 2);
    }
  });
});
document.getElementById('btnLoadTemplates').addEventListener('click', function(){
  layer.confirm('确认从服务器模板目录加载新增模板？已有数据库模板不会被清空。', function(index){
    api('/admin/templates/load', {method: 'POST', body: '{}'}).then(function(data){
      layer.close(index);
      layer.msg('已加载：新增 '+(data.inserted || 0)+'，更新 '+(data.updated || 0));
      load();
    });
  });
});
document.addEventListener('click', function(event){
  var editBtn = event.target.closest('.js-edit-template');
  if(editBtn){ openTemplateEditor(Number(editBtn.getAttribute('data-index'))); return; }
  var toggleBtn = event.target.closest('.js-toggle-template');
  if(toggleBtn){
    var item = templateList[Number(toggleBtn.getAttribute('data-index'))];
    if(!item){ return; }
    api('/admin/templates/status', {
      method: 'POST',
      body: JSON.stringify({id: item.id, status: item.status === 'enabled' ? 'disabled' : 'enabled'})
    }).then(function(){ layer.msg('状态已更新'); load(true); });
    return;
  }
  var deleteBtn = event.target.closest('.js-delete-template');
  if(deleteBtn){
    var target = templateList[Number(deleteBtn.getAttribute('data-index'))];
    if(!target){ return; }
    layer.confirm('确认删除模板 '+target.title+'？', function(index){
      api('/admin/templates/delete', {method: 'POST', body: JSON.stringify({id: target.id})}).then(function(){
        layer.close(index);
        layer.msg('已删除');
        load(true);
      });
    });
  }
});
layui.form.render();
load();
JS;
        return $this->html($this->layout('模板管理', 'templates', $body, $script));
    }

    public function text(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">
    文案管理
    <button type="button" class="layui-btn layui-btn-sm" id="btnAddText">新增文案</button>
    <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="btnImportText">从抓取文案导入</button>
  </div>
  <div class="layui-card-body">
    <div class="layui-form layui-row layui-col-space12" style="margin-bottom:12px">
      <div class="layui-col-md3"><select id="textCategory"></select></div>
      <div class="layui-col-md5"><input id="textKeyword" class="layui-input" placeholder="搜索标题 / 内容 / 备注"></div>
      <div class="layui-col-md2"><button type="button" class="layui-btn layui-btn-fluid" id="btnSearchText">筛选</button></div>
      <div class="layui-col-md2"><button type="button" class="layui-btn layui-btn-primary layui-btn-fluid" id="btnResetText">重置</button></div>
    </div>
    <table class="layui-table">
      <thead><tr><th style="width:70px">ID</th><th>标题</th><th>分类</th><th>文案内容</th><th>备注</th><th style="width:150px">操作</th></tr></thead>
      <tbody id="textRows"></tbody>
    </table>
    <div id="textPager" class="table-pager"></div>
  </div>
</div>
<div id="textEditor" style="display:none;padding:20px">
  <div class="layui-form layui-row layui-col-space12">
    <div class="layui-col-md3"><label>ID</label><input id="textId" class="layui-input" placeholder="留空自动生成"></div>
    <div class="layui-col-md5"><label>标题</label><input id="textTitle" class="layui-input"></div>
    <div class="layui-col-md4"><label>分类</label><select id="textEditCategory"></select></div>
    <div class="layui-col-md12"><label>文案内容</label><textarea id="textContent" class="layui-textarea codearea" placeholder="输入多行文案"></textarea></div>
    <div class="layui-col-md12"><label>备注</label><input id="textNote" class="layui-input"></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var textCategories = [];
var textList = [];
var textPage = 1;
var textPageSize = 10;
function loadText(keepPage){
  api('/admin/text').then(function(data){
    textCategories = data.categories || [];
    textList = data.list || [];
    renderTextCategoryOptions();
    if(!keepPage){ textPage = 1; }
    renderTextRows(false);
  });
}
function renderTextCategoryOptions(){
  var options = textCategories.map(function(item){ return '<option value="'+esc(item.id)+'">'+esc(item.name)+'</option>'; }).join('');
  textCategory.innerHTML = options;
  textEditCategory.innerHTML = options;
  layui.form.render();
}
function currentTextRows(){
  var cid = Number(textCategory.value) || 0;
  var keyword = textKeyword.value.trim().toLowerCase();
  return textList.filter(function(item){
    if(cid && Number(item.categoryId || 0) !== cid){ return false; }
    if(!keyword){ return true; }
    return [item.title, item.content, item.note, item.categoryName].some(function(value){
      return String(value || '').toLowerCase().indexOf(keyword) !== -1;
    });
  });
}
function renderTextRows(resetPage){
  if(resetPage){ textPage = 1; }
  var rows = currentTextRows();
  textPage = clampPage(textPage, rows.length, textPageSize);
  var pageRows = pageSlice(rows, textPage, textPageSize);
  if(!pageRows.length){
    textRows.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:36px">暂无文案</td></tr>';
  } else {
    textRows.innerHTML = pageRows.map(function(item){
      return '<tr>'
        + '<td>'+esc(item.id)+'</td>'
        + '<td><strong>'+esc(item.title)+'</strong></td>'
        + '<td>'+esc(item.categoryName || '')+'</td>'
        + '<td><div class="text-preview">'+esc(item.content || '')+'</div></td>'
        + '<td>'+esc(item.note || '')+'</td>'
        + '<td>'
        + '<button type="button" class="layui-btn layui-btn-xs js-edit-text" data-id="'+esc(item.id)+'">编辑</button>'
        + '<button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-delete-text" data-id="'+esc(item.id)+'">删除</button>'
        + '</td>'
        + '</tr>';
    }).join('');
  }
  renderListPager('textPager', rows.length, textPage, textPageSize, function(page, limit){
    textPage = page;
    textPageSize = limit;
    renderTextRows(false);
  });
}
function findText(id){
  return textList.find(function(item){ return String(item.id) === String(id); });
}
function fillTextForm(item){
  item = item || {};
  textId.value = item.id || '';
  textId.disabled = !!item.id;
  textTitle.value = item.title || '';
  textEditCategory.value = item.categoryId || 0;
  textContent.value = item.content || '';
  textNote.value = item.note || '';
  layui.form.render();
}
function collectTextForm(){
  return {
    id: textId.value.trim(),
    title: textTitle.value.trim(),
    categoryId: Number(textEditCategory.value) || 0,
    content: textContent.value.replace(/\r\n/g, '\n').trim(),
    note: textNote.value.trim()
  };
}
function openTextEditor(id){
  var item = id ? findText(id) : null;
  fillTextForm(item);
  layer.open({
    type: 1,
    title: item ? '编辑文案' : '新增文案',
    area: ['820px', '640px'],
    content: layui.$('#textEditor'),
    btn: ['保存', '取消'],
    yes: function(index){
      var payload = collectTextForm();
      if(!payload.title || !payload.content){ layer.msg('标题和内容必填'); return; }
      api('/admin/text', {method:'POST', body:JSON.stringify(payload)}).then(function(){
        layer.close(index);
        layer.msg('已保存');
        loadText(true);
      });
    }
  });
}
btnAddText.addEventListener('click', function(){ openTextEditor(''); });
btnSearchText.addEventListener('click', function(){ renderTextRows(true); });
btnResetText.addEventListener('click', function(){ textCategory.value = 0; textKeyword.value = ''; layui.form.render(); renderTextRows(true); });
textCategory.addEventListener('change', function(){ renderTextRows(true); });
textKeyword.addEventListener('keydown', function(event){ if(event.key === 'Enter'){ renderTextRows(true); } });
btnImportText.addEventListener('click', function(){
  layer.confirm('确认用已抓取文案覆盖数据库文案库？', function(index){
    api('/admin/text/import', {method:'POST', body:'{}'}).then(function(data){
      layer.close(index);
      layer.msg('已导入 '+((data.list || []).length)+' 条');
      loadText();
    });
  });
});
document.addEventListener('click', function(event){
  var editBtn = event.target.closest('.js-edit-text');
  if(editBtn){ openTextEditor(editBtn.getAttribute('data-id')); return; }
  var deleteBtn = event.target.closest('.js-delete-text');
  if(deleteBtn){
    var id = deleteBtn.getAttribute('data-id');
    var item = findText(id) || {};
    layer.confirm('确认删除文案 '+(item.title || id)+'？', function(index){
      api('/admin/text/delete', {method:'POST', body:JSON.stringify({id:id})}).then(function(){
        layer.close(index);
        layer.msg('已删除');
        loadText(true);
      });
    });
  }
});
layui.form.render();
loadText();
JS;
        return $this->html($this->layout('文案管理', 'text', $body, $script));
    }

    public function music(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">
    音乐管理
    <button type="button" class="layui-btn layui-btn-sm" id="btnAddMusic">新增音乐</button>
    <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="btnImportMusic">从本地曲库导入</button>
  </div>
  <div class="layui-card-body">
    <div class="layui-form layui-row layui-col-space12" style="margin-bottom:12px">
      <div class="layui-col-md3"><select id="musicCategory"></select></div>
      <div class="layui-col-md5"><input id="musicKeyword" class="layui-input" placeholder="搜索标题 / 歌词 / 备注"></div>
      <div class="layui-col-md2"><button type="button" class="layui-btn layui-btn-fluid" id="btnSearchMusic">筛选</button></div>
      <div class="layui-col-md2"><button type="button" class="layui-btn layui-btn-primary layui-btn-fluid" id="btnResetMusic">重置</button></div>
    </div>
    <table class="layui-table">
      <thead><tr><th style="width:70px">ID</th><th>标题</th><th>分类</th><th>歌词/说明</th><th>链接</th><th style="width:150px">操作</th></tr></thead>
      <tbody id="musicRows"></tbody>
    </table>
    <div id="musicPager" class="table-pager"></div>
  </div>
</div>
<div id="musicEditor" style="display:none;padding:20px">
  <div class="layui-form layui-row layui-col-space12">
    <div class="layui-col-md3"><label>ID</label><input id="musicId" class="layui-input" placeholder="留空自动生成"></div>
    <div class="layui-col-md5"><label>标题</label><input id="musicTitle" class="layui-input"></div>
    <div class="layui-col-md4"><label>分类</label><select id="musicEditCategory"></select></div>
    <div class="layui-col-md6"><label>歌词</label><input id="musicLyric" class="layui-input"></div>
    <div class="layui-col-md6"><label>歌手/说明</label><input id="musicArtist" class="layui-input"></div>
    <div class="layui-col-md12"><label>音乐链接</label><input id="musicUrl" class="layui-input" placeholder="https://...mp3 或 .m4a"></div>
    <div class="layui-col-md12"><label>备注</label><input id="musicNote" class="layui-input"></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var musicCategories = [];
var musicList = [];
var musicPage = 1;
var musicPageSize = 10;
function loadMusic(keepPage){
  api('/admin/music').then(function(data){
    musicCategories = data.categories || [];
    musicList = data.list || [];
    renderMusicCategoryOptions();
    if(!keepPage){ musicPage = 1; }
    renderMusicRows(false);
  });
}
function renderMusicCategoryOptions(){
  var options = musicCategories.map(function(item){ return '<option value="'+esc(item.id)+'">'+esc(item.name)+'</option>'; }).join('');
  musicCategory.innerHTML = options;
  musicEditCategory.innerHTML = options;
  layui.form.render();
}
function currentMusicRows(){
  var cid = Number(musicCategory.value) || 0;
  var keyword = musicKeyword.value.trim().toLowerCase();
  return musicList.filter(function(item){
    if(cid && Number(item.categoryId || 0) !== cid){ return false; }
    if(!keyword){ return true; }
    return [item.title, item.lyric, item.artist, item.note, item.url].some(function(value){
      return String(value || '').toLowerCase().indexOf(keyword) !== -1;
    });
  });
}
function renderMusicRows(resetPage){
  if(resetPage){ musicPage = 1; }
  var rows = currentMusicRows();
  musicPage = clampPage(musicPage, rows.length, musicPageSize);
  var pageRows = pageSlice(rows, musicPage, musicPageSize);
  if(!pageRows.length){
    musicRows.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:36px">暂无音乐</td></tr>';
  } else {
    musicRows.innerHTML = pageRows.map(function(item){
      return '<tr>'
        + '<td>'+esc(item.id)+'</td>'
        + '<td><strong>'+esc(item.title)+'</strong></td>'
        + '<td>'+esc(item.categoryName || '')+'</td>'
        + '<td>'+esc(item.lyric || item.artist || item.note || '')+'</td>'
        + '<td><a href="'+esc(item.url)+'" target="_blank">'+esc(item.url).slice(0, 80)+'</a></td>'
        + '<td>'
        + '<button type="button" class="layui-btn layui-btn-xs js-edit-music" data-id="'+esc(item.id)+'">编辑</button>'
        + '<button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-delete-music" data-id="'+esc(item.id)+'">删除</button>'
        + '</td>'
        + '</tr>';
    }).join('');
  }
  renderListPager('musicPager', rows.length, musicPage, musicPageSize, function(page, limit){
    musicPage = page;
    musicPageSize = limit;
    renderMusicRows(false);
  });
}
function findMusic(id){
  return musicList.find(function(item){ return String(item.id) === String(id); });
}
function fillMusicForm(item){
  item = item || {};
  musicId.value = item.id || '';
  musicId.disabled = !!item.id;
  musicTitle.value = item.title || '';
  musicEditCategory.value = item.categoryId || 0;
  musicLyric.value = item.lyric || '';
  musicArtist.value = item.artist || '';
  musicUrl.value = item.url || '';
  musicNote.value = item.note || '';
  layui.form.render();
}
function collectMusicForm(){
  return {
    id: musicId.value.trim(),
    title: musicTitle.value.trim(),
    categoryId: Number(musicEditCategory.value) || 0,
    lyric: musicLyric.value.trim(),
    artist: musicArtist.value.trim(),
    url: musicUrl.value.trim(),
    note: musicNote.value.trim()
  };
}
function openMusicEditor(id){
  var item = id ? findMusic(id) : null;
  fillMusicForm(item);
  layer.open({
    type: 1,
    title: item ? '编辑音乐' : '新增音乐',
    area: ['760px', '520px'],
    content: layui.$('#musicEditor'),
    btn: ['保存', '取消'],
    yes: function(index){
      var payload = collectMusicForm();
      if(!payload.title || !payload.url){ layer.msg('标题和链接必填'); return; }
      api('/admin/music', {method:'POST', body:JSON.stringify(payload)}).then(function(){
        layer.close(index);
        layer.msg('已保存');
        loadMusic(true);
      });
    }
  });
}
btnAddMusic.addEventListener('click', function(){ openMusicEditor(''); });
btnSearchMusic.addEventListener('click', function(){ renderMusicRows(true); });
btnResetMusic.addEventListener('click', function(){ musicCategory.value = 0; musicKeyword.value = ''; layui.form.render(); renderMusicRows(true); });
musicCategory.addEventListener('change', function(){ renderMusicRows(true); });
musicKeyword.addEventListener('keydown', function(event){ if(event.key === 'Enter'){ renderMusicRows(true); } });
btnImportMusic.addEventListener('click', function(){
  layer.confirm('确认用本地抓取曲库覆盖数据库音乐库？', function(index){
    api('/admin/music/import', {method:'POST', body:'{}'}).then(function(data){
      layer.close(index);
      layer.msg('已导入 '+((data.list || []).length)+' 首');
      loadMusic();
    });
  });
});
document.addEventListener('click', function(event){
  var editBtn = event.target.closest('.js-edit-music');
  if(editBtn){ openMusicEditor(editBtn.getAttribute('data-id')); return; }
  var deleteBtn = event.target.closest('.js-delete-music');
  if(deleteBtn){
    var id = deleteBtn.getAttribute('data-id');
    var item = findMusic(id) || {};
    layer.confirm('确认删除音乐 '+(item.title || id)+'？', function(index){
      api('/admin/music/delete', {method:'POST', body:JSON.stringify({id:id})}).then(function(){
        layer.close(index);
        layer.msg('已删除');
        loadMusic(true);
      });
    });
  }
});
layui.form.render();
loadMusic();
JS;
        return $this->html($this->layout('音乐管理', 'music', $body, $script));
    }

    public function background(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">
    背景图管理
    <button type="button" class="layui-btn layui-btn-sm" id="btnAddBackground">新增背景图</button>
    <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="btnImportBackground">从本地图库导入</button>
  </div>
  <div class="layui-card-body">
    <div class="layui-form layui-row layui-col-space12" style="margin-bottom:12px">
      <div class="layui-col-md3"><select id="backgroundCategory"></select></div>
      <div class="layui-col-md5"><input id="backgroundKeyword" class="layui-input" placeholder="搜索标题 / 分类 / 备注 / 链接"></div>
      <div class="layui-col-md2"><button type="button" class="layui-btn layui-btn-fluid" id="btnSearchBackground">筛选</button></div>
      <div class="layui-col-md2"><button type="button" class="layui-btn layui-btn-primary layui-btn-fluid" id="btnResetBackground">重置</button></div>
    </div>
    <table class="layui-table">
      <thead><tr><th style="width:70px">ID</th><th style="width:92px">预览</th><th>标题</th><th>分类</th><th>备注</th><th>链接</th><th style="width:150px">操作</th></tr></thead>
      <tbody id="backgroundRows"></tbody>
    </table>
    <div id="backgroundPager" class="table-pager"></div>
  </div>
</div>
<div id="backgroundEditor" style="display:none;padding:20px">
  <div class="layui-form layui-row layui-col-space12">
    <div class="layui-col-md3"><label>ID</label><input id="backgroundId" class="layui-input" placeholder="留空自动生成"></div>
    <div class="layui-col-md5"><label>标题</label><input id="backgroundTitle" class="layui-input"></div>
    <div class="layui-col-md4"><label>分类</label><select id="backgroundEditCategory"></select></div>
    <div class="layui-col-md12"><label>图片链接</label><input id="backgroundUrl" class="layui-input" placeholder="https://...jpg / png / webp"></div>
    <div class="layui-col-md12"><label>备注</label><input id="backgroundNote" class="layui-input"></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var backgroundCategories = [];
var backgroundList = [];
var backgroundPage = 1;
var backgroundPageSize = 10;
function loadBackground(keepPage){
  api('/admin/background').then(function(data){
    backgroundCategories = data.categories || [];
    backgroundList = data.list || [];
    renderBackgroundCategoryOptions();
    if(!keepPage){ backgroundPage = 1; }
    renderBackgroundRows(false);
  });
}
function renderBackgroundCategoryOptions(){
  var options = backgroundCategories.map(function(item){ return '<option value="'+esc(item.id)+'">'+esc(item.name)+'</option>'; }).join('');
  backgroundCategory.innerHTML = options;
  backgroundEditCategory.innerHTML = options;
  layui.form.render();
}
function currentBackgroundRows(){
  var cid = Number(backgroundCategory.value) || 0;
  var keyword = backgroundKeyword.value.trim().toLowerCase();
  return backgroundList.filter(function(item){
    if(cid && Number(item.categoryId || 0) !== cid){ return false; }
    if(!keyword){ return true; }
    return [item.title, item.categoryName, item.note, item.url].some(function(value){
      return String(value || '').toLowerCase().indexOf(keyword) !== -1;
    });
  });
}
function renderBackgroundRows(resetPage){
  if(resetPage){ backgroundPage = 1; }
  var rows = currentBackgroundRows();
  backgroundPage = clampPage(backgroundPage, rows.length, backgroundPageSize);
  var pageRows = pageSlice(rows, backgroundPage, backgroundPageSize);
  if(!pageRows.length){
    backgroundRows.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#94a3b8;padding:36px">暂无背景图</td></tr>';
  } else {
    backgroundRows.innerHTML = pageRows.map(function(item){
      return '<tr>'
        + '<td>'+esc(item.id)+'</td>'
        + '<td><img class="bg-thumb" src="'+esc(item.url)+'" alt=""></td>'
        + '<td><strong>'+esc(item.title)+'</strong></td>'
        + '<td>'+esc(item.categoryName || '')+'</td>'
        + '<td>'+esc(item.note || '')+'</td>'
        + '<td><a href="'+esc(item.url)+'" target="_blank">'+esc(item.url).slice(0, 80)+'</a></td>'
        + '<td>'
        + '<button type="button" class="layui-btn layui-btn-xs js-edit-background" data-id="'+esc(item.id)+'">编辑</button>'
        + '<button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-delete-background" data-id="'+esc(item.id)+'">删除</button>'
        + '</td>'
        + '</tr>';
    }).join('');
  }
  renderListPager('backgroundPager', rows.length, backgroundPage, backgroundPageSize, function(page, limit){
    backgroundPage = page;
    backgroundPageSize = limit;
    renderBackgroundRows(false);
  });
}
function findBackground(id){
  return backgroundList.find(function(item){ return String(item.id) === String(id); });
}
function fillBackgroundForm(item){
  item = item || {};
  backgroundId.value = item.id || '';
  backgroundId.disabled = !!item.id;
  backgroundTitle.value = item.title || '';
  backgroundEditCategory.value = item.categoryId || 0;
  backgroundUrl.value = item.url || '';
  backgroundNote.value = item.note || '';
  layui.form.render();
}
function collectBackgroundForm(){
  return {
    id: backgroundId.value.trim(),
    title: backgroundTitle.value.trim(),
    categoryId: Number(backgroundEditCategory.value) || 0,
    url: backgroundUrl.value.trim(),
    note: backgroundNote.value.trim()
  };
}
function openBackgroundEditor(id){
  var item = id ? findBackground(id) : null;
  fillBackgroundForm(item);
  layer.open({
    type: 1,
    title: item ? '编辑背景图' : '新增背景图',
    area: ['760px', '430px'],
    content: layui.$('#backgroundEditor'),
    btn: ['保存', '取消'],
    yes: function(index){
      var payload = collectBackgroundForm();
      if(!payload.title || !payload.url){ layer.msg('标题和链接必填'); return; }
      api('/admin/background', {method:'POST', body:JSON.stringify(payload)}).then(function(){
        layer.close(index);
        layer.msg('已保存');
        loadBackground(true);
      });
    }
  });
}
btnAddBackground.addEventListener('click', function(){ openBackgroundEditor(''); });
btnSearchBackground.addEventListener('click', function(){ renderBackgroundRows(true); });
btnResetBackground.addEventListener('click', function(){ backgroundCategory.value = 0; backgroundKeyword.value = ''; layui.form.render(); renderBackgroundRows(true); });
backgroundCategory.addEventListener('change', function(){ renderBackgroundRows(true); });
backgroundKeyword.addEventListener('keydown', function(event){ if(event.key === 'Enter'){ renderBackgroundRows(true); } });
btnImportBackground.addEventListener('click', function(){
  layer.confirm('确认用本地抓取图库覆盖数据库背景图库？', function(index){
    api('/admin/background/import', {method:'POST', body:'{}'}).then(function(data){
      layer.close(index);
      layer.msg('已导入 '+((data.list || []).length)+' 张');
      loadBackground();
    });
  });
});
document.addEventListener('click', function(event){
  var editBtn = event.target.closest('.js-edit-background');
  if(editBtn){ openBackgroundEditor(editBtn.getAttribute('data-id')); return; }
  var deleteBtn = event.target.closest('.js-delete-background');
  if(deleteBtn){
    var id = deleteBtn.getAttribute('data-id');
    var item = findBackground(id) || {};
    layer.confirm('确认删除背景图 '+(item.title || id)+'？', function(index){
      api('/admin/background/delete', {method:'POST', body:JSON.stringify({id:id})}).then(function(){
        layer.close(index);
        layer.msg('已删除');
        loadBackground(true);
      });
    });
  }
});
layui.form.render();
loadBackground();
JS;
        return $this->html($this->layout('背景图管理', 'background', $body, $script));
    }

    public function files(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">
    文件管理
    <button type="button" class="layui-btn layui-btn-sm" id="btnReloadFiles">刷新</button>
    <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="btnSyncStatic">同步静态资源到 COS</button>
  </div>
  <div class="layui-card-body">
    <div class="layui-form layui-row layui-col-space12" style="margin-bottom:12px">
      <div class="layui-col-md3">
        <select id="filePrefix">
          <option value="">全部 yzd/</option>
          <option value="static">静态资源 static/</option>
          <option value="template">模板资源 template/</option>
          <option value="assets">构建资源 assets/</option>
          <option value="uploads">用户上传 uploads/</option>
          <option value="uploads/avatars">头像 uploads/avatars/</option>
          <option value="uploads/image">图片 uploads/image/</option>
          <option value="uploads/music">音乐 uploads/music/</option>
          <option value="uploads/files">文件 uploads/files/</option>
        </select>
      </div>
      <div class="layui-col-md4"><input id="customPrefix" class="layui-input" placeholder="自定义目录，例如 uploads/image"></div>
      <div class="layui-col-md2"><button type="button" class="layui-btn layui-btn-fluid" id="btnSearchFiles">筛选</button></div>
      <div class="layui-col-md3"><div id="fileStorageInfo" style="line-height:38px;color:#64748b"></div></div>
    </div>
    <div class="layui-form layui-row layui-col-space12" style="margin-bottom:16px">
      <div class="layui-col-md3">
        <select id="uploadPrefix">
          <option value="uploads/files">上传到 uploads/files/</option>
          <option value="uploads/image">上传到 uploads/image/</option>
          <option value="uploads/music">上传到 uploads/music/</option>
          <option value="static/admin">上传到 static/admin/</option>
          <option value="assets/admin">上传到 assets/admin/</option>
        </select>
      </div>
      <div class="layui-col-md6"><input id="fileInput" class="layui-input" type="file" multiple></div>
      <div class="layui-col-md3"><button type="button" class="layui-btn layui-btn-fluid" id="btnUploadFiles">上传文件</button></div>
    </div>
    <table class="layui-table">
      <thead><tr><th style="width:92px">预览</th><th>文件</th><th>Key</th><th style="width:100px">大小</th><th style="width:180px">更新时间</th><th style="width:210px">操作</th></tr></thead>
      <tbody id="fileRows"></tbody>
    </table>
    <div id="filePager" class="file-pager"></div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var filePage = 1;
var filePageSize = 20;
var fileMarkers = [''];
var fileHasMore = false;
var fileRowsData = [];
function selectedPrefix(){
  return (customPrefix.value.trim() || filePrefix.value || '').replace(/^\/+|\/+$/g, '');
}
function formatSize(size){
  size = Number(size) || 0;
  if(size >= 1024 * 1024){ return (size / 1024 / 1024).toFixed(2) + ' MB'; }
  if(size >= 1024){ return (size / 1024).toFixed(1) + ' KB'; }
  return size + ' B';
}
function previewFile(item){
  if(item.type === 'image'){
    return '<img class="file-thumb" src="'+esc(item.url)+'" alt="">';
  }
  if(item.type === 'audio'){
    return '<audio controls src="'+esc(item.url)+'" style="width:86px"></audio>';
  }
  if(item.type === 'video'){
    return '<video controls src="'+esc(item.url)+'" class="file-thumb"></video>';
  }
  return '<span class="layui-badge layui-bg-gray">'+esc((item.name || '').split('.').pop() || 'file')+'</span>';
}
function renderFileRows(){
  var html = fileRowsData.map(function(item, index){
    return '<tr>'
      + '<td>'+previewFile(item)+'</td>'
      + '<td><strong>'+esc(item.name || '')+'</strong><div style="margin-top:6px;color:#94a3b8">'+esc(item.type || 'file')+' · '+esc(item.storageClass || '')+'</div></td>'
      + '<td><code class="file-key">'+esc(item.key || '')+'</code></td>'
      + '<td>'+formatSize(item.size)+'</td>'
      + '<td>'+esc(item.lastModified || '')+'</td>'
      + '<td>'
      + '<a class="layui-btn layui-btn-primary layui-btn-xs" target="_blank" href="'+esc(item.url || '')+'">打开</a>'
      + '<button type="button" class="layui-btn layui-btn-xs js-copy-file" data-index="'+index+'">复制链接</button>'
      + '<button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-delete-file" data-index="'+index+'">删除</button>'
      + '</td>'
      + '</tr>';
  }).join('');
  fileRows.innerHTML = html || '<tr><td colspan="6" style="text-align:center;color:#94a3b8;padding:36px">暂无文件</td></tr>';
  renderFilePager();
}
function loadFiles(reset){
  if(reset){
    filePage = 1;
    fileMarkers = [''];
  }
  var query = new URLSearchParams();
  query.set('prefix', selectedPrefix());
  query.set('limit', String(filePageSize));
  var marker = fileMarkers[filePage - 1] || '';
  if(marker){ query.set('marker', marker); }
  api('/admin/files?' + query.toString()).then(function(data){
    fileStorageInfo.innerText = (data.driver || '-') + ' · ' + (data.bucket || '') + ' · ' + (data.prefix || '') + ' · 第 ' + filePage + ' 页';
    fileRowsData = data.list || [];
    fileHasMore = !!data.hasMore;
    fileMarkers[filePage] = data.nextMarker || '';
    renderFileRows();
  });
}
function renderFilePager(){
  filePager.innerHTML = '<button type="button" class="layui-btn layui-btn-primary layui-btn-sm js-file-page" data-page="'+(filePage - 1)+'" '+(filePage <= 1 ? 'disabled' : '')+'>上一页</button>'
    + '<span>第 '+filePage+' 页，本页 '+fileRowsData.length+' 条'+(fileHasMore ? '，后面还有更多' : '')+'</span>'
    + '<button type="button" class="layui-btn layui-btn-primary layui-btn-sm js-file-page" data-page="'+(filePage + 1)+'" '+(!fileHasMore ? 'disabled' : '')+'>下一页</button>'
    + '<select id="filePageSizeSelect" class="layui-input"><option value="20">20 条/页</option><option value="50">50 条/页</option><option value="100">100 条/页</option></select>';
  document.getElementById('filePageSizeSelect').value = String(filePageSize);
}
function goFilePage(page){
  page = Number(page) || 1;
  if(page < 1 || (page > filePage && !fileHasMore)){ return; }
  filePage = page;
  loadFiles(false);
}
function uploadFiles(){
  var files = Array.prototype.slice.call(fileInput.files || []);
  if(!files.length){ layer.msg('请选择文件'); return; }
  var form = new FormData();
  form.append('prefix', uploadPrefix.value);
  files.forEach(function(file){ form.append('files[]', file); });
  fetch('/admin/files/upload', {
    method: 'POST',
    headers: {Authorization: 'Bearer ' + (localStorage.getItem('yzd_admin_token') || '')},
    body: form
  }).then(function(r){ return r.json(); }).then(function(res){
    if(!res.success){ layer.msg(res.message || '上传失败'); return; }
    layer.msg('已上传 '+((res.data.uploaded || []).length)+' 个文件');
    fileInput.value = '';
    customPrefix.value = uploadPrefix.value;
    loadFiles(true);
  });
}
function deleteFile(index){
  var item = fileRowsData[index];
  if(!item){ return; }
  layer.confirm('确认删除 '+(item.name || item.key)+'？', function(dialogIndex){
    api('/admin/files/delete', {method:'POST', body:JSON.stringify({key:item.key})}).then(function(){
      layer.close(dialogIndex);
      layer.msg('已删除');
      loadFiles(true);
    });
  });
}
function copyFile(index){
  var item = fileRowsData[index];
  if(!item || !item.url){ return; }
  if(navigator.clipboard){
    navigator.clipboard.writeText(item.url).then(function(){ layer.msg('链接已复制'); });
  } else {
    prompt('复制链接', item.url);
  }
}
function syncStatic(){
  layer.confirm('会把 public/static、template、assets、uploads 同步到 COS 的 yzd/ 目录下，确认继续？', function(index){
    layer.close(index);
    runSyncBatches(['static', 'template', 'assets', 'uploads'], 0, {}, 0);
  });
}
function runSyncBatches(dirs, dirIndex, totals, offset){
  if(dirIndex >= dirs.length){
    var message = Object.keys(totals).map(function(key){
      var item = totals[key] || {};
      return key + ': 上传 ' + (item.uploaded || 0) + ' / ' + (item.total || 0) + '，失败 ' + (item.failed || 0);
    }).join('<br>');
    layer.alert(message || '同步完成');
    loadFiles(true);
    btnSyncStatic.disabled = false;
    btnSyncStatic.innerText = '同步静态资源到 COS';
    return;
  }
  btnSyncStatic.disabled = true;
  var dir = dirs[dirIndex];
  btnSyncStatic.innerText = '同步中 ' + dir + ' ' + offset;
  api('/admin/files/sync-static', {
    method:'POST',
    body:JSON.stringify({dir: dir, offset: offset, limit: 12, dryRun: false})
  }).then(function(data){
    var summary = data.summary || {};
    totals[dir] = totals[dir] || {total: summary.total || 0, uploaded: 0, failed: 0};
    totals[dir].total = summary.total || totals[dir].total || 0;
    totals[dir].uploaded += summary.uploaded || 0;
    totals[dir].failed += summary.failed || 0;
    if(summary.hasMore){
      runSyncBatches(dirs, dirIndex, totals, summary.nextOffset || 0);
    } else {
      runSyncBatches(dirs, dirIndex + 1, totals, 0);
    }
  }).catch(function(){
    btnSyncStatic.disabled = false;
    btnSyncStatic.innerText = '同步静态资源到 COS';
  });
}
filePrefix.addEventListener('change', function(){ customPrefix.value = filePrefix.value; layui.form.render(); loadFiles(true); });
btnSearchFiles.addEventListener('click', function(){ loadFiles(true); });
btnReloadFiles.addEventListener('click', function(){ loadFiles(true); });
btnUploadFiles.addEventListener('click', uploadFiles);
btnSyncStatic.addEventListener('click', syncStatic);
document.addEventListener('click', function(event){
  var filePageBtn = event.target.closest('.js-file-page');
  if(filePageBtn){ goFilePage(Number(filePageBtn.getAttribute('data-page'))); return; }
  var copyBtn = event.target.closest('.js-copy-file');
  if(copyBtn){ copyFile(Number(copyBtn.getAttribute('data-index'))); return; }
  var deleteBtn = event.target.closest('.js-delete-file');
  if(deleteBtn){ deleteFile(Number(deleteBtn.getAttribute('data-index'))); }
});
document.addEventListener('change', function(event){
  if(event.target && event.target.id === 'filePageSizeSelect'){
    filePageSize = Number(event.target.value) || 20;
    loadFiles(true);
  }
});
layui.form.render();
loadFiles(true);
JS;
        return $this->html($this->layout('文件管理', 'files', $body, $script));
    }

    public function config(): Response
    {
        $body = <<<'HTML'
<div class="layui-card">
  <div class="layui-card-header">
    平台配置
    <span style="float:right">
      <button type="button" class="layui-btn layui-btn-sm" id="btnSaveConfig">保存配置</button>
    </span>
  </div>
  <div class="layui-card-body">
    <blockquote class="layui-elem-quote layui-quote-nm" style="margin-bottom:16px">
      这里会同步保存网页后台和小程序管理页共用的配置。`AppID / OfferID / AppKey / 回调地址` 这类环境级参数不在此页维护。
    </blockquote>

    <div class="layui-card" style="box-shadow:none;border:1px solid #eef2f7">
      <div class="layui-card-header">小程序功能配置</div>
      <div class="layui-card-body">
        <div class="layui-form layui-row layui-col-space12">
          <div class="layui-col-md6">
            <label>激励广告</label>
            <div style="margin-top:8px">
              <input id="enableRewardAd" type="checkbox" title="启用激励广告" lay-skin="primary">
            </div>
          </div>
          <div class="layui-col-md6">
            <label>小程序虚拟支付</label>
            <div style="margin-top:8px">
              <input id="enablePayment" type="checkbox" title="启用虚拟支付" lay-skin="primary">
            </div>
          </div>
          <div class="layui-col-md6">
            <label>广告位 ID</label>
            <input id="rewardAdUnitId" class="layui-input" placeholder="rewarded video ad unit id">
          </div>
          <div class="layui-col-md6">
            <label>生成价格</label>
            <input id="price" class="layui-input" type="number" min="0" step="0.01" placeholder="0">
          </div>
          <div class="layui-col-md6">
            <label>生成商品 ID</label>
            <input id="codeProductId" class="layui-input" placeholder="code_generation">
          </div>
          <div class="layui-col-md6">
            <label>小助手商品 ID</label>
            <input id="assistantProductId" class="layui-input" placeholder="assistant_service">
          </div>
        </div>
      </div>
    </div>

    <div class="layui-card" style="margin-top:16px;box-shadow:none;border:1px solid #eef2f7">
      <div class="layui-card-header">
        VIP 套餐配置
        <span style="float:right">
          <button type="button" class="layui-btn layui-btn-primary layui-btn-xs" id="btnAddVipPackage">新增套餐</button>
        </span>
      </div>
      <div class="layui-card-body">
        <div id="vipPackagesBox" class="layui-row layui-col-space12"></div>
      </div>
    </div>

    <div class="layui-card" style="margin-top:16px;box-shadow:none;border:1px solid #eef2f7">
      <div class="layui-card-header">
        积分兑换配置
        <span style="float:right">
          <button type="button" class="layui-btn layui-btn-primary layui-btn-xs" id="btnAddExchangeItem">新增兑换项</button>
        </span>
      </div>
      <div class="layui-card-body">
        <div id="exchangeItemsBox" class="layui-row layui-col-space12"></div>
      </div>
    </div>

    <div class="layui-card" style="margin-top:16px;box-shadow:none;border:1px solid #eef2f7">
      <div class="layui-card-header">用户权益配置</div>
      <div class="layui-card-body">
        <div class="layui-form layui-row layui-col-space12">
          <div class="layui-col-md4">
            <label>当前积分</label>
            <input id="userPoints" class="layui-input" type="number" min="0" placeholder="0">
          </div>
          <div class="layui-col-md4">
            <label>剩余次数</label>
            <input id="userQuota" class="layui-input" type="number" min="0" placeholder="0">
          </div>
          <div class="layui-col-md4">
            <label>VIP 状态</label>
            <div style="margin-top:8px">
              <input id="userIsVip" type="checkbox" title="当前管理员账号为 VIP" lay-skin="primary">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
HTML;
        $script = <<<'JS'
var configState = {
  enableRewardAd: false,
  enablePayment: false,
  rewardAdUnitId: '',
  price: 0,
  codeProductId: '',
  assistantProductId: '',
  vipPackages: [],
  exchangeItems: []
};
var configUserState = {
  points: 0,
  quota: 0,
  isVip: false
};

function normalizeVipPackage(item){
  item = item || {};
  return {
    id: String(item.id || ''),
    name: String(item.name || ''),
    currentPrice: String(item.currentPrice == null ? '0' : item.currentPrice),
    originalPrice: String(item.originalPrice == null ? '' : item.originalPrice),
    tag: String(item.tag || ''),
    days: Number(item.days) || 0,
    productId: String(item.productId || ''),
    featuresText: Array.isArray(item.features) ? item.features.join('，') : String(item.features || '')
  };
}

function normalizeExchangeItem(item){
  item = item || {};
  return {
    id: String(item.id || ''),
    name: String(item.name || ''),
    type: item.type === 'vip' ? 'vip' : 'quota',
    points: Number(item.points) || 0,
    quota: Number(item.quota) || 0,
    days: Number(item.days) || 0
  };
}

function renderBasicConfig(){
  enableRewardAd.checked = !!configState.enableRewardAd;
  enablePayment.checked = !!configState.enablePayment;
  rewardAdUnitId.value = configState.rewardAdUnitId || '';
  price.value = configState.price || 0;
  codeProductId.value = configState.codeProductId || '';
  assistantProductId.value = configState.assistantProductId || '';
  userPoints.value = configUserState.points || 0;
  userQuota.value = configUserState.quota || 0;
  userIsVip.checked = !!configUserState.isVip;
  layui.form.render();
}

function renderVipPackages(){
  var list = configState.vipPackages || [];
  if(!list.length){
    vipPackagesBox.innerHTML = '<div class="layui-col-md12"><div style="padding:28px;text-align:center;color:#94a3b8;border:1px dashed #dbe3ec;border-radius:8px">暂无 VIP 套餐</div></div>';
    return;
  }
  vipPackagesBox.innerHTML = list.map(function(item, index){
    return '<div class="layui-col-md6">'
      + '<div class="layui-card" style="margin-bottom:0">'
      + '<div class="layui-card-header">套餐 '+(index + 1)
      + '<span style="float:right"><button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-remove-vip" data-index="'+index+'">删除</button></span>'
      + '</div>'
      + '<div class="layui-card-body">'
      + '<div class="layui-form layui-row layui-col-space12">'
      + '<div class="layui-col-md6"><label>套餐 ID</label><input class="layui-input js-vip-field" data-index="'+index+'" data-field="id" value="'+esc(item.id || '')+'" placeholder="vip_month"></div>'
      + '<div class="layui-col-md6"><label>套餐名称</label><input class="layui-input js-vip-field" data-index="'+index+'" data-field="name" value="'+esc(item.name || '')+'" placeholder="月度会员"></div>'
      + '<div class="layui-col-md4"><label>现价</label><input class="layui-input js-vip-field" data-index="'+index+'" data-field="currentPrice" type="number" min="0" step="0.01" value="'+esc(item.currentPrice || '0')+'"></div>'
      + '<div class="layui-col-md4"><label>原价</label><input class="layui-input js-vip-field" data-index="'+index+'" data-field="originalPrice" type="number" min="0" step="0.01" value="'+esc(item.originalPrice || '')+'"></div>'
      + '<div class="layui-col-md4"><label>标签</label><input class="layui-input js-vip-field" data-index="'+index+'" data-field="tag" value="'+esc(item.tag || '')+'" placeholder="推荐"></div>'
      + '<div class="layui-col-md4"><label>会员天数</label><input class="layui-input js-vip-field" data-index="'+index+'" data-field="days" type="number" min="0" value="'+esc(item.days || 0)+'"></div>'
      + '<div class="layui-col-md8"><label>商品 ID</label><input class="layui-input js-vip-field" data-index="'+index+'" data-field="productId" value="'+esc(item.productId || '')+'" placeholder="vip_month"></div>'
      + '<div class="layui-col-md12"><label>权益</label><textarea class="layui-textarea js-vip-field" data-index="'+index+'" data-field="featuresText" placeholder="用逗号或换行分隔">'+esc(item.featuresText || '')+'</textarea></div>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>';
  }).join('');
}

function renderExchangeItems(){
  var list = configState.exchangeItems || [];
  if(!list.length){
    exchangeItemsBox.innerHTML = '<div class="layui-col-md12"><div style="padding:28px;text-align:center;color:#94a3b8;border:1px dashed #dbe3ec;border-radius:8px">暂无积分兑换项</div></div>';
    return;
  }
  exchangeItemsBox.innerHTML = list.map(function(item, index){
    return '<div class="layui-col-md6">'
      + '<div class="layui-card" style="margin-bottom:0">'
      + '<div class="layui-card-header">兑换项 '+(index + 1)
      + '<span style="float:right"><button type="button" class="layui-btn layui-btn-danger layui-btn-xs js-remove-exchange" data-index="'+index+'">删除</button></span>'
      + '</div>'
      + '<div class="layui-card-body">'
      + '<div class="layui-form layui-row layui-col-space12">'
      + '<div class="layui-col-md6"><label>兑换项 ID</label><input class="layui-input js-exchange-field" data-index="'+index+'" data-field="id" value="'+esc(item.id || '')+'" placeholder="quota_1"></div>'
      + '<div class="layui-col-md6"><label>名称</label><input class="layui-input js-exchange-field" data-index="'+index+'" data-field="name" value="'+esc(item.name || '')+'" placeholder="兑换 1 次制作"></div>'
      + '<div class="layui-col-md4"><label>类型</label><select class="layui-input js-exchange-type" data-index="'+index+'"><option value="quota"'+(item.type === 'quota' ? ' selected' : '')+'>兑换次数</option><option value="vip"'+(item.type === 'vip' ? ' selected' : '')+'>兑换VIP</option></select></div>'
      + '<div class="layui-col-md4"><label>所需积分</label><input class="layui-input js-exchange-field" data-index="'+index+'" data-field="points" type="number" min="0" value="'+esc(item.points || 0)+'"></div>'
      + '<div class="layui-col-md4"><label>增加次数</label><input class="layui-input js-exchange-field" data-index="'+index+'" data-field="quota" type="number" min="0" value="'+esc(item.quota || 0)+'"></div>'
      + '<div class="layui-col-md12"><label>VIP 天数</label><input class="layui-input js-exchange-field" data-index="'+index+'" data-field="days" type="number" min="0" value="'+esc(item.days || 0)+'"></div>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '</div>';
  }).join('');
}

function renderConfig(){
  renderBasicConfig();
  renderVipPackages();
  renderExchangeItems();
}

function loadConfig(){
  api('/admin/config').then(function(data){
    var c = data.appConfig || {};
    configState = {
      enableRewardAd: !!c.enableRewardAd,
      enablePayment: !!c.enablePayment,
      rewardAdUnitId: String(c.rewardAdUnitId || ''),
      price: Number(c.price) || 0,
      codeProductId: String(c.codeProductId || ''),
      assistantProductId: String(c.assistantProductId || ''),
      vipPackages: (c.vipPackages || []).map(normalizeVipPackage),
      exchangeItems: (c.exchangeItems || []).map(normalizeExchangeItem)
    };
    configUserState = {
      points: Number((data.userState || {}).points) || 0,
      quota: Number((data.userState || {}).quota) || 0,
      isVip: !!((data.userState || {}).isVip)
    };
    renderConfig();
  });
}

function buildSavePayload(){
  return {
    appConfig: {
      enableRewardAd: !!configState.enableRewardAd,
      enablePayment: !!configState.enablePayment,
      rewardAdUnitId: String(configState.rewardAdUnitId || '').trim(),
      price: Number(configState.price) || 0,
      codeProductId: String(configState.codeProductId || '').trim(),
      assistantProductId: String(configState.assistantProductId || '').trim(),
      vipPackages: (configState.vipPackages || []).map(function(item, index){
        var normalized = normalizeVipPackage(item);
        return {
          id: String(normalized.id || ('vip_' + (index + 1))).trim(),
          name: String(normalized.name || ('VIP套餐' + (index + 1))).trim(),
          currentPrice: String(normalized.currentPrice || '0').trim(),
          originalPrice: String(normalized.originalPrice || '').trim(),
          tag: String(normalized.tag || '').trim(),
          days: Number(normalized.days) || 0,
          productId: String(normalized.productId || '').trim(),
          features: String(normalized.featuresText || '')
            .split(/[,，\n]/)
            .map(function(text){ return text.trim(); })
            .filter(Boolean)
        };
      }),
      exchangeItems: (configState.exchangeItems || []).map(function(item, index){
        var normalized = normalizeExchangeItem(item);
        return {
          id: String(normalized.id || ('exchange_' + (index + 1))).trim(),
          name: String(normalized.name || ('兑换项' + (index + 1))).trim(),
          type: normalized.type === 'vip' ? 'vip' : 'quota',
          points: Number(normalized.points) || 0,
          quota: Number(normalized.quota) || 0,
          days: Number(normalized.days) || 0
        };
      })
    },
    userState: {
      points: Number(configUserState.points) || 0,
      quota: Number(configUserState.quota) || 0,
      isVip: !!configUserState.isVip
    }
  };
}

function saveConfig(){
  api('/admin/config', {
    method: 'POST',
    body: JSON.stringify(buildSavePayload())
  }).then(function(){
    layer.msg('已保存');
    loadConfig();
  });
}
document.addEventListener('input', function(event){
  var target = event.target;
  if(target.id === 'rewardAdUnitId'){ configState.rewardAdUnitId = target.value; return; }
  if(target.id === 'price'){ configState.price = target.value; return; }
  if(target.id === 'codeProductId'){ configState.codeProductId = target.value; return; }
  if(target.id === 'assistantProductId'){ configState.assistantProductId = target.value; return; }
  if(target.id === 'userPoints'){ configUserState.points = target.value; return; }
  if(target.id === 'userQuota'){ configUserState.quota = target.value; return; }
  if(target.classList.contains('js-vip-field')){
    var vipIndex = Number(target.getAttribute('data-index'));
    var vipField = target.getAttribute('data-field');
    configState.vipPackages[vipIndex][vipField] = target.value;
    return;
  }
  if(target.classList.contains('js-exchange-field')){
    var exchangeIndex = Number(target.getAttribute('data-index'));
    var exchangeField = target.getAttribute('data-field');
    configState.exchangeItems[exchangeIndex][exchangeField] = target.value;
  }
});
document.addEventListener('change', function(event){
  var target = event.target;
  if(target.id === 'enableRewardAd'){ configState.enableRewardAd = !!target.checked; return; }
  if(target.id === 'enablePayment'){ configState.enablePayment = !!target.checked; return; }
  if(target.id === 'userIsVip'){ configUserState.isVip = !!target.checked; return; }
  if(target.classList.contains('js-exchange-type')){
    var index = Number(target.getAttribute('data-index'));
    configState.exchangeItems[index].type = target.value === 'vip' ? 'vip' : 'quota';
  }
});
document.addEventListener('click', function(event){
  var addVipBtn = event.target.closest('#btnAddVipPackage');
  if(addVipBtn){
    configState.vipPackages.push(normalizeVipPackage({
      id: '',
      name: '',
      currentPrice: '0',
      originalPrice: '',
      tag: '',
      days: 30,
      productId: '',
      features: []
    }));
    renderVipPackages();
    return;
  }
  var removeVipBtn = event.target.closest('.js-remove-vip');
  if(removeVipBtn){
    configState.vipPackages.splice(Number(removeVipBtn.getAttribute('data-index')), 1);
    renderVipPackages();
    return;
  }
  var addExchangeBtn = event.target.closest('#btnAddExchangeItem');
  if(addExchangeBtn){
    configState.exchangeItems.push(normalizeExchangeItem({
      id: '',
      name: '',
      type: 'quota',
      points: 0,
      quota: 1,
      days: 0
    }));
    renderExchangeItems();
    return;
  }
  var removeExchangeBtn = event.target.closest('.js-remove-exchange');
  if(removeExchangeBtn){
    configState.exchangeItems.splice(Number(removeExchangeBtn.getAttribute('data-index')), 1);
    renderExchangeItems();
    return;
  }
  if(event.target.closest('#btnSaveConfig')){
    saveConfig();
  }
});
layui.form.render();
loadConfig();
JS;
        return $this->html($this->layout('平台配置', 'config', $body, $script));
    }

    private function html(string $html): Response
    {
        return Response::create($html, 'html')->header(['Content-Type' => 'text/html; charset=utf-8']);
    }

    private function layout(string $title, string $active, string $body, string $script, bool $guard = true): string
    {
        $guardScript = $guard ? "if(!localStorage.getItem('yzd_admin_token')){location.href='/admin/login'}" : '';
        $page = $guard ? $this->menu($active) . $body . '</div></main></div>' : $body;

        return <<<HTML
<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{$title} - 云栈点后台</title>
  <link rel="stylesheet" href="/static/vendor/layui/css/layui.css">
  <style>
    body{background:#f4f6f9;color:#1f2937}.admin{display:flex;min-height:100vh}.side{width:220px;background:#111827;color:#cbd5e1;padding:18px 0;overflow-y:auto}.brand{padding:0 22px 18px;color:#fff;font-size:20px;font-weight:700}.side-section{margin:8px 10px 14px}.side-title{padding:8px 12px;color:#64748b;font-size:12px;letter-spacing:0}.side a{display:block;margin:2px 0;padding:10px 12px;border-radius:7px;color:#cbd5e1}.side a.active,.side a:hover{background:#1f2937;color:#fff}.side .logout{margin:12px 10px 0;color:#94a3b8}.main{flex:1;min-width:0}.top{height:58px;background:#fff;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;padding:0 22px}.content{padding:22px}.stat{background:#fff;border:1px solid #e5e7eb;border-radius:8px;padding:22px}.stat span{display:block;color:#6b7280}.stat strong{display:block;margin-top:12px;font-size:30px}.layui-card{border-radius:8px}.avatar{width:38px;height:38px;border-radius:50%;object-fit:cover}.bg-thumb,.file-thumb{width:64px;height:64px;border-radius:6px;object-fit:cover;background:#eef2f7}.file-key{word-break:break-all;white-space:normal}.text-preview{max-width:520px;max-height:96px;overflow:hidden;white-space:pre-wrap;line-height:1.7;color:#4b5563}.codearea{min-height:220px;font-family:Consolas,monospace;font-size:12px}.json-view{margin:0;padding:18px;max-height:640px;overflow:auto;background:#0f172a;color:#dbeafe;font:12px/1.6 Consolas,monospace;white-space:pre-wrap;word-break:break-word}.table-pager{padding-top:12px;text-align:right}.file-pager{display:flex;gap:10px;align-items:center;justify-content:flex-end;padding-top:12px;color:#64748b}.file-pager .layui-input{width:92px}.login-page{min-height:100vh;display:flex;align-items:center;justify-content:center;background:#f4f6f9}.login-box{width:360px;background:#fff;border-radius:10px;padding:34px;box-shadow:0 12px 36px rgba(15,23,42,.10)}.login-box h1{margin:0;font-size:26px}.login-box p{margin:8px 0 24px;color:#6b7280}code{font-family:Consolas,monospace;color:#334155}
  </style>
</head>
<body>
<script>{$guardScript}</script>
{$page}
<script src="/static/vendor/layui/layui.js"></script>
<script>
var layer = layui.layer;
var laypage = layui.laypage;
function esc(v){return String(v == null ? '' : v).replace(/[&<>"']/g,function(s){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]})}
function clampPage(page,count,limit){return Math.max(1, Math.min(Math.max(1, Math.ceil((Number(count)||0)/(Number(limit)||10))), Number(page)||1))}
function pageSlice(list,page,limit){var start=(Math.max(1,page)-1)*limit;return (list||[]).slice(start,start+limit)}
function renderListPager(elemId,count,page,limit,onChange){
  var elem = document.getElementById(elemId);
  if(!elem){return}
  if(!count){elem.innerHTML = ''; return}
  laypage.render({
    elem: elemId,
    count: count,
    curr: page,
    limit: limit,
    limits: [10, 20, 50, 100],
    layout: ['prev', 'page', 'next', 'skip', 'count', 'limit'],
    jump: function(obj, first){
      if(first){return}
      onChange(obj.curr, obj.limit);
    }
  });
}
function api(url,opt){
  opt = opt || {};
  opt.headers = Object.assign({Authorization:'Bearer '+(localStorage.getItem('yzd_admin_token') || ''),'Content-Type':'application/json'}, opt.headers || {});
  return fetch(url,opt).then(function(r){
    return r.text().then(function(text){
      var res = null;
      try { res = JSON.parse(text); } catch(e) {
        var message = '请求失败：HTTP ' + r.status;
        if(text && text.indexOf('<html') === -1){ message += ' ' + text.slice(0, 120); }
        layer.msg(message);
        throw {code: r.status, message: message, raw: text};
      }
      return res;
    });
  }).then(function(res){
    if(!res.success){layer.msg(res.message || '请求失败'); if(res.code === 403){localStorage.removeItem('yzd_admin_token'); location.href='/admin/login'} throw res}
    return res.data || {};
  });
}
{$script}
</script>
</body>
</html>
HTML;
    }

    private function menu(string $active): string
    {
        $groups = [
            '概览' => [
                'dashboard' => ['/admin', '控制台'],
            ],
            '业务' => [
                'orders' => ['/admin/orders-page', '订单记录'],
                'records' => ['/admin/records-page', '生成记录'],
                'users' => ['/admin/users-page', '用户列表'],
            ],
            '内容' => [
                'square' => ['/admin/square-page', '广场管理'],
                'templates' => ['/admin/templates-page', '模板管理'],
                'text' => ['/admin/text-page', '文案管理'],
                'music' => ['/admin/music-page', '音乐管理'],
                'background' => ['/admin/background-page', '背景图管理'],
                'files' => ['/admin/files-page', '文件管理'],
            ],
            '系统' => [
                'content-security' => ['/admin/content-security-page', '内容审核'],
                'config' => ['/admin/config-page', '平台配置'],
            ],
        ];

        $links = '';
        foreach ($groups as $group => $items) {
            $links .= '<div class="side-section"><div class="side-title">' . $group . '</div>';
            foreach ($items as $key => [$url, $label]) {
                $class = $key === $active ? ' class="active"' : '';
                $links .= '<a' . $class . ' href="' . $url . '">' . $label . '</a>';
            }
            $links .= '</div>';
        }

        return '<div class="admin"><aside class="side"><div class="brand">云栈点后台</div>' . $links . '<a class="logout" href="/admin/login" onclick="localStorage.removeItem(\'yzd_admin_token\')">退出登录</a></aside><main class="main"><div class="top"><strong>管理后台</strong><span>ThinkPHP + Layui</span></div><div class="content">';
    }
}
