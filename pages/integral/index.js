import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';

Page({
  data: {
    activeTab: 'earn',
    isEarn: true,
    isRecord: false,
    isExchange: false,
    currentPoints: 0,
    isVip: false,
    isVipText: 'VIP会员可以无限制制作代码',
    paymentEnabled: true,
    refreshing: false,
    pointRecords: [],
    earnOptions: [],
    exchangeItems: [],
    selectedExchangeIndex: 0,
    selectedExchangeId: '',
    showLogin: false,
  },

  onLoad() {
    if (!this.ensureLogin()) return;
    this.loadIntegral();
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

  async loadIntegral() {
    const res = await request('/points/summary');
    const data = res.data.data;
    const firstExchange = data.exchangeItems[0] || {};

    this.setData({
      currentPoints: data.currentPoints,
      isVip: data.isVip,
      isVipText: data.isVip ? '您是VIP会员' : 'VIP会员可以无限制制作代码',
      paymentEnabled: data.paymentEnabled,
      pointRecords: data.records,
      earnOptions: data.earnOptions,
      exchangeItems: data.exchangeItems,
      selectedExchangeIndex: 0,
      selectedExchangeId: firstExchange.id || '',
    });
  },

  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
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
      content: '积分可通过签到、观看广告、邀请好友获得，可兑换制作次数或VIP会员。',
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

    if (this.data.currentPoints < item.points) {
      wx.showToast({ title: '积分不足', icon: 'none' });
      return;
    }

    const res = await request('/points/exchange', 'POST', { id: item.id });
    const data = res.data.data;
    wx.showToast({ title: '兑换成功', icon: 'success' });
    const userInfo = wx.getStorageSync('userinfo') || {};
    if (data.quota !== undefined) {
      userInfo.people = data.quota;
    }
    if (data.isVip !== undefined) {
      userInfo.isVip = data.isVip;
      userInfo.is_vip = data.isVip;
      userInfo.vipInfo = data.vipInfo || userInfo.vipInfo;
    }
    wx.setStorageSync('userinfo', userInfo);
    this.setData({
      currentPoints: data.currentPoints,
      isVip: data.isVip !== undefined ? data.isVip : this.data.isVip,
      isVipText: data.isVip ? '您是VIP会员' : 'VIP会员可以无限制制作代码',
      pointRecords: data.records,
    });
  },

  async handleEarnPoints(e) {
    const option = e.currentTarget.dataset.option;
    if (!option || !option.isActive) return;

    const res = await request('/points/earn', 'POST', { type: option.type });
    const data = res.data.data;
    wx.showToast({ title: data.message, icon: 'none' });
    this.setData({
      currentPoints: data.currentPoints,
      pointRecords: data.records,
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
