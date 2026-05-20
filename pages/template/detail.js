import request from '~/api/request';

Page({
  data: {
    template: null,
  },

  onLoad(options) {
    this.loadTemplate(options.id);
  },

  async loadTemplate(id) {
    wx.showLoading({ title: '加载中' });
    try {
      const res = await request('/code/template-detail', 'GET', { id });
      this.setData({ template: res.data.data });
      wx.setNavigationBarTitle({ title: res.data.data.title });
    } finally {
      wx.hideLoading();
    }
  },

  onPreview() {
    const { template } = this.data;
    wx.navigateTo({
      url: `/pages/webview/index?title=${encodeURIComponent(template.title)}&url=${encodeURIComponent(
        template.previewUrl,
      )}`,
    });
  },

  onMake() {
    wx.navigateTo({
      url: `/pages/make/index?id=${this.data.template.id}`,
    });
  },
});

