import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';

Page({
  data: {
    packages: [],
    selectedPackageId: '',
    agreedToAgreement: false,
    fromIntegralPage: false,
    bottomButtonText: '前往积分中心',
    showLogin: false,
  },

  onLoad(options) {
    const fromIntegralPage = options.from === 'integral';
    this.setData({
      fromIntegralPage,
      bottomButtonText: fromIntegralPage ? '返回积分中心' : '前往积分中心',
    });
    this.loadPackages();
  },

  async loadPackages() {
    const res = await request('/vip/packages');
    const packages = res.data.data || [];
    this.setData({
      packages,
      selectedPackageId: packages[0] ? packages[0].id : '',
    });
  },

  selectPackage(e) {
    this.setData({
      selectedPackageId: e.currentTarget.dataset.id,
    });
  },

  toggleAgreement() {
    this.setData({
      agreedToAgreement: !this.data.agreedToAgreement,
    });
  },

  openAgreement(e) {
    const type = e.currentTarget.dataset.type;
    wx.navigateTo({
      url: `/pages/agreement/index?type=${type || 'user'}`,
    });
  },

  async handlePay() {
    if (!isLoggedIn()) {
      this.setData({ showLogin: true });
      return;
    }

    if (!this.data.selectedPackageId) {
      wx.showToast({ title: '请选择套餐', icon: 'none' });
      return;
    }

    if (!this.data.agreedToAgreement) {
      wx.showToast({ title: '请先同意协议', icon: 'none' });
      return;
    }

    wx.showLoading({ title: '正在发起支付' });
    try {
      const res = await request('/vip/pay', 'POST', { packageId: this.data.selectedPackageId });
      const params = res.data.data;
      wx.hideLoading();

      await new Promise((resolve, reject) => {
        wx.requestPayment({
          timeStamp: params.timeStamp,
          nonceStr: params.nonceStr,
          package: params.package,
          signType: params.signType,
          paySign: params.paySign,
          success: resolve,
          fail: (err) => reject(err),
        });
      });

      const confirmRes = await this.confirmPayment(params.outTradeNo);
      if (confirmRes && confirmRes.userInfo) {
        this.updateStoredUser(confirmRes.userInfo);
      }

      wx.showToast({ title: '支付成功', icon: 'success' });
      setTimeout(() => wx.navigateBack(), 1500);
    } catch (err) {
      wx.hideLoading();
      const errMsg = (err && err.errMsg) || '';
      if (errMsg.includes('cancel')) {
        wx.showToast({ title: '已取消支付', icon: 'none' });
      } else {
        wx.showToast({ title: '支付失败，请重试', icon: 'none' });
      }
    }
  },

  async confirmPayment(outTradeNo) {
    if (!outTradeNo) {
      return this.refreshVipStatus();
    }

    for (let i = 0; i < 3; i += 1) {
      const res = await request('/vip/confirm', 'POST', { outTradeNo });
      const data = res.data.data || {};
      if (data.paid) {
        return data;
      }
      await new Promise((resolve) => setTimeout(resolve, 800));
    }

    return this.refreshVipStatus();
  },

  async refreshVipStatus() {
    const res = await request('/vip/status');
    return res.data.data || {};
  },

  updateStoredUser(userInfo) {
    const current = wx.getStorageSync('userinfo') || {};
    const next = {
      ...current,
      ...userInfo,
      people: userInfo.people !== undefined ? userInfo.people : current.people,
      isVip: userInfo.isVip !== undefined ? userInfo.isVip : current.isVip,
      is_vip: userInfo.is_vip !== undefined ? userInfo.is_vip : current.is_vip,
      vipInfo: userInfo.vipInfo || current.vipInfo,
    };
    wx.setStorageSync('userinfo', next);

    const app = getApp();
    if (app && app.globalData) {
      app.globalData.userInfo = next;
    }
  },

  handleBottomButton() {
    if (this.data.fromIntegralPage) {
      wx.navigateBack({ delta: 1 });
      return;
    }

    wx.navigateTo({
      url: '/pages/integral/index',
    });
  },

  onCloseLogin() {
    this.setData({ showLogin: false });
  },

  onLoginSuccess() {
    this.setData({ showLogin: false });
  },
});
