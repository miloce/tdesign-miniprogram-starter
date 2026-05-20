Component({
  options: {
    styleIsolation: 'shared',
  },
  properties: {
    navType: {
      type: String,
      value: 'title',
    },
    titleText: String,
  },
  data: {
    canGoBack: false,
  },
  lifetimes: {
    ready() {
      this.updateBackState();
    },
  },
  pageLifetimes: {
    show() {
      this.updateBackState();
    },
  },
  methods: {
    updateBackState() {
      const rootRoutes = ['pages/home/index', 'pages/my/index'];
      const pages = getCurrentPages();
      const current = pages[pages.length - 1];
      const route = current ? current.route : '';

      this.setData({
        canGoBack: route && !rootRoutes.includes(route),
      });
    },

    goBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        wx.navigateBack({ delta: 1 });
        return;
      }

      wx.switchTab({
        url: '/pages/home/index',
      });
    },

    searchTurn() {
      this.triggerEvent('search');
    },
  },
});
