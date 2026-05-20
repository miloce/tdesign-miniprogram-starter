# yzd ThinkPHP Backend

`backend` 是云栈点小程序的新平台后端，已切换为 ThinkPHP 8 + Layui。旧兼容接口不再作为目标，所有 HTTP 路由都在 `route/app.php` 显式声明。

## 目录

```text
backend/
  app/
    controller/       # 小程序 API、后台 API、Layui 页面
    middleware/       # CORS
    Services/         # 配置、模板、用户、记录等业务服务
  config/             # ThinkPHP 配置
  public/index.php    # Web 入口
  route/app.php       # 路由表
  storage/            # 本地 JSON 数据存储
  bin/yzd             # 运维命令
```

## 本地启动

```bash
cd backend
composer install
composer app:init
composer serve
```

访问：

```text
http://127.0.0.1:8000/health
http://127.0.0.1:8000/admin-ui
http://127.0.0.1:8000/admin/templates-page
http://127.0.0.1:8000/admin/config-page
```

后台 API 默认管理员 Token：

```text
oL8I43flaski-3Q2shkh4olGQEn4
```

也可以用环境变量覆盖：

```bash
YZD_ADMIN_OPENID=your-admin-openid
```

## 小程序接口

当前保留小程序正在使用的新平台接口路径：

- `GET /wechat/login`
- `POST /wechat/logintime`
- `GET /code/templates`
- `GET /code/template-detail`
- `GET /code/config`
- `POST /code/create-preview`
- `POST /code/pay`
- `POST /code/pay/confirm`
- `POST /code/generate`
- `GET /code/records`
- `GET /code/profile`
- `GET /points/summary`
- `POST /points/earn`
- `POST /points/exchange`
- `GET /vip/packages`
- `POST /vip/pay`
- `POST /vip/confirm`
- `GET /vip/status`

## 后台接口

后台接口需要：

```text
Authorization: Bearer <adminOpenid>
```

- `GET /admin/dashboard`
- `GET /admin/config`
- `POST /admin/config`
- `GET /admin/templates`
- `GET /admin/templates/detail?id=love-code`
- `POST /admin/templates`
- `POST /admin/templates/status`
- `POST /admin/templates/delete`
- `POST /admin/templates/reset`
- `GET /admin/users`
- `GET /admin/orders`
- `GET /admin/records`

## 部署

推荐 Web 根目录指向：

```text
backend/public
```

Nginx 伪静态：

```nginx
try_files $uri $uri/ /index.php?$query_string;
```

生产环境设置：

```bash
APP_DEBUG=false
YZD_PUBLIC_BASE_URL=https://y.miloce.cn
YZD_SHORT_BASE_URL=https://y.miloce.cn
```
