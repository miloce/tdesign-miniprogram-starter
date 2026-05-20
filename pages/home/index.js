import Message from 'tdesign-miniprogram/message/index';
import request from '~/api/request';

Page({
  data: {
    enable: false,
    keyword: '',
    activeCategory: '全部',
    categories: [],
    templates: [],
    filteredTemplates: [],
    hotTemplates: [],
  },

  onReady() {
    this.loadTemplates();
  },

  async loadTemplates() {
    try {
      const res = await request('/code/templates');
      const { categories, list } = res.data.data;
      this.setData({
        categories,
        templates: list,
        filteredTemplates: list,
        hotTemplates: list.slice(0, 3),
      });
    } catch (err) {
      this.showMessage('模板加载失败，请稍后重试', 'error');
    }
  },

  onRefresh() {
    this.setData({ enable: true });
    this.loadTemplates().finally(() => {
      setTimeout(() => {
        this.setData({ enable: false });
      }, 500);
    });
  },

  onCategoryChange(e) {
    const activeCategory = e.currentTarget.dataset.category;
    this.setData({ activeCategory }, () => this.filterTemplates());
  },

  onSearchInput(e) {
    this.setData({ keyword: e.detail.value }, () => this.filterTemplates());
  },

  filterTemplates() {
    const { activeCategory, keyword, templates } = this.data;
    const normalizedKeyword = keyword.trim().toLowerCase();
    const filteredTemplates = templates.filter((item) => {
      const matchCategory = activeCategory === '全部' || item.category === activeCategory;
      const matchKeyword =
        !normalizedKeyword ||
        item.title.toLowerCase().includes(normalizedKeyword) ||
        item.subtitle.toLowerCase().includes(normalizedKeyword) ||
        item.tags.some((tag) => tag.toLowerCase().includes(normalizedKeyword));
      return matchCategory && matchKeyword;
    });
    this.setData({ filteredTemplates });
  },

  onTemplateTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/template/detail?id=${id}`,
    });
  },

  onMakeTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/make/index?id=${id}`,
    });
  },

  showMessage(content, theme = 'success') {
    Message[theme]({
      context: this,
      offset: [120, 32],
      duration: 2500,
      content,
    });
  },
});

