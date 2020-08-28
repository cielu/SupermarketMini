"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _lottery = require('./../../api/lottery.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'mineLottery',
  mixins: [_statusBar["default"]],
  data: {
    curPage: 0,
    lotteryList: [],
    canLoadMore: true
  },
  onLoad: function onLoad(options) {
    // 获取我发起的抽奖
    this.loadMineLotteryList();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    loadMineLotteryList: function loadMineLotteryList() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // 获取活动商品
      if (!this.canLoadMore && page !== 0) return null; // api load

      (0, _lottery.getLotteryList)({
        page: page + 1,
        mine: true
      }).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this.canLoadMore = false;
        }

        _this.curPage = res.data.curPage;
        _this.lotteryList = _this.curPage === 1 ? res.data.data : _this.lotteryList.concat(res.data.data);
      });
    },
    onDeleteLottery: function onDeleteLottery(idx) {
      this.lotteryList.splice(idx, 1);
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.canLoadMore = true;
    this.loadMineLotteryList();
  }
}, {info: {"components":{"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"lottery-list":{"path":"./../../components/LotteryList"}},"on":{"27-1":["delete-lottery"]}}, handlers: {'27-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'27-1': {"delete-lottery": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onDeleteLottery.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });