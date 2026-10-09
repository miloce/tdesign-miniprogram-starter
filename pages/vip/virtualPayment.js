import request from '~/api/request';
import { requestLoginCode } from '~/utils/auth';

const MIN_SDK_VERSION = '2.19.2';
const MIN_IOS_SYSTEM_VERSION = '15.0.0';
const MIN_IOS_WECHAT_VERSION = '8.0.68';

function safeCall(fn) {
  try {
    return typeof fn === 'function' ? fn() || {} : {};
  } catch (err) {
    return {};
  }
}

function compareVersion(v1, v2) {
  if (typeof v1 !== 'string' || typeof v2 !== 'string') return 0;
  const list1 = v1.split('.');
  const list2 = v2.split('.');
  const length = Math.max(list1.length, list2.length);

  for (let i = 0; i < length; i += 1) {
    const left = Number(list1[i] || 0);
    const right = Number(list2[i] || 0);
    if (left > right) return 1;
    if (left < right) return -1;
  }

  return 0;
}

function extractVersion(value) {
  const match = String(value || '').match(/\d+(?:\.\d+){0,2}/);
  return match ? match[0] : '';
}

function isIOSPlatform(context = {}) {
  const platform = String(context.platform || '').toLowerCase();
  const system = String(context.system || '').toLowerCase();
  return platform.includes('ios') || system.includes('ios') || system.includes('iphone') || system.includes('ipad');
}

function getVirtualPaymentContext() {
  const appBaseInfo = safeCall(() => wx.getAppBaseInfo());
  const deviceInfo = safeCall(() => wx.getDeviceInfo());
  const systemInfo = (!appBaseInfo.SDKVersion || !appBaseInfo.version || !deviceInfo.platform || !deviceInfo.system)
    ? safeCall(() => wx.getSystemInfoSync())
    : {};
  const sdkVersion = String(appBaseInfo.SDKVersion || systemInfo.SDKVersion || '');
  const platform = String(deviceInfo.platform || systemInfo.platform || '').toLowerCase();
  const system = String(deviceInfo.system || systemInfo.system || '');
  const wechatVersion = String(appBaseInfo.version || systemInfo.version || '');
  const systemVersion = extractVersion(system);

  return {
    sdkVersion,
    platform,
    system,
    systemVersion,
    wechatVersion,
    apiSupported: typeof wx.canIUse === 'function' && wx.canIUse('requestVirtualPayment'),
    runtimeSupported: typeof wx.requestVirtualPayment === 'function',
  };
}

function isBaseVirtualPaymentSupported(context) {
  const sdkSupported = compareVersion(context.sdkVersion, MIN_SDK_VERSION) >= 0;
  return Boolean(sdkSupported || context.apiSupported || context.runtimeSupported);
}

export function canUseVirtualPayment() {
  const context = getVirtualPaymentContext();
  if (!isBaseVirtualPaymentSupported(context)) return false;
  if (!isIOSPlatform(context)) return true;

  if (context.systemVersion && compareVersion(context.systemVersion, MIN_IOS_SYSTEM_VERSION) < 0) {
    return false;
  }
  if (context.wechatVersion && compareVersion(context.wechatVersion, MIN_IOS_WECHAT_VERSION) < 0) {
    return false;
  }

  return true;
}

export function ensureVirtualPaymentSupported() {
  const context = getVirtualPaymentContext();

  if (!isBaseVirtualPaymentSupported(context) || typeof wx.requestVirtualPayment !== 'function') {
    throw new Error('当前微信版本不支持小程序虚拟支付，请升级微信后重试');
  }

  if (isIOSPlatform(context)) {
    if (context.systemVersion && compareVersion(context.systemVersion, MIN_IOS_SYSTEM_VERSION) < 0) {
      throw new Error('iOS 端虚拟支付需 iOS 15 及以上，请升级系统后重试');
    }
    if (context.wechatVersion && compareVersion(context.wechatVersion, MIN_IOS_WECHAT_VERSION) < 0) {
      throw new Error('iOS 端虚拟支付需微信 8.0.68 及以上，请升级微信后重试');
    }
  }

  return context;
}

export async function createVirtualPaymentOrder(endpoint, payload = {}) {
  const context = getVirtualPaymentContext();
  const loginCode = await requestLoginCode();
  const res = await request(endpoint, 'POST', {
    ...payload,
    loginCode,
    clientContext: {
      platform: context.platform,
      system: context.system,
      systemVersion: context.systemVersion,
      wechatVersion: context.wechatVersion,
      sdkVersion: context.sdkVersion,
    },
  });

  return res.data || {};
}

function normalizeVirtualPaymentError(error, context = {}) {
  const normalized = error && typeof error === 'object'
    ? { ...error }
    : { errMsg: String(error || '') };

  const errCode = Number(normalized.errCode);
  const rawMessage = String(normalized.errMsg || normalized.message || '').trim();
  normalized.message = rawMessage || '虚拟支付失败';

  if (errCode === -15007) {
    normalized.message = '支付登录态已过期，请重新登录后再试';
    return normalized;
  }

  if (errCode === -15010 || errCode === -15014) {
    normalized.message = '虚拟商品未发布或未生效，请到微信虚拟支付后台检查';
    return normalized;
  }

  if (errCode === -15005 || errCode === -15006 || errCode === -15016) {
    normalized.message = '虚拟支付签名校验失败，请刷新后重试';
    return normalized;
  }

  if (errCode === -15008 || errCode === -15017 || errCode === -15019) {
    normalized.message = '微信虚拟支付商户状态异常，请联系管理员检查支付后台';
    return normalized;
  }

  if (errCode === -15012) {
    normalized.message = '微信支付通道异常，请重试一次';
    return normalized;
  }

  return normalized;
}

function normalizeWechatPaymentError(error) {
  const normalized = error && typeof error === 'object'
    ? { ...error }
    : { errMsg: String(error || '') };

  const rawMessage = String(normalized.errMsg || normalized.message || '').trim();
  normalized.message = rawMessage || '微信支付失败';
  return normalized;
}

function invokeWechatPayment(params = {}) {
  if (!params.timeStamp || !params.nonceStr || !params.package || !params.paySign) {
    return Promise.reject(new Error('微信支付参数不完整'));
  }

  return new Promise((resolve, reject) => {
    wx.requestPayment({
      timeStamp: String(params.timeStamp),
      nonceStr: params.nonceStr,
      package: params.package,
      signType: params.signType || 'RSA',
      paySign: params.paySign,
      success: resolve,
      fail(err) {
        reject(normalizeWechatPaymentError(err));
      },
    });
  });
}

export function invokeVirtualPayment(params = {}) {
  if (params.paymentChannel === 'wechat') {
    return invokeWechatPayment(params);
  }

  const context = ensureVirtualPaymentSupported();

  if (!params.signData || !params.paySig || !params.signature) {
    return Promise.reject(new Error('虚拟支付参数不完整'));
  }

  return new Promise((resolve, reject) => {
    wx.requestVirtualPayment({
      mode: params.mode || 'short_series_goods',
      signData: params.signData,
      paySig: params.paySig,
      signature: params.signature,
      success: resolve,
      fail(err) {
        reject(normalizeVirtualPaymentError(err, context));
      },
    });
  });
}

export function isVirtualPaymentCancelled(error) {
  const message = String((error && (error.errMsg || error.message)) || '').toLowerCase();
  return message.includes('cancel') || String((error && error.errCode) || '') === '-2';
}
