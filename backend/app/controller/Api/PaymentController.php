<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\OrderService;
use Yzd\Services\WeChatPayService;
use RuntimeException;

final class PaymentController extends BaseController
{
    public function notify(): Response
    {
        $body = (string)file_get_contents('php://input');
        $timestamp = (string)request()->header('Wechatpay-Timestamp', '');
        $nonce = (string)request()->header('Wechatpay-Nonce', '');
        $signature = (string)request()->header('Wechatpay-Signature', '');
        $serial = (string)request()->header('Wechatpay-Serial', '');
        $expectedSerial = (string)(getenv('YZD_WECHAT_PUBLIC_KEY_ID') ?: '');
        $payment = WeChatPayService::make();

        if ($expectedSerial !== '' && $serial !== $expectedSerial) {
            return json(['code' => 'FAIL', 'message' => 'invalid serial'], 401);
        }

        if (!$payment->verifyNotifySignature($body, $timestamp, $nonce, $signature)) {
            return json(['code' => 'FAIL', 'message' => 'invalid signature'], 401);
        }

        try {
            $payload = $payment->decryptNotification($body);
        } catch (RuntimeException $exception) {
            return json(['code' => 'FAIL', 'message' => $exception->getMessage()], 400);
        }

        $outTradeNo = (string)($payload['out_trade_no'] ?? '');
        if ($outTradeNo === '') {
            return json(['code' => 'FAIL', 'message' => 'missing out_trade_no'], 400);
        }

        if ((string)($payload['trade_state'] ?? '') === 'SUCCESS') {
            $order = OrderService::make()->markPaid($outTradeNo, (string)($payload['transaction_id'] ?? ''), $payload);
            if ($order && (string)($order['type'] ?? '') === 'vip') {
                OrderService::make()->fulfillVip($order);
            }
        } else {
            OrderService::make()->fail($outTradeNo, $payload);
        }

        return json(['code' => 'SUCCESS', 'message' => '成功']);
    }
}
