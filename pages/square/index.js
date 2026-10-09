import request from '~/api/request';

const STORAGE_KEY = 'square_posts_cache';

const FALLBACK_TYPES = [
  { value: 'feedback', label: '反馈', status: '待处理', icon: 'chat', short: '反' },
  { value: 'suggestion', label: '建议', status: '待采纳', icon: 'app', short: '建' },
  { value: 'discussion', label: '讨论', status: '交流中', icon: 'usergroup', short: '论' },
];

function typeMeta(type) {
  const normalizedType = type === 'template' ? 'suggestion' : type;
  return FALLBACK_TYPES.find((item) => item.value === normalizedType) || FALLBACK_TYPES[0];
}

function formatTime(value) {
  if (!value) return '刚刚';

  const timestamp = new Date(value).getTime();
  if (!timestamp) return '刚刚';

  const diff = Date.now() - timestamp;
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) return '刚刚';
  if (diff < hour) return `${Math.floor(diff / minute)}分钟前`;
  if (diff < day) return `${Math.floor(diff / hour)}小时前`;

  const date = new Date(timestamp);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const dayText = String(date.getDate()).padStart(2, '0');
  return `${month}-${dayText}`;
}

function normalizePost(post) {
  const meta = typeMeta(post.type || 'feedback');
  const images = Array.isArray(post.images) ? post.images.filter(Boolean) : [];
  return {
    ...post,
    type: post.type === 'template' ? 'suggestion' : post.type || meta.value,
    typeLabel: post.typeLabel || meta.label,
    status: post.status || meta.status,
    icon: meta.icon,
    short: meta.short,
    images,
    tags: post.tags || '',
    timeText: formatTime(post.createdAt),
    likes: Number(post.likes || 0),
    liked: !!post.liked,
    superviseCount: Number(post.superviseCount || 0),
    supervised: !!post.supervised,
    commentCount: Number(post.commentCount || post.comments || 0),
  };
}

function normalizeTypes(types) {
  const next = (types && types.length ? types : FALLBACK_TYPES).map((item) => ({
    ...item,
    short: item.short || typeMeta(item.value).short,
  }));
  return [{ value: 'all', label: '全部', icon: 'view-module', short: '全' }, ...next];
}

Page({
  data: {
    loading: false,
    activeType: 'all',
    categories: normalizeTypes(FALLBACK_TYPES),
    posts: [],
    filteredPosts: [],
  },

  onShow() {
    this.loadPosts();
  },

  onPullDownRefresh() {
    this.loadPosts().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  async loadPosts() {
    this.setData({ loading: true });

    try {
      const res = await request('/square/posts');
      const posts = (res.data.list || []).map(normalizePost);
      this.setData({
        categories: normalizeTypes(res.data.types),
        posts,
      }, () => this.filterPosts());
      wx.setStorageSync(STORAGE_KEY, posts);
    } catch (err) {
      const cached = (wx.getStorageSync(STORAGE_KEY) || []).map(normalizePost);
      this.setData({ posts: cached }, () => this.filterPosts());
      if (!cached.length) {
        wx.showToast({ title: '广场内容加载失败', icon: 'none' });
      }
    } finally {
      this.setData({ loading: false });
    }
  },

  filterPosts() {
    const { activeType, posts } = this.data;
    const filteredPosts = activeType === 'all' ? posts : posts.filter((post) => post.type === activeType);
    this.setData({ filteredPosts });
  },

  onTypeTap(e) {
    const { type } = e.currentTarget.dataset;
    this.setData({ activeType: type }, () => this.filterPosts());
  },

  onPublish() {
    wx.navigateTo({
      url: '/pages/square/publish/index',
    });
  },

  onPostTap(e) {
    const { id } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/square/detail/index?id=${id}`,
    });
  },

  onCommentTap(e) {
    this.onPostTap(e);
  },

  async onLikeTap(e) {
    const { id } = e.currentTarget.dataset;
    await this.togglePost(id, '/square/posts/like');
  },

  async onSuperviseTap(e) {
    const { id } = e.currentTarget.dataset;
    await this.togglePost(id, '/square/posts/supervise');
  },

  async togglePost(id, url) {
    const current = this.data.posts.find((post) => String(post.id) === String(id));
    if (!current) return;

    try {
      const res = await request(url, 'POST', { id });
      this.replacePost(res.data);
    } catch (err) {
      if (err && Number(err.code) === 401) {
        wx.showToast({ title: '请先登录', icon: 'none' });
        return;
      }
      wx.showToast({ title: (err && err.message) || '操作失败，请稍后重试', icon: 'none' });
    }
  },

  replacePost(nextPost) {
    const normalized = normalizePost(nextPost);
    const posts = this.data.posts.map((post) => (String(post.id) === String(normalized.id) ? normalized : post));
    wx.setStorageSync(STORAGE_KEY, posts);
    this.setData({ posts }, () => this.filterPosts());
  },

  onPreviewImage(e) {
    const { src, urls } = e.currentTarget.dataset;
    const list = Array.isArray(urls) ? urls : [src].filter(Boolean);
    if (!src || !list.length) return;
    wx.previewImage({
      current: src,
      urls: list,
    });
  },
});
