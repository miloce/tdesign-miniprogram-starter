import config from '../../config';
import { loginWithWechat, saveUserProfile } from '../../utils/auth';

const DEFAULT_AVATAR = '/static/avatar1.png';
const DEFAULT_NICKNAME = '云栈点用户';

Component({
  properties: {
    show: {
      type: Boolean,
      value: false,
    },
  },

  data: {
    visible: false,
    agreed: false,
    submitting: false,
    errMsg: '',
    profileStep: false,
    pendingUserInfo: null,
    avatarUrl: DEFAULT_AVATAR,
    nickname: '',
  },

  observers: {
    show(value) {
      this.setTabBarHidden(Boolean(value));
      this.setData({
        visible: Boolean(value),
        errMsg: '',
        profileStep: false,
      });
    },
  },

  methods: {
    noop() {},

    setTabBarHidden(hidden) {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const tabBar = currentPage && currentPage.getTabBar ? currentPage.getTabBar() : null;

      if (tabBar && tabBar.setData) {
        tabBar.setData({ hidden });
      }
    },

    onMask() {
      if (this.data.submitting) return;
      if (this.data.profileStep) {
        this.setData({ errMsg: '请完善头像和昵称' });
        return;
      }
      this.close();
    },

    close() {
      this.setData({ visible: false, submitting: false, profileStep: false });
      this.setTabBarHidden(false);
      this.triggerEvent('close');
    },

    toggleAgree() {
      this.setData({
        agreed: !this.data.agreed,
        errMsg: '',
      });
    },

    openUserAgreement() {
      wx.navigateTo({
        url: '/pages/agreement/index?type=user',
      });
    },

    openPrivacy() {
      wx.navigateTo({
        url: '/pages/agreement/index?type=privacy',
      });
    },

    async onWechatLoginTap() {
      if (this.data.submitting) return;
      if (!this.data.agreed) {
        this.setData({ errMsg: '请先勾选并同意《用户协议》《隐私协议》' });
        return;
      }

      this.setData({ submitting: true, errMsg: '' });
      wx.showLoading({ title: '登录中' });
      try {
        const userInfo = await loginWithWechat();
        wx.hideLoading();
        if (this.needsProfile(userInfo)) {
          this.setData({
            submitting: false,
            profileStep: true,
            pendingUserInfo: userInfo,
            avatarUrl: userInfo.avatar || DEFAULT_AVATAR,
            nickname: this.isDefaultNickname(userInfo.nickname) ? '' : userInfo.nickname,
          });
          return;
        }
        this.finishLogin(userInfo);
      } catch (err) {
        wx.hideLoading();
        this.setData({
          submitting: false,
          errMsg: err.message || '登录失败，请重试',
        });
      }
    },

    needsProfile(userInfo = {}) {
      return !userInfo.avatar || userInfo.avatar === DEFAULT_AVATAR || this.isTemporaryAvatar(userInfo.avatar) || this.isDefaultNickname(userInfo.nickname);
    },

    isDefaultNickname(nickname) {
      return !nickname || nickname === DEFAULT_NICKNAME;
    },

    isTemporaryAvatar(path) {
      return /^https?:\/\/tmp\//.test(path) || /^wxfile:\/\//.test(path);
    },

    onChooseAvatar(e) {
      const avatarUrl = e.detail && e.detail.avatarUrl;
      if (!avatarUrl) return;
      this.setData({ avatarUrl, errMsg: '' });
    },

    onNicknameInput(e) {
      this.setData({
        nickname: e.detail.value,
        errMsg: '',
      });
    },

    async onConfirmProfile() {
      if (this.data.submitting) return;
      const nickname = String(this.data.nickname || '').trim();
      if (!nickname) {
        this.setData({ errMsg: '请输入昵称' });
        return;
      }
      if (!this.data.avatarUrl || this.data.avatarUrl === DEFAULT_AVATAR) {
        this.setData({ errMsg: '请选择头像' });
        return;
      }

      this.setData({ submitting: true, errMsg: '' });
      wx.showLoading({ title: '保存中' });
      try {
        const avatar = await this.uploadAvatarIfNeeded(this.data.avatarUrl);
        const userInfo = await saveUserProfile({ nickname, avatar });
        wx.hideLoading();
        this.finishLogin(userInfo);
      } catch (err) {
        wx.hideLoading();
        this.setData({
          submitting: false,
          errMsg: err.message || '资料保存失败，请重试',
        });
      }
    },

    uploadAvatarIfNeeded(path) {
      if ((/^https?:\/\//.test(path) && !this.isTemporaryAvatar(path)) || path.startsWith('/uploads/') || path.startsWith('/static/')) {
        return Promise.resolve(path);
      }

      return new Promise((resolve, reject) => {
        wx.uploadFile({
          url: `${config.baseUrl}/user/avatar`,
          filePath: path,
          name: 'avatar',
          header: {
            Authorization: `Bearer ${wx.getStorageSync('access_token') || ''}`,
          },
          success(res) {
            let payload = res.data;
            if (typeof payload === 'string') {
              try {
                payload = JSON.parse(payload);
              } catch (err) {
                reject(new Error('头像上传返回异常'));
                return;
              }
            }
            if (payload && payload.code === 200 && payload.data && payload.data.avatar) {
              resolve(payload.data.avatar);
              return;
            }
            reject(new Error((payload && payload.message) || '头像上传失败'));
          },
          fail() {
            reject(new Error('头像上传失败'));
          },
        });
      });
    },

    finishLogin(userInfo) {
      wx.showToast({ title: '登录成功', icon: 'success' });
      this.setData({
        visible: false,
        submitting: false,
        profileStep: false,
        pendingUserInfo: null,
      });
      this.setTabBarHidden(false);
      this.triggerEvent('success', { userInfo });
    },
  },

  detached() {
    this.setTabBarHidden(false);
  },
});
