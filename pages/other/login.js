"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _other = require('./../../api/other.js');

var _auth = require('./../../api/auth.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  store: _store["default"],
  data: {
    isShowScopeModal: false,
    countDownTime: 60,
    user_info: {},
    code: null,
    phone: '',
    verify_code: '',
    verify_txt: '获取验证码'
  },
  onLoad: function onLoad(options) {
    var _this = this;

    _this.refreshCode(); // 判断授权


    wx.getSetting({
      success: function success(res) {
        // 判断用户授权情况
        if (!res.authSetting['scope.userInfo']) {
          _this.isShowScopeModal = true;
        } else {
          wx.getUserInfo({
            success: function success(res) {
              _this.user_info = res.userInfo;
            }
          });
        }
      }
    });
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    // 其他方法
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    onClickHome: function onClickHome() {
      _util["default"].switchHome();
    },
    refreshCode: function refreshCode() {
      var _this = this; // 登录


      wx.login({
        success: function success(res) {
          _this.code = res.code;
        }
      });
    },
    phoneInput: function phoneInput(e) {
      this.phone = e.$wx.detail.value;
    },
    verifyInput: function verifyInput(e) {
      this.verify_code = e.$wx.detail.value;
    },
    countDown: function countDown() {
      var _this2 = this;

      // 倒计时
      var authTimer = setInterval(function () {
        // 定时器设置每秒递减
        _this2.countDownTime--; // 递减时间

        _this2.verify_txt = _this2.countDownTime + 's重新获取';

        if (_this2.countDownTime <= 0) {
          _this2.verify_txt = '获取验证码';
          _this2.countDownTime = 60;
          clearInterval(authTimer);
        }
      }, 1000);
    },
    getVerifyCode: function getVerifyCode() {
      // 验证手机号
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)) {
        _util["default"].toast('请输入正确的手机号');

        return;
      }

      if (this.countDownTime !== 60) {
        return;
      }

      this.countDown(); // console.log('获取验证码')

      var form = {};
      form.phone = this.phone;
      form.type = 'login'; // 获取验证码

      (0, _other.sendSmsCode)(form).then(function (res) {
        _util["default"].toast(res.msg);
      });
    },
    getUserInfo: function getUserInfo(userInfo) {
      this.user_info = userInfo;
      this.isShowScopeModal = false;
    },
    login: function login() {
      // 验证手机号
      if (!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)) {
        _util["default"].toast('请输入正确的手机号');

        return;
      }

      if ([5, 6].indexOf(this.verify_code.length) === -1) {
        _util["default"].toast('请输入正确的验证码');

        return;
      }

      var form = this.formatForm();
      form.phone = this.phone;
      form.verify_code = this.verify_code;
      form['code'] = this.code; // 手机号登录

      this.loginForm(form, 'phone');
    },
    getPhoneNumber: function getPhoneNumber(e) {
      // console.log(e.$wx.detail)
      if (e.$wx.detail.errMsg === 'getPhoneNumber:ok') {
        // login
        var form = this.formatForm();
        form.type = 'phone';
        form.code = this.code;
        form.encryptedData = e.$wx.detail.encryptedData;
        form.iv = e.$wx.detail.iv; // 小程序登录

        this.loginForm(form, 'miniApp');
      } else {
        _util["default"].toast('获取手机号失败!');
      }
    },
    formatForm: function formatForm() {
      var form = {};
      form.province = this.user_info.province;
      form.city = this.user_info.city;
      form.nickname = this.user_info.nickName;
      form.avatar = this.user_info.avatarUrl;
      form.gender = this.user_info.gender;
      return form;
    },
    loginForm: function loginForm(data) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'miniApp';

      var _this = this; // 登录


      (0, _auth.loginByType)(type, data).then(function (loginRes) {
        // console.log(loginRes)
        if (loginRes.status === 'error') {
          _this.refreshCode();

          _util["default"].toast(loginRes.msg);

          return;
        } // user info


        _store["default"].dispatch('setUserInfo', loginRes.data.user); // login token


        _this.$app.$options.globalData.authorization = loginRes.data.token;
        wx.setStorageSync('userInfo', loginRes.data.user);
        wx.setStorageSync('authorization', loginRes.data.token); //  login success

        _util["default"].toast('登录成功!');

        setTimeout(function () {
          _this.onClickBack();
        }, 1000);
      });
    }
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"scope-modal":{"path":"./../../components/scopeModal"}},"on":{"35-0":["tap"],"35-1":["tap"],"35-7":["get-user-info"]}}, handlers: {'35-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'35-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickHome.apply(_vm, $args || [$event]);
  })();
}},'35-2': {"input": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.phoneInput.apply(_vm, $args || [$event]);
  })();
}},'35-3': {"input": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.verifyInput.apply(_vm, $args || [$event]);
  })();
}},'35-4': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.getVerifyCode();
  })();
}},'35-5': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.login();
  })();
}},'35-6': {"getphonenumber": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getPhoneNumber.apply(_vm, $args || [$event]);
  })();
}},'35-7': {"get-user-info": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getUserInfo.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });