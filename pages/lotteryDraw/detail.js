"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireWildcard(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _lottery = require('./../../api/lottery.js');

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'lotteryDetail',
  mixins: [_statusBar["default"]],
  data: {
    lotteryId: 0,
    lotteryOpenTime: '',
    lotteryJoinTimes: 0,
    lottery: null,
    winners: [],
    lotteryGifts: [],
    lotteryJoiners: [],
    showLotteryJoiner: false
  },
  onLoad: function onLoad(options) {
    // 获取抽奖详情
    if (typeof options.lotteryId === 'undefined') {
      this.onClickBack();
      return;
    } // 获取抽奖详情


    this.lotteryId = options.lotteryId;
  },
  onShow: function onShow() {
    this.loadLotteryDetail();
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
    handleLotteryJoiner: function handleLotteryJoiner() {
      this.showLotteryJoiner = !this.showLotteryJoiner;
    },
    viewAllJoiner: function viewAllJoiner() {
      if (this.lotteryJoiners.length > 7) {
        this.redirectTo('/pages/lotteryDraw/joinUsers?lotteryId=' + this.lottery.lotteryId);
      } else {
        _util["default"].toast('没有更多参奖者了');
      }
    },
    doLotteryDraw: function doLotteryDraw() {
      if (wx.requestSubscribeMessage) {
        var _this = this;

        wx.requestSubscribeMessage({
          tmplIds: [_util.MSG_TPL.lotteryOpenTpl],
          // 开奖结果通知
          complete: function complete(res) {
            _this.joinLotteryDraw();
          }
        });
      } else {
        this.joinLotteryDraw();
      }
    },
    joinLotteryDraw: function joinLotteryDraw() {
      var _this2 = this;

      // console.log(index)
      (0, _lottery.joinLottery)({
        lotteryId: this.lottery.lotteryId
      }).then(function (res) {
        _util["default"].toast(res.msg);

        if (res.status === 'success') {
          _this2.lotteryJoinTimes += 1;
        }
      });
    },
    previewSponsorCode: function previewSponsorCode() {
      wx.previewImage({
        current: this.lottery.sponsorCode,
        // 当前显示图片的http链接
        urls: [this.lottery.sponsorCode] // 需要预览的图片http链接列表

      });
    },
    loadLotteryDetail: function loadLotteryDetail() {
      var _this3 = this;

      // console.log('lotteryDetail')
      (0, _lottery.getLotteryDetail)(this.lotteryId).then(function (res) {
        // console.log(res)
        if (res.status === 'success') {
          // 判断中奖人信息
          if (res.data.winners != null) {
            _this3.winners = res.data.winners;
          }

          _this3.lottery = res.data.lottery;
          _this3.lotteryGifts = res.data.lotteryGifts;
          _this3.lotteryJoiners = res.data.lotteryJoiners;
          var openTime = new Date(_this3.lottery.lotteryOpenTime * 1000); // 获取到日期和时分

          _this3.lotteryOpenTime = openTime.getMonth() + 1 + '月' + openTime.getDate() + '日 ' + openTime.getHours() + ':' + openTime.getMinutes();
          _this3.lotteryJoinTimes = res.data.lotteryJoinTimes;
        }
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadLotteryDetail();
  },

  /**
   * 分享
   */
  onShareAppMessage: function onShareAppMessage() {
    return {
      path: '/pages/lotteryDraw/detail?lotteryId=' + this.lotteryId,
      success: function success(_) {}
    };
  }
}, {info: {"components":{"van-popup":{"path":"./../../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"van-card":{"path":"./../../$vendor/@vant/weapp/dist/card/index"}},"on":{"23-0":["tap"],"23-1":["tap"],"23-6":["close","touchmove"]}}, handlers: {'23-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'23-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickHome.apply(_vm, $args || [$event]);
  })();
}},'23-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.previewSponsorCode.apply(_vm, $args || [$event]);
  })();
}},'23-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleLotteryJoiner.apply(_vm, $args || [$event]);
  })();
}},'23-4': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.doLotteryDraw.apply(_vm, $args || [$event]);
  })();
}},'23-5': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.viewAllJoiner.apply(_vm, $args || [$event]);
  })();
}},'23-6': {"close": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleLotteryJoiner.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}}}, models: {}, refs: undefined });