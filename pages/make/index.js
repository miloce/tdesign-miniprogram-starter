import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';
import config from '~/config';
import { createVirtualPaymentOrder, invokeVirtualPayment, isVirtualPaymentCancelled } from './virtualPayment';

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
    activeSheet: '',
    libraryFieldKey: '',
    libraryFieldIndex: -1,
    libraryLoading: false,
    textLibrary: [],
    imageLibrary: [],
    musicLibrary: [],
    libraryCategories: [],
    libraryCid: 0,
    libraryPage: 1,
    libraryHasMore: true,
    libraryLoadingMore: false,
    previewingMusicId: '',
    hasContentFields: false,
    hasSettingFields: false,
  },

  generationProof: {},

  onUnload() {
    this.stopMusicPreview();
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
      const template = templateRes.data;
      const fields = this.visibleFields(this.normalizeFields(template.fields || [], template.defaults || {}));
      const form = fields.reduce((values, field) => {
        values[field.key] = field.value;
        return values;
      }, {});
      this.setData({
        template,
        fields,
        form,
        config: configRes.data,
        hasContentFields: fields.some((field) => field.type === 'textarea'),
        hasSettingFields: fields.some((field) => field.type !== 'textarea'),
      });
      wx.setNavigationBarTitle({ title: `制作${template.title}` });
    } finally {
      wx.hideLoading();
    }
  },

  normalizeFields(fields, defaults) {
    return fields.map((field) => {
      const type = this.normalizeFieldType(field.type, field.key || field.name || '');
      const options = this.normalizeOptions(field.options || field.data || []);
      const fallback = field.default !== undefined ? field.default : defaults[field.key];
      const hasConfiguredValue = this.hasValue(fallback);
      let value = fallback !== undefined && fallback !== null ? this.normalizeTextValue(fallback) : '';
      if (type === 'slider' && value === '') {
        value = field.default !== undefined ? field.default : field.min || 0;
      }
      if (type === 'color' && value === '') {
        value = '#000000';
      }
      const normalized = {
        ...field,
        type,
        options: type === 'color' && options.length === 0 ? this.defaultColorOptions() : options,
        value,
        hasConfiguredValue,
        maxlength: this.normalizeMaxlength(field, type),
        count: this.getValueLength(value),
        canUseTextLibrary: type === 'textarea',
        canUseImageLibrary: type === 'image',
        canUseMusicLibrary: type === 'music',
      };
      if (type === 'select') {
        const selectedIndex = Math.max(0, options.findIndex((option) => String(option.value) === String(value)));
        normalized.selectedIndex = selectedIndex;
        normalized.optionLabels = options.map((option) => option.label);
        normalized.displayValue = options[selectedIndex] ? options[selectedIndex].label : '';
        if (value === '' && options[selectedIndex]) {
          normalized.value = options[selectedIndex].value;
        }
      }
      return normalized;
    });
  },

  visibleFields(fields) {
    const hasBackground = fields.some((field) => field.key === 'backgroundImg' && this.shouldShowField(field, fields));
    return fields.filter((field) => {
      if (field.key === 'opacity') {
        return hasBackground && this.shouldShowOpacityField(field);
      }
      return this.shouldShowField(field, fields);
    });
  },

  shouldShowOpacityField(field) {
    if (!field) return false;
    if (field.hidden === true || field.visible === false || field.isShow === false) return false;
    return field.expand === true || field.visible === true || field.isShow === true || field.required || field.hasConfiguredValue;
  },

  shouldShowField(field) {
    if (!field || !field.key) return false;
    if (field.hidden === true || field.visible === false || field.isShow === false) return false;
    if (field.expand === true || field.visible === true || field.isShow === true) return true;
    if (field.required) return true;

    const key = String(field.key);
    if (['fontSize', 'fontSpeed', 'txtType', 'sort', 'payType'].includes(key)) {
      return false;
    }

    if (field.type === 'textarea') {
      return field.hasConfiguredValue;
    }

    if (field.type === 'slider') {
      return field.hasConfiguredValue && key !== 'opacity';
    }

    return field.hasConfiguredValue;
  },

  normalizeFieldType(type = 'text', key = '') {
    const fieldKey = String(key).toLowerCase();
    if ((fieldKey === 'color' || fieldKey === 'fontcolor' || fieldKey.endsWith('color')) && ['text', 'input', ''].includes(type)) {
      return 'color';
    }
    const map = {
      input: 'text',
      input2: 'textarea',
      range: 'slider',
      picker: 'select',
      cover: 'image',
      background: 'image',
      text: 'text',
      colour: 'color',
      fontColor: 'color',
    };
    return map[type] || type;
  },

  normalizeMaxlength(field, type) {
    let fallback = 140;
    if (type === 'textarea') {
      fallback = 3000;
    } else if (['image', 'music', 'url'].includes(type)) {
      fallback = 1000;
    }
    const configuredMax = type === 'slider' ? field.max : '';
    const maxlength = Number(field.maxlength || configuredMax || fallback);
    return Number.isFinite(maxlength) && maxlength > 0 ? maxlength : fallback;
  },

  getValueLength(value) {
    if (value === undefined || value === null) return 0;
    return String(value).length;
  },

  hasValue(value) {
    if (value === undefined || value === null) return false;
    if (Array.isArray(value)) return value.length > 0;
    return String(value).trim() !== '';
  },

  normalizeTextValue(value) {
    if (typeof value !== 'string') return value;
    return value.replace(/\\r\\n/g, '\n').replace(/\\n/g, '\n').replace(/\\r/g, '\n');
  },

  normalizeOptions(options) {
    if (!Array.isArray(options)) return [];
    return options.map((option) => {
      if (option && typeof option === 'object') {
        const label = option.label || option.text || option.name || option.value || '';
        let value = label;
        if (option.value !== undefined) {
          value = option.value;
        } else if (option.id !== undefined) {
          value = option.id;
        }
        return { label: String(label), value: String(value) };
      }
      return { label: String(option), value: String(option) };
    });
  },

  defaultColorOptions() {
    return [
      { label: '黑色', value: '#000000' },
      { label: '深灰', value: '#333333' },
      { label: '玫红', value: '#E91E63' },
      { label: '正红', value: '#EF4444' },
      { label: '橙色', value: '#F97316' },
      { label: '金色', value: '#D97706' },
      { label: '绿色', value: '#16A34A' },
      { label: '蓝色', value: '#2563EB' },
      { label: '紫色', value: '#7C3AED' },
      { label: '白色', value: '#FFFFFF' },
    ];
  },

  onFormInput(e) {
    const { key, index } = e.currentTarget.dataset;
    const { value } = e.detail;
    this.setData({
      [`form.${key}`]: value,
      [`fields[${index}].value`]: value,
      [`fields[${index}].count`]: this.getValueLength(value),
    });
  },

  onShowFieldTip(e) {
    const { tip, label, type } = e.currentTarget.dataset;
    const content = tip || this.defaultFieldTip(type, label);
    if (!content) return;
    wx.showModal({
      title: '',
      content,
      showCancel: false,
      confirmText: '确定',
      confirmColor: '#1f6f78',
    });
  },

  defaultFieldTip(type = '', label = '') {
    if (type === 'slider') {
      return `用于调整${label || '该项'}的数值效果，左右滑动即可预览不同强度。`;
    }
    if (type === 'image') {
      return `用于设置${label || '图片'}，可以从图库选择，也可以上传或填写图片链接。`;
    }
    if (type === 'music') {
      return `用于设置${label || '音乐'}，可以先试听，再选择使用。`;
    }
    if (type === 'color') {
      return `用于设置${label || '文字颜色'}，点击预设色块即可切换。`;
    }
    if (type === 'textarea') {
      return `用于填写${label || '内容'}，支持多行文案，也可以从文案库选择。`;
    }
    return '';
  },

  onSelectChange(e) {
    const { key, index } = e.currentTarget.dataset;
    const selectedIndex = Number(e.detail.value) || 0;
    const field = this.data.fields[index] || {};
    const option = (field.options || [])[selectedIndex] || {};
    const value = option.value || '';
    this.setData({
      [`form.${key}`]: value,
      [`fields[${index}].value`]: value,
      [`fields[${index}].selectedIndex`]: selectedIndex,
      [`fields[${index}].displayValue`]: option.label || value,
    });
  },

  onColorSelect(e) {
    const { key, index, value } = e.currentTarget.dataset;
    if (!key || value === undefined) return;
    this.setFieldValue(index, key, value);
  },

  setFieldValue(index, key, value) {
    this.setData({
      [`form.${key}`]: value,
      [`fields[${index}].value`]: value,
      [`fields[${index}].count`]: this.getValueLength(value),
    });
  },

  onClearField(e) {
    const { key, index } = e.currentTarget.dataset;
    this.setFieldValue(index, key, '');
  },

  async onInlineRandomText(e) {
    const { key, index } = e.currentTarget.dataset;
    if (!key) return;
    wx.showLoading({ title: '换一换' });
    try {
      const res = await request('/apiv2/getRandText');
      const list = res.data || [];
      const content = list[0] && list[0].content ? list[0].content : '';
      if (content) {
        this.setFieldValue(index, key, this.normalizeTextValue(content));
      } else {
        wx.showToast({ title: '暂无可用文案', icon: 'none' });
      }
    } finally {
      wx.hideLoading();
    }
  },

  async openTextLibrary(e) {
    const { key, index } = e.currentTarget.dataset;
    this.setData({
      activeSheet: 'text',
      libraryFieldKey: key,
      libraryFieldIndex: Number(index),
      libraryCid: 0,
      libraryPage: 1,
      libraryHasMore: true,
      libraryLoadingMore: false,
    });
    await this.loadLibrary('text', true);
  },

  async openImageLibrary(e) {
    const { key, index } = e.currentTarget.dataset;
    this.setData({
      activeSheet: 'image',
      libraryFieldKey: key,
      libraryFieldIndex: Number(index),
      libraryCid: 0,
      libraryPage: 1,
      libraryHasMore: true,
      libraryLoadingMore: false,
    });
    await this.loadLibrary('image', true);
  },

  async openMusicLibrary(e) {
    const { key, index } = e.currentTarget.dataset;
    this.setData({
      activeSheet: 'music',
      libraryFieldKey: key,
      libraryFieldIndex: Number(index),
      libraryCid: 0,
      libraryPage: 1,
      libraryHasMore: true,
      libraryLoadingMore: false,
    });
    await this.loadLibrary('music', true);
  },

  closeLibrary() {
    this.stopMusicPreview();
    this.setData({
      activeSheet: '',
      libraryFieldKey: '',
      libraryFieldIndex: -1,
      libraryCategories: [],
    });
  },

  noop() {},

  async loadLibrary(type, reset = false) {
    const dataKey = `${type}Library`;
    if (!reset && (this.data[dataKey] || []).length && this.data.libraryPage === 1) return;
    this.setData({ libraryLoading: true });
    try {
      const endpoint = {
        text: '/code/text-library',
        image: '/code/image-library',
        music: '/code/music-library',
      }[type];
      const page = reset ? 1 : this.data.libraryPage;
      const res = await request(endpoint, 'GET', {
        cid: this.data.libraryCid,
        page,
      });
      const list = this.normalizeLibraryItems(type, (res.data && res.data.list) || []);
      const categories = (res.data && res.data.categories) || this.data.libraryCategories;
      const current = reset ? [] : this.data[dataKey] || [];
      this.setData({
        [dataKey]: current.concat(list),
        libraryCategories: categories,
        libraryPage: page,
        libraryHasMore: list.length >= 8,
        libraryLoadingMore: false,
      });
    } finally {
      this.setData({ libraryLoading: false });
    }
  },

  normalizeLibraryItems(type, list) {
    if (!Array.isArray(list)) return [];
    return list.map((item) => ({
      ...item,
      idText: String(item.id),
      desc: type === 'music' ? item.lyric || item.artist || item.note || '' : item.content || item.title || item.note || '',
    }));
  },

  async onSelectLibraryCategory(e) {
    const cid = Number(e.currentTarget.dataset.cid) || 0;
    const type = this.data.activeSheet;
    if (!type) return;
    const dataKey = `${type}Library`;
    this.setData({
      libraryCid: cid,
      libraryPage: 1,
      libraryHasMore: true,
      libraryLoadingMore: false,
      [dataKey]: [],
    });
    await this.loadLibrary(type, true);
  },

  async onLoadMoreLibrary() {
    const type = this.data.activeSheet;
    if (!type || this.data.libraryLoading || this.data.libraryLoadingMore || !this.data.libraryHasMore) return;
    this.setData({
      libraryPage: this.data.libraryPage + 1,
      libraryLoadingMore: true,
    });
    await this.loadLibrary(type, false);
  },

  async onRandomText() {
    if (this.data.libraryLoading) return;
    this.setData({ libraryLoading: true });
    try {
      const res = await request('/apiv2/getRandText');
      const list = res.data || [];
      if (list[0] && list[0].content) {
        const { libraryFieldIndex, libraryFieldKey } = this.data;
        this.setFieldValue(libraryFieldIndex, libraryFieldKey, this.normalizeTextValue(list[0].content));
        this.closeLibrary();
      }
    } finally {
      this.setData({ libraryLoading: false });
    }
  },

  onSelectTextItem(e) {
    const { content } = e.currentTarget.dataset;
    const { libraryFieldIndex, libraryFieldKey } = this.data;
    if (libraryFieldIndex < 0 || !libraryFieldKey) return;
    this.setFieldValue(libraryFieldIndex, libraryFieldKey, this.normalizeTextValue(content || ''));
    this.closeLibrary();
  },

  onSelectImageItem(e) {
    const { url } = e.currentTarget.dataset;
    const { libraryFieldIndex, libraryFieldKey } = this.data;
    if (libraryFieldIndex < 0 || !libraryFieldKey || !url) return;
    this.setFieldValue(libraryFieldIndex, libraryFieldKey, url);
    this.closeLibrary();
  },

  onSelectMusicItem(e) {
    const { url } = e.currentTarget.dataset;
    const { libraryFieldIndex, libraryFieldKey } = this.data;
    if (libraryFieldIndex < 0 || !libraryFieldKey) return;
    if (!url) {
      wx.showToast({ title: '请在下方输入音乐链接', icon: 'none' });
      this.closeLibrary();
      return;
    }
    this.setFieldValue(libraryFieldIndex, libraryFieldKey, url);
    this.stopMusicPreview();
    this.closeLibrary();
  },

  onPreviewMusic(e) {
    const { id, url } = e.currentTarget.dataset;
    if (!url) {
      wx.showToast({ title: '暂无可试听链接', icon: 'none' });
      return;
    }
    if (this.data.previewingMusicId === String(id)) {
      this.stopMusicPreview();
      return;
    }
    this.stopMusicPreview(false);
    this.musicPreviewAudio = wx.createInnerAudioContext();
    this.musicPreviewAudio.src = url;
    this.musicPreviewAudio.obeyMuteSwitch = false;
    this.musicPreviewAudio.onEnded(() => this.setData({ previewingMusicId: '' }));
    this.musicPreviewAudio.onStop(() => this.setData({ previewingMusicId: '' }));
    this.musicPreviewAudio.onError(() => {
      this.setData({ previewingMusicId: '' });
      wx.showToast({ title: '试听失败', icon: 'none' });
    });
    this.setData({ previewingMusicId: String(id) });
    this.musicPreviewAudio.play();
  },

  stopMusicPreview(updateState = true) {
    if (this.musicPreviewAudio) {
      this.musicPreviewAudio.stop();
      this.musicPreviewAudio.destroy();
      this.musicPreviewAudio = null;
    }
    if (updateState) {
      this.setData({ previewingMusicId: '' });
    }
  },

  onClearAsset(e) {
    const { key, index } = e.currentTarget.dataset;
    this.setFieldValue(index, key, '');
  },

  onPreviewAsset(e) {
    const { url } = e.currentTarget.dataset;
    if (!url) return;
    wx.previewImage({ urls: [url], current: url });
  },

  onChooseLibraryImage() {
    const { libraryFieldIndex, libraryFieldKey } = this.data;
    if (libraryFieldIndex < 0 || !libraryFieldKey) return;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: async (res) => {
        const file = res.tempFiles && res.tempFiles[0];
        if (!file || !file.tempFilePath) return;
        const url = await this.uploadTemplateAsset(file.tempFilePath, 'image');
        this.setFieldValue(libraryFieldIndex, libraryFieldKey, url);
        this.setData({
          libraryCid: 999,
          libraryPage: 1,
          libraryHasMore: true,
          libraryLoadingMore: false,
          imageLibrary: [],
        });
        await this.loadLibrary('image', true);
        wx.showToast({ title: '已上传并选用', icon: 'none' });
      },
    });
  },

  onChooseImage(e) {
    const { key, index } = e.currentTarget.dataset;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const file = res.tempFiles && res.tempFiles[0];
        if (file && file.tempFilePath) {
          this.uploadTemplateAsset(file.tempFilePath, 'image').then((url) => this.setFieldValue(index, key, url));
        }
      },
    });
  },

  onChooseMusic(e) {
    const { key, index } = e.currentTarget.dataset;
    wx.chooseMessageFile({
      count: 1,
      type: 'file',
      extension: ['mp3', 'm4a', 'wav', 'aac', 'ogg'],
      success: (res) => {
        const file = res.tempFiles && res.tempFiles[0];
        if (file && file.path) {
          this.uploadTemplateAsset(file.path, 'music').then((url) => this.setFieldValue(index, key, url));
        }
      },
    });
  },

  uploadTemplateAsset(filePath, type) {
    if (!isLoggedIn()) {
      this.setData({ showLogin: true });
      return Promise.reject(new Error('请先登录'));
    }
    wx.showLoading({ title: '上传中' });
    return new Promise((resolve, reject) => {
      const tokenString = wx.getStorageSync('access_token');
      wx.uploadFile({
        url: `${config.baseUrl}/code/upload`,
        filePath,
        name: 'file',
        formData: { type },
        header: tokenString ? { Authorization: `Bearer ${tokenString}` } : {},
        success: (res) => {
          wx.hideLoading();
          let payload = {};
          try {
            payload = JSON.parse(res.data || '{}');
          } catch (err) {
            reject(err);
            return;
          }
          if (payload.code === 200 && payload.data && payload.data.url) {
            resolve(payload.data.url);
            return;
          }
          wx.showToast({ title: payload.message || '上传失败', icon: 'none' });
          reject(payload);
        },
        fail: (err) => {
          wx.hideLoading();
          wx.showToast({ title: '上传失败', icon: 'none' });
          reject(err);
        },
      });
    });
  },

  validateForm() {
    const { fields, form } = this.data;
    const missing = fields.find((field) => field.required && !String(form[field.key] || '').trim());
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
    if (!isLoggedIn()) {
      this.setData({ showLogin: true });
      return;
    }
    this.setData({ submitting: true });
    try {
      const res = await request('/code/create-preview', 'POST', {
        templateId: this.data.template.id,
        form: this.data.form,
      });
      wx.navigateTo({
        url: `/pages/webview/index?title=${encodeURIComponent('预览效果')}&url=${encodeURIComponent(
          res.data.previewUrl,
        )}`,
      });
    } catch (err) {
      wx.showToast({ title: (err && err.message) || '内容检测未通过', icon: 'none' });
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

    this.generationProof = {};
    const passed = await this.passMonetizationGate();
    if (!passed) return;
    this.createFinalLink();
  },

  passMonetizationGate() {
    const { config } = this.data;
    if (config.user && config.user.isVip) {
      return Promise.resolve(true);
    }
    if (config.user && Number(config.user.quota) > 0) {
      return Promise.resolve(true);
    }
    if (config.enableRewardAd && config.rewardAdUnitId) {
      return this.showRewardAd(config.rewardAdUnitId);
    }
    if (config.enablePayment && Number(config.price) > 0) {
      return this.showVirtualPayment(config.price);
    }
    return Promise.resolve(true);
  },

  showRewardAd(adUnitId) {
    return new Promise((resolve) => {
      const ad = wx.createRewardedVideoAd({ adUnitId });
      ad.onClose(async (res) => {
        if (!res || !res.isEnded) {
          resolve(false);
          return;
        }
        try {
          const claimRes = await request('/code/reward/claim', 'POST', {
            templateId: this.data.template.id,
          });
          this.generationProof = {
            rewardToken: claimRes.data && claimRes.data.rewardToken,
          };
          resolve(Boolean(this.generationProof.rewardToken));
        } catch (err) {
          wx.showToast({ title: '广告权益确认失败', icon: 'none' });
          resolve(false);
        }
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

  async showVirtualPayment(price) {
    const modalResult = await new Promise((resolve) => {
      wx.showModal({
        title: '付费生成',
        content: `当前模板需支付 ${price} 元。VIP会员可免费制作。`,
        confirmText: '立即支付',
        success: resolve,
        fail: () => resolve(false),
      });
    });
    if (!modalResult || !modalResult.confirm) return false;

    let loadingVisible = false;
    const hideLoading = () => {
      if (!loadingVisible) return;
      loadingVisible = false;
      wx.hideLoading();
    };

    wx.showLoading({ title: '正在发起支付' });
    loadingVisible = true;
    try {
      const params = await createVirtualPaymentOrder('/code/pay', {
        templateId: this.data.template.id,
      });
      if (params.paid) {
        hideLoading();
        if (params.outTradeNo) {
          this.generationProof = { outTradeNo: params.outTradeNo };
        }
        return true;
      }
      hideLoading();
      await invokeVirtualPayment(params);
      const paid = await this.confirmCodePayment(params.outTradeNo);
      if (paid) {
        this.generationProof = { outTradeNo: params.outTradeNo };
      }
      return paid;
    } catch (err) {
      wx.showToast({
        title: isVirtualPaymentCancelled(err) ? '已取消支付' : err.message || '支付失败',
        icon: 'none',
      });
      return false;
    } finally {
      hideLoading();
    }
  },

  async confirmCodePayment(outTradeNo) {
    if (!outTradeNo) return false;
    return this.confirmCodePaymentWithRetry(outTradeNo, 3);
  },

  async confirmCodePaymentWithRetry(outTradeNo, retryCount) {
    const res = await request('/code/pay/confirm', 'POST', { outTradeNo });
    const data = res.data || {};
    if (data.paid) return true;

    if (retryCount <= 1) {
      wx.showToast({ title: '支付确认中，请稍后重试', icon: 'none' });
      return false;
    }

    await this.wait(800);
    return this.confirmCodePaymentWithRetry(outTradeNo, retryCount - 1);
  },

  wait(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  },

  async createFinalLink() {
    this.setData({ submitting: true });
    wx.showLoading({ title: '生成中' });
    try {
      const res = await request('/code/generate', 'POST', {
        templateId: this.data.template.id,
        form: this.data.form,
        outTradeNo: this.generationProof.outTradeNo || '',
        rewardToken: this.generationProof.rewardToken || '',
      });
      const result = res.data;
      if (result.userInfo) {
        this.updateStoredUser(result.userInfo);
        this.setData({
          'config.user': result.userInfo,
        });
      }
      const payload = encodeURIComponent(JSON.stringify(result));
      wx.redirectTo({
        url: `/pages/result/index?id=${encodeURIComponent(result.id)}&data=${payload}`,
      });
    } catch (err) {
      wx.showToast({ title: (err && err.message) || '生成失败，请稍后重试', icon: 'none' });
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
    request('/code/config').then((res) => {
      this.setData({ config: res.data });
    }).catch(() => null);
    wx.showToast({ title: '已登录，请继续制作', icon: 'none' });
  },

  updateStoredUser(userInfo) {
    const current = wx.getStorageSync('userInfo') || {};
    const next = {
      ...current,
      ...userInfo,
    };
    wx.setStorageSync('userInfo', next);
    const app = getApp();
    if (app && app.globalData) {
      app.globalData.userInfo = next;
    }
  },
});
