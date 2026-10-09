import Message from 'tdesign-miniprogram/message/index';
import request from '~/api/request';

const PAGE_SIZE = 10;

function normalizeTemplate(item) {
  return {
    ...item,
    category: item.category || '全部',
    title: item.title || '未命名模板',
    subtitle: item.subtitle || '',
  };
}

Page({
  data: {
    enable: false,
    keyword: '',
    activeCategory: '全部',
    categories: [],
    filteredTemplates: [],
    mainScrollTop: 0,
    page: 1,
    pageSize: PAGE_SIZE,
    loadingInitial: true,
    loadingMore: false,
    noMore: false,
  },

  onReady() {
    this.templateCache = {};
    this.searchTimer = null;
    this.loadSeq = 0;
    this.prefetchHandler = (data) => this.applyPrefetchTemplates(data);
    const app = getApp();
    if (app && app.eventBus) {
      app.eventBus.on('prefetch-data', this.prefetchHandler);
    }
    if (app && typeof app.getPrefetchData === 'function') {
      this.applyPrefetchTemplates(app.getPrefetchData());
    }
    this.loadTemplates(true);
  },

  onUnload() {
    clearTimeout(this.searchTimer);
    const app = getApp();
    if (app && app.eventBus && this.prefetchHandler) {
      app.eventBus.off('prefetch-data', this.prefetchHandler);
    }
  },

  applyPrefetchTemplates(prefetchData) {
    const templates = prefetchData && prefetchData.home && prefetchData.home.templates;
    if (!templates || this.data.keyword.trim() || this.data.activeCategory !== '全部') {
      return false;
    }

    const nextList = (templates.list || []).map(normalizeTemplate);
    if (!nextList.length) {
      return false;
    }

    nextList.forEach((item) => {
      this.templateCache[String(item.id)] = item;
    });
    this.setData({
      categories: templates.categories || this.data.categories,
      filteredTemplates: nextList,
      page: 2,
      pageSize: templates.pageSize || this.data.pageSize,
      loadingInitial: false,
      loadingMore: false,
      noMore: templates.hasMore === undefined ? nextList.length < this.data.pageSize : !templates.hasMore,
      enable: false,
    });
    return true;
  },

  async loadTemplates(reset = false) {
    if ((this.data.loadingMore && !reset) || (!reset && this.data.noMore)) {
      return;
    }

    const page = reset ? 1 : this.data.page;
    const keyword = this.data.keyword.trim();
    const category = this.data.activeCategory;
    const loadSeq = this.loadSeq + 1;
    this.loadSeq = loadSeq;

    try {
      this.setData(
        reset
          ? { loadingInitial: this.data.filteredTemplates.length === 0, loadingMore: false, noMore: false }
          : { loadingMore: true },
      );
      const res = await request('/code/templates', 'GET', {
        page,
        pageSize: this.data.pageSize,
        category,
        keyword,
      });
      if (loadSeq !== this.loadSeq) {
        return;
      }
      const { categories, list, hasMore } = res.data;
      const nextList = (list || []).map(normalizeTemplate);
      nextList.forEach((item) => {
        this.templateCache[String(item.id)] = item;
      });
      this.setData({
        categories: categories || this.data.categories,
        filteredTemplates: reset ? nextList : this.data.filteredTemplates.concat(nextList),
        page: page + 1,
        loadingInitial: false,
        loadingMore: false,
        noMore: hasMore === undefined ? nextList.length < this.data.pageSize : !hasMore,
        enable: false,
      }, reset ? () => this.resetMainScroll() : undefined);
    } catch (err) {
      if (loadSeq !== this.loadSeq) {
        return;
      }
      this.setData({ loadingInitial: false, loadingMore: false, enable: false });
      this.showMessage('模板加载失败，请稍后重试', 'error');
    }
  },

  onRefresh() {
    this.setData({ enable: true });
    this.loadTemplates(true);
  },

  onReachBottom() {
    this.loadTemplates();
  },

  onCategoryChange(e) {
    const activeCategory = e.currentTarget.dataset.category;
    if (activeCategory === this.data.activeCategory) {
      return;
    }
    this.templateCache = {};
    this.setData({
      activeCategory,
      filteredTemplates: [],
      page: 1,
      loadingInitial: true,
      noMore: false,
    }, () => this.loadTemplates(true));
  },

  onSearchInput(e) {
    this.setData({ keyword: e.detail.value });
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.onSearchConfirm(), 300);
  },

  onSearchConfirm() {
    this.templateCache = {};
    this.setData({
      filteredTemplates: [],
      page: 1,
      loadingInitial: true,
      noMore: false,
    }, () => this.loadTemplates(true));
  },

  resetMainScroll() {
    this.setData({ mainScrollTop: this.data.mainScrollTop === 0 ? 1 : 0 }, () => {
      wx.nextTick(() => {
        this.setData({ mainScrollTop: 0 });
      });
    });
  },

  onTemplateTap(e) {
    const { id } = e.currentTarget.dataset;
    const template = this.templateCache[String(id)];
    if (template && template.previewUrl) {
      const separator = template.previewUrl.includes('?') ? '&' : '?';
      const previewUrl = `${template.previewUrl}${separator}miniActions=1&templateId=${encodeURIComponent(template.id)}`;
      wx.navigateTo({
        url: `/pages/webview/index?title=${encodeURIComponent(template.title)}&url=${encodeURIComponent(previewUrl)}`,
      });
      return;
    }
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
