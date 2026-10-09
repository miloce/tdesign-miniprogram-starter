Page({
  // web-view 页面受微信限制无法发起分享，主动退出全局分享注入
  disableShare: true,

  data: {
    url: '',
  },

  onLoad(options) {
    const url = decodeURIComponent(options.url || '');
    const title = decodeURIComponent(options.title || '预览效果');
    this.setData({ url });
    wx.setNavigationBarTitle({ title });
  },
});
