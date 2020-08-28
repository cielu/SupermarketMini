"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _lottery = require('./../../api/lottery.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'lotteryJoinUsers',
  mixins: [_statusBar["default"]],
  data: {
    lotteryId: 0,
    curPage: 0,
    totalCount: 0,
    joinUserList: [],
    canLoadMore: true
  },
  onLoad: function onLoad(options) {
    // 判断抽奖活动
    if (typeof options.lotteryId === 'undefined') {
      this.onClickBack();
      return;
    }

    this.lotteryId = options.lotteryId;
    this.loadLotteryJoiners();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    loadLotteryJoiners: function loadLotteryJoiners() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      // 获取活动商品
      if (!this.canLoadMore && page !== 0) {
        _util["default"].toast('没有更多数据了');

        return;
      }

      var params = {
        lotteryId: this.lotteryId,
        page: page + 1
      }; // api load

      (0, _lottery.getLotteryJoiners)(params).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this.canLoadMore = false;
        }

        _this.curPage = res.data.curPage;
        _this.totalCount = res.data.totalCount;
        _this.joinUserList = _this.curPage === 1 ? res.data.data : _this.joinUserList.concat(res.data.data);
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.canLoadMore = true;
    this.loadLotteryJoiners();
  }
}, {info: {"components":{"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{}}, handlers: {'24-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'24-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.loadLotteryJoiners.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });