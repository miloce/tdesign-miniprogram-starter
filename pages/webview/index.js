Page({
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

