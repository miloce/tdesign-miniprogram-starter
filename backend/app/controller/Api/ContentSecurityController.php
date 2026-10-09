<?php

declare(strict_types=1);

namespace app\controller\Api;

use app\controller\BaseController;
use think\Response;
use Yzd\Services\AssistantScheduleService;
use Yzd\Services\ContentSecurityService;
use Yzd\Services\VirtualPaymentNotifyService;

final class ContentSecurityController extends BaseController
{
    public function mediaCallback(): Response
    {
        $echo = trim((string)request()->param('echostr', ''));
        if ($echo !== '') {
            return $this->signatureValid()
                ? Response::create($echo, 'html', 200)
                : Response::create('invalid signature', 'html', 403);
        }

        $raw = (string)file_get_contents('php://input');
        if (!$this->signatureValid()) {
            return Response::create('invalid signature', 'html', 403);
        }

        $payload = $this->parsePayload($raw);
        if (AssistantScheduleService::make()->looksLikeSubscribeMessageEvent($payload)) {
            AssistantScheduleService::make()->handleSubscribeMessageEvent($payload);
            return Response::create('success', 'html', 200);
        }

        if (VirtualPaymentNotifyService::make()->looksLikeVirtualPaymentEvent($payload)) {
            VirtualPaymentNotifyService::make()->handle($payload);
            return $this->virtualPaymentAck($raw);
        }

        ContentSecurityService::make()->handleMediaCallback($payload);

        return Response::create('success', 'html', 200);
    }

    private function signatureValid(): bool
    {
        $token = (string)(getenv('YZD_WECHAT_MESSAGE_TOKEN') ?: '');
        if ($token === '') {
            return false;
        }

        $signature = trim((string)request()->param('signature', ''));
        $timestamp = trim((string)request()->param('timestamp', ''));
        $nonce = trim((string)request()->param('nonce', ''));
        if ($signature === '' || $timestamp === '' || $nonce === '') {
            return false;
        }

        $items = [$token, $timestamp, $nonce];
        sort($items, SORT_STRING);
        return hash_equals(sha1(implode('', $items)), $signature);
    }

    private function parsePayload(string $raw): array
    {
        $raw = trim($raw);
        if ($raw === '') {
            return [];
        }

        $json = json_decode($raw, true);
        if (is_array($json)) {
            return $json;
        }

        $xml = @simplexml_load_string($raw, 'SimpleXMLElement', LIBXML_NOCDATA);
        if (!$xml instanceof \SimpleXMLElement) {
            return [];
        }

        $data = json_decode(json_encode($xml, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) ?: '[]', true);
        return is_array($data) ? $data : [];
    }

    private function virtualPaymentAck(string $raw): Response
    {
        $trimmed = ltrim($raw);
        if ($trimmed !== '' && str_starts_with($trimmed, '<')) {
            $xml = '<xml><ErrCode>0</ErrCode><ErrMsg><![CDATA[success]]></ErrMsg></xml>';
            return Response::create($xml, 'html', 200)->header(['Content-Type' => 'application/xml; charset=utf-8']);
        }

        return json(['ErrCode' => 0, 'ErrMsg' => 'success']);
    }
}
