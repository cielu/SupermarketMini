"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _other = require('./../../api/other.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'IntegralLog',
  mixins: [_statusBar["default"]],
  data: {
    type: null,
    curPage: 0,
    typeMap: ['下单奖励', '签到获取', '系统奖励', '抽奖消耗', '商城消费'],
    logList: [],
    canLoadMore: true
  },
  onLoad: function onLoad(options) {
    if (typeof options.type !== 'undefined') {
      this.type = options.type;
    } // 初始化积分记录


    this.loadIntegralLogs();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    loadIntegralLogs: function loadIntegralLogs() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!this.canLoadMore) return null; // 参数

      var params = {
        page: page + 1
      }; // 类型

      if (this.type != null) {
        params.type = this.type;
      } // 获取团购商品


      (0, _other.getIntegralLog)(params).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this.canLoadMore = false;
        }

        _this.curPage = res.data.curPage;
        _this.logList = page === 0 ? res.data.data : _this.logList.concat(res.data.data);
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.canLoadMore = true;
    this.loadIntegralLogs();
  },
  onReachBottom: function onReachBottom() {
    this.loadIntegralLogs(this.curPage);
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"20-0":["clickLeft"]}}, handlers: {'20-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });