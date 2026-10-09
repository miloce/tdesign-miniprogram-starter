import request from '~/api/request';
import { isLoggedIn } from '~/utils/auth';
import { createVirtualPaymentOrder, invokeVirtualPayment, isVirtualPaymentCancelled } from './virtualPayment';

const STEP_MIN = 1000;
const STEP_MAX = 98800;
const ACCOUNT_HISTORY_KEY = 'zepplife_accounts';
const ACCOUNT_HISTORY_LIMIT = 8;
const ASSISTANT_SUBSCRIBE_TEMPLATE_ID = 'E72ZydT3J-M2P3RuEHJxyk59a2OPzlsRyTK9srjoaAY';
const REWARD_AD_UNAVAILABLE = Object.freeze({ reason: 'reward_ad_unavailable' });

Page({
  data: {
    username: '',
    password: '',
    step: '20000',
    accountHistory: [],
    showAccountHistory: false,
    isLoading: false,
    scheduleSaving: false,
    scheduleSubscribing: false,
    showLogin: false,
    schedule: {
      enabled: false,
      account: '',
      stepsMin: '20000',
      stepsMax: '20000',
      time: '08:00',
      subscribed: false,
      subscribeStatus: '',
      templateId: ASSISTANT_SUBSCRIBE_TEMPLATE_ID,
      lastRunAt: '',
      lastResult: null,
      nextRunAt: '',
      noticeText: '未订阅',
      noticeClass: 'is-muted',
      subscribeButtonText: '订阅通知',
      subscribeHint: '订阅后，自动任务完成会收到服务通知。',
      enabledText: '未开启',
      enabledClass: 'is-off',
      saveButtonText: '保存自动任务',
      nextRunText: '',
      lastRunText: '',
    },
    config: {
      enableRewardAd: false,
      enablePayment: false,
      rewardAdUnitId: '',
      price: 0,
      user: null,
    },
  },

  accessProof: {},
  rewardAd: null,
  rewardAdUnitId: '',
  rewardAdLoadPromise: null,
  rewardAdReady: false,

  onLoad() {
    this.loadCachedAccount();
  },

  onUnload() {
    this.destroyRewardAd();
  },

  loadCachedAccount() {
    try {
      const username = wx.getStorageSync('zepplife_username') || '';
      const password = wx.getStorageSync('zepplife_password') || '';
      const cachedStep = wx.getStorageSync('zepplife_step');
      const step = cachedStep ? String(cachedStep) : '20000';
      let history = this.normalizeAccountHistory(wx.getStorageSync(ACCOUNT_HISTORY_KEY) || []);

      if (username) {
        history = this.upsertAccountHistory(history, { username, password, step });
        wx.setStorageSync(ACCOUNT_HISTORY_KEY, history);
      }

      const active = username ? { username, password, step } : history[0] || {};

      this.setData({
        username: active.username || '',
        password: active.password || '',
        step: String(active.step || step),
        accountHistory: this.decorateAccountHistory(history),
        showAccountHistory: false,
      });
    } catch (err) {
      console.error('读取小助手缓存失败', err);
    }
  },

  onShow() {
    if (isLoggedIn()) {
      this.loadConfig();
      this.loadSchedule();
    }
  },

  onUsernameInput(e) {
    this.setData({ username: e.detail.value });
  },

  onPasswordInput(e) {
    this.setData({ password: e.detail.value });
  },

  onStepInput(e) {
    this.setData({ step: e.detail.value });
  },

  onAccountHistoryToggle() {
    if ((this.data.accountHistory || []).length <= 1) return;
    this.setData({ showAccountHistory: !this.data.showAccountHistory });
  },

  onAccountHistorySelect(e) {
    const index = Number(e.currentTarget.dataset.index);
    const account = (this.data.accountHistory || [])[index];
    if (!account) return;

    this.setData({
      username: account.username || '',
      password: account.password || '',
      step: String(account.step || '20000'),
      showAccountHistory: false,
    });

    try {
      wx.setStorageSync('zepplife_username', account.username || '');
      wx.setStorageSync('zepplife_password', account.password || '');
      wx.setStorageSync('zepplife_step', String(account.step || '20000'));
    } catch (err) {
      console.error('保存选中账号缓存失败', err);
    }
  },

  onAccountHistoryDelete(e) {
    const index = Number(e.currentTarget.dataset.index);
    const history = this.normalizeAccountHistory(this.data.accountHistory).filter((_, itemIndex) => itemIndex !== index);
    this.persistAccountHistory(history);
  },

  onAccountHistoryClear() {
    wx.showModal({
      title: '清空账号记录',
      content: '确认清空本机保存的账号记录？',
      confirmColor: '#0f58d2',
      success: (res) => {
        if (!res.confirm) return;
        this.persistAccountHistory([]);
      },
    });
  },

  async submitSteps() {
    if (this.data.isLoading) return;

    const username = String(this.data.username || '').trim();
    const password = String(this.data.password || '').trim();
    const step = String(this.data.step || '').trim();
    const stepValue = Number(step);

    if (!username) {
      wx.showToast({ title: '请输入账号', icon: 'none' });
      return;
    }

    if (!password) {
      wx.showToast({ title: '请输入密码', icon: 'none' });
      return;
    }

    if (!step || !Number.isInteger(stepValue) || stepValue < STEP_MIN || stepValue > STEP_MAX) {
      wx.showToast({ title: '请输入1000-98800之间的数值', icon: 'none' });
      return;
    }

    try {
      const history = this.upsertAccountHistory(this.data.accountHistory, { username, password, step });
      this.persistAccountHistory(history);
    } catch (err) {
      console.error('保存小助手缓存失败', err);
    }

    if (!isLoggedIn()) {
      this.setData({ showLogin: true });
      return;
    }

    this.setData({ isLoading: true });

    try {
      if (!this.data.config.user) {
        const config = await this.loadConfig();
        if (!config) {
          throw new Error('服务配置加载失败，请检查网络后重试');
        }
      }

      const proof = await this.passAccessGate();
      if (!proof) {
        return;
      }

      const res = await request('/assistant/submit', 'POST', {
        account: username,
        password,
        steps: step,
        outTradeNo: proof.outTradeNo || '',
        rewardToken: proof.rewardToken || '',
      });

      const data = res.data || {};
      if (data.userInfo) {
        this.updateStoredUser(data.userInfo);
        this.setData({
          'config.user': data.userInfo,
        });
      }

      this.accessProof = {};
      this.showResult('设置成功', data.message || '设置成功');
    } catch (err) {
      this.showResult('设置失败', this.getSubmitErrorMessage(err));
    } finally {
      this.setData({ isLoading: false });
    }
  },

  async loadConfig() {
    try {
      const res = await request('/code/config');
      const nextConfig = {
        enableRewardAd: Boolean(res.data && res.data.enableRewardAd),
        enablePayment: Boolean(res.data && res.data.enablePayment),
        rewardAdUnitId: String((res.data && res.data.rewardAdUnitId) || ''),
        price: Number((res.data && res.data.price) || 0),
        user: res.data ? res.data.user || null : null,
      };
      this.setData({ config: nextConfig });
      this.prepareRewardAdForConfig(nextConfig);
      return nextConfig;
    } catch (err) {
      console.error('加载权益配置失败', err);
      return null;
    }
  },

  async loadSchedule() {
    if (!isLoggedIn()) return;

    try {
      const res = await request('/assistant/schedule');
      const schedule = this.decorateSchedule(res.data || {});
      const nextData = { schedule };
      if (!this.data.username && schedule.account) {
        nextData.username = schedule.account;
      }
      this.setData(nextData);
    } catch (err) {
      console.error('加载自动任务失败', err);
    }
  },

  decorateSchedule(schedule = {}) {
    const subscribeStatus = String(schedule.subscribeStatus || '');
    const subscribed = Boolean(schedule.subscribed);
    const lastResult = schedule.lastResult || null;
    let noticeText = '未订阅';
    let noticeClass = 'is-muted';
    let subscribeButtonText = '订阅通知';
    let subscribeHint = '订阅后，自动任务完成会收到服务通知。';
    if (subscribed) {
      noticeText = '已订阅';
      noticeClass = 'is-on';
      subscribeButtonText = '重新订阅';
      subscribeHint = '通知已开启，自动任务完成后会发送服务通知。';
    } else if (subscribeStatus === 'reject') {
      noticeText = '已拒收';
      noticeClass = 'is-warn';
      subscribeButtonText = '重新订阅';
      subscribeHint = '当前已拒收，请重新订阅或到小程序设置中允许接收。';
    }
    const enabled = Boolean(schedule.enabled);
    const willRetry = Boolean(lastResult && lastResult.willRetry);
    const retryAttempt = Number((lastResult && lastResult.attempt) || 0);
    const lastRunSteps = String((lastResult && lastResult.steps) || '');
    let lastResultText = '';
    if (willRetry) {
      lastResultText = `数值 ${lastRunSteps}，第${retryAttempt}次失败，系统将自动重试`;
    } else if (lastResult) {
      lastResultText = `${lastRunSteps ? `数值 ${lastRunSteps}，` : ''}${String(lastResult.message || '')}`;
    }

    return {
      enabled,
      account: String(schedule.account || ''),
      stepsMin: String(schedule.stepsMin || '20000'),
      stepsMax: String(schedule.stepsMax || '20000'),
      time: String(schedule.time || '08:00'),
      subscribed,
      subscribeStatus,
      templateId: String(schedule.templateId || ASSISTANT_SUBSCRIBE_TEMPLATE_ID),
      lastRunAt: String(schedule.lastRunAt || ''),
      lastResult,
      nextRunAt: String(schedule.nextRunAt || ''),
      noticeText,
      noticeClass,
      subscribeButtonText,
      subscribeHint,
      enabledText: enabled ? '运行中' : '未开启',
      enabledClass: enabled ? 'is-on' : 'is-off',
      saveButtonText: enabled ? '保存并更新任务' : '保存自动任务',
      nextRunText: this.formatDateTime(schedule.nextRunAt),
      lastRunText: this.formatDateTime(schedule.lastRunAt),
      lastResultText,
      lastResultSuccess: lastResult ? Boolean(lastResult.success) : false,
    };
  },

  formatDateTime(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    const pad = (number) => String(number).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  },

  onScheduleToggle(e) {
    this.setData({
      'schedule.enabled': Boolean(e.detail.value),
    });
  },

  onScheduleTimeChange(e) {
    this.setData({
      'schedule.time': e.detail.value || '08:00',
    });
  },

  onScheduleStepsMinInput(e) {
    this.setData({ 'schedule.stepsMin': e.detail.value });
  },

  onScheduleStepsMaxInput(e) {
    this.setData({ 'schedule.stepsMax': e.detail.value });
  },

  async saveSchedule() {
    if (!isLoggedIn()) {
      this.setData({ showLogin: true });
      return;
    }

    const stepsMin = String(this.data.schedule.stepsMin || '').trim();
    const stepsMax = String(this.data.schedule.stepsMax || '').trim();
    const minValue = Number(stepsMin);
    const maxValue = Number(stepsMax);
    if (this.data.schedule.enabled && (
      !Number.isInteger(minValue)
      || !Number.isInteger(maxValue)
      || minValue < STEP_MIN
      || maxValue > STEP_MAX
      || minValue > maxValue
    )) {
      wx.showToast({ title: '请输入有效的随机范围', icon: 'none' });
      return;
    }

    this.setData({ scheduleSaving: true });
    try {
      const res = await request('/assistant/schedule', 'POST', {
        enabled: this.data.schedule.enabled,
        account: String(this.data.username || '').trim(),
        password: String(this.data.password || '').trim(),
        stepsMin,
        stepsMax,
        time: this.data.schedule.time,
      });

      this.setData({
        schedule: this.decorateSchedule(res.data || {}),
      });
      wx.showToast({ title: '已保存', icon: 'success' });
    } catch (err) {
      wx.showToast({ title: (err && err.message) || '保存失败', icon: 'none' });
    } finally {
      this.setData({ scheduleSaving: false });
    }
  },

  async subscribeScheduleMessage() {
    if (!isLoggedIn()) {
      this.setData({ showLogin: true });
      return;
    }

    if (typeof wx.requestSubscribeMessage !== 'function') {
      wx.showToast({ title: '当前微信版本不支持订阅消息', icon: 'none' });
      return;
    }

    const templateId = this.data.schedule.templateId || ASSISTANT_SUBSCRIBE_TEMPLATE_ID;
    this.setData({ scheduleSubscribing: true });
    try {
      const result = await new Promise((resolve, reject) => {
        wx.requestSubscribeMessage({
          tmplIds: [templateId],
          success: resolve,
          fail: reject,
        });
      });
      const status = String(result[templateId] || '');
      const res = await request('/assistant/schedule/subscribe', 'POST', { status });
      this.setData({
        schedule: this.decorateSchedule(res.data || {}),
      });
      wx.showToast({
        title: ['accept', 'acceptWithAudio', 'acceptWithAlert'].includes(status) ? '通知已开启' : '订阅未开启',
        icon: 'none',
      });
    } catch (err) {
      wx.showToast({ title: (err && err.message) || '订阅失败', icon: 'none' });
    } finally {
      this.setData({ scheduleSubscribing: false });
    }
  },

  async passAccessGate() {
    const { config } = this.data;
    const user = config.user || {};
    const rewardAdEnabled = Boolean(config.enableRewardAd && config.rewardAdUnitId);
    const paymentEnabled = Boolean(config.enablePayment && Number(config.price) > 0);

    if (this.accessProof && (this.accessProof.outTradeNo || this.accessProof.rewardToken)) {
      return this.accessProof;
    }

    if (user.isVip || Number(user.quota) > 0) {
      this.accessProof = {};
      return {};
    }

    if (rewardAdEnabled && paymentEnabled) {
      return this.chooseAccessPath();
    }

    if (rewardAdEnabled) {
      const proof = await this.showRewardAd(config.rewardAdUnitId);
      if (proof === REWARD_AD_UNAVAILABLE) {
        wx.showToast({ title: '广告暂不可用，请稍后重试', icon: 'none' });
        return null;
      }
      return proof;
    }

    if (paymentEnabled) {
      return this.showVirtualPayment(config.price);
    }

    this.accessProof = {};
    return {};
  },

  chooseAccessPath() {
    return new Promise((resolve) => {
      wx.showActionSheet({
        itemList: ['观看广告', '小程序虚拟支付'],
        success: async (res) => {
          if (res.tapIndex === 0) {
            const proof = await this.showRewardAd(this.data.config.rewardAdUnitId);
            if (proof === REWARD_AD_UNAVAILABLE) {
              resolve(this.offerPaymentFallback());
              return;
            }
            resolve(proof);
            return;
          }

          if (res.tapIndex === 1) {
            resolve(this.showVirtualPayment(this.data.config.price));
            return;
          }

          resolve(null);
        },
        fail: () => resolve(null),
      });
    });
  },

  offerPaymentFallback() {
    return new Promise((resolve) => {
      wx.showModal({
        title: '广告暂不可用',
        content: '当前广告暂无库存或加载失败，是否改用小程序虚拟支付继续？',
        confirmText: '去支付',
        cancelText: '稍后再试',
        success: (res) => {
          if (!res.confirm) {
            resolve(null);
            return;
          }
          resolve(this.showVirtualPayment(this.data.config.price));
        },
        fail: () => resolve(null),
      });
    });
  },

  prepareRewardAdForConfig(config = this.data.config) {
    const user = config.user || {};
    const shouldPrepare = Boolean(
      config.enableRewardAd
        && config.rewardAdUnitId
        && !user.isVip
        && Number(user.quota) <= 0,
    );

    if (!shouldPrepare) {
      this.destroyRewardAd();
      return null;
    }

    return this.prepareRewardAd(config.rewardAdUnitId);
  },

  prepareRewardAd(adUnitId) {
    const normalizedAdUnitId = String(adUnitId || '').trim();
    if (!normalizedAdUnitId || typeof wx.createRewardedVideoAd !== 'function') {
      this.destroyRewardAd();
      return null;
    }

    if (this.rewardAd && this.rewardAdUnitId === normalizedAdUnitId) {
      this.preloadRewardAd();
      return this.rewardAd;
    }

    this.destroyRewardAd();
    this.rewardAd = wx.createRewardedVideoAd({ adUnitId: normalizedAdUnitId });
    this.rewardAdUnitId = normalizedAdUnitId;
    this.preloadRewardAd();
    return this.rewardAd;
  },

  preloadRewardAd() {
    if (!this.rewardAd || typeof this.rewardAd.load !== 'function') {
      return Promise.resolve();
    }

    if (this.rewardAdReady) {
      return Promise.resolve();
    }

    if (this.rewardAdLoadPromise) {
      return this.rewardAdLoadPromise;
    }

    this.rewardAdLoadPromise = this.rewardAd.load()
      .then(() => {
        this.rewardAdReady = true;
      })
      .catch((err) => {
        this.rewardAdReady = false;
        console.warn('预加载激励广告失败', err);
      })
      .finally(() => {
        this.rewardAdLoadPromise = null;
      });

    return this.rewardAdLoadPromise;
  },

  destroyRewardAd() {
    if (this.rewardAd && typeof this.rewardAd.destroy === 'function') {
      this.rewardAd.destroy();
    }
    this.rewardAd = null;
    this.rewardAdUnitId = '';
    this.rewardAdLoadPromise = null;
    this.rewardAdReady = false;
  },

  showRewardAd(adUnitId) {
    return new Promise((resolve) => {
      const ad = this.prepareRewardAd(adUnitId);
      if (!ad) {
        resolve(REWARD_AD_UNAVAILABLE);
        return;
      }

      let settled = false;
      let loadingVisible = false;
      const showLoading = () => {
        loadingVisible = true;
        wx.showLoading({ title: '加载广告' });
      };
      const hideLoading = () => {
        if (!loadingVisible) return;
        loadingVisible = false;
        wx.hideLoading();
      };
      let onClose;
      let onError;
      const cleanup = () => {
        const canRemoveClose = typeof ad.offClose === 'function';
        const canRemoveError = typeof ad.offError === 'function';
        if (canRemoveClose) {
          ad.offClose(onClose);
        }
        if (canRemoveError) {
          ad.offError(onError);
        }
        if (!canRemoveClose || !canRemoveError) {
          this.destroyRewardAd();
        }
      };
      const finish = (proof, message = '') => {
        if (settled) return;
        settled = true;
        hideLoading();
        cleanup();
        if (message) {
          wx.showToast({ title: message, icon: 'none' });
        }
        this.preloadRewardAd();
        resolve(proof);
      };

      onClose = async (res) => {
        if (res && res.isEnded) {
          try {
            wx.showLoading({ title: '确认权益' });
            const claimRes = await request('/assistant/reward/claim', 'POST');
            const rewardToken = claimRes.data && claimRes.data.rewardToken ? claimRes.data.rewardToken : '';
            wx.hideLoading();
            if (!rewardToken) {
              finish(null, '权益确认失败');
              return;
            }
            const proof = { rewardToken };
            this.accessProof = proof;
            finish(proof);
          } catch (err) {
            wx.hideLoading();
            finish(null, '权益确认失败');
          }
          return;
        }
        finish(null, '请完整观看后再试');
      };

      onError = (err) => {
        console.warn('激励广告展示失败', err);
        finish(REWARD_AD_UNAVAILABLE);
      };

      ad.onClose(onClose);
      ad.onError(onError);
      showLoading();
      const showAd = () => {
        this.rewardAdReady = false;
        return ad.show()
          .then(() => hideLoading())
          .catch((showError) => {
            console.warn('激励广告首次展示失败', showError);
            if (settled) {
              return null;
            }
            if (typeof ad.load !== 'function') {
              finish(REWARD_AD_UNAVAILABLE);
              return null;
            }
            return ad.load()
              .then(() => ad.show())
              .then(() => hideLoading())
              .catch((retryError) => {
                console.warn('激励广告重试展示失败', retryError);
                finish(REWARD_AD_UNAVAILABLE);
              });
          });
      };

      if (this.rewardAdLoadPromise) {
        this.rewardAdLoadPromise.then(showAd);
        return;
      }

      showAd();
    });
  },

  async showVirtualPayment(price) {
    const modalResult = await new Promise((resolve) => {
      wx.showModal({
        title: '付费使用',
        content: `当前服务需支付 ${price} 元，VIP会员可免费使用。`,
        confirmText: '立即支付',
        success: resolve,
        fail: () => resolve(false),
      });
    });
    if (!modalResult || !modalResult.confirm) return null;

    let loadingVisible = false;
    const hideLoading = () => {
      if (!loadingVisible) return;
      loadingVisible = false;
      wx.hideLoading();
    };

    wx.showLoading({ title: '正在发起支付' });
    loadingVisible = true;
    try {
      const params = await createVirtualPaymentOrder('/assistant/pay');
      if (params.paid) {
        hideLoading();
        const proof = { outTradeNo: params.outTradeNo || '' };
        this.accessProof = proof;
        return proof;
      }

      hideLoading();
      await invokeVirtualPayment(params);

      const paid = await this.confirmAssistantPayment(params.outTradeNo);
      if (!paid) {
        return null;
      }

      const proof = { outTradeNo: params.outTradeNo };
      this.accessProof = proof;
      return proof;
    } catch (err) {
      wx.showToast({
        title: isVirtualPaymentCancelled(err) ? '已取消支付' : err.message || '支付失败',
        icon: 'none',
      });
      return null;
    } finally {
      hideLoading();
    }
  },

  async confirmAssistantPayment(outTradeNo, attempt = 0) {
    if (!outTradeNo) return false;

    const res = await request('/assistant/pay/confirm', 'POST', { outTradeNo });
    const data = res.data || {};
    if (data.paid) {
      return true;
    }

    if (attempt < 2) {
      await new Promise((resolve) => {
        setTimeout(resolve, 800);
      });
      return this.confirmAssistantPayment(outTradeNo, attempt + 1);
    }

    wx.showToast({ title: '支付确认中，请稍后重试', icon: 'none' });
    return false;
  },

  getSubmitErrorMessage(err) {
    if (err && err.message) {
      return String(err.message);
    }

    const errMsg = String((err && err.errMsg) || '').toLowerCase();

    if (errMsg.includes('timeout')) {
      return '网络连接超时，请稍后重试';
    }

    if (errMsg.includes('fail')) {
      return '网络请求失败，请检查网络后重试';
    }

    return '网络异常，请稍后重试';
  },

  showResult(title, content) {
    wx.showModal({
      title,
      content,
      showCancel: false,
      confirmText: '确定',
    });
  },

  normalizeAccountHistory(history) {
    if (!Array.isArray(history)) return [];

    const seen = {};
    const list = [];
    history.forEach((item) => {
      if (!item || typeof item !== 'object') return;
      const username = String(item.username || item.account || '').trim();
      if (!username || seen[username]) return;
      seen[username] = true;
      list.push({
        username,
        password: String(item.password || ''),
        step: String(item.step || item.steps || '20000').trim() || '20000',
        updatedAt: String(item.updatedAt || ''),
      });
    });

    return list.slice(0, ACCOUNT_HISTORY_LIMIT);
  },

  upsertAccountHistory(history, account) {
    const next = this.normalizeAccountHistory([
      {
        ...account,
        updatedAt: new Date().toISOString(),
      },
    ])[0];
    if (!next) return this.normalizeAccountHistory(history);

    const current = this.normalizeAccountHistory(history);
    return [next]
      .concat(current.filter((item) => item.username !== next.username))
      .slice(0, ACCOUNT_HISTORY_LIMIT);
  },

  decorateAccountHistory(history) {
    return this.normalizeAccountHistory(history).map((item) => ({
      ...item,
      stepText: `${item.step || '20000'} 步`,
    }));
  },

  persistAccountHistory(history) {
    const normalized = this.normalizeAccountHistory(history);

    try {
      wx.setStorageSync(ACCOUNT_HISTORY_KEY, normalized);

      if (normalized[0]) {
        wx.setStorageSync('zepplife_username', normalized[0].username || '');
        wx.setStorageSync('zepplife_password', normalized[0].password || '');
        wx.setStorageSync('zepplife_step', String(normalized[0].step || '20000'));
      } else {
        wx.removeStorageSync('zepplife_username');
        wx.removeStorageSync('zepplife_password');
        wx.removeStorageSync('zepplife_step');
      }
    } catch (err) {
      console.error('保存账号历史失败', err);
    }

    this.setData({
      accountHistory: this.decorateAccountHistory(normalized),
      showAccountHistory: normalized.length > 1 ? this.data.showAccountHistory : false,
    });

    return normalized;
  },

  onCloseLogin() {
    this.setData({ showLogin: false });
  },

  async onLoginSuccess() {
    this.setData({ showLogin: false });
    await this.loadConfig();
    await this.loadSchedule();
  },

  updateStoredUser(userInfo) {
    const current = wx.getStorageSync('userInfo') || {};
    const next = {
      ...current,
      ...userInfo,
      quota: userInfo.quota !== undefined ? userInfo.quota : current.quota,
      points: userInfo.points !== undefined ? userInfo.points : current.points,
      isVip: userInfo.isVip !== undefined ? userInfo.isVip : current.isVip,
      isAdmin: userInfo.isAdmin !== undefined ? userInfo.isAdmin : current.isAdmin,
      vipInfo: userInfo.vipInfo || current.vipInfo,
    };

    wx.setStorageSync('userInfo', next);

    const app = getApp();
    if (app && app.globalData) {
      app.globalData.userInfo = next;
    }
  },
});
