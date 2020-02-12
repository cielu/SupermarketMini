"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// other
_core["default"].page({
  name: 'setting',
  mixins: [_statusBar["default"]],
  data: {
    endDate: '',
    actions: ['', '男', '女'],
    imgDomain: '',
    tabs: []
  },
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
      _util["default"].toast('用户协议');
    },
    abnormalSuggest: function abnormalSuggest() {
      _util["default"].toast('功能异常反馈');
    },
    exitLogin: function exitLogin() {
      wx.setStorageSync('userInfo', null);
      wx.setStorageSync('authorization', null); // set global userInfo to null

      this.$app.$options.globalData.userInfo = null; // back

      this.onClickBack();
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    console.log('onPullDownRefresh');
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"17-0":["clickLeft"]}}, handlers: {'17-0': {"clickLeft": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'17-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.userProtocol($event);
      })();
    
  }},'17-2': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/pages/other/login');
      })();
    
  }},'17-3': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.exitLogin($event);
      })();
    
  }}}, models: {}, refs: undefined });