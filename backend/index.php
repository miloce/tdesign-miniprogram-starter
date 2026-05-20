<?php

declare(strict_types=1);

require_once __DIR__ . '/app/bootstrap.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$storageDir = __DIR__ . '/storage';
if (!is_dir($storageDir)) {
    mkdir($storageDir, 0777, true);
}

$publicBaseUrl = rtrim(getenv('YZD_PUBLIC_BASE_URL') ?: request_base_url(), '/');
$shortBaseUrl = rtrim(getenv('YZD_SHORT_BASE_URL') ?: $publicBaseUrl, '/');
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
$input = request_input();

$templates = templates($publicBaseUrl);

try {
    $wx2Response = wx2_compatible_response($path, $method, $input, $templates, $publicBaseUrl, $shortBaseUrl, $storageDir);
    if ($wx2Response !== null) {
        json_response($wx2Response);
    }

    if ($path === '/code/config') {
        $config = load_admin_config($storageDir);
        $openid = request_bearer_token();
        if ($openid !== '') {
            $config['user'] = vip_status_payload(ensure_user($storageDir, $openid));
        }
        json_response(mock_wrap(ok($config)));
    }

    if ($path === '/code/templates') {
        json_response(mock_wrap(ok([
            'categories' => ['全部', '表白', '祝福', '友情', '情感'],
            'list' => $templates,
        ])));
    }

    if ($path === '/code/template-detail') {
        $id = (string)($input['id'] ?? '');
        json_response(mock_wrap(ok(find_template($templates, $id))));
    }

    if ($path === '/code/create-preview' && $method === 'POST') {
        $template = find_template($templates, (string)($input['templateId'] ?? ''));
        $form = is_array($input['form'] ?? null) ? $input['form'] : [];
        json_response(mock_wrap(ok([
            'previewUrl' => build_code_url($publicBaseUrl, 'preview', $template['id'], $form),
        ])));
    }

    if ($path === '/code/pay' && $method === 'POST') {
        $openid = request_bearer_token();
        if (!$openid) {
            json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
        }
        $user = ensure_user($storageDir, $openid);
        if (vip_info_payload($user)['isVip']) {
            json_response(mock_wrap(ok(['paid' => true, 'vipFree' => true])));
        }
        $config = load_admin_config($storageDir);
        if (!(bool)$config['enablePayment'] || (float)$config['price'] <= 0) {
            json_response(mock_wrap(ok(['paid' => true, 'free' => true])));
        }
        json_response(mock_wrap(ok(wechat_unified_order($openid, [
            'id' => 'code_generate',
            'name' => '定制生成',
            'currentPrice' => (string)$config['price'],
            'orderType' => 'code',
        ], $publicBaseUrl, $storageDir))));
    }

    if ($path === '/code/pay/confirm' && $method === 'POST') {
        $openid = request_bearer_token();
        if (!$openid) {
            json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
        }
        $outTradeNo = (string)($input['outTradeNo'] ?? '');
        if ($outTradeNo === '') {
            json_response(['code' => 422, 'success' => false, 'message' => '缺少订单号'], 422);
        }
        $transaction = wechat_query_order($outTradeNo);
        if (($transaction['trade_state'] ?? '') === 'SUCCESS') {
            $payerOpenid = (string)($transaction['payer']['openid'] ?? '');
            if ($payerOpenid !== '' && $payerOpenid !== $openid) {
                json_response(['code' => 403, 'success' => false, 'message' => '订单用户不匹配'], 403);
            }
            apply_paid_transaction($storageDir, $transaction);
            json_response(mock_wrap(ok(['paid' => true, 'tradeState' => 'SUCCESS'])));
        }
        json_response(mock_wrap(ok([
            'paid' => false,
            'tradeState' => (string)($transaction['trade_state'] ?? 'UNKNOWN'),
            'tradeStateDesc' => (string)($transaction['trade_state_desc'] ?? ''),
        ])));
    }

    if ($path === '/code/generate' && $method === 'POST') {
        $openid = request_bearer_token();
        if (!$openid) {
            json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
        }
        $template = find_template($templates, (string)($input['templateId'] ?? ''));
        $form = is_array($input['form'] ?? null) ? $input['form'] : [];
        $records = load_records($storageDir, $shortBaseUrl);
        $id = 'R' . date('YmdHis') . random_int(100, 999);
        $shortCode = generate_short_code($records);
        $link = build_short_url($shortBaseUrl, $shortCode);
        $record = [
            'id' => $id,
            'openid' => $openid,
            'shortCode' => $shortCode,
            'title' => $template['title'],
            'templateId' => $template['id'],
            'createdAt' => date('Y-m-d H:i'),
            'status' => '已生成',
            'link' => $link,
            'form' => $form,
        ];
        save_record($storageDir, $record, $shortBaseUrl);
        json_response(mock_wrap(ok([
            'id' => $id,
            'shortCode' => $shortCode,
            'title' => $template['title'],
            'link' => $link,
        ])));
    }

    if ($path === '/code/records') {
        $records = load_records($storageDir, $shortBaseUrl);
        if (!is_admin_request()) {
            $openid = request_bearer_token();
            if (!$openid) {
                json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
            }
            $records = array_values(array_filter($records, function ($record) use ($openid) {
                $owner = (string)($record['openid'] ?? '');
                return $owner === $openid;
            }));
        }
        json_response(mock_wrap(ok($records)));
    }

    if ($path === '/code/profile') {
        $openid = request_bearer_token();
        if (!$openid) {
            json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
        }
        $user = ensure_user($storageDir, $openid);
        $records = user_records(load_records($storageDir, $shortBaseUrl), $openid);
        json_response(mock_wrap(ok([
            'name' => $user['nickname'],
            'avatar' => $user['avatar'],
            'vipText' => $user['isVip'] ? 'VIP会员' : '免费生成模式',
            'quota' => $user['quota'],
            'points' => $user['points'],
            'isVip' => $user['isVip'],
            'vipInfo' => vip_info_payload($user),
            'isAdmin' => is_admin_request(),
            'totalCount' => count($records),
            'todayCount' => count(array_filter($records, function ($item) {
                return starts_with((string)($item['createdAt'] ?? ''), date('Y-m-d'));
            })),
        ])));
    }

    if ($path === '/points/summary') {
        $openid = request_bearer_token();
        if (!$openid) {
            json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
        }
        json_response(mock_wrap(ok(points_payload(ensure_user($storageDir, $openid), load_admin_config($storageDir)))));
    }

    if ($path === '/points/earn' && $method === 'POST') {
        $openid = request_bearer_token();
        if (!$openid) {
            json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
        }
        $state = ensure_user($storageDir, $openid);
        $type = (string)($input['type'] ?? 'daily_sign');
        $points = 10;
        if ($type === 'watch_ad') {
            $points = 20;
        } elseif ($type === 'invite_friend') {
            $points = 50;
        }
        $state['points'] += $points;
        array_unshift($state['records'], [
            'id' => 'P' . date('YmdHis'),
            'sourceDesc' => $type === 'watch_ad' ? '观看激励广告' : ($type === 'invite_friend' ? '邀请好友' : '每日签到'),
            'createTime' => date('Y-m-d H:i'),
            'changeValue' => $points,
            'changeText' => '+',
        ]);
        save_user($storageDir, $state);
        json_response(mock_wrap(ok([
            'message' => '积分已到账',
            'currentPoints' => $state['points'],
            'quota' => $state['quota'],
            'records' => $state['records'],
        ])));
    }

    if ($path === '/points/exchange' && $method === 'POST') {
        $openid = request_bearer_token();
        if (!$openid) {
            json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
        }
        $state = ensure_user($storageDir, $openid);
        $item = find_exchange_item((string)($input['id'] ?? 'quota_1'));
        if ($state['points'] < $item['points']) {
            json_response(['code' => 422, 'success' => false, 'message' => '积分不足'], 422);
        }
        $state['points'] -= $item['points'];
        $isVipExchange = (string)($item['type'] ?? 'quota') === 'vip';
        if ($isVipExchange) {
            $state['isVip'] = true;
            $state['vipExpireAt'] = vip_expire_at((string)($state['vipExpireAt'] ?? ''), max(1, (int)($item['days'] ?? 30)));
        } else {
            $state['quota'] += $item['quota'];
        }
        array_unshift($state['records'], [
            'id' => 'P' . date('YmdHis'),
            'sourceDesc' => $item['name'],
            'createTime' => date('Y-m-d H:i'),
            'changeValue' => $item['points'],
            'changeText' => '-',
        ]);
        save_user($storageDir, $state);
        json_response(mock_wrap(ok([
            'currentPoints' => $state['points'],
            'quota' => $state['quota'],
            'isVip' => $state['isVip'],
            'vipInfo' => vip_info_payload($state),
            'records' => $state['records'],
        ])));
    }

    if ($path === '/vip/packages') {
        json_response(mock_wrap(ok(vip_packages())));
    }

    if ($path === '/vip/status') {
        $openid = request_bearer_token() ?: (string)($input['openid'] ?? 'dev_openid_local');
        $user = ensure_user($storageDir, $openid);
        json_response(mock_wrap(ok(vip_status_payload($user))));
    }

    if ($path === '/vip/notify') {
        $raw = file_get_contents('php://input') ?: '';
        if (!wechat_verify_notify_signature($raw)) {
            json_response(['code' => 'FAIL', 'message' => '签名验证失败'], 401);
        }

        $notify = json_decode($raw, true);
        if (!is_array($notify)) {
            json_response(['code' => 'FAIL', 'message' => '通知格式错误'], 400);
        }

        $transaction = wechat_decrypt_resource(is_array($notify['resource'] ?? null) ? $notify['resource'] : []);
        if (($transaction['trade_state'] ?? '') === 'SUCCESS') {
            apply_paid_transaction($storageDir, $transaction);
        }
        json_response(['code' => 'SUCCESS', 'message' => '成功']);
    }

    if ($path === '/vip/pay' && $method === 'POST') {
        $packageId = (string)($input['packageId'] ?? '');
        $pkg = null;
        foreach (vip_packages() as $p) {
            if ($p['id'] === $packageId) { $pkg = $p; break; }
        }
        if (!$pkg) { $pkg = vip_packages()[0]; }

        $openid = request_bearer_token();
        if (!$openid) {
            json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
        }

        $payParams = wechat_unified_order($openid, $pkg, $publicBaseUrl, $storageDir);
        json_response(mock_wrap(ok($payParams)));
    }

    if ($path === '/vip/confirm' && $method === 'POST') {
        $openid = request_bearer_token();
        if (!$openid) {
            json_response(['code' => 401, 'success' => false, 'message' => '未登录'], 401);
        }
        $outTradeNo = (string)($input['outTradeNo'] ?? '');
        if ($outTradeNo === '') {
            json_response(['code' => 422, 'success' => false, 'message' => '缺少订单号'], 422);
        }
        $transaction = wechat_query_order($outTradeNo);
        if (($transaction['trade_state'] ?? '') === 'SUCCESS') {
            $payerOpenid = (string)($transaction['payer']['openid'] ?? '');
            if ($payerOpenid !== '' && $payerOpenid !== $openid) {
                json_response(['code' => 403, 'success' => false, 'message' => '订单用户不匹配'], 403);
            }
            $user = apply_paid_transaction($storageDir, $transaction);
            json_response(mock_wrap(ok([
                'paid' => true,
                'tradeState' => 'SUCCESS',
                'userInfo' => user_to_wx2_user($user),
                'vipInfo' => vip_info_payload($user),
            ])));
        }
        json_response(mock_wrap(ok([
            'paid' => false,
            'tradeState' => (string)($transaction['trade_state'] ?? 'UNKNOWN'),
            'tradeStateDesc' => (string)($transaction['trade_state_desc'] ?? ''),
        ])));
    }

    if ($path === '/admin/config') {
        require_admin();

        if ($method === 'POST') {
            $appConfig = is_array($input['appConfig'] ?? null) ? $input['appConfig'] : [];
            $userStateInput = is_array($input['userState'] ?? null) ? $input['userState'] : [];

            $config = load_admin_config($storageDir);
            $config['enableRewardAd'] = (bool)($appConfig['enableRewardAd'] ?? $config['enableRewardAd']);
            $config['enablePayment'] = (bool)($appConfig['enablePayment'] ?? $config['enablePayment']);
            $config['rewardAdUnitId'] = (string)($appConfig['rewardAdUnitId'] ?? $config['rewardAdUnitId']);
            $config['price'] = (float)($appConfig['price'] ?? $config['price']);
            $config['vipPackages'] = normalize_vip_packages(is_array($appConfig['vipPackages'] ?? null) ? $appConfig['vipPackages'] : $config['vipPackages']);
            $config['exchangeItems'] = normalize_exchange_items(is_array($appConfig['exchangeItems'] ?? null) ? $appConfig['exchangeItems'] : $config['exchangeItems']);
            save_admin_config($storageDir, $config);

            $state = load_user_state($storageDir);
            $state['points'] = max(0, (int)($userStateInput['points'] ?? $state['points']));
            $state['quota'] = max(0, (int)($userStateInput['quota'] ?? $state['quota']));
            $state['isVip'] = (bool)($userStateInput['isVip'] ?? $state['isVip']);
            save_user_state($storageDir, $state);
        }

        json_response(mock_wrap(ok([
            'adminOpenid' => admin_openid(),
            'appConfig' => load_admin_config($storageDir),
            'userState' => load_user_state($storageDir),
        ])));
    }

    if (starts_with($path, '/admin/')) {
        require_admin();
        json_response(mock_wrap(ok(\Yzd\Modules\AdminBackend::handle($path, $method, $input, $storageDir, $shortBaseUrl, admin_openid()))));
    }

    if ($path === '/login/postPasswordLogin' && $method === 'POST') {
        $account = (string)($input['data']['account'] ?? $input['account'] ?? '');
        $password = (string)($input['data']['password'] ?? $input['password'] ?? '');
        if ($account === '' || $password === '') {
            json_response(['code' => 422, 'success' => false, 'message' => '账号和密码不能为空'], 422);
        }
        json_response(['code' => 200, 'success' => true, 'data' => ['message' => '登录成功', 'token' => token()]]);
    }

    if ($path === '/login/getSendMessage') {
        json_response(['code' => 200, 'success' => true, 'data' => ['message' => '发送成功', 'code' => '123456']]);
    }

    if ($path === '/login/postCodeVerify') {
        $code = (string)($input['code'] ?? '');
        if ($code !== '' && $code !== '123456') {
            json_response(['code' => 422, 'success' => false, 'message' => '验证码错误，开发环境验证码为 123456'], 422);
        }
        json_response(['code' => 200, 'success' => true, 'data' => ['message' => '验证码正确', 'token' => token()]]);
    }

    if ($path === '/api/searchHistory') {
        json_response([
            'code' => 200,
            'message' => '请求成功',
            'data' => ['historyWords' => ['表白代码', '生日祝福', '烟花', '照片墙', '挽回文案', '节日祝福']],
        ]);
    }

    if ($path === '/api/searchPopular') {
        json_response([
            'code' => 200,
            'message' => '请求成功',
            'data' => ['popularWords' => ['520表白网页', '生日快乐代码', '闺蜜友情相册', '道歉挽回链接', '节日祝福模板', '烟花动画']],
        ]);
    }

    if (starts_with($path, '/dataCenter/')) {
        json_response(mock_wrap(data_center_payload($path)));
    }

    if (preg_match('#^/([0-9]{4,8})$#', $path, $matches)) {
        $record = find_record_by_short_code(load_records($storageDir, $shortBaseUrl), $matches[1]);
        if (!$record) {
            json_response(['code' => 404, 'success' => false, 'message' => '短链不存在'], 404);
        }
        $template = find_template($templates, (string)($record['templateId'] ?? ''));
        $form = is_array($record['form'] ?? null) ? $record['form'] : [];
        render_code_page('final', $template, $form);
    }

    if (preg_match('#^/(preview|code)/([^/]+)$#', $path, $matches)) {
        $template = find_template($templates, $matches[2]);
        render_code_page($matches[1], $template, $input);
    }

    json_response(['code' => 404, 'success' => false, 'message' => '接口不存在'], 404);
} catch (Throwable $exception) {
    json_response(['code' => 500, 'success' => false, 'message' => $exception->getMessage()], 500);
}

