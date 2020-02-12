"use strict";

var _core = _interopRequireDefault(require('./vendor.js')(0));

var _x = _interopRequireDefault(require('./vendor.js')(4));

var _auth = require('./api/auth.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import eventHub from './common/eventHub'
_core["default"].use(_x["default"]);

_core["default"].app({
  hooks: {// App 级别 hook，对整个 App 生效
    // 同时存在 Page hook 和 App hook 时，优先执行 Page hook，返回值再交由 App hook 处
    // 'before-setData': function (dirty) {
    //   console.log('setData dirty: ', dirty)
    //   return dirty
    // }
  },
  globalData: {
    userInfo: null,
    storeInfo: null,
    authorization: null,
    systemInfo: null,
    isIPhoneX: false
  },
  onLaunch: function onLaunch() {
    // this.testAsync()
    // eventHub.$on('app-launch', (...args) => {
    //   console.log('app-launch event emitted, the params are:')
    //   console.log(args)
    // })
    var userInfo = wx.getStorageSync('userInfo');
    var authorization = wx.getStorageSync('authorization');

    if (userInfo !== '') {
      this.$options.globalData.userInfo = userInfo;
    }

    if (authorization !== '') {
      this.$options.globalData.authorization = authorization;
    }

    var _this = this; //  check session


    wx.checkSession({
      fail: function fail(res) {
        console.warn('check session fail', res);
        wx.login({
          success: function success(login) {
            // get the login res
            if (login.errMsg === 'login:ok') {
              var data = {};
              data.type = 'checkSession';
              data.code = login.code;
              (0, _auth.miniAppLogin)(data).then(function (res) {
                if (res.data.user) {
                  _this.$options.globalData.userInfo = res.data.user; // set to storage

                  wx.setStorageSync('userInfo', res.data.user);
                  wx.setStorageSync('authorization', res.data.token);
                }
              });
            }
          }
        });
      }
    });
    var systemInfo = wx.getSystemInfoSync();
    this.$options.globalData.systemInfo = systemInfo;
    var iphoneNew = /iPhone11/i.test(systemInfo.model) && systemInfo.screenHeight === 812;
    this.$options.globalData.isIPhoneX = /iphone x/i.test(systemInfo.model) || iphoneNew;
  }
}, {info: {"noPromiseAPI":["createSelectorQuery"]}, handlers: {}, models: {}, refs: undefined });