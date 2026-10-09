import request from '~/api/request';

const STORAGE_KEY = 'square_posts_cache';

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

function normalizePost(post = {}) {
  const comments = Array.isArray(post.comments) ? post.comments : [];
  return {
    ...post,
    images: Array.isArray(post.images) ? post.images.filter(Boolean) : [],
    comments: comments.map((comment) => ({
      ...comment,
      timeText: formatTime(comment.createdAt),
    })),
    timeText: formatTime(post.createdAt),
    likes: Number(post.likes || 0),
    liked: !!post.liked,
    superviseCount: Number(post.superviseCount || 0),
    supervised: !!post.supervised,
    commentCount: Number(post.commentCount || comments.length || 0),
  };
}

Page({
  data: {
    id: '',
    loading: false,
    commentText: '',
    submitting: false,
    post: normalizePost(),
  },

  onLoad(query) {
    this.setData({ id: query.id || '' });
    this.loadDetail();
  },

  onPullDownRefresh() {
    this.loadDetail().finally(() => {
      wx.stopPullDownRefresh();
    });
  },

  async loadDetail() {
    const { id } = this.data;
    if (!id) return;

    this.setData({ loading: true });
    try {
      const res = await request('/square/posts/detail', 'GET', { id });
      this.applyPost(res.data);
    } catch (err) {
      const cached = wx.getStorageSync(STORAGE_KEY) || [];
      const post = cached.find((item) => String(item.id) === String(id));
      if (post) {
        this.applyPost(post);
      } else {
        wx.showToast({ title: '动态不存在', icon: 'none' });
      }
    } finally {
      this.setData({ loading: false });
    }
  },

  applyPost(post) {
    const normalized = normalizePost(post);
    this.setData({ post: normalized });
    this.updateCache(normalized);
  },

  onShareAppMessage() {
    const { post } = this.data;
    const title = (post && (post.title || post.content)) || '';
    return {
      title: title ? `${String(title).slice(0, 24)}｜云栈点` : '云栈点｜一键制作你的专属代码',
      path: this.data.id ? `/pages/square/detail/index?id=${this.data.id}` : '/pages/home/index',
    };
  },

  onShareTimeline() {
    const { post } = this.data;
    const title = (post && (post.title || post.content)) || '';
    return {
      title: title ? `${String(title).slice(0, 24)}｜云栈点` : '云栈点｜一键制作你的专属代码',
      query: this.data.id ? `id=${this.data.id}` : '',
    };
  },

  async onLikeTap() {
    await this.togglePost('/square/posts/like');
  },

  async onSuperviseTap() {
    await this.togglePost('/square/posts/supervise');
  },

  async togglePost(url) {
    try {
      const res = await request(url, 'POST', { id: this.data.id });
      this.applyPost({
        ...this.data.post,
        ...res.data,
        comments: this.data.post.comments,
      });
    } catch (err) {
      if (err && Number(err.code) === 401) {
        wx.showToast({ title: '请先登录', icon: 'none' });
        return;
      }
      wx.showToast({ title: (err && err.message) || '操作失败，请稍后重试', icon: 'none' });
    }
  },

  onCommentInput(e) {
    this.setData({ commentText: e.detail.value });
  },

  async submitComment() {
    const content = this.data.commentText.trim();
    if (content.length < 2) {
      wx.showToast({ title: '评论至少2个字', icon: 'none' });
      return;
    }

    this.setData({ submitting: true });
    try {
      const res = await request('/square/comments', 'POST', {
        id: this.data.id,
        content,
      });
      this.applyPost(res.data);
      this.setData({ commentText: '' });
      wx.showToast({ title: '评论成功', icon: 'none' });
    } catch (err) {
      if (err && Number(err.code) === 401) {
        wx.showToast({ title: '请先登录', icon: 'none' });
        return;
      }
      if (err && Number(err.code) >= 400 && Number(err.code) < 500) {
        wx.showToast({ title: err.message || '评论失败', icon: 'none' });
        return;
      }
      wx.showToast({ title: (err && err.message) || '评论失败，请稍后重试', icon: 'none' });
    } finally {
      this.setData({ submitting: false });
    }
  },

  updateCache(post) {
    const cached = wx.getStorageSync(STORAGE_KEY) || [];
    const exists = cached.some((item) => String(item.id) === String(post.id));
    const posts = exists
      ? cached.map((item) => (String(item.id) === String(post.id) ? post : item))
      : [post, ...cached];
    wx.setStorageSync(STORAGE_KEY, posts);
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