function wechat_mch_id(): string
{
    return getenv('YZD_WECHAT_MCH_ID') ?: '1719327025';
}

function wechat_api_v3_key(): string
{
    return getenv('YZD_WECHAT_API_V3_KEY') ?: getenv('YZD_WECHAT_MCH_KEY') ?: '7llRec1By2puYbjpuIiza4LU5zVJc6Ul';
}

function wechat_appid(): string
{
    return getenv('YZD_WECHAT_APPID') ?: 'wx1c9791197f6da158';
}

function wechat_merchant_serial_no(): string
{
    return getenv('YZD_WECHAT_MCH_SERIAL_NO') ?: '519873F1E1CFA9B8471C25FFB4F67AE10EB473F1';
}

function wechat_private_key_path(): string
{
    return getenv('YZD_WECHAT_PRIVATE_KEY_PATH') ?: __DIR__ . '/certs/apiclient_key.pem';
}

function wechat_public_key_id(): string
{
    return getenv('YZD_WECHAT_PUBLIC_KEY_ID') ?: 'PUB_KEY_ID_0117193270252025092800381852000401';
}

function wechat_public_key_path(): string
{
    return getenv('YZD_WECHAT_PUBLIC_KEY_PATH') ?: __DIR__ . '/certs/pub_key.pem';
}

function wechat_load_private_key()
{
    $path = wechat_private_key_path();
    if (!is_file($path)) {
        throw new RuntimeException('未找到微信支付商户API私钥: ' . $path);
    }
    $key = openssl_pkey_get_private((string)file_get_contents($path));
    if (!$key) {
        throw new RuntimeException('微信支付商户API私钥加载失败');
    }
    return $key;
}

function wechat_load_public_key()
{
    $path = wechat_public_key_path();
    if (!is_file($path)) {
        throw new RuntimeException('未找到微信支付公钥: ' . $path);
    }
    $key = openssl_pkey_get_public((string)file_get_contents($path));
    if (!$key) {
        throw new RuntimeException('微信支付公钥加载失败');
    }
    return $key;
}

function wechat_rsa_sign(string $message): string
{
    $signature = '';
    if (!openssl_sign($message, $signature, wechat_load_private_key(), OPENSSL_ALGO_SHA256)) {
        throw new RuntimeException('微信支付请求签名失败');
    }
    return base64_encode($signature);
}

function wechat_authorization(string $method, string $pathWithQuery, string $body, int $timestamp, string $nonce): string
{
    $serialNo = wechat_merchant_serial_no();
    if ($serialNo === '') {
        throw new RuntimeException('未配置 YZD_WECHAT_MCH_SERIAL_NO（商户API证书序列号）');
    }

    $message = strtoupper($method) . "\n" . $pathWithQuery . "\n" . $timestamp . "\n" . $nonce . "\n" . $body . "\n";
    $signature = wechat_rsa_sign($message);
    return 'WECHATPAY2-SHA256-RSA2048 mchid="' . wechat_mch_id() . '",nonce_str="' . $nonce . '",signature="' . $signature . '",timestamp="' . $timestamp . '",serial_no="' . $serialNo . '"';
}

function wechat_http_json(string $method, string $pathWithQuery, array $payload): array
{
    $body = $payload ? json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) : '';
    if ($body === false) {
        throw new RuntimeException('微信支付请求JSON编码失败');
    }
    $timestamp = time();
    $nonce = bin2hex(random_bytes(16));
    $url = 'https://api.mch.weixin.qq.com' . $pathWithQuery;
    $headers = [
        'Accept: application/json',
        'Content-Type: application/json',
        'User-Agent: yzd-wechatpay/1.0 PHP',
        'Authorization: ' . wechat_authorization($method, $pathWithQuery, $body, $timestamp, $nonce),
        'Wechatpay-Serial: ' . wechat_public_key_id(),
    ];

    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        $options = [
            CURLOPT_CUSTOMREQUEST => strtoupper($method),
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => 10,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_SSL_VERIFYPEER => true,
        ];
        if (strtoupper($method) !== 'GET') {
            $options[CURLOPT_POSTFIELDS] = $body;
        }
        curl_setopt_array($ch, $options);
        $resp = curl_exec($ch);
        $status = (int)curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        if ($resp === false) {
            throw new RuntimeException('微信支付请求失败: ' . $error);
        }
    } else {
        $resp = @file_get_contents($url, false, stream_context_create([
            'http' => [
                'method' => strtoupper($method),
                'content' => $body,
                'timeout' => 10,
                'header' => implode("\r\n", $headers),
                'ignore_errors' => true,
            ],
        ]));
        $status = 0;
        if (isset($http_response_header[0]) && preg_match('#\s(\d{3})\s#', $http_response_header[0], $m)) {
            $status = (int)$m[1];
        }
        if ($resp === false) {
            throw new RuntimeException('微信支付请求失败');
        }
    }

    $data = json_decode((string)$resp, true);
    if (!is_array($data)) {
        $data = [];
    }
    if ($status < 200 || $status >= 300) {
        throw new RuntimeException('微信支付接口错误: ' . ($data['message'] ?? $resp));
    }
    return $data;
}

function wechat_query_order(string $outTradeNo): array
{
    $path = '/v3/pay/transactions/out-trade-no/' . rawurlencode($outTradeNo) . '?mchid=' . rawurlencode(wechat_mch_id());
    return wechat_http_json('GET', $path, []);
}

function wechat_unified_order(string $openid, array $pkg, string $publicBaseUrl, string $storageDir): array
{
    $appid = wechat_appid();
    $mchId = wechat_mch_id();
    $total = (int)round((float)$pkg['currentPrice'] * 100);
    $orderId = 'V' . date('YmdHis') . random_int(100, 999);
    $notifyUrl = rtrim($publicBaseUrl, '/') . '/vip/notify';

    $result = wechat_http_json('POST', '/v3/pay/transactions/jsapi', [
        'appid' => $appid,
        'mchid' => $mchId,
        'description' => '云栈点-' . $pkg['name'],
        'out_trade_no' => $orderId,
        'notify_url' => $notifyUrl,
        'amount' => [
            'total' => $total,
            'currency' => 'CNY',
        ],
        'payer' => [
            'openid' => $openid,
        ],
    ]);

    $prepayId = (string)($result['prepay_id'] ?? '');
    if (!$prepayId) {
        throw new RuntimeException('未获取到prepay_id');
    }

    save_payment_order($storageDir, [
        'outTradeNo' => $orderId,
        'transactionId' => '',
        'openid' => $openid,
        'packageId' => (string)$pkg['id'],
        'packageName' => (string)$pkg['name'],
        'orderType' => (string)($pkg['orderType'] ?? 'vip'),
        'amount' => $total,
        'status' => 'NOTPAY',
        'createdAt' => date(DATE_ATOM),
        'prepayId' => $prepayId,
    ]);

    $timeStamp = (string)time();
    $nonce = bin2hex(random_bytes(16));
    $package = 'prepay_id=' . $prepayId;
    $payParams = [
        'timeStamp' => $timeStamp,
        'nonceStr' => $nonce,
        'package' => $package,
        'signType' => 'RSA',
        'outTradeNo' => $orderId,
    ];
    $payParams['paySign'] = wechat_rsa_sign($appid . "\n" . $timeStamp . "\n" . $nonce . "\n" . $package . "\n");
    return $payParams;
}

function wechat_header(string $name): string
{
    $key = 'HTTP_' . strtoupper(str_replace('-', '_', $name));
    return (string)($_SERVER[$key] ?? '');
}

function wechat_verify_notify_signature(string $body): bool
{
    $timestamp = wechat_header('Wechatpay-Timestamp');
    $nonce = wechat_header('Wechatpay-Nonce');
    $signature = wechat_header('Wechatpay-Signature');
    $serial = wechat_header('Wechatpay-Serial');
    if ($timestamp === '' || $nonce === '' || $signature === '' || $serial === '') {
        return false;
    }
    if ($serial !== wechat_public_key_id()) {
        return false;
    }
    if (abs(time() - (int)$timestamp) > 300) {
        return false;
    }

    $message = $timestamp . "\n" . $nonce . "\n" . $body . "\n";
    return openssl_verify($message, base64_decode($signature, true) ?: '', wechat_load_public_key(), OPENSSL_ALGO_SHA256) === 1;
}

function wechat_decrypt_resource(array $resource): array
{
    $key = wechat_api_v3_key();
    if (strlen($key) !== 32) {
        throw new RuntimeException('未配置有效的 YZD_WECHAT_API_V3_KEY（32字节）');
    }

    $ciphertext = base64_decode((string)($resource['ciphertext'] ?? ''), true);
    if ($ciphertext === false || strlen($ciphertext) <= 16) {
        throw new RuntimeException('微信支付回调密文无效');
    }

    $tag = substr($ciphertext, -16);
    $encrypted = substr($ciphertext, 0, -16);
    $plain = openssl_decrypt(
        $encrypted,
        'aes-256-gcm',
        $key,
        OPENSSL_RAW_DATA,
        (string)($resource['nonce'] ?? ''),
        $tag,
        (string)($resource['associated_data'] ?? '')
    );
    if ($plain === false) {
        throw new RuntimeException('微信支付回调解密失败');
    }

    $data = json_decode($plain, true);
    if (!is_array($data)) {
        throw new RuntimeException('微信支付回调明文格式错误');
    }
    return $data;
}

function request_input(): array
{
    $query = $_GET;
    $raw = file_get_contents('php://input') ?: '';
    $body = json_decode($raw, true);
    if (!is_array($body)) {
        $body = [];
        parse_str($raw, $body);
    }
    return array_replace_recursive($query, $body);
}

function request_base_url(): string
{
    $host = $_SERVER['HTTP_HOST'] ?? '127.0.0.1:8000';
    $forwardedProto = $_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '';
    $scheme = $forwardedProto ?: (((int)($_SERVER['HTTPS'] ?? 0) === 1 || ($_SERVER['HTTPS'] ?? '') === 'on') ? 'https' : 'http');
    return $scheme . '://' . $host;
}

function json_response(array $payload, int $status = 200): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function ok(array $data): array
{
    return ['code' => 200, 'message' => 'success', 'data' => $data];
}

function mock_wrap(array $data): array
{
    return ['code' => 200, 'success' => true, 'data' => $data];
}

function token(): string
{
    return bin2hex(random_bytes(16));
}

function admin_openid(): string
{
    return getenv('YZD_ADMIN_OPENID') ?: 'oL8I43flaski-3Q2shkh4olGQEn4';
}

function request_bearer_token(): string
{
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['Authorization'] ?? '';
    if (stripos($header, 'Bearer ') === 0) {
        return trim(substr($header, 7));
    }
    return '';
}

function is_admin_request(): bool
{
    return request_bearer_token() === admin_openid();
}

function require_admin(): void
{
    if (!is_admin_request()) {
        json_response(['code' => 403, 'success' => false, 'message' => '无管理员权限'], 403);
    }
}

function default_admin_config(): array
{
    return [
        'enableRewardAd' => false,
        'enablePayment' => false,
        'rewardAdUnitId' => '',
        'price' => 0,
        'vipPackages' => default_vip_packages(),
        'exchangeItems' => default_exchange_items(),
    ];
}

function load_admin_config(string $storageDir): array
{
    $path = $storageDir . '/admin_config.json';
    if (!is_file($path)) {
        $config = default_admin_config();
        save_admin_config($storageDir, $config);
        return $config;
    }

    $data = json_decode((string)file_get_contents($path), true);
    if (!is_array($data)) {
        return default_admin_config();
    }

    $default = default_admin_config();
    return [
        'enableRewardAd' => (bool)($data['enableRewardAd'] ?? $default['enableRewardAd']),
        'enablePayment' => (bool)($data['enablePayment'] ?? $default['enablePayment']),
        'rewardAdUnitId' => (string)($data['rewardAdUnitId'] ?? $default['rewardAdUnitId']),
        'price' => (float)($data['price'] ?? $default['price']),
        'vipPackages' => normalize_vip_packages(is_array($data['vipPackages'] ?? null) ? $data['vipPackages'] : $default['vipPackages']),
        'exchangeItems' => normalize_exchange_items(is_array($data['exchangeItems'] ?? null) ? $data['exchangeItems'] : $default['exchangeItems']),
    ];
}

