import config from '~/config';

const { baseUrl } = config;
const DEFAULT_TIMEOUT = 15000;
const ASSISTANT_TIMEOUT = 55000;

function requestError(message, code = 0, detail = null) {
  return { code, message, detail };
}

function request(url, method = 'GET', data = {}) {
  const header = {
    'content-type': 'application/json',
    // 有其他content-type需求加点逻辑判断处理即可
  };
  // 获取token，有就丢进请求头
  const tokenString = wx.getStorageSync('access_token');
  if (tokenString) {
    header.Authorization = `Bearer ${tokenString}`;
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      method,
      data,
      dataType: 'json', // 微信官方文档中介绍会对数据进行一次JSON.parse
      header,
      timeout: url === '/assistant/submit' ? ASSISTANT_TIMEOUT : DEFAULT_TIMEOUT,
      success(res) {
        const payload = res && res.statusCode ? res.data : res;
        // 接口统一以业务 code=200 视为成功
        if (payload && payload.code === 200) {
          resolve(payload);
        } else {
          if (payload && Number(payload.code) === 401) {
            wx.removeStorageSync('access_token');
            wx.removeStorageSync('userInfo');
          }
          // wx.request的特性，只要有响应就会走success回调，所以在这里判断状态，非200的均视为请求失败
          if (payload && typeof payload === 'object') {
            reject(payload);
            return;
          }
          const statusCode = Number((res && res.statusCode) || 0);
          const message = statusCode === 504 ? '服务处理超时，请稍后重试' : `服务请求失败${statusCode ? `（${statusCode}）` : ''}`;
          reject(requestError(message, statusCode, payload || res));
        }
      },
      fail(err) {
        const rawMessage = String((err && err.errMsg) || '');
        const message = rawMessage.includes('timeout') ? '请求超时，请检查网络后重试' : '网络连接失败，请检查网络后重试';
        reject(requestError(message, 0, err));
      },
    });
  });
}

// 导出请求和服务地址
export default request;
