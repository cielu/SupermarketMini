"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _other = require('./../../api/other.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'RedPack',
  mixins: [_statusBar["default"]],
  data: {
    type: null,
    curPage: 0,
    typeMap: {
      'vip': '会员专属',
      'store': '门店活动',
      'normal': '普通',
      'newer': '新人'
    },
    redPackList: [],
    canLoadMore: true
  },
  onLoad: function onLoad(options) {
    // 获取我的红包
    this.loadRedPacks();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    loadRedPacks: function loadRedPacks() {
      var _this = this;

      // 参数
      var params = {}; // 类型

      if (params.hasUsed) {
        params.hasUsed = true;
      } // 获取团购商品


      (0, _other.getUserRedPacks)(params).then(function (res) {
        if (res.status === 'success') {
          _this.redPackList = res.data;
        }
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadRedPacks();
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"21-0":["clickLeft"]}}, handlers: {'21-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });