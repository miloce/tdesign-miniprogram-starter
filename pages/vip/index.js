import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';
import { createVirtualPaymentOrder, invokeVirtualPayment, isVirtualPaymentCancelled } from './virtualPayment';

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
    try {
      const res = await request('/vip/packages');
      const packages = res.data || [];
      this.setData({
        packages,
        selectedPackageId: packages[0] ? packages[0].id : '',
      });
    } catch (err) {
      wx.showToast({ title: (err && err.message) || '会员套餐加载失败', icon: 'none' });
    }
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
    const { type } = e.currentTarget.dataset;
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

    let loadingVisible = false;
    const hideLoading = () => {
      if (!loadingVisible) return;
      loadingVisible = false;
      wx.hideLoading();
    };

    wx.showLoading({ title: '正在发起支付' });
    loadingVisible = true;
    try {
      const params = await createVirtualPaymentOrder('/vip/pay', {
        packageId: this.data.selectedPackageId,
      });
      hideLoading();

      if (!params.paid) {
        await invokeVirtualPayment(params);
      }

      const confirmRes = await this.confirmPayment(params.outTradeNo);
      if (!confirmRes || confirmRes.paid === false) {
        wx.showToast({ title: '支付确认中，请稍后刷新', icon: 'none' });
        return;
      }
      if (confirmRes && confirmRes.userInfo) {
        this.updateStoredUser(confirmRes.userInfo);
      }

      wx.showToast({ title: '支付成功', icon: 'success' });
      setTimeout(() => wx.navigateBack(), 1500);
    } catch (err) {
      if (isVirtualPaymentCancelled(err)) {
        wx.showToast({ title: '已取消支付', icon: 'none' });
      } else {
        wx.showToast({ title: err.message || '支付失败，请重试', icon: 'none' });
      }
    } finally {
      hideLoading();
    }
  },

  async confirmPayment(outTradeNo) {
    if (!outTradeNo) {
      return this.refreshVipStatus();
    }

    return this.confirmPaymentWithRetry(outTradeNo, 3);
  },

  async confirmPaymentWithRetry(outTradeNo, retryCount) {
    const res = await request('/vip/confirm', 'POST', { outTradeNo });
    const data = res.data || {};
    if (data.paid) {
      return data;
    }

    if (retryCount <= 1) {
      return this.refreshVipStatus();
    }

    await this.wait(800);
    return this.confirmPaymentWithRetry(outTradeNo, retryCount - 1);
  },

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },

  async refreshVipStatus() {
    const res = await request('/vip/status');
    return res.data || {};
  },

  updateStoredUser(userInfo) {
    const current = wx.getStorageSync('userInfo') || {};
    const next = {
      ...current,
      ...userInfo,
      quota: userInfo.quota !== undefined ? userInfo.quota : current.quota,
      points: userInfo.points !== undefined ? userInfo.points : current.points,
      isVip: userInfo.isVip !== undefined ? userInfo.isVip : current.isVip,
      isAdmin: userInfo.isAdmin !== undefined ? userInfo.isAdmin : current.isAdmin,
      vipInfo: userInfo.vipInfo || current.vipInfo,
    };
    wx.setStorageSync('userInfo', next);

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
