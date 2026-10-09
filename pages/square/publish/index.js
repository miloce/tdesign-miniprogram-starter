import config from '~/config';
import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';

const STORAGE_KEY = 'square_posts_cache';

const FALLBACK_TYPES = [
  { value: 'feedback', label: '反馈' },
  { value: 'suggestion', label: '建议' },
  { value: 'discussion', label: '讨论' },
];

Page({
  data: {
    tabs: FALLBACK_TYPES.map((item, index) => ({ ...item, selected: index === 0 })),
    content: '',
    maxLength: 500,
    imageList: [],
    maxImages: 9,
    publishMode: '公开可见',
    publishModeValue: 1,
    publishing: false,
    showLogin: false,
  },

  onLoad() {
    this.loadTypes();
  },

  async loadTypes() {
    try {
      const res = await request('/square/posts');
      const tabs = (res.data.types || FALLBACK_TYPES).map((item, index) => ({
        value: item.value,
        label: item.label,
        selected: index === 0,
      }));
      this.setData({ tabs });
    } catch (err) {
      this.setData({
        tabs: FALLBACK_TYPES.map((item, index) => ({ ...item, selected: index === 0 })),
      });
    }
  },

  selectTab(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      tabs: this.data.tabs.map((item, itemIndex) => ({
        ...item,
        selected: itemIndex === index,
      })),
    });
  },

  onInput(e) {
    this.setData({ content: e.detail.value });
  },

  chooseImage() {
    const remain = this.data.maxImages - this.data.imageList.length;
    if (remain <= 0) {
      wx.showToast({ title: '最多上传9张图片', icon: 'none' });
      return;
    }

    wx.chooseMedia({
      count: remain,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const nextImages = (res.tempFiles || [])
          .map((file) => file.tempFilePath)
          .filter(Boolean);
        this.setData({
          imageList: this.data.imageList.concat(nextImages).slice(0, this.data.maxImages),
        });
      },
    });
  },

  deleteImage(e) {
    const { index } = e.currentTarget.dataset;
    this.setData({
      imageList: this.data.imageList.filter((item, itemIndex) => itemIndex !== index),
    });
  },

  togglePublishMode() {
    const anonymous = this.data.publishModeValue === 2;
    this.setData({
      publishMode: anonymous ? '公开可见' : '匿名发布',
      publishModeValue: anonymous ? 1 : 2,
    });
  },

  async publish() {
    if (!isLoggedIn()) {
      this.setData({ showLogin: true });
      return;
    }

    const content = this.data.content.trim();
    const tab = this.data.tabs.find((item) => item.selected);
    if (!tab) {
      wx.showToast({ title: '请选择发布模块', icon: 'none' });
      return;
    }
    if (content.length < 5) {
      wx.showToast({ title: '内容至少5个字', icon: 'none' });
      return;
    }

    this.setData({ publishing: true });
    try {
      const images = await this.uploadImages();
      const res = await request('/square/posts', 'POST', {
        type: tab.value,
        content,
        images,
        tags: tab.label,
        publishMode: this.data.publishModeValue,
      });
      const cached = wx.getStorageSync(STORAGE_KEY) || [];
      wx.setStorageSync(STORAGE_KEY, [res.data, ...cached.filter((item) => item.id !== res.data.id)]);
      wx.showToast({ title: '发布成功', icon: 'none' });
      setTimeout(() => {
        wx.navigateBack();
      }, 600);
    } catch (err) {
      wx.showToast({ title: err.message || '发布失败', icon: 'none' });
    } finally {
      this.setData({ publishing: false });
    }
  },

  uploadImages() {
    const tokenString = wx.getStorageSync('access_token');
    const tasks = this.data.imageList.map((filePath) => {
      if (this.isUploadedImagePath(filePath)) {
        return Promise.resolve(filePath);
      }

      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: `${config.baseUrl}/code/upload`,
          filePath,
          name: 'file',
          formData: { type: 'image' },
          header: tokenString ? { Authorization: `Bearer ${tokenString}` } : {},
          success: (res) => {
            try {
              const payload = JSON.parse(res.data || '{}');
              if (payload.code === 200 && payload.data && payload.data.url) {
                resolve(payload.data.url);
                return;
              }
              reject(new Error(payload.message || '图片上传失败'));
            } catch (err) {
              reject(new Error('图片上传失败'));
            }
          },
          fail: () => reject(new Error('图片上传失败')),
        });
      });
    });

    return Promise.all(tasks).then((images) => images.filter(Boolean));
  },

  isUploadedImagePath(filePath) {
    if (!filePath) return false;
    if (filePath.startsWith('/uploads/')) return true;
    if (!/^https?:\/\//i.test(filePath)) return false;

    return !this.isTemporaryImagePath(filePath);
  },

  isTemporaryImagePath(filePath) {
    return /^wxfile:\/\//i.test(filePath)
      || /^https?:\/\/tmp\//i.test(filePath)
      || /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?\/__tmp__\//i.test(filePath)
      || /\/__tmp__\//i.test(filePath);
  },

  onCloseLogin() {
    this.setData({ showLogin: false });
  },

  onLoginSuccess() {
    this.setData({ showLogin: false });
    wx.showToast({ title: '已登录，请继续发布', icon: 'none' });
  },
});