function save_admin_config(string $storageDir, array $config): void
{
    file_put_contents(
        $storageDir . '/admin_config.json',
        json_encode($config, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
    );
}

function default_user_state(): array
{
    return [
        'points' => 1280,
        'quota' => 3,
        'isVip' => false,
        'records' => [
            [
                'id' => 'P20260520001',
                'sourceDesc' => '每日签到',
                'createTime' => '2026-05-20 09:10',
                'changeValue' => 10,
                'changeText' => '+',
            ],
            [
                'id' => 'P20260519002',
                'sourceDesc' => '观看激励广告',
                'createTime' => '2026-05-19 20:36',
                'changeValue' => 20,
                'changeText' => '+',
            ],
            [
                'id' => 'P20260519001',
                'sourceDesc' => '积分兑换制作次数',
                'createTime' => '2026-05-19 18:22',
                'changeValue' => 200,
                'changeText' => '-',
            ],
        ],
    ];
}

function load_user_state(string $storageDir): array
{
    $path = $storageDir . '/user_state.json';
    if (!is_file($path)) {
        $state = default_user_state();
        save_user_state($storageDir, $state);
        return $state;
    }

    $data = json_decode((string)file_get_contents($path), true);
    if (!is_array($data)) {
        return default_user_state();
    }

    $default = default_user_state();
    return [
        'points' => (int)($data['points'] ?? $default['points']),
        'quota' => (int)($data['quota'] ?? $default['quota']),
        'isVip' => (bool)($data['isVip'] ?? $default['isVip']),
        'records' => is_array($data['records'] ?? null) ? $data['records'] : $default['records'],
    ];
}

function save_user_state(string $storageDir, array $state): void
{
    file_put_contents(
        $storageDir . '/user_state.json',
        json_encode($state, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
    );
}

function load_payment_orders(string $storageDir): array
{
    $path = $storageDir . '/payment_orders.json';
    if (!is_file($path)) {
        return [];
    }

    $data = json_decode((string)file_get_contents($path), true);
    return is_array($data) ? $data : [];
}

function find_payment_order(string $storageDir, string $outTradeNo): ?array
{
    foreach (load_payment_orders($storageDir) as $order) {
        if ((string)($order['outTradeNo'] ?? '') === $outTradeNo) {
            return is_array($order) ? $order : null;
        }
    }
    return null;
}

function save_payment_order(string $storageDir, array $order): void
{
    $orders = load_payment_orders($storageDir);
    $outTradeNo = (string)($order['outTradeNo'] ?? '');
    if ($outTradeNo === '') {
        return;
    }

    $updated = false;
    foreach ($orders as $index => $existing) {
        if ((string)($existing['outTradeNo'] ?? '') === $outTradeNo) {
            $orders[$index] = array_merge(is_array($existing) ? $existing : [], $order);
            $updated = true;
            break;
        }
    }
    if (!$updated) {
        array_unshift($orders, $order);
    }

    file_put_contents(
        $storageDir . '/payment_orders.json',
        json_encode($orders, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
    );

    if (class_exists(\Yzd\Modules\AdminBackend::class)) {
        \Yzd\Modules\AdminBackend::upsertOrder($order);
    }
}

function apply_paid_transaction(string $storageDir, array $transaction): array
{
    $outTradeNo = (string)($transaction['out_trade_no'] ?? '');
    $existingOrder = $outTradeNo !== '' ? find_payment_order($storageDir, $outTradeNo) : null;
    $openid = (string)($transaction['payer']['openid'] ?? ($existingOrder['openid'] ?? ''));
    if ($openid === '') {
        throw new RuntimeException('微信支付订单缺少openid');
    }

    $packageId = (string)($existingOrder['packageId'] ?? '');
    $isCodeOrder = (string)($existingOrder['orderType'] ?? '') === 'code' || $packageId === 'code_generate';
    $pkg = $isCodeOrder
        ? ['id' => 'code_generate', 'name' => '定制生成']
        : find_vip_package($packageId);
    save_payment_order($storageDir, [
        'outTradeNo' => $outTradeNo,
        'transactionId' => (string)($transaction['transaction_id'] ?? ''),
        'openid' => $openid,
        'packageId' => (string)($pkg['id'] ?? $packageId),
        'packageName' => (string)($pkg['name'] ?? ($existingOrder['packageName'] ?? 'VIP会员')),
        'orderType' => $isCodeOrder ? 'code' : 'vip',
        'amount' => (int)($transaction['amount']['total'] ?? ($existingOrder['amount'] ?? 0)),
        'status' => 'SUCCESS',
        'paidAt' => (string)($transaction['success_time'] ?? date(DATE_ATOM)),
        'raw' => $transaction,
    ]);

    $user = ensure_user($storageDir, $openid);
    if ($isCodeOrder) {
        return $user;
    }
    $user['isVip'] = true;
    $days = vip_package_days((string)($pkg['id'] ?? $packageId));
    $user['vipExpireAt'] = $days > 0 ? vip_expire_at((string)($user['vipExpireAt'] ?? ''), $days) : 'forever';
    save_user($storageDir, $user);
    return $user;
}

function users_path(string $storageDir): string
{
    return $storageDir . '/users.json';
}

function default_user(string $openid, array $overrides = []): array
{
    $now = date(DATE_ATOM);
    $isAdmin = $openid === admin_openid();
    return array_merge([
        'id' => 10000 + (abs(crc32($openid)) % 900000),
        'openid' => $openid,
        'nickname' => $isAdmin ? '管理员' : '云栈点用户',
        'avatar' => '',
        'phone' => '',
        'email' => '',
        'role' => $isAdmin ? 'admin' : 'user',
        'status' => 'active',
        'points' => 1280,
        'quota' => 3,
        'isVip' => false,
        'vipExpireAt' => '',
        'remark' => '',
        'createdAt' => $now,
        'lastLoginAt' => $now,
        'loginCount' => 0,
        'records' => default_user_state()['records'],
    ], $overrides);
}

function normalize_user(array $user): array
{
    $openid = (string)($user['openid'] ?? '');
    $default = default_user($openid ?: 'dev_openid_local');
    $merged = array_merge($default, $user);
    $merged['id'] = (int)$merged['id'];
    $merged['openid'] = (string)$merged['openid'];
    $merged['nickname'] = (string)$merged['nickname'];
    $merged['avatar'] = (string)$merged['avatar'];
    $merged['phone'] = (string)$merged['phone'];
    $merged['email'] = (string)$merged['email'];
    $merged['role'] = in_array($merged['role'], ['admin', 'user'], true) ? $merged['role'] : 'user';
    $merged['status'] = in_array($merged['status'], ['active', 'disabled'], true) ? $merged['status'] : 'active';
    $merged['points'] = max(0, (int)$merged['points']);
    $merged['quota'] = max(0, (int)$merged['quota']);
    $merged['isVip'] = (bool)$merged['isVip'];
    $merged['loginCount'] = max(0, (int)$merged['loginCount']);
    $merged['records'] = is_array($merged['records']) ? $merged['records'] : [];
    return $merged;
}

function load_users(string $storageDir): array
{
    $path = users_path($storageDir);
    if (!is_file($path)) {
        $legacy = load_user_state($storageDir);
        $users = [
            default_user(admin_openid(), [
                'points' => (int)$legacy['points'],
                'quota' => (int)$legacy['quota'],
                'isVip' => (bool)$legacy['isVip'],
                'records' => $legacy['records'],
            ]),
        ];
        save_users($storageDir, $users);
        return $users;
    }

    $data = json_decode((string)file_get_contents($path), true);
    if (!is_array($data)) {
        return [];
    }
    return array_values(array_map('normalize_user', $data));
}

function save_users(string $storageDir, array $users): void
{
    $normalized = array_values(array_map(function ($user) {
        return normalize_user(is_array($user) ? $user : []);
    }, $users));
    file_put_contents(
        users_path($storageDir),
        json_encode($normalized, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT)
    );
}

function find_user_index(array $users, string $openid): ?int
{
    foreach ($users as $index => $user) {
        if ((string)($user['openid'] ?? '') === $openid) {
            return $index;
        }
    }
    return null;
}

function ensure_user(string $storageDir, string $openid, array $profile = []): array
{
    $openid = $openid !== '' ? $openid : 'dev_openid_local';
    $dbUser = class_exists(\Yzd\Modules\AdminBackend::class)
        ? \Yzd\Modules\AdminBackend::getUserByOpenid($openid)
        : null;
    if (is_array($dbUser)) {
        $user = array_merge(db_user_to_local_user($dbUser), $profile);
        save_user_json($storageDir, $user);
        if (isset($profile['lastLoginAt'])) {
            $user['loginCount'] = (int)($user['loginCount'] ?? 0) + 1;
            save_user($storageDir, $user);
        }
        return normalize_user($user);
    }

    $users = load_users($storageDir);
    $index = find_user_index($users, $openid);
    if ($index === null) {
        $user = default_user($openid, $profile);
        $user['loginCount'] = 1;
        array_unshift($users, $user);
    } else {
        $user = array_merge($users[$index], $profile);
        if (isset($profile['lastLoginAt'])) {
            $user['loginCount'] = (int)($user['loginCount'] ?? 0) + 1;
        }
        $users[$index] = normalize_user($user);
        $user = $users[$index];
    }
    save_users($storageDir, $users);
    if (class_exists(\Yzd\Modules\AdminBackend::class)) {
        \Yzd\Modules\AdminBackend::upsertUser($user);
    }
    return normalize_user($user);
}

function db_user_to_local_user(array $row): array
{
    return normalize_user([
        'id' => (int)($row['id'] ?? 0),
        'openid' => (string)($row['openid'] ?? ''),
        'nickname' => (string)($row['nickname'] ?? '云栈点用户'),
        'avatar' => (string)($row['avatar'] ?? ''),
        'phone' => (string)($row['phone'] ?? ''),
        'email' => (string)($row['email'] ?? ''),
        'role' => (string)($row['role'] ?? 'user'),
        'status' => (string)($row['status'] ?? 'active'),
        'points' => (int)($row['points'] ?? 0),
        'quota' => (int)($row['quota'] ?? 0),
        'isVip' => !empty($row['is_vip']),
        'vipExpireAt' => (string)($row['vip_expire_at'] ?? ''),
        'remark' => (string)($row['remark'] ?? ''),
        'createdAt' => (string)($row['created_at'] ?? date(DATE_ATOM)),
        'lastLoginAt' => (string)($row['last_login_at'] ?? ''),
        'loginCount' => (int)($row['login_count'] ?? 0),
        'records' => json_decode((string)($row['point_records'] ?? '[]'), true) ?: [],
    ]);
}

function save_user_json(string $storageDir, array $user): void
{
    $user = normalize_user($user);
    $users = load_users($storageDir);
    $index = find_user_index($users, (string)$user['openid']);
    if ($index === null) {
        array_unshift($users, $user);
    } else {
        $users[$index] = $user;
    }
    save_users($storageDir, $users);
}

function save_user(string $storageDir, array $user): array
{
    $user = normalize_user($user);
    $users = load_users($storageDir);
    $index = find_user_index($users, (string)$user['openid']);
    if ($index === null) {
        array_unshift($users, $user);
    } else {
        $users[$index] = $user;
    }
    save_users($storageDir, $users);
    if (class_exists(\Yzd\Modules\AdminBackend::class)) {
        \Yzd\Modules\AdminBackend::upsertUser($user);
    }
    return $user;
}

function find_user_by_openid(string $storageDir, string $openid): ?array
{
    $users = load_users($storageDir);
    $index = find_user_index($users, $openid);
    return $index === null ? null : normalize_user($users[$index]);
}

function user_to_wx2_user(array $user): array
{
    $vipInfo = vip_info_payload($user);
    return [
        'id' => (int)$user['id'],
        'userId' => (int)$user['id'],
        'openid' => (string)$user['openid'],
        'nickname' => (string)$user['nickname'],
        'avatar' => (string)$user['avatar'],
        'avatar_url' => (string)$user['avatar'],
        'personal' => (string)($user['remark'] ?? ''),
        'scorings' => (int)$user['points'],
        'ad_frequency' => 0,
        'ad_last_time' => '',
        'langmanbi' => (int)$user['points'],
        'people' => (int)$user['quota'],
        'is_vip' => (bool)$user['isVip'],
        'isVip' => (bool)$user['isVip'],
        'vipInfo' => $vipInfo,
        'vip_expire_at' => (string)$user['vipExpireAt'],
        'status' => (string)$user['status'],
        'is_admin' => (string)$user['role'] === 'admin',
        'config' => wx2_withdraw_config(),
    ];
}

function vip_info_payload(array $user): array
{
    $expireAt = (string)($user['vipExpireAt'] ?? '');
    $isPermanent = $expireAt === 'forever';
    $isVip = (bool)($user['isVip'] ?? false);
    if ($isVip && !$isPermanent && $expireAt !== '') {
        $time = strtotime($expireAt);
        if ($time !== false && $time < time()) {
            $isVip = false;
        }
    }
    return [
        'isVip' => $isVip,
        'isPermanent' => $isPermanent,
        'endDate' => $expireAt,
        'vipExpireAt' => $expireAt,
    ];
}

function vip_status_payload(array $user): array
{
    return [
        'isVip' => (bool)vip_info_payload($user)['isVip'],
        'vipInfo' => vip_info_payload($user),
        'userInfo' => user_to_wx2_user($user),
    ];
}

function user_records(array $records, string $openid): array
{
    return array_values(array_filter($records, function ($record) use ($openid) {
        $owner = (string)($record['openid'] ?? '');
        return $owner === '' || $owner === $openid;
    }));
}

function vip_expire_at(string $currentExpireAt, int $days): string
{
    if ($currentExpireAt === 'forever') {
        return 'forever';
    }
    $base = time();
    if ($currentExpireAt !== '') {
        $current = strtotime($currentExpireAt);
        if ($current !== false && $current > $base) {
            $base = $current;
        }
    }
    return date(DATE_ATOM, $base + $days * 86400);
}

function find_vip_package(string $id): array
{
    foreach (vip_packages() as $pkg) {
        if ((string)$pkg['id'] === $id) {
            return $pkg;
        }
    }
    return vip_packages()[0];
}

function vip_package_days(string $packageId): int
{
    if ($packageId === 'vip_year') {
        return 365;
    }
    if ($packageId === 'vip_forever') {
        return 0;
    }
    return 30;
}

function default_exchange_items(): array
{
    return [
        ['id' => 'quota_1', 'name' => '兑换 1 次制作次数', 'type' => 'quota', 'points' => 200, 'quota' => 1, 'days' => 0],
        ['id' => 'quota_3', 'name' => '兑换 3 次制作次数', 'type' => 'quota', 'points' => 500, 'quota' => 3, 'days' => 0],
        ['id' => 'vip_7', 'name' => '兑换 7 天VIP会员', 'type' => 'vip', 'points' => 1200, 'quota' => 0, 'days' => 7],
    ];
}

function normalize_exchange_items(array $items): array
{
    $normalized = [];
    $hasVipItem = false;
    foreach ($items as $index => $item) {
        if (!is_array($item)) {
            continue;
        }
        $id = (string)($item['id'] ?? ('quota_' . ($index + 1)));
        $type = in_array((string)($item['type'] ?? 'quota'), ['quota', 'vip'], true) ? (string)($item['type'] ?? 'quota') : 'quota';
        if ($type === 'vip') {
            $hasVipItem = true;
        }
        $normalized[] = [
            'id' => $id !== '' ? $id : ('quota_' . ($index + 1)),
            'name' => (string)($item['name'] ?? '兑换制作次数'),
            'type' => $type,
            'points' => max(0, (int)($item['points'] ?? 0)),
            'quota' => max(0, (int)($item['quota'] ?? 0)),
            'days' => max(0, (int)($item['days'] ?? 0)),
        ];
    }
    if (!$normalized) {
        return default_exchange_items();
    }
    if (!$hasVipItem) {
        $normalized[] = default_exchange_items()[2];
    }
    return $normalized;
}

function exchange_items(): array
{
    global $storageDir;
    if (isset($storageDir) && is_string($storageDir)) {
        return load_admin_config($storageDir)['exchangeItems'];
    }
    return default_exchange_items();
}

function find_exchange_item(string $id): array
{
    foreach (exchange_items() as $item) {
        if ($item['id'] === $id) {
            return $item;
        }
    }
    return exchange_items()[0];
}

function points_payload(array $state, array $config): array
{
    return [
        'currentPoints' => (int)$state['points'],
        'quota' => (int)$state['quota'],
        'isVip' => (bool)$state['isVip'],
        'paymentEnabled' => (bool)$config['enablePayment'],
        'records' => $state['records'],
        'earnOptions' => [
            ['id' => 'daily', 'type' => 'daily_sign', 'name' => '每日签到领取积分', 'points' => 10, 'isActive' => true],
            ['id' => 'ad', 'type' => 'watch_ad', 'name' => '观看广告领取积分', 'points' => 20, 'isActive' => true],
            ['id' => 'invite', 'type' => 'invite_friend', 'name' => '邀请好友领取积分', 'points' => 50, 'isActive' => true],
        ],
        'exchangeItems' => exchange_items(),
    ];
}

function default_vip_packages(): array
{
    return [
        [
            'id' => 'vip_month',
            'name' => '月度会员',
            'currentPrice' => '9.9',
            'originalPrice' => '19.9',
            'tag' => '体验',
            'features' => ['30天会员', '每日无限制作', '免广告生成'],
        ],
        [
            'id' => 'vip_year',
            'name' => '年度会员',
            'currentPrice' => '49.9',
            'originalPrice' => '99.9',
            'tag' => '推荐',
            'features' => ['365天会员', '无限制作代码', '优先使用新模板'],
        ],
        [
            'id' => 'vip_forever',
            'name' => '永久会员',
            'currentPrice' => '99.9',
            'originalPrice' => '199.9',
            'tag' => '超值',
            'features' => ['永久会员', '无限制作', '后续权益同步升级'],
        ],
    ];
}

function normalize_vip_packages(array $packages): array
{
    $normalized = [];
    foreach ($packages as $index => $pkg) {
        if (!is_array($pkg)) {
            continue;
        }
        $id = (string)($pkg['id'] ?? ('vip_' . ($index + 1)));
        $features = $pkg['features'] ?? [];
        if (is_string($features)) {
            $features = array_filter(array_map('trim', preg_split('/[,，\n]/u', $features) ?: []));
        }
        if (!is_array($features)) {
            $features = [];
        }
        $normalized[] = [
            'id' => $id !== '' ? $id : ('vip_' . ($index + 1)),
            'name' => (string)($pkg['name'] ?? 'VIP会员'),
            'currentPrice' => (string)($pkg['currentPrice'] ?? '0'),
            'originalPrice' => (string)($pkg['originalPrice'] ?? ''),
            'tag' => (string)($pkg['tag'] ?? ''),
            'features' => array_values(array_map('strval', $features)),
        ];
    }
    return $normalized ?: default_vip_packages();
}

function vip_packages(): array
{
    global $storageDir;
    if (isset($storageDir) && is_string($storageDir)) {
        return load_admin_config($storageDir)['vipPackages'];
    }
    return default_vip_packages();
}

function wx2_compatible_response(string $path, string $method, array $input, array $templates, string $publicBaseUrl, string $shortBaseUrl, string $storageDir): ?array
{
    if ($path === '/wechat/login') {
        $session = wechat_code_session((string)($input['code'] ?? ''));
        $openid = $session['openid'];
        $user = ensure_user($storageDir, $openid, ['lastLoginAt' => date(DATE_ATOM)]);
        return wx2_ok([
            'ad' => wx2_ad_config(),
            'userinfo' => user_to_wx2_user($user),
            'config' => wx2_config(),
        ]);
    }

    if ($path === '/wechat/logintime') {
        return wx2_ok(['status' => 1]);
    }

    if ($path === '/wechat/openid' || $path === '/kami_bag/get_openid.php' || $path === '/prize/get_openid.php' || $path === '/invite/tixian/get_openid.php') {
        $session = wechat_code_session((string)($input['code'] ?? ''));
        return ['code' => 200, 'success' => true, 'openid' => $session['openid'], 'data' => ['openid' => $session['openid']]];
    }

    if ($path === '/wechat/menu') {
        $menu = [
            ['id' => 0, 'name' => '全部'],
            ['id' => 1, 'name' => '表白'],
            ['id' => 2, 'name' => '祝福'],
            ['id' => 3, 'name' => '友情'],
            ['id' => 4, 'name' => '情感'],
        ];
        return ['code' => 1, 'msg' => 'success', 'data' => $menu, 'menu' => $menu];
    }

    if ($path === '/wechat/item') {
        return wx2_ok([
            'list' => wx2_template_cards($templates, $publicBaseUrl),
            'hasMore' => false,
        ]);
    }

    if ($path === '/wechat/getItem') {
        $template = find_template($templates, (string)($input['id'] ?? 'love-code'));
        return wx2_ok(wx2_item_detail($template));
    }

    if ($path === '/wechat/preview') {
        $template = find_template($templates, (string)($input['muban_id'] ?? $input['id'] ?? 'love-code'));
        $form = is_array($input['param_json'] ?? null) ? $input['param_json'] : $input;
        return wx2_ok([
            'url' => build_code_url($publicBaseUrl, 'preview', $template['id'], $form),
            'previewUrl' => build_code_url($publicBaseUrl, 'preview', $template['id'], $form),
        ]);
    }

    if (in_array($path, ['/wechat/payFree', '/wechat/payAd', '/wechat/payKami', '/wechat/payjifen', '/wechat/payquota', '/wechat/payHelp', '/wechat/checkmsg'], true)) {
        return wx2_order_response($templates, $input, $shortBaseUrl, $storageDir);
    }

    if ($path === '/wechat/pay' || $path === '/Wechat/payVip' || $path === '/Wechat/payQuotaRecharge' || $path === '/Wechat/payKamiPurchase') {
        $openid = (string)($input['openid'] ?? request_bearer_token());
        if ($openid === '') {
            throw new RuntimeException('未登录，无法发起微信支付');
        }
        $pkg = vip_packages()[0];
        $packageId = (string)($input['packageId'] ?? $input['vip_id'] ?? $input['id'] ?? '');
        foreach (vip_packages() as $item) {
            if ((string)$item['id'] === $packageId) {
                $pkg = $item;
                break;
            }
        }
        return wx2_ok(wechat_unified_order($openid, $pkg, $publicBaseUrl, $storageDir));
    }

    if ($path === '/wechat/checkItem') {
        return wx2_ok(['status' => 1, 'can_make' => true]);
    }

    if ($path === '/wechat/getItemStatus') {
        $record = find_record_by_id(load_records($storageDir, $shortBaseUrl), (string)($input['id'] ?? ''));
        return wx2_ok([
            'status' => '1',
            'id' => $record['id'] ?? ($input['id'] ?? ''),
            'url' => $record['link'] ?? build_short_url($shortBaseUrl, '2541'),
            'qrcode' => $record['link'] ?? build_short_url($shortBaseUrl, '2541'),
            'title' => $record['title'] ?? '表白代码',
        ]);
    }

    if ($path === '/wechat/getLog') {
        return wx2_ok(array_map(function ($record) {
            return [
                'id' => $record['id'] ?? '',
                'title' => $record['title'] ?? '',
                'url' => $record['link'] ?? '',
                'create_time' => $record['createdAt'] ?? '',
                'status' => $record['status'] ?? '已生成',
            ];
        }, load_records($storageDir, $shortBaseUrl)));
    }

    if ($path === '/wechat/cutout') {
        return wx2_ok(['deleted' => true]);
    }

    if ($path === '/wechat/getLogs') {
        return wx2_ok(['list' => wx2_score_logs(), 'hasMore' => false]);
    }

    if ($path === '/wechat/get_userid') {
        return ['code' => 1, 'msg' => 'success', 'user_id' => 10001, 'data' => ['user_id' => 10001]];
    }

    if ($path === '/wechat/add_subscribe') {
        return ['code' => 1, 'success' => true, 'data' => ['status' => '1']];
    }

    if ($path === '/wechat/ad_load' || $path === '/wechat/ad_upload' || $path === '/wechat/upload_user_id') {
        return wx2_ok(['status' => 1]);
    }

    if ($path === '/wechat/getmusic') {
        return wx2_ok([
            ['id' => 1, 'name' => '默认音乐', 'url' => ''],
        ]);
    }

    if ($path === '/wechat/upload' || $path === '/upload') {
        $url = $publicBaseUrl . '/static/upload-placeholder.png';
        return ['code' => 1, 'msg' => 'success', 'data' => ['url' => $url, 'fullurl' => $url]];
    }

    if ($path === '/info/get_user.php' || $path === '/kami_bag/info.php' || $path === '/invite/tixian/get_user_info.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => wx2_user((string)($input['openid'] ?? 'dev_openid')), 'config' => wx2_withdraw_config(), 'langmanbi' => 1200, 'people' => 3];
    }

    if ($path === '/info/update_user.php') {
        return ['code' => 200, 'msg' => '保存成功', 'data' => wx2_user((string)($input['openid'] ?? 'dev_openid'))];
    }

    if ($path === '/rton/get_user_data.php') {
        return ['continuous_days' => 3, 'is_signed_today' => false, 'total_points' => 120, 'consume' => 20];
    }

    if ($path === '/rton/signin.php') {
        return ['code' => 200, 'msg' => '签到成功', 'data' => ['points' => 10, 'total_points' => 130]];
    }

    if ($path === '/jifen/getRankList.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => [
            ['nickname' => '云栈点用户', 'score' => 120],
            ['nickname' => '代码生成助手', 'score' => 98],
        ]];
    }

    if ($path === '/help/check_help_time.php' || $path === '/help/check_order_status.php' || $path === '/help/complete_help.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => ['can_help' => true, 'status' => 1]];
    }

    if ($path === '/help/get_help_info.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => ['order_id' => $input['order_id'] ?? '', 'need' => 1, 'done' => 0, 'status' => 0]];
    }

    if ($path === '/wechat/myHelpList') {
        return wx2_ok([
            ['order_id' => 'H202605200001', 'title' => '表白代码', 'status' => '助力中'],
        ]);
    }

    if ($path === '/invite/getUserId.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => ['id' => 10001, 'user_id' => 10001]];
    }

    if ($path === '/invite/langmanbi_detail.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => [
            ['title' => '邀请奖励', 'amount' => 100, 'time' => date('Y-m-d H:i:s')],
        ]];
    }

    if ($path === '/invite/tixian/get_withdraw_records.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => []];
    }

    if ($path === '/invite/tixian/withdraw.php') {
        return ['code' => 200, 'msg' => '提现申请已提交', 'data' => ['status' => 1]];
    }

    if ($path === '/kami_bag/list.php') {
        return ['code' => 200, 'msg' => 'success', 'kamiConvert' => 100, 'data' => [
            ['id' => 1, 'kami' => 'YZD-TEST-0001', 'status' => '1', 'created_at' => date('Y-m-d H:i:s')],
        ]];
    }

    if ($path === '/kami_bag/gift.php' || $path === '/kami_bag/exchange.php') {
        return ['code' => 200, 'msg' => '操作成功', 'data' => ['status' => 1]];
    }

    if ($path === '/prize/get_user_score.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => ['score' => 120]];
    }

    if ($path === '/prize/get_lottery_records.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => []];
    }

    if ($path === '/prize/get_prize_config.php') {
        return ['code' => 200, 'msg' => 'success', 'expense' => 10, 'data' => [
            ['index' => 0, 'name' => '10积分', 'value' => 10, 'type' => 'score'],
            ['index' => 1, 'name' => '卡密1张', 'value' => 1, 'type' => 'kami'],
            ['index' => 2, 'name' => '谢谢参与', 'value' => 0, 'type' => 'none'],
        ]];
    }

    if ($path === '/prize/lottery.php') {
        return ['code' => 200, 'msg' => 'success', 'data' => ['prize_index' => 0, 'new_score' => 110]];
    }

    if ($path === '/Wechat/getVipList') {
        return ['code' => 1, 'msg' => 'success', 'data' => wx2_vip_list()];
    }

    if ($path === '/Wechat/getUserVip') {
        $openid = (string)($input['openid'] ?? request_bearer_token() ?: 'dev_openid_local');
        $user = ensure_user($storageDir, $openid);
        $vipInfo = vip_info_payload($user);
        return ['code' => 1, 'msg' => 'success', 'data' => [
            'vip_level' => $vipInfo['isVip'] ? 1 : 0,
            'vip_name' => $vipInfo['isVip'] ? 'VIP会员' : '普通用户',
            'quota' => (int)$user['quota'],
            'kami' => 0,
            'vipInfo' => $vipInfo,
            'userInfo' => user_to_wx2_user($user),
        ]];
    }

    if ($path === '/Wechat/getQuotaLogs') {
        return ['code' => 1, 'msg' => 'success', 'data' => []];
    }

    return null;
}

