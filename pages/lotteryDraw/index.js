"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _common = require('./../../utils/common.js');

var _lottery = require('./../../api/lottery.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'lotteryDraw',
  mixins: [_statusBar["default"]],
  data: {
    type: null,
    curPage: 0,
    winnerList: [],
    lotteryList: [],
    canLoadMore: true,
    transNavigation: true,
    showLotteryModal: false,
    lotteryActions: [{
      type: 'publishLottery',
      title: '发起抽奖',
      color: '#fc5b72'
    }, {
      type: 'myLotteryLog',
      title: '我发起的抽奖'
    }],
    userInfo: {}
  },
  onShow: function onShow() {
    // 获取我的抽奖机会
    this.loadLotteryChance(); // 获取抽奖列表

    this.loadLotteryList(); // 中奖用户

    this.loadWinnerJoiners();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    onClickHome: function onClickHome() {
      _util["default"].switchHome();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    introduceLotteryChance: function introduceLotteryChance() {
      _util["default"].toast('下单成功即可获得一次抽奖机会');
    },
    handleLotteryModal: function handleLotteryModal() {
      this.showLotteryModal = !this.showLotteryModal;
    },
    loadWinnerJoiners: function loadWinnerJoiners() {
      var _this = this;

      // 获取中奖用户
      (0, _lottery.getWinnerJoiners)().then(function (res) {
        _this.winnerList = res.data;
      });
    },
    loadLotteryChance: function loadLotteryChance() {
      var _this2 = this;

      // 请求抽奖机会
      (0, _lottery.getLotteryChance)().then(function (res) {
        _this2.userInfo = res.data;
      });
    },
    loadLotteryList: function loadLotteryList() {
      var _this3 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // 获取活动商品
      if (!this.canLoadMore && page !== 0) return null; // api load

      (0, _lottery.getLotteryList)({
        page: page + 1
      }).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this3.canLoadMore = false;
        }

        _this3.curPage = res.data.curPage;
        _this3.lotteryList = _this3.curPage === 1 ? res.data.data : _this3.lotteryList.concat(res.data.data);
      });
    },
    lotteryWinnerLog: function lotteryWinnerLog() {
      _util["default"].navigateTo('/pages/lotteryDraw/winnerLog');
    },
    clickLotteryAction: function clickLotteryAction(type) {
      // clickLotteryAction
      this.handleLotteryModal();

      switch (type) {
        case 'publishLottery':
          // 判断是否有开通发起抽奖
          // if (true) {
          //   this.handleLotteryModal()
          //   util.toast('没有权限，请向客服申请'); return
          // }
          this.redirectTo('/pages/lotteryDraw/publish');
          break;

        case 'myLotteryLog':
          this.redirectTo('/pages/lotteryDraw/mineLottery');
      }
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.canLoadMore = true;
    this.loadLotteryList();
    this.loadLotteryChance();
    this.loadWinnerJoiners();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {
    this.loadLotteryList(this.curPage);
  },

  /**
   * 页面滚动
   */
  onPageScroll: function onPageScroll(res) {
    // 滚动到 抽奖信息 card
    if (res.scrollTop < 75) {
      this.transNavigation = true;
      (0, _common.setNavBarColor)('#ffffff');
    } else {
      this.transNavigation = false;
      (0, _common.setNavBarColor)('#000000');
    }
  }
}, {info: {"components":{"van-popup":{"path":"./../../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"lottery-list":{"path":"./../../components/LotteryList"}},"on":{"22-0":["tap"],"22-1":["tap"],"22-3":["tap"],"22-5":["close","touchmove"]}}, handlers: {'22-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'22-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickHome.apply(_vm, $args || [$event]);
  })();
}},'22-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.lotteryWinnerLog.apply(_vm, $args || [$event]);
  })();
}},'22-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.introduceLotteryChance.apply(_vm, $args || [$event]);
  })();
}},'22-4': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleLotteryModal.apply(_vm, $args || [$event]);
  })();
}},'22-5': {"close": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showLotteryModal=false;
  })();
}, "touchmove": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.returnx.apply(_vm, $args || [$event]);
  })();
}},'22-7': {"tap": function proxy (action) {
    var _vm=this;
  return (function () {
    _vm.clickLotteryAction(action.type);
  })();
}},'22-8': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showLotteryModal=false;
  })();
}}}, models: {}, refs: undefined });