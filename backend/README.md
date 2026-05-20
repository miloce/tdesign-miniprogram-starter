# yzd PHP Backend

本后端是 `yzd` 小程序的本地 PHP API，实现了当前前端已调用的接口。

## 目录结构

```text
backend/
  app/
    Modules/AdminBackend.php   # 后台管理、用户、订单、生成记录接口
    Support/Database.php       # PDO MySQL 连接
    bootstrap.php              # 后端模块加载入口
  config/database.php          # 数据库配置
  index.php                    # HTTP 入口与旧版小程序兼容路由
  storage/                     # 旧 JSON 存储兼容层
```

`index.php` 放在后台根目录作为主入口；新的后台管理能力放在 `app/` 目录。

## 本地启动

```bash
cd backend
php -S 127.0.0.1:8000 index.php
```

## Nginx 部署

线上 `https://y.miloce.cn/code/config` 如果返回 Nginx HTML 404，说明请求没有进入 PHP，通常是网站目录或伪静态配置不对。

必须满足：

- 网站根目录指向 `backend`，也就是 `index.php` 所在目录
- Nginx 配置 `try_files $uri $uri/ /index.php?$query_string;`
- PHP 解析规则里的 `SCRIPT_FILENAME` 指向 `$document_root$fastcgi_script_name`
- PHP 8.2 对应的 FastCGI socket 通常是 `/tmp/php-cgi-82.sock`

配置示例见：

- `backend/deploy/nginx-y.miloce.cn.conf`
- `backend/deploy/bt-nginx-rewrite.txt`

小程序端默认请求：

```text
https://y.miloce.cn
```

如果部署到服务器，把 `yzd/config.js` 里的 `baseUrl` 改成你的 HTTPS 域名。

短链默认按当前请求域名输出。部署到 `https://y.miloce.cn` 后，生成结果会类似：

```text
https://y.miloce.cn/2541
```

如果后端在反向代理后面，建议显式指定短链域名：

```bash
cd backend
YZD_PUBLIC_BASE_URL=https://y.miloce.cn YZD_SHORT_BASE_URL=https://y.miloce.cn php -S 127.0.0.1:8000 index.php
```

Windows PowerShell：

```powershell
$env:YZD_PUBLIC_BASE_URL='https://y.miloce.cn'
$env:YZD_SHORT_BASE_URL='https://y.miloce.cn'
$env:YZD_WECHAT_APPID='wx1c9791197f6da158'
$env:YZD_WECHAT_SECRET='<your-wechat-app-secret>'
$env:YZD_WECHAT_MCH_ID='1719327025'
$env:YZD_WECHAT_MCH_SERIAL_NO='519873F1E1CFA9B8471C25FFB4F67AE10EB473F1'
$env:YZD_WECHAT_PRIVATE_KEY_PATH='F:\admin\Desktop\云栈点\代码生成\yzd\backend\certs\apiclient_key.pem'
$env:YZD_WECHAT_API_V3_KEY='7llRec1By2puYbjpuIiza4LU5zVJc6Ul'
$env:YZD_WECHAT_PUBLIC_KEY_ID='PUB_KEY_ID_0117193270252025092800381852000401'
$env:YZD_WECHAT_PUBLIC_KEY_PATH='F:\admin\Desktop\云栈点\代码生成\yzd\backend\certs\pub_key.pem'
php -S 127.0.0.1:8000 index.php
```

`YZD_WECHAT_SECRET`、`YZD_WECHAT_API_V3_KEY`、商户 API 私钥属于敏感材料。当前项目按本地部署要求内置了 API v3 Key 默认值；如果代码会上传到公开仓库或交给第三方，请先改回环境变量读取并更换密钥。未配置 `YZD_WECHAT_SECRET` 时，后端会用本地模拟 openid，便于开发者工具调试。

微信支付使用 API v3 小程序支付，并按微信支付公钥方式验签。`YZD_WECHAT_PUBLIC_KEY_ID` 是商户平台下载公钥时得到的 `PUB_KEY_ID_...`；`YZD_WECHAT_MCH_SERIAL_NO` 是商户 API 证书序列号，用于商户请求签名，不是微信支付公钥 ID。