function wx2_ok(array $data = [], string $msg = 'success'): array
{
    return ['code' => 1, 'msg' => $msg, 'data' => $data];
}

function wechat_code_session(string $code): array
{
    $appid = getenv('YZD_WECHAT_APPID') ?: 'wx1c9791197f6da158';
    $secret = getenv('YZD_WECHAT_SECRET') ?: '6150a228d2054a123c9ecb86d0943a4e';
    if ($code !== '' && $secret !== '') {
        $url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' . rawurlencode($appid) . '&secret=' . rawurlencode($secret) . '&js_code=' . rawurlencode($code) . '&grant_type=authorization_code';
        $raw = @file_get_contents($url);
        $data = is_string($raw) ? json_decode($raw, true) : null;
        if (is_array($data) && !empty($data['openid'])) {
            return ['openid' => (string)$data['openid'], 'session_key' => (string)($data['session_key'] ?? '')];
        }
    }
    return ['openid' => 'dev_openid_' . substr(md5($code ?: 'local'), 0, 12), 'session_key' => ''];
}

function wx2_config(): array
{
    return [
        'add_subscribe_id' => '',
        'sub_notification' => 'false',
        'upload_ad' => 0,
        'ad_frequency' => 99,
        'help_nothave' => 3,
        'ios_jlgg' => '观看广告后制作',
        'ios_anz' => '取消',
        'ios_any' => '确定',
        'az_jlgg' => '是否支付制作费用',
        'az_anz' => '取消',
        'az_any' => '确定',
        'nogg' => '广告暂不可用',
        'vip_equipment' => 'false',
    ];
}

