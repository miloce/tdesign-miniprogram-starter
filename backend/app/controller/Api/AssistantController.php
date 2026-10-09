<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use RuntimeException;
use think\Response;
use Yzd\Services\AppConfigService;
use Yzd\Services\AssistantEntitlementService;
use Yzd\Services\AssistantScheduleService;
use Yzd\Services\AssistantSubmissionLock;
use Yzd\Services\LegacyAssistantGatewayService;
use Yzd\Services\OrderService;
use Yzd\Services\PaymentGatewayService;

final class AssistantController extends BaseController
{
    public function rewardClaim(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        return $this->ok([
            'rewardToken' => AssistantEntitlementService::make()->issueRewardToken($this->authOpenid()),
        ]);
    }

    public function submit(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        $input = $this->input();
        $account = trim((string)($input['account'] ?? ''));
        $password = trim((string)($input['password'] ?? ''));
        $steps = trim((string)($input['steps'] ?? ''));
        $outTradeNo = trim((string)($input['outTradeNo'] ?? ''));
        $rewardToken = trim((string)($input['rewardToken'] ?? ''));

        if ($account === '') {
            return $this->fail('请输入账号');
        }

        if ($password === '') {
            return $this->fail('请输入密码');
        }

        if (!$this->validSteps($steps)) {
            return $this->fail('请输入1000-98800之间的数值');
        }

        try {
            $openid = $this->authOpenid();
            [$result, $entitlement] = AssistantSubmissionLock::make()->run(
                $openid,
                function () use ($openid, $outTradeNo, $rewardToken, $account, $password, $steps): array {
                    $entitlementService = AssistantEntitlementService::make();
                    try {
                        $authorization = $entitlementService->authorize($openid, $outTradeNo, $rewardToken);
                    } catch (RuntimeException $exception) {
                        throw new RuntimeException($exception->getMessage(), 402, $exception);
                    }
                    $result = LegacyAssistantGatewayService::make()->submit($account, $password, $steps);
                    $entitlement = $entitlementService->finalize($openid, $authorization);
                    return [$result, $entitlement];
                }
            );
        } catch (RuntimeException $exception) {
            $code = (int)$exception->getCode();
            if ($code < 400 || $code > 599) {
                $code = 502;
            }
            return $this->fail($exception->getMessage(), $code);
        }

        return $this->ok([
            'message' => (string)($result['message'] ?? '设置成功'),
            'userInfo' => $entitlement['user'] ?? null,
            'entitlement' => (string)($entitlement['method'] ?? ''),
        ]);
    }

    public function schedule(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        return $this->ok(AssistantScheduleService::make()->publicStatus($this->authOpenid()));
    }

    public function saveSchedule(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        try {
            return $this->ok(AssistantScheduleService::make()->save($this->authOpenid(), $this->input()));
        } catch (RuntimeException $exception) {
            $code = (int)$exception->getCode();
            if ($code < 400 || $code > 599) {
                $code = 400;
            }

            return $this->fail($exception->getMessage(), $code);
        }
    }

    public function subscribeSchedule(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        $status = trim((string)($this->input()['status'] ?? ''));
        return $this->ok(AssistantScheduleService::make()->recordSubscription($this->authOpenid(), $status));
    }

    public function pay(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        $config = AppConfigService::make()->get();
        if (empty($config['enablePayment']) || (float)($config['price'] ?? 0) <= 0) {
            return $this->ok(['paid' => true, 'free' => true]);
        }

        $input = $this->input();
        $openid = $this->authOpenid();
        $order = OrderService::make()->create(
            'assistant',
            $openid,
            $this->yuanToCents($config['price'] ?? 0),
            '云栈点小助手服务',
            ['scope' => 'assistant']
        );

        if ((int)$order['amountCents'] <= 0) {
            OrderService::make()->markPaid((string)$order['outTradeNo'], 'free');
            return $this->ok(['paid' => true, 'outTradeNo' => (string)$order['outTradeNo'], 'free' => true]);
        }

        try {
            return $this->ok(PaymentGatewayService::make()->createGoodsPayment(
                $order,
                $openid,
                trim((string)($input['loginCode'] ?? '')),
                (string)($config['assistantProductId'] ?? ''),
                'assistant',
                $this->clientContext($input)
            ));
        } catch (RuntimeException $exception) {
            return $this->fail($exception->getMessage(), 502);
        }
    }

    public function payConfirm(): Response
    {
        if ($response = $this->requireAuth()) {
            return $response;
        }

        $outTradeNo = trim((string)request()->param('outTradeNo', ''));
        $order = $outTradeNo !== '' ? OrderService::make()->get($outTradeNo) : null;
        if (!$order || (string)$order['openid'] !== $this->authOpenid() || (string)$order['type'] !== 'assistant') {
            return $this->fail('订单不存在', 404);
        }

        if (in_array((string)$order['status'], ['paid', 'consumed'], true)) {
            return $this->ok(['paid' => true, 'outTradeNo' => $outTradeNo]);
        }

        try {
            $payment = PaymentGatewayService::make()->confirmOrder($order);
            if (!empty($payment['paid'])) {
                return $this->ok(['paid' => true, 'outTradeNo' => $outTradeNo]);
            }

            return $this->ok([
                'paid' => false,
                'status' => (int)($payment['status'] ?? 1),
                'tradeState' => (string)($payment['tradeState'] ?? ''),
                'outTradeNo' => $outTradeNo,
            ]);
        } catch (RuntimeException $exception) {
            return $this->fail($exception->getMessage(), 502);
        }
    }

    private function validSteps(string $value): bool
    {
        if ($value === '' || !preg_match('/^\d+$/', $value)) {
            return false;
        }

        $number = (int)$value;
        return $number >= 1000 && $number <= 98800;
    }

    private function yuanToCents(mixed $amount): int
    {
        return max(1, (int)round((float)$amount * 100));
    }
}
