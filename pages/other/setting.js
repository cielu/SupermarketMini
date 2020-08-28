"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _x = require('./../../vendor.js')(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  name: 'Setting',
  mixins: [_statusBar["default"]],
  data: {
    endDate: '',
    userInfo: null,
    actions: ['', '男', '女'],
    imgDomain: '',
    tabs: []
  },
  computed: _objectSpread({}, (0, _x.mapState)(['userInfo'])),
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    // 其他方法
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    userProtocol: function userProtocol() {
      _util["default"].navigateTo('/pages/other/webview?src=https://yhxd.shop/license');
    },
    exitLogin: function exitLogin() {
      wx.removeStorageSync('userInfo');
      wx.removeStorageSync('authorization'); // set global userInfo to null

      this.$app.$options.globalData.authorization = null; // set userInfo null

      _store["default"].dispatch('setUserInfo', null); // back


      this.onClickBack();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    console.log('onPullDownRefresh');
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"33-0":["clickLeft"]}}, handlers: {'33-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'33-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.userProtocol.apply(_vm, $args || [$event]);
  })();
}},'33-2': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/other/login');
  })();
}},'33-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.exitLogin.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });