import { loginWithWechat } from '../../utils/auth';

Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    visible: false,
    agreed: false,
    submitting: false,
    errMsg: '',
  },

  observers: {
    show(value) {
      this.setTabBarHidden(Boolean(value));
      this.setData({
        visible: Boolean(value),
        errMsg: '',
      });
    },
  },

  methods: {
    noop() {},

    setTabBarHidden(hidden) {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const tabBar = currentPage && currentPage.getTabBar ? currentPage.getTabBar() : null;

      if (tabBar && tabBar.setData) {
        tabBar.setData({ hidden });
      }
    },

    onMask() {
      if (this.data.submitting) return;
      this.close();
    },

    close() {
      this.setData({ visible: false, submitting: false });
      this.setTabBarHidden(false);
      this.triggerEvent('close');
    },

    toggleAgree() {
      this.setData({
        agreed: !this.data.agreed,
        errMsg: '',
      });
    },

    openUserAgreement() {
      wx.showModal({
        title: '用户协议',
        content: '当前为开发环境协议占位内容，正式上线时可替换为协议页面。',
        showCancel: false,
      });
    },

    openPrivacy() {
      wx.showModal({
        title: '隐私协议',
        content: '当前为开发环境协议占位内容，正式上线时可替换为协议页面。',
        showCancel: false,
      });
    },

    async onWechatLoginTap() {
      if (this.data.submitting) return;
      if (!this.data.agreed) {
        this.setData({ errMsg: '请先勾选并同意《用户协议》《隐私协议》' });
        return;
      }

      this.setData({ submitting: true, errMsg: '' });
      wx.showLoading({ title: '登录中' });
      try {
        const userInfo = await loginWithWechat();
        wx.hideLoading();
        wx.showToast({ title: '登录成功', icon: 'success' });
        this.setData({ visible: false, submitting: false });
        this.setTabBarHidden(false);
        this.triggerEvent('success', { userInfo });
      } catch (err) {
        wx.hideLoading();
        this.setData({
          submitting: false,
          errMsg: err.message || '登录失败，请重试',
        });
      }
    },
  },

  detached() {
    this.setTabBarHidden(false);
  },
});
