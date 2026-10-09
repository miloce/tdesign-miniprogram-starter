const app = getApp();

// 引入分享工具模块
const shareHelper = require('../../utils/shareHelper.js');
// 引入会员功能辅助工具
const membershipHelper = require('../../utils/membershipHelper.js');
const { API_BASE_URL } = require('../../utils/constants.js');

// 定义激励视频广告实例
let videoAd = null;

Page({
  data: {
    accountType: 'email', // 默认为邮箱登录
    username: '',
    password: '',
    step: '20000', // 默认步数
    isLoading: false,
    showResultModal: false,
    isSuccess: false,
    resultMessage: '',
    isMember: false, // 会员状态
    membershipStatus: null // 会员详细信息
  },

  safeSetData: function(payload) {
    if (!this._isPageActive) return;
    this.setData(payload);
  },

  onUnload: function() {
    this._isPageActive = false;
    // 页面卸载时清理资源
    if (videoAd) {
      videoAd.destroy();
      videoAd = null;
    }
  },

  onLoad: function() {
    this._isPageActive = true;
    // 检查会员状态
    this.checkMembershipStatus();

    // 初始化激励视频广告
    if (wx.createRewardedVideoAd && !videoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: 'adunit-00c2683af19b1214'
      });

      videoAd.onLoad(() => {
        console.log('激励视频广告加载成功');
      });

      videoAd.onError((err) => {
        console.error('激励视频广告加载失败', err);
      });

      videoAd.onClose((res) => {
        if (!this._isPageActive) return;
        if (res && res.isEnded) {
          // 正常播放结束，继续执行设置步数
          this.executeSetSteps();
        } else {
          // 播放中途退出
          wx.showToast({
            title: '需要完整观看广告才能设置步数',
            icon: 'none'
          });
        }
      });
    }

    // 加载上次使用的账号信息（包括密码）
    try {
      const savedUsername = wx.getStorageSync('zepplife_username');
      const savedPassword = wx.getStorageSync('zepplife_password');
      const savedAccountType = wx.getStorageSync('zepplife_account_type');
      const savedStep = wx.getStorageSync('zepplife_step');

      if (savedUsername) {
        this.safeSetData({
          username: savedUsername
        });
      }

      if (savedPassword) {
        this.safeSetData({
          password: savedPassword
        });
      }

      if (savedAccountType) {
        this.safeSetData({
          accountType: savedAccountType
        });
      }

      if (savedStep) {
        this.safeSetData({
          step: savedStep
        });
      }
    } catch (e) {
      console.error('读取缓存数据失败:', e);
    }
  },

  onShow: function () {
    this._isPageActive = true;
    try {
      const prompted = wx.getStorageSync('hidden_tutorial_prompted');
      if (prompted) {
        return;
      }
    } catch (e) {}

    wx.showModal({
      title: '查看详细教程',
      content: '是否立即查看使用教程？',
      confirmText: '立即查看',
      cancelText: '稍后',
      success: (res) => {
        try { wx.setStorageSync('hidden_tutorial_prompted', true); } catch (e) {}
        if (res.confirm) {
          this.viewArticle();
        }
      },
      fail: () => {
        try { wx.setStorageSync('hidden_tutorial_prompted', true); } catch (e) {}
      }
    });
  },

  // 切换账号类型
  radioChange: function(e) {
    this.safeSetData({
      accountType: e.detail.value,
      username: '', // 切换类型时清空用户名
      password: '' // 切换类型时清空密码
    });
  },

  // 输入用户名
  inputUsername: function(e) {
    this.safeSetData({
      username: e.detail.value
    });
  },

  // 输入密码
  inputPassword: function(e) {
    this.safeSetData({
      password: e.detail.value
    });
  },

  // 输入步数
  inputStep: function(e) {
    this.safeSetData({
      step: e.detail.value
    });
  },

  // 滑块改变步数
  sliderChange: function(e) {
    this.safeSetData({
      step: e.detail.value
    });
  },

  // 检查会员状态
  checkMembershipStatus: function() {
    const userId = wx.getStorageSync('userId');
    if (!userId) {
      this.safeSetData({
        isMember: false,
        membershipStatus: null
      });
      return;
    }

    membershipHelper.checkMembershipStatus(userId)
      .then(status => {
        this.safeSetData({
          isMember: status.isMember,
          membershipStatus: status
        });
        console.log('会员状态:', status);
      })
      .catch(err => {
        console.error('检查会员状态失败:', err);
        this.safeSetData({
          isMember: false,
          membershipStatus: null
        });
      });
  },

  // 验证邮箱格式
  validateEmail: function(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  },

  // 验证手机号格式
  validatePhone: function(phone) {
    const phoneRegex = /^1[3-9]\d{9}$/;
    return phoneRegex.test(phone);
  },

  // 提交修改步数请求
  submitSteps: function() {
    // 表单验证
    if (!this.data.username) {
      wx.showToast({
        title: this.data.accountType === 'phone' ? '请输入手机号' : '请输入邮箱',
        icon: 'none'
      });
      return;
    }

    // 验证邮箱或手机号格式
    if (this.data.accountType === 'email' && !this.validateEmail(this.data.username)) {
      wx.showToast({
        title: '请输入有效的邮箱地址',
        icon: 'none'
      });
      return;
    }

    if (this.data.accountType === 'phone' && !this.validatePhone(this.data.username)) {
      wx.showToast({
        title: '请输入有效的手机号',
        icon: 'none'
      });
      return;
    }

    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      });
      return;
    }

    if (!this.data.step || parseInt(this.data.step) < 1000 || parseInt(this.data.step) > 98800) {
      wx.showToast({
        title: '请输入1000-98800之间的步数',
        icon: 'none'
      });
      return;
    }

    // 保存用户输入（包括密码）
    try {
      wx.setStorageSync('zepplife_username', this.data.username);
      wx.setStorageSync('zepplife_password', this.data.password);
      wx.setStorageSync('zepplife_account_type', this.data.accountType);
      wx.setStorageSync('zepplife_step', this.data.step);
    } catch (e) {
      console.error('保存数据失败:', e);
    }

    // 检查是否需要观看广告（会员免广告，非会员需要观看广告）
    if (this.data.isMember) {
      console.log('会员用户，免广告直接执行');
      this.executeSetSteps();
      return;
    }

    // 非会员用户需要观看广告
    console.log('非会员用户，需要观看广告');
    // 显示激励视频广告
    if (videoAd) {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd.load()
          .then(() => videoAd.show())
          .catch(err => {
            console.error('激励视频广告显示失败', err);
            // 如果广告显示失败，直接执行设置步数
            this.executeSetSteps();
          });
      });
    } else {
      // 如果广告组件不可用，直接执行设置步数
      this.executeSetSteps();
    }
  },

  // 执行设置步数的具体操作
  executeSetSteps: function() {
    if (!this._isPageActive) return;
    // 设置加载状态
    this.safeSetData({
      isLoading: true
    });

    // 准备请求数据
    const requestData = {
      account: this.data.username,
      password: this.data.password,
      steps: this.data.step
    };

    // 发送请求到后端API
    wx.request({
      url: `${API_BASE_URL}/wechat/zeppLifeSteps`,
      method: 'POST',
      data: requestData,
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        console.log('API请求成功:', res);
        if (res.data && res.data.success) {
          this.showResult(true, `步数修改成功，大约10-30分钟后会同步到微信和支付宝。`);
        } else {
          this.showResult(false, this.getZeppErrorMessage(res));
        }
      },
      fail: (err) => {
        console.error('API请求失败:', err);
        this.showResult(false, this.getNetworkErrorMessage(err));
      },
      complete: () => {
        this.safeSetData({
          isLoading: false
        });
      }
    });
  },

  getZeppErrorMessage: function(res) {
    const data = res && res.data ? res.data : {};
    const backendMessage = data && data.message ? String(data.message).trim() : '';
    const retryAfter = data ? data.retryAfter : null;

    // 与后端保持一致：优先展示后端返回 message
    if (backendMessage) {
      if (retryAfter) {
        const seconds = Number(retryAfter);
        if (Number.isFinite(seconds) && seconds > 0 && !backendMessage.includes('分钟后')) {
          const minutes = Math.max(1, Math.ceil(seconds / 60));
          return `${backendMessage}（约 ${minutes} 分钟后再试）`;
        }
      }
      return backendMessage;
    }

    if (res && res.statusCode === 429) {
      return '请求过于频繁，请稍后重试';
    }
    if (res && (res.statusCode === 401 || res.statusCode === 403)) {
      return '账号或密码错误，请检查后重试';
    }
    if (res && res.statusCode >= 500) {
      return '服务暂时不可用，请稍后重试';
    }

    return backendMessage || '步数设置失败，请稍后重试';
  },

  getNetworkErrorMessage: function(err) {
    const errMsg = (err && err.errMsg ? err.errMsg : '').toLowerCase();
    if (errMsg.includes('timeout')) {
      return '网络连接超时，请稍后重试';
    }
    if (errMsg.includes('fail')) {
      return '网络请求失败，请检查网络后重试';
    }
    return '网络异常，请稍后重试';
  },

  // 显示结果弹窗
  showResult: function(isSuccess, message) {
    this.safeSetData({
      showResultModal: true,
      isSuccess: isSuccess,
      resultMessage: message
    });
  },

  // 关闭结果弹窗
  closeResultModal: function() {
    this.safeSetData({
      showResultModal: false
    });
  },

  onHide: function() {
    this._isPageActive = false;
  },

  /**
   * 用户点击右上角分享 - 发送给朋友
   */
  onShareAppMessage: function (res) {
    return shareHelper.generateShareInfo({
      title: '发现健康管理系统的秘密功能',
      path: '/pages/hidden/hidden'
    });
  },

  /**
   * 用户点击右上角分享 - 分享到朋友圈
   */
  onShareTimeline: function () {
    return {
      title: '发现健康管理系统的秘密功能',
      query: ''
    };
  },

  /**
   * 查看详细使用说明文章
   */
  viewArticle: function() {
    wx.openOfficialAccountArticle({
      url: 'https://mp.weixin.qq.com/s/7pNkclA8Pb09Zkx1vsZmeQ',
      success: (res) => {
        console.log('打开公众号文章成功', res);
      },
      fail: (err) => {
        console.error('打开公众号文章失败', err);
        wx.showToast({
          title: '打开文章失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  },

  /**
   * 打开公众号主页
   */
  openOfficialAccountProfile: function() {
    wx.openOfficialAccountProfile({
      username: 'gh_249e5d061e4f',
      success: (res) => {
        console.log('打开公众号主页成功', res);
      },
      fail: (err) => {
        console.error('打开公众号主页失败', err);
        wx.showToast({
          title: '打开公众号失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
  }
});
