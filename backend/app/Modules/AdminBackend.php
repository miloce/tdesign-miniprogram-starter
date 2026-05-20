<?php

declare(strict_types=1);

namespace Yzd\Modules;

use RuntimeException;
use Yzd\Support\Database;

final class AdminBackend
{
    public static function handle(string $path, string $method, array $input, string $storageDir, string $shortBaseUrl, string $adminOpenid): array
    {
        self::ensureSchema();
        self::seedAdmin($adminOpenid);
        self::seedLegacyStorage($storageDir, $shortBaseUrl);

        if ($path === '/admin/dashboard') {
            return self::dashboard();
        }
        if ($path === '/admin/users') {
            return self::users($input);
        }
        if ($path === '/admin/users/detail') {
            return ['user' => self::userDetail((string)($input['openid'] ?? ''))];
        }
        if ($path === '/admin/users/save' && $method === 'POST') {
            return ['user' => self::saveUser($input)];
        }
        if ($path === '/admin/users/status' && $method === 'POST') {
            $input['status'] = (string)($input['status'] ?? 'active');
            return ['user' => self::saveUser($input)];
        }
        if ($path === '/admin/users/adjust' && $method === 'POST') {
            return ['user' => self::adjustUser($input)];
        }
        if ($path === '/admin/orders') {
            return self::orders($input);
        }
        if ($path === '/admin/records') {
            return self::records($input);
        }

        throw new RuntimeException('后台接口不存在');
    }