## 数据库

默认连接 MySQL：

```text
host: 134.175.96.191
database: kyz
username: kyz
password: kyz
```

也可以用环境变量覆盖：

```powershell
$env:YZD_DB_HOST='134.175.96.191'
$env:YZD_DB_DATABASE='kyz'
$env:YZD_DB_USERNAME='kyz'
$env:YZD_DB_PASSWORD='kyz'
```

后台模块会自动创建这些表：

- `yzd_users`
- `yzd_orders`
- `yzd_generation_records`

## 后台管理接口

所有 `/admin/*` 接口都需要管理员 `Authorization: Bearer <adminOpenid>`。

- `GET /admin/dashboard`
- `GET /admin/users?q=&status=&vip=&page=&pageSize=`
- `GET /admin/users/detail?openid=`
- `POST /admin/users/save`
- `POST /admin/users/status`
- `POST /admin/users/adjust`
- `GET /admin/orders?status=&openid=&page=&pageSize=`
- `GET /admin/records?q=&openid=&page=&pageSize=`

## 已实现接口

- `GET /code/templates`
- `GET /code/template-detail?id=love-code`
- `GET /code/config`
- `POST /code/create-preview`
- `POST /code/generate`
- `GET /code/records`
- `GET /code/profile`
- `GET /login/getSendMessage`
- `POST /login/postPasswordLogin`
- `GET /login/postCodeVerify?code=123456`
- `GET /api/searchHistory`
- `GET /api/searchPopular`
- `GET /dataCenter/member`
- `GET /dataCenter/interaction`
- `GET /dataCenter/complete-rate`
- `GET /dataCenter/area`

生成记录保存在 `backend/storage/records.json`。

## wx2e4f9bd7460719b7 兼容接口

参考 `wx2e4f9bd7460719b7`，进入小程序后的请求顺序大致是：

1. `App.onLaunch` 调 `GET /wechat/login`
2. 首页调 `GET /wechat/menu`
3. 首页调 `GET /wechat/item`
4. 约 10 秒后上报 `POST /wechat/logintime`
5. 进入制作页调 `GET /wechat/getItem`
6. 预览或制作时调 `/wechat/preview`、`/wechat/payFree`、`/wechat/payAd`、`/wechat/payKami`、`/wechat/payjifen`、`/wechat/payquota`、`/wechat/payHelp`
7. 结果页轮询 `GET /wechat/getItemStatus`

已补齐的兼容接口还包括：

- `/wechat/openid`
- `/wechat/get_userid`
- `/wechat/getLogs`
- `/wechat/getLog`
- `/wechat/cutout`
- `/wechat/add_subscribe`
- `/wechat/ad_load`
- `/wechat/ad_upload`
- `/wechat/getmusic`
- `/wechat/upload`
- `/wechat/upload_user_id`
- `/upload`
- `/info/get_user.php`
- `/info/update_user.php`
- `/help/check_help_time.php`
- `/help/check_order_status.php`
- `/help/complete_help.php`
- `/help/get_help_info.php`
- `/wechat/myHelpList`
- `/invite/getUserId.php`
- `/invite/langmanbi_detail.php`
- `/invite/tixian/get_openid.php`
- `/invite/tixian/get_user_info.php`
- `/invite/tixian/get_withdraw_records.php`
- `/invite/tixian/withdraw.php`
- `/kami_bag/get_openid.php`
- `/kami_bag/info.php`
- `/kami_bag/list.php`
- `/kami_bag/gift.php`
- `/kami_bag/exchange.php`
- `/prize/get_openid.php`
- `/prize/get_user_score.php`
- `/prize/get_lottery_records.php`
- `/prize/get_prize_config.php`
- `/prize/lottery.php`
- `/rton/get_user_data.php`
- `/rton/signin.php`
- `/jifen/getRankList.php`
- `/Wechat/getVipList`
- `/Wechat/getUserVip`
- `/Wechat/getQuotaLogs`
- `/Wechat/payVip`
- `/Wechat/payQuotaRecharge`
- `/Wechat/payKamiPurchase`