function wx2_ad_config(): array
{
    return ['jili' => '', 'banner' => '', 'chaping' => ''];
}

function wx2_withdraw_config(): array
{
    return ['tixian_MinCoin' => 500, 'tixian_MinPerson' => 1];
}

function wx2_user(string $openid): array
{
    return [
        'id' => 10001,
        'openid' => $openid,
        'nickname' => '云栈点用户',
        'avatar' => '',
        'avatar_url' => '',
        'personal' => '',
        'scorings' => 120,
        'ad_frequency' => 0,
        'ad_last_time' => '',
        'langmanbi' => 1200,
        'people' => 3,
        'is_admin' => $openid === admin_openid(),
        'config' => wx2_withdraw_config(),
    ];
}

function wx2_template_cards(array $templates, string $publicBaseUrl): array
{
    return array_map(function ($template, $index) use ($publicBaseUrl) {
        return [
            'id' => $template['id'],
            'title' => $template['title'],
            'name' => $template['title'],
            'desc' => $template['subtitle'],
            'subtitle' => $template['subtitle'],
            'image' => $template['cover'],
            'cover' => $template['cover'],
            'fenzu_id' => $index + 1,
            'price' => 0,
            'pay_jifen' => 10,
            'prohibitsurl' => '',
            'url' => $publicBaseUrl . '/preview/' . rawurlencode($template['id']),
        ];
    }, $templates, array_keys($templates));
}

