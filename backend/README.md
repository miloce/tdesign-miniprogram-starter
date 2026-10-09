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

后台登录账号由以下环境变量提供（无默认值，必须配置）：

```bash
YZD_ADMIN_USERNAME=your-admin-username
YZD_ADMIN_PASSWORD=your-admin-password
YZD_ADMIN_OPENID=your-admin-openid
```

## 小程序接口

当前保留小程序正在使用的新平台接口路径：

- `GET /wechat/login`
- `POST /wechat/logintime`
- `GET|POST /wechat/media-check-callback`
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

## 小程序虚拟支付

虚拟商品购买统一走官方 `wx.requestVirtualPayment`，服务端使用 `/xpay/query_order` 轮询确认订单状态；当前接入的是 `short_series_goods` 道具直购模式。

依赖环境变量：

```bash
YZD_VIRTUAL_PAYMENT_OFFER_ID=your-offer-id
YZD_VIRTUAL_PAYMENT_APP_KEY=your-current-app-key
YZD_VIRTUAL_PAYMENT_ENV=0
```

管理端配置里需要同时维护这些商品 ID：

- `appConfig.codeProductId`：代码生成商品 ID
- `appConfig.assistantProductId`：小助手服务商品 ID
- `appConfig.vipPackages[].productId`：每个 VIP 套餐对应的商品 ID

虚拟支付消息推送：

- 微信公众平台的消息推送服务器地址可直接配置为 `https://你的域名/wechat/media-check-callback`
- 同一个 URL 现在同时处理 `xpay_goods_deliver_notify`、`xpay_coin_pay_notify`、`xpay_refund_notify`、`xpay_complaint_notify`
- 推送原始记录会落到 `storage/virtual_payment_notifications.json`
- 现金道具支付成功推送会自动把本地订单标记为已支付；VIP 订单会同步执行本地发货
- 退款推送会把本地订单标记为 `refunded`，但不会自动回收已经发放的业务权益

注意事项：

- 上述 `productId` 必须先在微信公众平台的小程序「虚拟支付」后台上传并发布到对应环境。
- 现网版本固定使用 `YZD_VIRTUAL_PAYMENT_ENV=0`，不能填 `1`。
- 道具刚发布后可能要等待数分钟生效，期间下单会返回“道具未发布/未生效”类错误。
- 普通微信商户下单参数（如 `YZD_WECHAT_MCH_ID`、证书路径）不参与当前虚拟支付前端拉起链路。

## 内容安全审核

用户昵称、生成表单里的文本内容会在服务端调用微信 `msgSecCheck` 同步审核；同一次提交的多个文字字段会合并成一条审核记录，避免后台被拆成多行。头像和图片上传会先调用 `imgSecCheck`，通过后才保存；图片/音频公开链接会调用 `mediaCheckAsync` 提交异步审核，trace 记录保存在 `storage/content_security_records.json`。

## LightCOS 对象存储

静态资源和用户上传文件支持切到腾讯云轻量对象存储。项目复用根目录已有的 `JxzyzHelper/cos-sdk-v5.phar`，不需要新增 Composer 依赖。

```bash
YZD_STORAGE_DRIVER=lightcos
YZD_ASSET_BASE_URL=https://cos.miloce.cn
YZD_COS_PUBLIC_BASE_URL=https://cos.miloce.cn
YZD_COS_BUCKET=miloce-1304499644
YZD_COS_REGION=ap-beijing
YZD_COS_DOMAIN=cos.miloce.cn
YZD_COS_PREFIX=yzd
YZD_COS_CA_FILE=
YZD_COS_SSL_VERIFY=false
YZD_COS_SECRET_ID=your-secret-id
YZD_COS_SECRET_KEY=your-secret-key
YZD_COS_SDK_PHAR=./cos-sdk-v5.phar
```

同步现有静态文件：

```bash
php bin/yzd sync-static-to-cos --dry-run
php bin/yzd sync-static-to-cos
```

同步范围为 `public/static`、`public/template`、`public/assets`、`public/uploads`，对象 Key 默认写入 `yzd/static/...`、`yzd/template/...`、`yzd/assets/...`、`yzd/uploads/...`。开启后，模板封面、背景图、音乐、渲染页里的 `/static`、`/template`、`/assets`、`/uploads` 链接会返回 `https://cos.miloce.cn/yzd/...`；用户头像和生成表单上传的图片/音频会直接写入 LightCOS。

PHP 如果没有配置 CA，后台文件管理读取 COS 可能报 `cURL error 60`。推荐把 `YZD_COS_CA_FILE` 指到可用的 `cacert.pem` 或系统 CA 文件；如果服务器暂时找不到 CA 文件，可以先设 `YZD_COS_SSL_VERIFY=false` 并重启 PHP-FPM。

## 数据库存储与模板缓存

后台配置、模板覆盖配置、用户、记录等数据统一走 `Storage` 服务。配置了 `YZD_DB_HOST` 和 `YZD_DB_DATABASE` 后会保存到 MySQL 的 `yzd_storage` 表；没配置数据库时才回退到 `storage/*.json`。

模板管理页以 `Storage`/数据库里的 `templates.json` 和 `templates_summary.json` 为主数据源，不在打开列表时扫描模板文件。新模板文件放到 `templates/web/*.html` 后，在后台模板管理点击“加载模板”，或用命令把模板元数据导入数据库：

