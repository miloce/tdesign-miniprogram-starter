// app.js
import createBus from './utils/eventBus';
import { getStoredUser, isLoggedIn, reportLoginTime } from './utils/auth';

const SHARE_TITLE = '云栈点｜一键制作你的专属代码';

/**
 * 取当前页面路径 + 查询参数，作为默认转发落地页，
 * 让好友点开后回到同一个页面而不是统一跳首页。
 */
function currentPageTarget() {
  const pages = typeof getCurrentPages === 'function' ? getCurrentPages() : [];
  const current = pages.length ? pages[pages.length - 1] : null;
  const route = current && current.route ? current.route : '';
  if (!route) {
    return { path: '/pages/home/index', query: '' };
  }

  const options = (current && current.options) || {};
  const query = Object.keys(options)
    .map((key) => `${key}=${encodeURIComponent(options[key])}`)
    .join('&');

  return {
    path: `/${route}${query ? `?${query}` : ''}`,
    query,
  };
}

/**
 * 全局注入转发能力：
 * 所有页面默认支持「转发给好友」与「分享到朋友圈」，页面自带实现的以页面为准。
 * 个别页面可声明 `disableShare: true` 主动退出（如 web-view 页受微信限制无法分享）。
 * 必须在 App() 之前执行，确保每个 Page 注册时都被装饰。
 */
const RAW_PAGE = Page;
const patchedPage = function patchedPage(options) {
  if (options && typeof options === 'object' && options.disableShare !== true) {
    if (typeof options.onShareAppMessage !== 'function') {
      options.onShareAppMessage = () => {
        const target = currentPageTarget();
        return { title: SHARE_TITLE, path: target.path };
      };
    }
    if (typeof options.onShareTimeline !== 'function') {
      // onShareTimeline 只接受 query（不含路径），打开后落到当前页面
      options.onShareTimeline = () => {
        const target = currentPageTarget();
        return { title: SHARE_TITLE, query: target.query };
      };
    }
  }
  return RAW_PAGE(options);
};

try {
  Object.defineProperty(globalThis, 'Page', {
    value: patchedPage,
    writable: true,
    configurable: true,
  });
} catch (err) {
  // 基础库已锁定 Page 时退回直接赋值
  globalThis.Page = patchedPage;
}

App({
  onLaunch() {
    this.globalData.userInfo = getStoredUser();
    this.initBackgroundFetch();
    this.initLogin();

    const updateManager = wx.getUpdateManager();

    updateManager.onCheckForUpdate((res) => {
      // console.log(res.hasUpdate)
    });

    updateManager.onUpdateReady(() => {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            updateManager.applyUpdate();
          }
        },
      });
    });
  },
  globalData: {
    userInfo: null,
    config: null,
    ad: null,
    prefetchData: null,
  },

  /** 全局事件总线 */
  eventBus: createBus(),

  async initLogin() {
    if (isLoggedIn()) {
      this.syncBackgroundFetchToken();
      setTimeout(() => {
        reportLoginTime();
      }, 10000);
    }
  },

  initBackgroundFetch() {
    if (typeof wx.onBackgroundFetchData === 'function') {
      wx.onBackgroundFetchData((res) => {
        this.setPrefetchData(this.parseBackgroundFetchData(res), res);
      });
    }

    if (typeof wx.getBackgroundFetchData === 'function') {
      wx.getBackgroundFetchData({
        fetchType: 'pre',
        success: (res) => {
          this.setPrefetchData(this.parseBackgroundFetchData(res), res);
        },
      });
    }
  },

  syncBackgroundFetchToken() {
    if (typeof wx.setBackgroundFetchToken !== 'function') {
      return;
    }

    const token = wx.getStorageSync('access_token');
    if (!token) {
      return;
    }

    wx.setBackgroundFetchToken({ token });
  },

  parseBackgroundFetchData(res = {}) {
    const raw = res.fetchedData || '';
    if (!raw) {
      return null;
    }

    try {
      const payload = typeof raw === 'string' ? JSON.parse(raw) : raw;
      if (payload && payload.code === 200 && payload.data) {
        return payload.data;
      }
      return payload;
    } catch (err) {
      return null;
    }
  },

  setPrefetchData(data, meta = {}) {
    if (!data || !data.home) {
      return;
    }

    this.globalData.prefetchData = {
      ...data,
      fetchedAt: meta.timeStamp || Date.now(),
      fetchedPath: meta.path || '',
      fetchedQuery: meta.query || '',
      fetchedScene: meta.scene || '',
    };
    this.eventBus.emit('prefetch-data', this.globalData.prefetchData);
  },

  getPrefetchData() {
    return this.globalData.prefetchData;
  },
});