function wx2_item_detail(array $template): array
{
    $model = $template['defaults'];
    $paramJson = array_map(function ($field) use ($template) {
        return [
            'name' => $field['key'],
            'title' => $field['label'],
            'label' => $field['label'],
            'type' => $field['type'] === 'textarea' ? 'textarea' : 'input',
            'default' => (string)($template['defaults'][$field['key']] ?? ''),
            'placeholder' => $field['placeholder'] ?? '',
            'required' => !empty($field['required']),
            'data' => [],
        ];
    }, $template['fields']);

    return [
        'valid_order_count' => 0,
        'quota' => 0,
        'vipid' => 0,
        'ad_load' => 2,
        'model' => $model,
        'music' => [],
        'imageList' => [],
        'muban' => [
            'id' => $template['id'],
            'title' => $template['title'],
            'name' => $template['title'],
            'price' => 0,
            'pay_jifen' => 10,
            'prohibitsurl' => '',
        ],
        'musicList' => [],
        'is_ad' => 0,
        'mu_upload_ad' => 0,
        'param_json' => $paramJson,
    ];
}

function wx2_order_response(array $templates, array $input, string $shortBaseUrl, string $storageDir): array
{
    $template = find_template($templates, (string)($input['muban_id'] ?? $input['id'] ?? $input['templateId'] ?? 'love-code'));
    $form = is_array($input['param_json'] ?? null) ? $input['param_json'] : (is_array($input['form'] ?? null) ? $input['form'] : $input);
    $records = load_records($storageDir, $shortBaseUrl);
    $id = 'R' . date('YmdHis') . random_int(100, 999);
    $shortCode = generate_short_code($records);
    $link = build_short_url($shortBaseUrl, $shortCode);
    save_record($storageDir, [
        'id' => $id,
        'shortCode' => $shortCode,
        'title' => $template['title'],
        'templateId' => $template['id'],
        'createdAt' => date('Y-m-d H:i'),
        'status' => '已生成',
        'link' => $link,
        'form' => $form,
    ], $shortBaseUrl);

    return wx2_ok(['orderId' => $id, 'id' => $id, 'url' => $link, 'shortCode' => $shortCode]);
}

function wx2_score_logs(): array
{
    return [
        ['title' => '签到奖励', 'score' => '+10', 'created_at' => date('Y-m-d H:i:s')],
        ['title' => '制作消耗', 'score' => '-10', 'created_at' => date('Y-m-d H:i:s')],
    ];
}

function wx2_vip_list(): array
{
    return [
        ['id' => 1, 'level' => 1, 'name' => '基础会员', 'price' => 9.9, 'scoring' => 100, 'quota' => 10, 'kami' => 1],
        ['id' => 2, 'level' => 2, 'name' => '高级会员', 'price' => 19.9, 'scoring' => 300, 'quota' => 30, 'kami' => 3],
    ];
}

function find_record_by_id(array $records, string $id): ?array
{
    foreach ($records as $record) {
        if ((string)($record['id'] ?? '') === $id) {
            return $record;
        }
    }
    return null;
}

function starts_with(string $value, string $prefix): bool
{
    return substr($value, 0, strlen($prefix)) === $prefix;
}

function templates(string $baseUrl): array
{
    return [
        [
            'id' => 'love-code',
            'title' => '表白代码',
            'subtitle' => '专属弹窗、爱心动画、纪念日祝福',
            'cover' => '/static/home/card0.png',
            'category' => '表白',
            'hot' => 9824,
            'used' => 37820,
            'tags' => ['爆款', '可改文案', '音乐'],
            'previewUrl' => $baseUrl . '/preview/love-code',
            'finalUrl' => $baseUrl . '/code/love-code',
            'fields' => [
                ['key' => 'toName', 'label' => '对方昵称', 'type' => 'text', 'placeholder' => '例如 小鹿', 'required' => true],
                ['key' => 'fromName', 'label' => '你的昵称', 'type' => 'text', 'placeholder' => '例如 阿南', 'required' => true],
                ['key' => 'message', 'label' => '表白文案', 'type' => 'textarea', 'placeholder' => '写一句想对 TA 说的话', 'required' => true],
                ['key' => 'date', 'label' => '纪念日', 'type' => 'text', 'placeholder' => '例如 2026-05-20'],
            ],
            'defaults' => [
                'toName' => '小鹿',
                'fromName' => '阿南',
                'message' => '遇见你以后，每一天都有了期待。',
                'date' => '2026-05-20',
            ],
        ],
        [
            'id' => 'birthday-code',
            'title' => '生日祝福代码',
            'subtitle' => '蛋糕动画、烟花效果、祝福语生成',
            'cover' => '/static/home/card1.png',
            'category' => '祝福',
            'hot' => 7561,
            'used' => 21908,
            'tags' => ['生日', '烟花', '分享'],
            'previewUrl' => $baseUrl . '/preview/birthday-code',
            'finalUrl' => $baseUrl . '/code/birthday-code',
            'fields' => [
                ['key' => 'name', 'label' => '寿星昵称', 'type' => 'text', 'placeholder' => '例如 可可', 'required' => true],
                ['key' => 'age', 'label' => '年龄', 'type' => 'number', 'placeholder' => '例如 18'],
                ['key' => 'wish', 'label' => '祝福语', 'type' => 'textarea', 'placeholder' => '写下你的生日祝福', 'required' => true],
            ],
            'defaults' => ['name' => '可可', 'age' => '18', 'wish' => '生日快乐，愿你眼里有光，心里有梦。'],
        ],
        [
            'id' => 'friend-code',
            'title' => '闺蜜友情代码',
            'subtitle' => '照片墙、友情宣言、回忆时间线',
            'cover' => '/static/home/card2.png',
            'category' => '友情',
            'hot' => 6319,
            'used' => 15863,
            'tags' => ['照片墙', '回忆', '文案'],
            'previewUrl' => $baseUrl . '/preview/friend-code',
            'finalUrl' => $baseUrl . '/code/friend-code',
            'fields' => [
                ['key' => 'friendName', 'label' => '好友昵称', 'type' => 'text', 'placeholder' => '例如 七七', 'required' => true],
                ['key' => 'years', 'label' => '认识多久', 'type' => 'text', 'placeholder' => '例如 5 年'],
                ['key' => 'story', 'label' => '友情文案', 'type' => 'textarea', 'placeholder' => '写下你们的故事', 'required' => true],
            ],
            'defaults' => ['friendName' => '七七', 'years' => '5 年', 'story' => '谢谢你一直在，我所有的小事你都记得。'],
        ],
        [
            'id' => 'apology-code',
            'title' => '道歉挽回代码',
            'subtitle' => '互动选择、诚意文案、专属链接',
            'cover' => '/static/home/card3.png',
            'category' => '情感',
            'hot' => 5988,
            'used' => 13340,
            'tags' => ['挽回', '互动', '私密'],
            'previewUrl' => $baseUrl . '/preview/apology-code',
            'finalUrl' => $baseUrl . '/code/apology-code',
            'fields' => [
                ['key' => 'name', 'label' => '对方昵称', 'type' => 'text', 'placeholder' => '例如 星星', 'required' => true],
                ['key' => 'reason', 'label' => '道歉原因', 'type' => 'textarea', 'placeholder' => '简短说明你想道歉的事情', 'required' => true],
                ['key' => 'promise', 'label' => '你的承诺', 'type' => 'textarea', 'placeholder' => '写下之后会怎么做', 'required' => true],
            ],
            'defaults' => ['name' => '星星', 'reason' => '这次是我没有好好沟通，让你难过了。', 'promise' => '我会认真听你说话，也会用行动证明改变。'],
        ],
        [
            'id' => 'festival-code',
            'title' => '节日祝福代码',
            'subtitle' => '节日主题、红包封面感、群发友好',
            'cover' => '/static/home/card4.png',
            'category' => '祝福',
            'hot' => 4320,
            'used' => 10428,
            'tags' => ['节日', '群发', '轻量'],
            'previewUrl' => $baseUrl . '/preview/festival-code',
            'finalUrl' => $baseUrl . '/code/festival-code',
            'fields' => [
                ['key' => 'festival', 'label' => '节日名称', 'type' => 'text', 'placeholder' => '例如 端午节', 'required' => true],
                ['key' => 'name', 'label' => '收件人', 'type' => 'text', 'placeholder' => '例如 老同学'],
                ['key' => 'wish', 'label' => '祝福语', 'type' => 'textarea', 'placeholder' => '写一句节日祝福', 'required' => true],
            ],
            'defaults' => ['festival' => '端午节', 'name' => '老同学', 'wish' => '愿你平安顺遂，日日都有好心情。'],
        ],
    ];
}

