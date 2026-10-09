import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';

Page({
  data: {
    orders: [],
    loading: true,
    empty: false,
    showLogin: false,
  },

  onShow() {
    if (!isLoggedIn()) {
      this.setData({
        orders: [],
        loading: false,
        empty: true,
        showLogin: true,
      });
      return;
    }

    this.loadOrders();
  },

  async loadOrders() {
    this.setData({ loading: true });
    try {
      const res = await request('/orders/list');
      const orders = res.data || [];
      this.setData({
        orders,
        empty: orders.length === 0,
      });
    } catch (err) {
      this.setData({ orders: [], empty: true });
      wx.showToast({ title: (err && err.message) || '订单加载失败', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  onCopy(e) {
    const { outtradeno } = e.currentTarget.dataset;
    if (!outtradeno) return;

    wx.setClipboardData({
      data: outtradeno,
      success() {
        wx.showToast({ title: '订单号已复制', icon: 'success' });
      },
    });
  },

  goHome() {
    wx.switchTab({
      url: '/pages/home/index',
    });
  },

  onCloseLogin() {
    this.setData({ showLogin: false });
  },

  onLoginSuccess() {
    this.setData({ showLogin: false });
    this.loadOrders();
  },
});
