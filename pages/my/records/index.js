import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';

Page({
  data: {
    records: [],
    loading: true,
    empty: false,
    showLogin: false,
  },

  onShow() {
    if (!isLoggedIn()) {
      this.setData({
        records: [],
        loading: false,
        empty: true,
        showLogin: true,
      });
      return;
    }

    this.loadRecords();
  },

  async loadRecords() {
    this.setData({ loading: true });
    try {
      const res = await request('/code/records');
      const records = res.data.data || [];
      this.setData({
        records,
        empty: records.length === 0,
      });
    } finally {
      this.setData({ loading: false });
    }
  },

  onView(e) {
    const { link, title } = e.currentTarget.dataset;
    if (!link) return;

    wx.navigateTo({
      url: `/pages/webview/index?title=${encodeURIComponent(title || '已生成代码')}&url=${encodeURIComponent(link)}`,
    });
  },

  onCopy(e) {
    const { link } = e.currentTarget.dataset;
    if (!link) return;

    wx.setClipboardData({
      data: link,
      success() {
        wx.showToast({ title: '链接已复制', icon: 'success' });
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
    this.loadRecords();
  },
});
