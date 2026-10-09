import request from '~/api/request';

export function requestLoginCode() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(new Error('wx.login 未返回 code'));
        }
      },
      fail: reject,
    });
  });
}

function getClientId() {
  let clientId = wx.getStorageSync('clientId');
  if (!clientId) {
    clientId = `c_${Date.now()}_${Math.random().toString(16).slice(2)}_${Math.random().toString(16).slice(2)}`;
    wx.setStorageSync('clientId', clientId);
  }
  return clientId;
}

export function getStoredUser() {
  return wx.getStorageSync('userInfo') || null;
}

export function isLoggedIn() {
  return Boolean(wx.getStorageSync('access_token') && getStoredUser());
}

export async function loginWithWechat() {
  const code = await requestLoginCode();
  const res = await request('/wechat/login', 'GET', {
    code,
    clientId: getClientId(),
    _t: Date.now(),
  });

  if (res.code !== 200 || !res.data || !res.data.userInfo) {
    throw new Error(res.message || '微信登录失败');
  }

  const { userInfo, config, ad, token, accessToken } = res.data;

  wx.setStorageSync('access_token', accessToken || token);
  wx.setStorageSync('userInfo', userInfo);
  wx.setStorageSync('config', config || {});
  wx.setStorageSync('ad', ad || {});

  const app = getApp();
  if (app && app.globalData) {
    app.globalData.userInfo = userInfo;
    app.globalData.config = config || {};
    app.globalData.ad = ad || {};
  }
  if (app && typeof app.syncBackgroundFetchToken === 'function') {
    app.syncBackgroundFetchToken();
  }

  return userInfo;
}

export async function saveUserProfile(profile) {
  const res = await request('/user/profile', 'POST', profile);
  if (res.code !== 200 || !res.data || !res.data.userInfo) {
    throw new Error(res.message || '资料保存失败');
  }

  const { userInfo } = res.data;
  wx.setStorageSync('userInfo', userInfo);

  const app = getApp();
  if (app && app.globalData) {
    app.globalData.userInfo = userInfo;
  }

  return userInfo;
}

export function reportLoginTime() {
  const userInfo = getStoredUser();
  if (!userInfo || !userInfo.openid) return Promise.resolve();

  return request('/wechat/logintime', 'POST', {
    openid: userInfo.openid,
    _t: Date.now(),
  }).catch(() => null);
}
