<?php

declare(strict_types=1);

namespace Yzd\Services;

final class AppConfigService
{
    public function __construct(private readonly Storage $storage)
    {
    }

    public static function make(): self
    {
        return new self(Storage::make());
    }

    public function get(): array
    {
        $data = $this->storage->read('admin_config.json', $this->defaults());
        return array_replace_recursive($this->defaults(), $data);
    }

    public function save(array $input): array
    {
        $saved = [];
        $this->storage->update('admin_config.json', $this->defaults(), function (array $data) use ($input, &$saved): array {
            $config = array_replace_recursive($this->defaults(), $data);
            foreach (['enableRewardAd', 'enablePayment'] as $key) {
                if (array_key_exists($key, $input)) {
                    $config[$key] = (bool)$input[$key];
                }
            }
            foreach (['rewardAdUnitId', 'codeProductId', 'assistantProductId'] as $key) {
                if (array_key_exists($key, $input)) {
                    $config[$key] = trim((string)$input[$key]);
                }
            }
            if (array_key_exists('price', $input)) {
                $config['price'] = (float)$input['price'];
            }
            if (isset($input['vipPackages']) && is_array($input['vipPackages'])) {
                $config['vipPackages'] = array_values(array_map(
                    fn ($package): array => $this->normalizeVipPackage(is_array($package) ? $package : []),
                    $input['vipPackages']
                ));
            }
            if (isset($input['exchangeItems']) && is_array($input['exchangeItems'])) {
                $config['exchangeItems'] = $input['exchangeItems'];
            }
            $saved = $config;
            return $config;
        });
        return $saved;
    }

    public function defaults(): array
    {
        return [
            'enableRewardAd' => false,
            'enablePayment' => false,
            'rewardAdUnitId' => '',
            'price' => 0,
            'codeProductId' => 'code_generation',
            'assistantProductId' => 'assistant_service',
            'vipPackages' => [
                ['id' => 'vip_month', 'name' => '月度会员', 'currentPrice' => '9.9', 'originalPrice' => '19.9', 'tag' => '体验', 'days' => 30, 'productId' => 'vip_month', 'features' => ['30天会员', '每日无限制作', '免广告生成']],
                ['id' => 'vip_year', 'name' => '年度会员', 'currentPrice' => '49.9', 'originalPrice' => '99.9', 'tag' => '推荐', 'days' => 365, 'productId' => 'vip_year', 'features' => ['365天会员', '无限制作代码', '优先使用新模板']],
                ['id' => 'vip_forever', 'name' => '永久会员', 'currentPrice' => '99.9', 'originalPrice' => '199.9', 'tag' => '超值', 'days' => 36500, 'productId' => 'vip_forever', 'features' => ['永久会员', '无限制作', '后续权益同步升级']],
            ],
            'exchangeItems' => [
                ['id' => 'quota_1', 'name' => '兑换 1 次制作', 'type' => 'quota', 'points' => 200, 'quota' => 1, 'days' => 0],
                ['id' => 'vip_7', 'name' => '兑换 7 天会员', 'type' => 'vip', 'points' => 1200, 'quota' => 0, 'days' => 7],
            ],
        ];
    }

    private function normalizeVipPackage(array $package): array
    {
        $package['id'] = (string)($package['id'] ?? '');
        $package['name'] = (string)($package['name'] ?? '');
        $package['currentPrice'] = (string)($package['currentPrice'] ?? '0');
        $package['originalPrice'] = (string)($package['originalPrice'] ?? '');
        $package['tag'] = (string)($package['tag'] ?? '');
        $package['productId'] = trim((string)($package['productId'] ?? ''));
        if (isset($package['days'])) {
            $package['days'] = (int)$package['days'];
        }
        $package['features'] = is_array($package['features'] ?? null)
            ? array_values(array_map('strval', $package['features']))
            : [];

        return $package;
    }
}
