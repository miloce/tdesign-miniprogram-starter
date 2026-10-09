import request from '~/api/request';

Page({
  data: {
    loading: true,
    saving: false,
    appConfig: {
      enableRewardAd: false,
      enablePayment: false,
      rewardAdUnitId: '',
      price: 0,
      codeProductId: '',
      assistantProductId: '',
      vipPackages: [],
      exchangeItems: [],
    },
    exchangeTypeOptions: ['quota', 'vip'],
    userState: {
      points: 0,
      quota: 0,
      isVip: false,
    },
  },

  onShow() {
    this.loadConfig();
  },

  async loadConfig() {
    this.setData({ loading: true });
    try {
      const res = await request('/admin/config');
      const { data } = res;
      const appConfig = data.appConfig || {};
      this.setData({
        appConfig: {
          ...appConfig,
          vipPackages: (appConfig.vipPackages || []).map((item) => ({
            ...item,
            featuresText: Array.isArray(item.features) ? item.features.join('，') : item.features || '',
          })),
          exchangeItems: appConfig.exchangeItems || [],
        },
        userState: data.userState,
      });
    } catch (err) {
      wx.showToast({ title: '无管理员权限', icon: 'none' });
    } finally {
      this.setData({ loading: false });
    }
  },

  onRewardAdChange(e) {
    this.setData({
      appConfig: {
        ...this.data.appConfig,
        enableRewardAd: e.detail.value,
      },
    });
  },

  onPaymentChange(e) {
    this.setData({
      appConfig: {
        ...this.data.appConfig,
        enablePayment: e.detail.value,
      },
    });
  },

  onVipChange(e) {
    this.setData({
      userState: {
        ...this.data.userState,
        isVip: e.detail.value,
      },
    });
  },

  onRewardAdUnitChange(e) {
    this.setData({
      appConfig: {
        ...this.data.appConfig,
        rewardAdUnitId: e.detail.value,
      },
    });
  },

  onPriceChange(e) {
    this.setData({
      appConfig: {
        ...this.data.appConfig,
        price: e.detail.value,
      },
    });
  },

  onCodeProductIdChange(e) {
    this.setData({
      appConfig: {
        ...this.data.appConfig,
        codeProductId: e.detail.value,
      },
    });
  },

  onAssistantProductIdChange(e) {
    this.setData({
      appConfig: {
        ...this.data.appConfig,
        assistantProductId: e.detail.value,
      },
    });
  },

  onPointsChange(e) {
    this.setData({
      userState: {
        ...this.data.userState,
        points: e.detail.value,
      },
    });
  },

  onQuotaChange(e) {
    this.setData({
      userState: {
        ...this.data.userState,
        quota: e.detail.value,
      },
    });
  },

  onVipPackageChange(e) {
    const { index, field } = e.currentTarget.dataset;
    const vipPackages = this.data.appConfig.vipPackages.slice();
    vipPackages[Number(index)] = {
      ...vipPackages[Number(index)],
      [field]: e.detail.value,
    };
    this.setData({
      appConfig: {
        ...this.data.appConfig,
        vipPackages,
      },
    });
  },

  onExchangeItemChange(e) {
    const { index, field } = e.currentTarget.dataset;
    const exchangeItems = this.data.appConfig.exchangeItems.slice();
    let { value } = e.detail;
    if (field === 'type') {
      value = Number(value) === 1 ? 'vip' : 'quota';
    }
    exchangeItems[Number(index)] = {
      ...exchangeItems[Number(index)],
      [field]: value,
    };
    this.setData({
      appConfig: {
        ...this.data.appConfig,
        exchangeItems,
      },
    });
  },

  async onSave() {
    if (this.data.saving) return;

    this.setData({ saving: true });
    try {
      await request('/admin/config', 'POST', {
        appConfig: {
          ...this.data.appConfig,
          price: Number(this.data.appConfig.price) || 0,
          vipPackages: (this.data.appConfig.vipPackages || []).map((item) => ({
            ...item,
            currentPrice: String(item.currentPrice || '0'),
            originalPrice: String(item.originalPrice || ''),
            features: String(item.featuresText || '')
              .split(/[,，\n]/)
              .map((text) => text.trim())
              .filter(Boolean),
          })),
          exchangeItems: (this.data.appConfig.exchangeItems || []).map((item) => ({
            ...item,
            type: item.type || 'quota',
            points: Number(item.points) || 0,
            quota: Number(item.quota) || 0,
            days: Number(item.days) || 0,
          })),
        },
        userState: {
          ...this.data.userState,
          points: Number(this.data.userState.points) || 0,
          quota: Number(this.data.userState.quota) || 0,
        },
      });
      wx.showToast({ title: '保存成功', icon: 'success' });
      this.loadConfig();
    } catch (err) {
      wx.showToast({ title: err.message || '保存失败', icon: 'none' });
    } finally {
      this.setData({ saving: false });
    }
  },
});
