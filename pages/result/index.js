import request from '~/api/request';

Page({
  data: {
    result: null,
    orderId: '',
    loading: false,
    statusText: '正在查询生成结果',
    failed: false,
  },

  timer: null,
  retryCount: 0,
  pollGeneration: 0,
  queryInFlight: false,
  destroyed: false,

  onLoad(options) {
    this.destroyed = false;
    const result = options.data ? JSON.parse(decodeURIComponent(options.data)) : null;
    const orderId = options.id || options.orderId || (result && result.id) || '';
    this.setData({ result, orderId });

    if (orderId) {
      this.queryResult();
    } else if (!result) {
      this.setData({
        failed: true,
        statusText: '缺少结果编号',
      });
    }
  },

  onUnload() {
    this.destroyed = true;
    this.stopPolling();
  },

  async queryResult() {
    if (!this.data.orderId || this.destroyed || this.queryInFlight) return;
    const generation = this.pollGeneration;
    let completed = false;
    this.queryInFlight = true;
    this.setData({ loading: true, failed: false });
    try {
      const res = await request('/wechat/getItemStatus', 'GET', {
        id: this.data.orderId,
        _t: Date.now(),
      });
      if (this.destroyed || generation !== this.pollGeneration) return;
      const payload = res.data || {};
      if (String(payload.status) === '1' && payload.url) {
        completed = true;
        this.stopPolling();
        this.setData({
          loading: false,
          failed: false,
          statusText: '生成成功',
          result: {
            id: payload.id || this.data.orderId,
            title: payload.title || (this.data.result && this.data.result.title) || '已生成代码',
            link: payload.url,
            qrcode: payload.qrcode || payload.url,
          },
        });
      }
    } catch (err) {
      // 下一次串行轮询会重试，避免并发请求覆盖较新的结果。
    } finally {
      this.queryInFlight = false;
      if (!completed && !this.destroyed && generation === this.pollGeneration) {
        this.startPolling();
      }
    }
  },

  startPolling() {
    if (this.timer) return;
    this.setData({ loading: true, statusText: '生成中，请稍候' });
    this.timer = setTimeout(() => {
      this.timer = null;
      this.retryCount += 1;
      if (this.retryCount > 20) {
        this.stopPolling();
        this.setData({
          loading: false,
          failed: true,
          statusText: '查询超时，请稍后在制作记录中查看',
        });
        return;
      }
      this.queryResult();
    }, 3000);
  },

  stopPolling() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    this.pollGeneration += 1;
  },

  onOpen() {
    if (!this.data.result || !this.data.result.link) return;
    wx.navigateTo({
      url: `/pages/webview/index?title=${encodeURIComponent('已生成代码')}&url=${encodeURIComponent(
        this.data.result.link,
      )}`,
    });
  },

  onCopy() {
    if (!this.data.result || !this.data.result.link) return;
    wx.setClipboardData({
      data: this.data.result.link,
      success() {
        wx.showToast({ title: '链接已复制', icon: 'success' });
      },
    });
  },

  onBackHome() {
    wx.switchTab({
      url: '/pages/home/index',
    });
  },

  onRetry() {
    this.stopPolling();
    this.retryCount = 0;
    this.destroyed = false;
    this.queryResult();
  },

  onShareAppMessage() {
    const {result} = this.data;
    return {
      title: result && result.title ? `${result.title}｜云栈点` : '云栈点｜一键制作你的专属代码',
      path: this.data.orderId ? `/pages/result/index?id=${this.data.orderId}` : '/pages/home/index',
    };
  },

  onShareTimeline() {
    const {result} = this.data;
    return {
      title: result && result.title ? `${result.title}｜云栈点` : '云栈点｜一键制作你的专属代码',
      query: this.data.orderId ? `id=${this.data.orderId}` : '',
    };
  },
});
