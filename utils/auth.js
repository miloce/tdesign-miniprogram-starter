import request from '~/api/request';

function wxLogin() {
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

export function getStoredUser() {
  return wx.getStorageSync('userinfo') || null;
}

export function isLoggedIn() {
  return Boolean(wx.getStorageSync('access_token') && getStoredUser());
}

export async function loginWithWechat() {
  const code = await wxLogin();
  const res = await request('/wechat/login', 'GET', {
    code,
    _t: Date.now(),
  });

  if (res.code !== 1 || !res.data || !res.data.userinfo) {
    throw new Error(res.msg || '微信登录失败');
  }

  const { userinfo, config, ad } = res.data;
  const token = userinfo.openid || `user_${userinfo.id}`;

  wx.setStorageSync('access_token', token);
  wx.setStorageSync('userinfo', userinfo);
  wx.setStorageSync('config', config || {});
  wx.setStorageSync('ad', ad || {});

  const app = getApp();
  if (app && app.globalData) {
    app.globalData.userInfo = userinfo;
    app.globalData.config = config || {};
    app.globalData.ad = ad || {};
  }

  return userinfo;
}

export function reportLoginTime() {
  const userinfo = getStoredUser();
  if (!userinfo || !userinfo.openid) return Promise.resolve();

  return request('/wechat/logintime', 'POST', {
    openid: userinfo.openid,
    _t: Date.now(),
  }).catch(() => null);
}
