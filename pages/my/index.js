import request from '~/api/request';
import useToastBehavior from '~/behaviors/useToast';
import { getStoredUser, isLoggedIn } from '~/utils/auth';

const ADMIN_OPENID = 'oL8I43flaski-3Q2shkh4olGQEn4';

Page({
  behaviors: [useToastBehavior],

  data: {
    isLoggedIn: false,
    showLogin: false,
    userInfo: {},
    _avatarTapCount: 0,
    userCard: {
      avatar: '',
      name: '请先登录',
      uid: '无',
      memberText: '游客用户',
      quotaText: '0',
    },
    profile: {
      avatar: '',
      name: '云栈点',
      vipText: '',
    },
    baseSettingList: [
      { name: '制作记录', desc: '历史制作的短链都在这里', icon: 'history', type: 'records', button: '查看' },
      { name: '联系客服', desc: '遇到问题跟客服说一下', icon: 'service', type: 'service', button: '咨询' },
    ],
    settingList: [
      { name: '制作记录', desc: '历史制作的短链都在这里', icon: 'history', type: 'records', button: '查看' },
      { name: '联系客服', desc: '遇到问题跟客服说一下', icon: 'service', type: 'service', button: '咨询' },
    ],
  },

  onShow() {
    const loggedIn = isLoggedIn();
    const userInfo = loggedIn ? getStoredUser() || {} : {};
    const isAdmin = this.isAdminUser(userInfo);
    this.setData({
      isLoggedIn: loggedIn,
      userInfo,
      settingList: this.buildSettingList(isAdmin, loggedIn),
    });
    this.refreshUserCard(loggedIn, userInfo, loggedIn ? this.data.profile : {});
    if (loggedIn) {
      this.loadProfile();
    }
  },

  async loadProfile() {
    if (!this.data.isLoggedIn) return;

    try {
      const res = await request('/code/profile');
      const profile = res.data.data;
      const isAdmin = profile.isAdmin || this.isAdminUser(this.data.userInfo);
      this.setData({
        profile,
        settingList: this.buildSettingList(isAdmin, true),
      });
      this.updateStoredUserFromProfile(profile);
      this.refreshUserCard(true, this.data.userInfo, profile);
    } catch (err) {
      this.onShowToast('#t-toast', '用户信息加载失败');
    }
  },

  onSettingTap(e) {
    const { item } = e.currentTarget.dataset;
    if (!item) return;

    if (item.type === 'records') {
      if (!this.data.isLoggedIn) {
        this.onLoginTap();
        return;
      }
      wx.navigateTo({
        url: '/pages/my/records/index',
      });
      return;
    }

    if (item.type === 'admin') {
      wx.navigateTo({
        url: '/pages/admin/index',
      });
      return;
    }

    this.onShowToast('#t-toast', `${item.name}待接入`);
  },

  onLoginTap() {
    this.setData({ showLogin: true });
  },

  onCloseLogin() {
    this.setData({ showLogin: false });
  },

  onLoginSuccess() {
    this.setData({ showLogin: false });
    this.onShow();
  },

  onProfileTap() {
    if (!this.data.isLoggedIn) {
      this.onLoginTap();
    }
  },

  onAvatarTap() {
    if (!this.data.isLoggedIn) {
      this.onLoginTap();
      return;
    }

    clearTimeout(this._avatarTapTimer);
    const count = this.data._avatarTapCount + 1;
    this.setData({ _avatarTapCount: count });

    if (count >= 5) {
      this.setData({ _avatarTapCount: 0 });
      const openid = this.data.userInfo.openid || wx.getStorageSync('access_token') || '';
      if (!openid) {
        this.onShowToast('#t-toast', '未获取到OpenID');
        return;
      }
      wx.setClipboardData({
        data: openid,
        success() {
          wx.showToast({ title: 'OpenID已复制', icon: 'success' });
        },
      });
    } else {
      this._avatarTapTimer = setTimeout(() => {
        this.setData({ _avatarTapCount: 0 });
      }, 2000);
    }
  },

  onCopyUid() {
    const userInfo = this.data.userInfo;
    if (!userInfo || !userInfo.id) {
      this.onLoginTap();
      return;
    }

    wx.setClipboardData({
      data: String(userInfo.id),
      success() {
        wx.showToast({ title: '用户ID已复制', icon: 'success' });
      },
    });
  },

  onQuotaTap() {
    if (!this.data.isLoggedIn) {
      return;
    }

    wx.navigateTo({
      url: '/pages/integral/index',
    });
  },

  refreshUserCard(loggedIn, userInfo = {}, profile = {}) {
    const quota = profile.quota !== undefined && profile.quota !== null
      ? profile.quota
      : userInfo.people || userInfo.freeCount || 0;

    this.setData({
      userCard: {
        avatar: userInfo.avatar || userInfo.avatar_url || profile.avatar || '',
        name: loggedIn ? userInfo.nickname || profile.name || '云栈点用户' : '请先登录',
        uid: loggedIn ? userInfo.id || '无' : '无',
        memberText: loggedIn ? profile.vipText || '普通用户' : '游客用户',
        quotaText: loggedIn ? String(quota) : '0',
      },
    });
  },

  updateStoredUserFromProfile(profile = {}) {
    const userInfo = wx.getStorageSync('userinfo') || {};
    const next = {
      ...userInfo,
      nickname: userInfo.nickname || profile.name,
      avatar: userInfo.avatar || profile.avatar,
      people: profile.quota !== undefined ? profile.quota : userInfo.people,
      scorings: profile.points !== undefined ? profile.points : userInfo.scorings,
      isVip: profile.isVip !== undefined ? profile.isVip : userInfo.isVip,
      is_vip: profile.isVip !== undefined ? profile.isVip : userInfo.is_vip,
      vipInfo: profile.vipInfo || userInfo.vipInfo,
    };
    wx.setStorageSync('userinfo', next);
    const app = getApp();
    if (app && app.globalData) {
      app.globalData.userInfo = next;
    }
    this.setData({ userInfo: next });
  },

  buildSettingList(isAdmin, loggedIn) {
    const list = this.data.baseSettingList.filter((item) => loggedIn || item.type !== 'records');
    if (isAdmin) {
      list.push({
        name: '管理员入口',
        desc: '配置支付、广告、积分和用户权益',
        icon: 'setting',
        type: 'admin',
        button: '管理',
      });
    }
    return list;
  },

  isAdminUser(userInfo = {}) {
    return userInfo.openid === ADMIN_OPENID || wx.getStorageSync('access_token') === ADMIN_OPENID || userInfo.is_admin;
  },

});
