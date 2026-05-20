import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';

Page({
  data: {
    template: null,
    fields: [],
    form: {},
    config: {
      enableRewardAd: false,
      enablePayment: false,
      rewardAdUnitId: '',
      price: 0,
      user: null,
    },
    submitting: false,
    showLogin: false,
  },

  onLoad(options) {
    this.init(options.id);
  },

  async init(id) {
    wx.showLoading({ title: '加载中' });
    try {
      const [templateRes, configRes] = await Promise.all([
        request('/code/template-detail', 'GET', { id }),
        request('/code/config'),
      ]);
      const template = templateRes.data.data;
      const form = { ...template.defaults };
      this.setData({
        template,
        fields: template.fields.map((field) => ({
          ...field,
          value: form[field.key] || '',
        })),
        form,
        config: configRes.data.data,
      });
      wx.setNavigationBarTitle({ title: `制作${template.title}` });
    } finally {
      wx.hideLoading();
    }
  },

  onFormInput(e) {
    const { key, index } = e.currentTarget.dataset;
    this.setData({
      [`form.${key}`]: e.detail.value,
      [`fields[${index}].value`]: e.detail.value,
    });
  },

  validateForm() {
    const { template, form } = this.data;
    const missing = template.fields.find((field) => field.required && !String(form[field.key] || '').trim());
    if (missing) {
      wx.showToast({
        title: `请填写${missing.label}`,
        icon: 'none',
      });
      return false;
    }
    return true;
  },

  async onPreview() {
    if (!this.validateForm()) return;
    this.setData({ submitting: true });
    try {
      const res = await request('/code/create-preview', 'POST', {
        templateId: this.data.template.id,
        form: this.data.form,
      });
      wx.navigateTo({
        url: `/pages/webview/index?title=${encodeURIComponent('预览效果')}&url=${encodeURIComponent(
          res.data.data.previewUrl,
        )}`,
      });
    } finally {
      this.setData({ submitting: false });
    }
  },

  async onGenerate() {
    if (!this.validateForm() || this.data.submitting) return;
    if (!isLoggedIn()) {
      this.setData({ showLogin: true });
      return;
    }

    const passed = await this.passMonetizationGate();
    if (!passed) return;
    this.createFinalLink();
  },

  passMonetizationGate() {
    const { config } = this.data;
    if (config.user && config.user.isVip) {
      return Promise.resolve(true);
    }
    if (config.enableRewardAd && config.rewardAdUnitId) {
      return this.showRewardAd(config.rewardAdUnitId);
    }
    if (config.enablePayment && Number(config.price) > 0) {
      return this.showWechatPay(config.price);
    }
    return Promise.resolve(true);
  },

  showRewardAd(adUnitId) {
    return new Promise((resolve) => {
      const ad = wx.createRewardedVideoAd({ adUnitId });
      ad.onClose((res) => {
        resolve(Boolean(res && res.isEnded));
      });
      ad.onError(() => {
        wx.showToast({ title: '广告暂不可用', icon: 'none' });
        resolve(false);
      });
      ad.show().catch(() => {
        ad.load()
          .then(() => ad.show())
          .catch(() => resolve(false));
      });
    });
  },

  async showWechatPay(price) {
    const modalResult = await new Promise((resolve) => {
      wx.showModal({
        title: '付费生成',
        content: `当前模板需支付 ${price} 元。VIP会员可免费制作。`,
        confirmText: '微信支付',
        success: resolve,
        fail: () => resolve(false),
      });
    });
    if (!modalResult || !modalResult.confirm) return false;

    wx.showLoading({ title: '正在发起支付' });
    try {
      const res = await request('/code/pay', 'POST', {
        templateId: this.data.template.id,
      });
      const params = res.data.data || {};
      if (params.paid) {
        wx.hideLoading();
        return true;
      }
      wx.hideLoading();
      await new Promise((resolve, reject) => {
        wx.requestPayment({
          timeStamp: params.timeStamp,
          nonceStr: params.nonceStr,
          package: params.package,
          signType: params.signType,
          paySign: params.paySign,
          success: resolve,
          fail: reject,
        });
      });
      return this.confirmCodePayment(params.outTradeNo);
    } catch (err) {
      wx.hideLoading();
      const errMsg = (err && err.errMsg) || '';
      wx.showToast({ title: errMsg.includes('cancel') ? '已取消支付' : '支付失败', icon: 'none' });
      return false;
    }
  },

  async confirmCodePayment(outTradeNo) {
    if (!outTradeNo) return false;
    for (let i = 0; i < 3; i += 1) {
      const res = await request('/code/pay/confirm', 'POST', { outTradeNo });
      const data = res.data.data || {};
      if (data.paid) return true;
      await new Promise((resolve) => setTimeout(resolve, 800));
    }
    wx.showToast({ title: '支付确认中，请稍后重试', icon: 'none' });
    return false;
  },

  async createFinalLink() {
    this.setData({ submitting: true });
    wx.showLoading({ title: '生成中' });
    try {
      const res = await request('/code/generate', 'POST', {
        templateId: this.data.template.id,
        form: this.data.form,
      });
      const result = res.data.data;
      const payload = encodeURIComponent(JSON.stringify(result));
      wx.redirectTo({
        url: `/pages/result/index?id=${encodeURIComponent(result.id)}&data=${payload}`,
      });
    } finally {
      wx.hideLoading();
      this.setData({ submitting: false });
    }
  },

  onCloseLogin() {
    this.setData({ showLogin: false });
  },

  onLoginSuccess() {
    this.setData({ showLogin: false });
    wx.showToast({ title: '已登录，请继续制作', icon: 'none' });
  },
});