function find_template(array $templates, string $id): array
{
    foreach ($templates as $template) {
        if ($template['id'] === $id) {
            return $template;
        }
    }
    return $templates[0];
}

function build_code_url(string $baseUrl, string $type, string $templateId, array $form): string
{
    return $baseUrl . '/' . $type . '/' . rawurlencode($templateId) . ($form ? '?' . http_build_query($form) : '');
}

function build_short_url(string $baseUrl, string $shortCode): string
{
    return $baseUrl . '/' . rawurlencode($shortCode);
}

function records_path(string $storageDir): string
{
    return $storageDir . '/records.json';
}

function load_records(string $storageDir, string $shortBaseUrl): array
{
    $path = records_path($storageDir);
    if (!is_file($path)) {
        $records = [
            [
                'id' => 'R20260519001',
                'shortCode' => '2541',
                'title' => '表白代码',
                'templateId' => 'love-code',
                'createdAt' => '2026-05-19 10:20',
                'status' => '已生成',
                'link' => build_short_url($shortBaseUrl, '2541'),
                'form' => [
                    'toName' => '小鹿',
                    'fromName' => '阿南',
                    'message' => '遇见你以后，每一天都有了期待。',
                    'date' => '2026-05-20',
                ],
            ],
        ];
        return $records;
    }
    $records = json_decode((string)file_get_contents($path), true);
    if (!is_array($records)) {
        return [];
    }
    return normalize_records($records, $shortBaseUrl);
}

function save_record(string $storageDir, array $record, string $shortBaseUrl): void
{
    $records = load_records($storageDir, $shortBaseUrl);
    array_unshift($records, $record);
    file_put_contents(records_path($storageDir), json_encode(array_slice($records, 0, 50), JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    if (class_exists(\Yzd\Modules\AdminBackend::class)) {
        \Yzd\Modules\AdminBackend::upsertRecord($record);
    }
}

function normalize_records(array $records, string $shortBaseUrl): array
{
    $used = [];
    foreach ($records as $record) {
        if (!empty($record['shortCode'])) {
            $used[(string)$record['shortCode']] = true;
        }
    }

    foreach ($records as $index => $record) {
        if (empty($record['shortCode'])) {
            $record['shortCode'] = stable_short_code((string)($record['id'] ?? $index), $used);
        }
        $used[(string)$record['shortCode']] = true;
        $record['link'] = build_short_url($shortBaseUrl, (string)$record['shortCode']);
        if (!isset($record['form']) || !is_array($record['form'])) {
            $record['form'] = [];
        }
        $records[$index] = $record;
    }
    return $records;
}

function stable_short_code(string $seed, array $used): string
{
    $code = (string)(1000 + (abs(crc32($seed)) % 9000));
    while (isset($used[$code])) {
        $code = (string)(((int)$code + 1 - 1000) % 9000 + 1000);
    }
    return $code;
}

function generate_short_code(array $records): string
{
    $used = [];
    foreach ($records as $record) {
        if (!empty($record['shortCode'])) {
            $used[(string)$record['shortCode']] = true;
        }
    }

    for ($i = 0; $i < 30; $i += 1) {
        $code = (string)random_int(1000, 9999);
        if (!isset($used[$code])) {
            return $code;
        }
    }

    return stable_short_code((string)microtime(true), $used);
}

function find_record_by_short_code(array $records, string $shortCode): ?array
{
    foreach ($records as $record) {
        if ((string)($record['shortCode'] ?? '') === $shortCode) {
            return $record;
        }
    }
    return null;
}

function data_center_payload(string $path): array
{
    $map = [
        '/dataCenter/member' => [
            ['name' => '浏览量', 'number' => '202W'],
            ['name' => 'PV', 'number' => '233W'],
            ['name' => 'UV', 'number' => '102W'],
        ],
        '/dataCenter/interaction' => [
            ['name' => '浏览量', 'number' => '919'],
            ['name' => '点赞量', 'number' => '887'],
            ['name' => '分享量', 'number' => '104'],
            ['name' => '收藏', 'number' => '47'],
        ],
        '/dataCenter/complete-rate' => [
            ['time' => '12:00', 'percentage' => '80'],
            ['time' => '14:00', 'percentage' => '60'],
            ['time' => '16:00', 'percentage' => '85'],
            ['time' => '18:00', 'percentage' => '43'],
            ['time' => '20:00', 'percentage' => '60'],
            ['time' => '22:00', 'percentage' => '95'],
        ],
        '/dataCenter/area' => [
            ['标题' => '表白代码', '全球' => '4442', '华北' => '456', '华东' => '456'],
            ['标题' => '生日祝福', '全球' => '3512', '华北' => '389', '华东' => '502'],
            ['标题' => '闺蜜友情', '全球' => '2680', '华北' => '244', '华东' => '377'],
        ],
    ];

    return [
        'returnType' => 'succ',
        'generateType' => 'template',
        'template' => [
            'succ' => [
                'data' => ['list' => $map[$path] ?? []],
                'statusCode' => 200,
                'header' => ['content-type' => 'application/json; charset=utf-8'],
            ],
        ],
    ];
}

function render_code_page(string $type, array $template, array $input): void
{
    $title = htmlspecialchars((string)$template['title'], ENT_QUOTES, 'UTF-8');
    $subtitle = htmlspecialchars((string)$template['subtitle'], ENT_QUOTES, 'UTF-8');
    $heading = $type === 'preview' ? '预览效果' : '专属链接';
    $fields = [];
    foreach ($template['fields'] as $field) {
        $value = (string)($input[$field['key']] ?? $template['defaults'][$field['key']] ?? '');
        $fields[] = '<div class="field"><span>' . htmlspecialchars($field['label'], ENT_QUOTES, 'UTF-8') . '</span><strong>' . htmlspecialchars($value, ENT_QUOTES, 'UTF-8') . '</strong></div>';
    }

    header('Content-Type: text/html; charset=utf-8');
    echo '<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . $title . '</title><style>
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f6f7fb;color:#1f2937}
.page{min-height:100vh;padding:32px 20px;box-sizing:border-box;background:linear-gradient(160deg,#fff 0%,#ffe9f2 45%,#eaf4ff 100%)}
.card{max-width:560px;margin:0 auto;background:rgba(255,255,255,.9);border-radius:20px;padding:28px;box-shadow:0 20px 60px rgba(31,41,55,.14)}
.eyebrow{font-size:14px;color:#e03997;font-weight:700}.title{font-size:34px;line-height:1.15;margin:12px 0}.sub{color:#5f6b7a;line-height:1.7}
.field{display:flex;justify-content:space-between;gap:18px;padding:16px 0;border-bottom:1px solid #edf0f5}.field span{color:#6b7280}.field strong{text-align:right}
.heart{font-size:52px;margin:26px 0 8px;animation:pulse 1.2s infinite}.btn{display:block;margin-top:24px;padding:14px 18px;border-radius:12px;background:#e03997;color:#fff;text-align:center;text-decoration:none;font-weight:700}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}</style></head><body><main class="page"><section class="card"><div class="eyebrow">' . $heading . '</div><h1 class="title">' . $title . '</h1><p class="sub">' . $subtitle . '</p><div class="heart">♥</div>' . implode('', $fields) . '<a class="btn" href="javascript:history.back()">返回小程序</a></section></main></body></html>';
    exit;
}
