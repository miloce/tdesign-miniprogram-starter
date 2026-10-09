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
      this.setData({ template: res.data });
      wx.setNavigationBarTitle({ title: res.data.title });
    } catch (err) {
      wx.showToast({ title: (err && err.message) || '模板加载失败', icon: 'none' });
    } finally {
      wx.hideLoading();
    }
  },

  onShareAppMessage() {
    const {template} = this.data;
    return {
      title: template && template.title ? `${template.title}｜云栈点` : '云栈点｜一键制作你的专属代码',
      path: template && template.id ? `/pages/template/detail?id=${template.id}` : '/pages/home/index',
    };
  },

  onShareTimeline() {
    const {template} = this.data;
    return {
      title: template && template.title ? `${template.title}｜云栈点` : '云栈点｜一键制作你的专属代码',
      query: template && template.id ? `id=${template.id}` : '',
    };
  },

  onPreview() {
    const { template } = this.data;
    if (!template) return;
    wx.navigateTo({
      url: `/pages/webview/index?title=${encodeURIComponent(template.title)}&url=${encodeURIComponent(
        template.previewUrl,
      )}`,
    });
  },

  onMake() {
    if (!this.data.template) return;
    wx.navigateTo({
      url: `/pages/make/index?id=${this.data.template.id}`,
    });
  },
});
