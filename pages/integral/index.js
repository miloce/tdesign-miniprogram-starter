import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';

Page({
  data: {
    activeTab: 'earn',
    isEarn: true,
    isRecord: false,
    isExchange: false,
    points: 0,
    isVip: false,
    isVipText: 'VIP会员可以无限制制作代码',
    paymentEnabled: true,
    refreshing: false,
    pointRecords: [],
    earnOptions: [],
    exchangeItems: [],
    selectedExchangeIndex: 0,
    selectedExchangeId: '',
    rewardAdUnitId: '',
    earningType: '',
    showLogin: false,
  },

  onShow() {
    if (!this.ensureLogin()) return;
    this.loadIntegral();
  },

  ensureLogin() {
    if (isLoggedIn()) return true;

    this.setData({ showLogin: true });
    return false;
  },

  loadIntegral() {
    if (this.loadIntegralPromise) return this.loadIntegralPromise;

    this.loadIntegralPromise = request('/points/summary')
      .then((res) => {
        const data = res.data || {};
        const exchangeItems = Array.isArray(data.exchangeItems) ? data.exchangeItems : [];
        const firstExchange = exchangeItems[0] || {};
        this.setData({
          points: data.points || 0,
          isVip: Boolean(data.isVip),
          isVipText: data.isVip ? '您是VIP会员' : 'VIP会员可以无限制制作代码',
          paymentEnabled: Boolean(data.paymentEnabled),
          rewardAdUnitId: data.rewardAdUnitId || '',
          pointRecords: Array.isArray(data.records) ? data.records : [],
          earnOptions: Array.isArray(data.earnOptions) ? data.earnOptions : [],
          exchangeItems,
          selectedExchangeIndex: 0,
          selectedExchangeId: firstExchange.id || '',
        });
      })
      .catch((err) => {
        wx.showToast({ title: (err && err.message) || '积分数据加载失败', icon: 'none' });
      })
      .finally(() => {
        this.loadIntegralPromise = null;
      });

    return this.loadIntegralPromise;
  },

  switchTab(e) {
    const { tab } = e.currentTarget.dataset;
    this.setData({
      activeTab: tab,
      isEarn: tab === 'earn',
      isRecord: tab === 'record',
      isExchange: tab === 'exchange',
    });
  },

  showExchangeRules() {
    wx.showModal({
      title: '积分兑换规则',
      content: '积分可通过签到、观看激励广告（开启后）、邀请好友获得，可兑换制作次数或VIP会员。',
      showCancel: false,
    });
  },

  navigateToVipPage() {
    wx.navigateTo({
      url: '/pages/vip/index?from=integral',
    });
  },

  selectExchange(e) {
    const index = Number(e.currentTarget.dataset.index);
    const item = this.data.exchangeItems[index];
    if (!item) return;

    this.setData({
      selectedExchangeIndex: index,
      selectedExchangeId: item.id,
    });
  },

  async payPoints() {
    const item = this.data.exchangeItems[this.data.selectedExchangeIndex];
    if (!item) return;

    if (this.data.points < item.points) {
      wx.showToast({ title: '积分不足', icon: 'none' });
      return;
    }

    let data;
    try {
      const res = await request('/points/exchange', 'POST', { id: item.id });
      data = res.data;
    } catch (err) {
      wx.showToast({ title: (err && err.message) || '兑换失败', icon: 'none' });
      return;
    }
    wx.showToast({ title: '兑换成功', icon: 'success' });
    const userInfo = wx.getStorageSync('userInfo') || {};
    if (data.quota !== undefined) {
      userInfo.quota = data.quota;
    }
    if (data.isVip !== undefined) {
      userInfo.isVip = data.isVip;
      userInfo.vipInfo = data.vipInfo || userInfo.vipInfo;
    }
    if (data.points !== undefined) {
      userInfo.points = data.points;
    }
    wx.setStorageSync('userInfo', userInfo);
    this.setData({
      points: data.points,
      isVip: data.isVip !== undefined ? data.isVip : this.data.isVip,
      isVipText: data.isVip ? '您是VIP会员' : 'VIP会员可以无限制制作代码',
      pointRecords: data.records,
    });
  },

  async handleEarnPoints(e) {
    const { option } = e.currentTarget.dataset;
    if (!option || !option.isActive) {
      wx.showToast({ title: (option && option.disabledReason) || '该任务暂不可用', icon: 'none' });
      return;
    }

    if (this.data.earningType) return;

    try {
      this.setData({ earningType: option.type });
      if (option.type === 'watch_ad') {
        const completed = await this.showRewardAd();
        if (!completed) return;
      }
      await this.claimEarnPoints(option.type);
    } catch (err) {
      wx.showToast({ title: (err && err.message) || '领取失败', icon: 'none' });
    } finally {
      this.setData({ earningType: '' });
    }
  },

  async claimEarnPoints(type) {
    const res = await request('/points/earn', 'POST', {
      type,
      adCompleted: type === 'watch_ad' ? '1' : '',
    });
    const { data } = res;
    wx.showToast({ title: data.message, icon: 'none' });
    const userInfo = wx.getStorageSync('userInfo') || {};
    if (data.points !== undefined) {
      userInfo.points = data.points;
    }
    wx.setStorageSync('userInfo', userInfo);
    this.setData({
      points: data.points,
      pointRecords: data.records,
      earnOptions: data.earnOptions || this.data.earnOptions,
    });
  },

  showRewardAd() {
    const adUnitId = String(this.data.rewardAdUnitId || '').trim();
    if (!adUnitId) {
      wx.showToast({ title: '激励广告暂未配置', icon: 'none' });
      return Promise.resolve(false);
    }
    if (typeof wx.createRewardedVideoAd !== 'function') {
      wx.showToast({ title: '当前微信版本不支持激励广告', icon: 'none' });
      return Promise.resolve(false);
    }

    let loadingVisible = false;
    const showLoading = () => {
      loadingVisible = true;
      wx.showLoading({ title: '加载广告' });
    };
    const hideLoading = () => {
      if (!loadingVisible) return;
      loadingVisible = false;
      wx.hideLoading();
    };

    showLoading();
    return new Promise((resolve) => {
      const ad = wx.createRewardedVideoAd({ adUnitId });
      let settled = false;
      const finish = (completed, message = '') => {
        if (settled) return;
        settled = true;
        hideLoading();
        if (message) {
          wx.showToast({ title: message, icon: 'none' });
        }
        resolve(completed);
      };
      const onClose = (res) => {
        if (res && res.isEnded) {
          finish(true);
          return;
        }
        finish(false, '请完整观看广告后领取积分');
      };
      const onError = () => {
        finish(false, '广告暂不可用，请稍后重试');
      };

      ad.onClose(onClose);
      ad.onError(onError);
      ad.show()
        .then(() => hideLoading())
        .catch(() => {
          ad.load()
            .then(() => ad.show())
            .then(() => hideLoading())
            .catch(() => finish(false, '广告暂不可用，请稍后重试'));
        });
    });
  },

  onShareAppMessage() {
    return {
      title: '云栈点代码生成',
      path: '/pages/home/index',
    };
  },

  onCloseLogin() {
    this.setData({ showLogin: false });
  },

  onLoginSuccess() {
    this.setData({ showLogin: false });
    this.loadIntegral();
  },
});