```bash
php bin/yzd load-templates
```

后台模板列表默认读取轻量摘要缓存，编辑时再按需读取完整字段和默认值。模板变更后可以重建摘要；如果只想刷新模板文件解析缓存，也可以单独执行 `rebuild-template-cache`：

```bash
php bin/yzd rebuild-template-summary
php bin/yzd rebuild-template-cache
```

模板热度和使用量保存在 `template_metrics.json`。页面访问只追加到本地 `template_metrics_queue.log`，不会在打开页面时同步改 JSON 或远程 DB；用计划任务定期批量刷新队列。新增生成记录时会自动累加使用量；需要校准时可以手动重建：

```bash
php bin/yzd rebuild-template-metrics
php bin/yzd flush-template-metrics
```

依赖环境变量：

```bash
YZD_WECHAT_APPID=your-miniprogram-appid
YZD_WECHAT_SECRET=your-miniprogram-secret
YZD_WECHAT_MESSAGE_TOKEN=your-message-token
YZD_CONTENT_SECURITY_ENABLED=true
YZD_CONTENT_SECURITY_FAIL_OPEN=false
YZD_CONTENT_SECURITY_SENSITIVE_WORDS=
```

`YZD_CONTENT_SECURITY_ENABLED` 不配置时，只要 `YZD_WECHAT_APPID` 和 `YZD_WECHAT_SECRET` 存在就会启用。`YZD_WECHAT_MESSAGE_TOKEN` 要和微信公众平台“消息推送服务器配置”里的 Token 完全一致，用于校验微信服务器请求。`YZD_CONTENT_SECURITY_FAIL_OPEN=false` 表示微信审核接口不可用时阻断提交。可选的本地敏感词可以通过 `YZD_CONTENT_SECURITY_SENSITIVE_WORDS` 逗号分隔配置，或创建 `storage/sensitive_words.json`：

```json
{
  "words": ["示例敏感词"]
}
```

微信公众平台的消息推送服务器可配置为：

```text
https://你的域名/wechat/media-check-callback
```

这个地址除了接收内容安全的 `mediaCheckAsync` 回调，也会复用来接收小程序虚拟支付推送。

后台审核入口：

```text
https://你的域名/admin/content-security-page
```

测试流程：

1. 先在 `storage/sensitive_words.json` 放一个测试词，例如：

```json
{
  "words": ["测试违禁词"]
}
```

2. 小程序里填写普通文案并预览或生成，记录会进入后台审核列表，检测结果为“通过”，人工状态为“未复核”。
3. 小程序里填写包含 `测试违禁词` 的文案并提交，接口会拦截并提示“内容包含敏感词，请修改后再提交”，同时后台审核列表会出现“违规 / 待人工审核”记录。
4. 上传图片或音频后，后台审核列表会记录 `imgSecCheck` 或 `mediaCheckAsync` 的结果；微信异步回调返回 risky/review/failed 时，人工状态会自动变为“待人工审核”。
5. 后台审核页支持清理记录：`清理已通过` 只删除检测通过的记录，`清理已处理` 删除人工通过或驳回的记录，`清空全部` 删除全部审核记录。

## 后台接口

后台接口需要：

```text
Authorization: Bearer <adminOpenid>
```

- `GET /admin/dashboard`
- `GET /admin/config`
- `POST /admin/config`
- `GET /admin/templates`
- `GET /admin/templates/detail?id=hbfm`
- `POST /admin/templates`
- `POST /admin/templates/status`
- `POST /admin/templates/delete`
- `POST /admin/templates/load`
- `GET /admin/users`
- `GET /admin/orders`
- `GET /admin/records`
- `GET /admin/content-security`
- `POST /admin/content-security/update`
- `POST /admin/content-security/clear`

## 部署

推荐 Web 根目录指向：

```text
backend/public
```

Nginx 伪静态：

```nginx
try_files $uri $uri/ /index.php?$query_string;
```

静态资源必须优先由 Nginx、COS 或 CDN 直接返回，避免大视频/音频落到 PHP。Nginx 可增加：

```nginx
location ~* ^/(static|template|assets|uploads)/ {
    root /www/wwwroot/yzd/backend/public;
    etag on;
    if_modified_since exact;
    add_header Cache-Control "public, max-age=604800";
    add_header Accept-Ranges bytes;
    try_files $uri =404;
}
```

生产环境设置：

```bash
APP_DEBUG=false
YZD_PUBLIC_BASE_URL=https://y.miloce.cn
YZD_SHORT_BASE_URL=https://y.miloce.cn
YZD_DB_HOST=127.0.0.1
```

MySQL 与 PHP 部署在同一台服务器时，`YZD_DB_HOST` 必须使用回环地址 `127.0.0.1`，不要填写服务器公网 IP，避免数据库连接经过公网 NAT 回环后出现间歇性失败。MySQL 独立部署或运行在容器中时，使用对应的内网地址或容器服务名。

证书路径不要使用本机的 `F:\...` 路径。把证书放到服务器项目目录的 `backend/certs/` 后，可以这样配置：

```bash
YZD_WECHAT_PRIVATE_KEY_PATH=./certs/apiclient_key.pem
YZD_WECHAT_PUBLIC_KEY_PATH=./certs/pub_key.pem
```

如果服务器部署目录固定，也可以写绝对路径，例如 `/www/wwwroot/yzd/backend/certs/pub_key.pem`。