    public static function ensureSchema(): void
    {
        $pdo = Database::pdo();
        $users = Database::table('users');
        $orders = Database::table('orders');
        $records = Database::table('generation_records');

        $pdo->exec("CREATE TABLE IF NOT EXISTS {$users} (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            openid VARCHAR(128) NOT NULL UNIQUE,
            nickname VARCHAR(120) NOT NULL DEFAULT '',
            avatar VARCHAR(500) NOT NULL DEFAULT '',
            phone VARCHAR(40) NOT NULL DEFAULT '',
            email VARCHAR(120) NOT NULL DEFAULT '',
            role VARCHAR(20) NOT NULL DEFAULT 'user',
            status VARCHAR(20) NOT NULL DEFAULT 'active',
            points INT NOT NULL DEFAULT 0,
            quota INT NOT NULL DEFAULT 0,
            is_vip TINYINT(1) NOT NULL DEFAULT 0,
            vip_expire_at VARCHAR(40) NOT NULL DEFAULT '',
            remark VARCHAR(500) NOT NULL DEFAULT '',
            point_records LONGTEXT NULL,
            login_count INT NOT NULL DEFAULT 0,
            created_at VARCHAR(40) NOT NULL DEFAULT '',
            updated_at VARCHAR(40) NOT NULL DEFAULT '',
            last_login_at VARCHAR(40) NOT NULL DEFAULT '',
            INDEX idx_status (status),
            INDEX idx_is_vip (is_vip),
            INDEX idx_last_login_at (last_login_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

        $pdo->exec("CREATE TABLE IF NOT EXISTS {$orders} (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            out_trade_no VARCHAR(64) NOT NULL UNIQUE,
            transaction_id VARCHAR(80) NOT NULL DEFAULT '',
            openid VARCHAR(128) NOT NULL DEFAULT '',
            package_id VARCHAR(80) NOT NULL DEFAULT '',
            package_name VARCHAR(120) NOT NULL DEFAULT '',
            amount INT NOT NULL DEFAULT 0,
            status VARCHAR(30) NOT NULL DEFAULT 'NOTPAY',
            prepay_id VARCHAR(160) NOT NULL DEFAULT '',
            paid_at VARCHAR(40) NOT NULL DEFAULT '',
            raw_json LONGTEXT NULL,
            created_at VARCHAR(40) NOT NULL DEFAULT '',
            updated_at VARCHAR(40) NOT NULL DEFAULT '',
            INDEX idx_openid (openid),
            INDEX idx_status (status),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");

        $pdo->exec("CREATE TABLE IF NOT EXISTS {$records} (
            id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            record_id VARCHAR(64) NOT NULL UNIQUE,
            openid VARCHAR(128) NOT NULL DEFAULT '',
            short_code VARCHAR(20) NOT NULL DEFAULT '',
            title VARCHAR(160) NOT NULL DEFAULT '',
            template_id VARCHAR(80) NOT NULL DEFAULT '',
            status VARCHAR(40) NOT NULL DEFAULT '',
            link VARCHAR(500) NOT NULL DEFAULT '',
            form_json LONGTEXT NULL,
            created_at VARCHAR(40) NOT NULL DEFAULT '',
            updated_at VARCHAR(40) NOT NULL DEFAULT '',
            INDEX idx_openid (openid),
            INDEX idx_short_code (short_code),
            INDEX idx_created_at (created_at)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    }

    public static function upsertUser(array $user): void
    {
        self::ensureSchema();
        $now = date(DATE_ATOM);
        $table = Database::table('users');
        $sql = "INSERT INTO {$table}
            (openid, nickname, avatar, phone, email, role, status, points, quota, is_vip, vip_expire_at, remark, point_records, login_count, created_at, updated_at, last_login_at)
            VALUES
            (:openid, :nickname, :avatar, :phone, :email, :role, :status, :points, :quota, :is_vip, :vip_expire_at, :remark, :point_records, :login_count, :created_at, :updated_at, :last_login_at)
            ON DUPLICATE KEY UPDATE
            nickname = VALUES(nickname), avatar = VALUES(avatar), phone = VALUES(phone), email = VALUES(email),
            role = VALUES(role), status = VALUES(status), points = VALUES(points), quota = VALUES(quota),
            is_vip = VALUES(is_vip), vip_expire_at = VALUES(vip_expire_at), remark = VALUES(remark),
            point_records = VALUES(point_records), login_count = VALUES(login_count),
            updated_at = VALUES(updated_at), last_login_at = VALUES(last_login_at)";

        Database::pdo()->prepare($sql)->execute([
            ':openid' => (string)($user['openid'] ?? ''),
            ':nickname' => (string)($user['nickname'] ?? '云栈点用户'),
            ':avatar' => (string)($user['avatar'] ?? ''),
            ':phone' => (string)($user['phone'] ?? ''),
            ':email' => (string)($user['email'] ?? ''),
            ':role' => (string)($user['role'] ?? 'user'),
            ':status' => (string)($user['status'] ?? 'active'),
            ':points' => (int)($user['points'] ?? 0),
            ':quota' => (int)($user['quota'] ?? 0),
            ':is_vip' => !empty($user['isVip']) ? 1 : 0,
            ':vip_expire_at' => (string)($user['vipExpireAt'] ?? ''),
            ':remark' => (string)($user['remark'] ?? ''),
            ':point_records' => json_encode($user['records'] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            ':login_count' => (int)($user['loginCount'] ?? 0),
            ':created_at' => (string)($user['createdAt'] ?? $now),
            ':updated_at' => $now,
            ':last_login_at' => (string)($user['lastLoginAt'] ?? ''),
        ]);
    }

    public static function upsertOrder(array $order): void
    {
        self::ensureSchema();
        $outTradeNo = (string)($order['outTradeNo'] ?? '');
        if ($outTradeNo === '') {
            return;
        }
        $table = Database::table('orders');
        $now = date(DATE_ATOM);
        $sql = "INSERT INTO {$table}
            (out_trade_no, transaction_id, openid, package_id, package_name, amount, status, prepay_id, paid_at, raw_json, created_at, updated_at)
            VALUES
            (:out_trade_no, :transaction_id, :openid, :package_id, :package_name, :amount, :status, :prepay_id, :paid_at, :raw_json, :created_at, :updated_at)
            ON DUPLICATE KEY UPDATE
            transaction_id = VALUES(transaction_id), openid = VALUES(openid), package_id = VALUES(package_id),
            package_name = VALUES(package_name), amount = VALUES(amount), status = VALUES(status),
            prepay_id = VALUES(prepay_id), paid_at = VALUES(paid_at), raw_json = VALUES(raw_json), updated_at = VALUES(updated_at)";
        Database::pdo()->prepare($sql)->execute([
            ':out_trade_no' => $outTradeNo,
            ':transaction_id' => (string)($order['transactionId'] ?? ''),
            ':openid' => (string)($order['openid'] ?? ''),
            ':package_id' => (string)($order['packageId'] ?? ''),
            ':package_name' => (string)($order['packageName'] ?? ''),
            ':amount' => (int)($order['amount'] ?? 0),
            ':status' => (string)($order['status'] ?? 'NOTPAY'),
            ':prepay_id' => (string)($order['prepayId'] ?? ''),
            ':paid_at' => (string)($order['paidAt'] ?? ''),
            ':raw_json' => json_encode($order['raw'] ?? $order, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            ':created_at' => (string)($order['createdAt'] ?? $now),
            ':updated_at' => $now,
        ]);
    }

    public static function upsertRecord(array $record): void
    {
        self::ensureSchema();
        $recordId = (string)($record['id'] ?? '');
        if ($recordId === '') {
            return;
        }
        $table = Database::table('generation_records');
        $now = date(DATE_ATOM);
        $sql = "INSERT INTO {$table}
            (record_id, openid, short_code, title, template_id, status, link, form_json, created_at, updated_at)
            VALUES
            (:record_id, :openid, :short_code, :title, :template_id, :status, :link, :form_json, :created_at, :updated_at)
            ON DUPLICATE KEY UPDATE
            openid = VALUES(openid), short_code = VALUES(short_code), title = VALUES(title),
            template_id = VALUES(template_id), status = VALUES(status), link = VALUES(link),
            form_json = VALUES(form_json), updated_at = VALUES(updated_at)";
        Database::pdo()->prepare($sql)->execute([
            ':record_id' => $recordId,
            ':openid' => (string)($record['openid'] ?? ''),
            ':short_code' => (string)($record['shortCode'] ?? ''),
            ':title' => (string)($record['title'] ?? ''),
            ':template_id' => (string)($record['templateId'] ?? ''),
            ':status' => (string)($record['status'] ?? ''),
            ':link' => (string)($record['link'] ?? ''),
            ':form_json' => json_encode($record['form'] ?? [], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES),
            ':created_at' => (string)($record['createdAt'] ?? $now),
            ':updated_at' => $now,
        ]);
    }

    public static function getUserByOpenid(string $openid): ?array
    {
        self::ensureSchema();
        return self::findUser($openid);
    }

    private static function seedAdmin(string $adminOpenid): void
    {
        if ($adminOpenid === '') {
            return;
        }
        $table = Database::table('users');
        $stmt = Database::pdo()->prepare("SELECT id FROM {$table} WHERE openid = :openid LIMIT 1");
        $stmt->execute([':openid' => $adminOpenid]);
        if (!$stmt->fetch()) {
            self::upsertUser([
                'openid' => $adminOpenid,
                'nickname' => '管理员',
                'role' => 'admin',
                'status' => 'active',
                'points' => 1280,
                'quota' => 3,
                'isVip' => true,
                'loginCount' => 1,
            ]);
        }
    }

    private static function seedLegacyStorage(string $storageDir, string $shortBaseUrl): void
    {
        $recordsPath = $storageDir . '/records.json';
        if (is_file($recordsPath)) {
            $records = json_decode((string)file_get_contents($recordsPath), true);
            if (is_array($records)) {
                foreach ($records as $record) {
                    self::upsertRecord(is_array($record) ? $record : []);
                }
            }
        }

        $ordersPath = $storageDir . '/payment_orders.json';
        if (is_file($ordersPath)) {
            $orders = json_decode((string)file_get_contents($ordersPath), true);
            if (is_array($orders)) {
                foreach ($orders as $order) {
                    self::upsertOrder(is_array($order) ? $order : []);
                }
            }
        }
    }

    private static function dashboard(): array
    {
        $pdo = Database::pdo();
        $users = Database::table('users');
        $orders = Database::table('orders');
        $records = Database::table('generation_records');
        $today = date('Y-m-d');

        return [
            'metrics' => [
                'users' => (int)$pdo->query("SELECT COUNT(*) FROM {$users}")->fetchColumn(),
                'activeUsers' => (int)$pdo->query("SELECT COUNT(*) FROM {$users} WHERE status = 'active'")->fetchColumn(),
                'vipUsers' => (int)$pdo->query("SELECT COUNT(*) FROM {$users} WHERE is_vip = 1")->fetchColumn(),
                'disabledUsers' => (int)$pdo->query("SELECT COUNT(*) FROM {$users} WHERE status = 'disabled'")->fetchColumn(),
                'records' => (int)$pdo->query("SELECT COUNT(*) FROM {$records}")->fetchColumn(),
                'todayRecords' => (int)$pdo->query("SELECT COUNT(*) FROM {$records} WHERE created_at LIKE '{$today}%'")->fetchColumn(),
                'orders' => (int)$pdo->query("SELECT COUNT(*) FROM {$orders}")->fetchColumn(),
                'paidOrders' => (int)$pdo->query("SELECT COUNT(*) FROM {$orders} WHERE status = 'SUCCESS'")->fetchColumn(),
                'revenueYuan' => round(((int)$pdo->query("SELECT COALESCE(SUM(amount), 0) FROM {$orders} WHERE status = 'SUCCESS'")->fetchColumn()) / 100, 2),
            ],
            'recentUsers' => self::fetchAll("SELECT * FROM {$users} ORDER BY last_login_at DESC, id DESC LIMIT 8"),
            'recentOrders' => self::fetchAll("SELECT * FROM {$orders} ORDER BY id DESC LIMIT 8"),
            'recentRecords' => self::fetchAll("SELECT * FROM {$records} ORDER BY id DESC LIMIT 8"),
        ];
    }

    private static function users(array $input): array
    {
        $table = Database::table('users');
        $where = [];
        $params = [];
        if (($input['q'] ?? '') !== '') {
            $where[] = '(openid LIKE :q OR nickname LIKE :q OR phone LIKE :q OR email LIKE :q OR remark LIKE :q)';
            $params[':q'] = '%' . (string)$input['q'] . '%';
        }
        if (($input['status'] ?? '') !== '') {
            $where[] = 'status = :status';
            $params[':status'] = (string)$input['status'];
        }
        if (($input['vip'] ?? '') !== '') {
            $where[] = 'is_vip = :vip';
            $params[':vip'] = (int)$input['vip'];
        }
        return self::paginateSql($table, $where, $params, 'last_login_at DESC, id DESC', $input);
    }

    private static function userDetail(string $openid): array
    {
        $user = self::findUser($openid);
        if (!$user) {
            throw new RuntimeException('用户不存在');
        }
        $orders = Database::table('orders');
        $records = Database::table('generation_records');
        $user['orders'] = self::fetchAll("SELECT * FROM {$orders} WHERE openid = :openid ORDER BY id DESC LIMIT 30", [':openid' => $openid]);
        $user['records'] = self::fetchAll("SELECT * FROM {$records} WHERE openid = :openid ORDER BY id DESC LIMIT 30", [':openid' => $openid]);
        return $user;
    }

    private static function saveUser(array $input): array
    {
        $openid = (string)($input['openid'] ?? '');
        if ($openid === '') {
            throw new RuntimeException('openid不能为空');
        }
        $existing = self::findUser($openid) ?: ['openid' => $openid, 'created_at' => date(DATE_ATOM)];
        $user = array_merge($existing, [
            'openid' => $openid,
            'nickname' => (string)($input['nickname'] ?? $existing['nickname'] ?? '云栈点用户'),
            'avatar' => (string)($input['avatar'] ?? $existing['avatar'] ?? ''),
            'phone' => (string)($input['phone'] ?? $existing['phone'] ?? ''),
            'email' => (string)($input['email'] ?? $existing['email'] ?? ''),
            'role' => (string)($input['role'] ?? $existing['role'] ?? 'user'),
            'status' => (string)($input['status'] ?? $existing['status'] ?? 'active'),
            'points' => (int)($input['points'] ?? $existing['points'] ?? 0),
            'quota' => (int)($input['quota'] ?? $existing['quota'] ?? 0),
            'isVip' => array_key_exists('isVip', $input) ? (bool)$input['isVip'] : (bool)($existing['is_vip'] ?? false),
            'vipExpireAt' => (string)($input['vipExpireAt'] ?? $existing['vip_expire_at'] ?? ''),
            'remark' => (string)($input['remark'] ?? $existing['remark'] ?? ''),
            'loginCount' => (int)($existing['login_count'] ?? 0),
            'createdAt' => (string)($existing['created_at'] ?? date(DATE_ATOM)),
            'lastLoginAt' => (string)($existing['last_login_at'] ?? ''),
            'records' => json_decode((string)($existing['point_records'] ?? '[]'), true) ?: [],
        ]);
        self::upsertUser($user);
        return self::userDetail($openid);
    }

    private static function adjustUser(array $input): array
    {
        $openid = (string)($input['openid'] ?? '');
        $user = self::findUser($openid);
        if (!$user) {
            throw new RuntimeException('用户不存在');
        }
        $pointsDelta = (int)($input['pointsDelta'] ?? 0);
        $quotaDelta = (int)($input['quotaDelta'] ?? 0);
        $pointRecords = json_decode((string)($user['point_records'] ?? '[]'), true) ?: [];
        array_unshift($pointRecords, [
            'id' => 'A' . date('YmdHis') . random_int(100, 999),
            'sourceDesc' => (string)($input['reason'] ?? '管理员调整'),
            'createTime' => date('Y-m-d H:i'),
            'changeValue' => $pointsDelta !== 0 ? abs($pointsDelta) : abs($quotaDelta),
            'changeText' => ($pointsDelta + $quotaDelta) >= 0 ? '+' : '-',
        ]);
        self::upsertUser([
            'openid' => $openid,
            'nickname' => $user['nickname'],
            'avatar' => $user['avatar'],
            'phone' => $user['phone'],
            'email' => $user['email'],
            'role' => $user['role'],
            'status' => $user['status'],
            'points' => max(0, (int)$user['points'] + $pointsDelta),
            'quota' => max(0, (int)$user['quota'] + $quotaDelta),
            'isVip' => (bool)$user['is_vip'],
            'vipExpireAt' => $user['vip_expire_at'],
            'remark' => $user['remark'],
            'loginCount' => (int)$user['login_count'],
            'createdAt' => $user['created_at'],
            'lastLoginAt' => $user['last_login_at'],
            'records' => $pointRecords,
        ]);
        return self::userDetail($openid);
    }

    private static function orders(array $input): array
    {
        $table = Database::table('orders');
        $where = [];
        $params = [];
        if (($input['status'] ?? '') !== '') {
            $where[] = 'status = :status';
            $params[':status'] = (string)$input['status'];
        }
        if (($input['openid'] ?? '') !== '') {
            $where[] = 'openid = :openid';
            $params[':openid'] = (string)$input['openid'];
        }
        return self::paginateSql($table, $where, $params, 'id DESC', $input);
    }

    private static function records(array $input): array
    {
        $table = Database::table('generation_records');
        $where = [];
        $params = [];
        if (($input['openid'] ?? '') !== '') {
            $where[] = 'openid = :openid';
            $params[':openid'] = (string)$input['openid'];
        }
        if (($input['q'] ?? '') !== '') {
            $where[] = '(record_id LIKE :q OR title LIKE :q OR template_id LIKE :q OR short_code LIKE :q)';
            $params[':q'] = '%' . (string)$input['q'] . '%';
        }
        return self::paginateSql($table, $where, $params, 'id DESC', $input);
    }

    private static function findUser(string $openid): ?array
    {
        $table = Database::table('users');
        $stmt = Database::pdo()->prepare("SELECT * FROM {$table} WHERE openid = :openid LIMIT 1");
        $stmt->execute([':openid' => $openid]);
        $row = $stmt->fetch();
        return $row ?: null;
    }

    private static function paginateSql(string $table, array $where, array $params, string $orderBy, array $input): array
    {
        $page = max(1, (int)($input['page'] ?? 1));
        $pageSize = min(100, max(1, (int)($input['pageSize'] ?? 20)));
        $whereSql = $where ? ' WHERE ' . implode(' AND ', $where) : '';
        $countStmt = Database::pdo()->prepare("SELECT COUNT(*) FROM {$table}{$whereSql}");
        $countStmt->execute($params);
        $total = (int)$countStmt->fetchColumn();

        $sql = "SELECT * FROM {$table}{$whereSql} ORDER BY {$orderBy} LIMIT {$pageSize} OFFSET " . (($page - 1) * $pageSize);
        $items = self::fetchAll($sql, $params);
        return [
            'list' => $items,
            'page' => $page,
            'pageSize' => $pageSize,
            'total' => $total,
            'hasMore' => $page * $pageSize < $total,
        ];
    }

    private static function fetchAll(string $sql, array $params = []): array
    {
        $stmt = Database::pdo()->prepare($sql);
        $stmt->execute($params);
        return $stmt->fetchAll();
    }
}
