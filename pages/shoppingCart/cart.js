"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _mix = _interopRequireDefault(require('./common/mix.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// other
_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"], _mix["default"]],
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    }
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-popup":{"path":"./../../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"van-stepper":{"path":"./../../$vendor/@vant/weapp/dist/stepper/index"},"van-notice-bar":{"path":"./../../$vendor/@vant/weapp/dist/notice-bar/index"},"van-swipe-cell":{"path":"./../../$vendor/@vant/weapp/dist/swipe-cell/index"},"van-checkbox":{"path":"./../../$vendor/@vant/weapp/dist/checkbox/index"},"goods-list-column":{"path":"./../../components/goodsListColumn"},"vip-price-box":{"path":"./../../components/vipPriceBox"},"guess-u-like-nav":{"path":"./../../components/guessULikeNav"}},"on":{"17-0":["clickLeft"],"17-1":["tap"],"17-6":["change"],"17-8":["minus","plus"],"17-11":["on-handle-cart"],"17-14":["close","touchmove"]}}, handlers: {'17-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'17-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/other/location');
  })();
}},'17-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showStoreListModal.apply(_vm, $args || [$event]);
  })();
}},'17-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.toHomePage.apply(_vm, $args || [$event]);
  })();
}},'17-4': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.makeUpABill();
  })();
}},'17-5': {"tap": function proxy (activities) {
    var _vm=this;
  return (function () {
    _vm.makeUpABill(activities.activity);
  })();
}},'17-6': {"change": function proxy (key, index) {
    var _vm=this;
  return (function () {
    _vm.handleGoodsSelect(key,index);
  })();
}},'17-7': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.toGoodsDetail(item.goodsCode);
  })();
}},'17-8': {"minus": function proxy (key, index) {
    var _vm=this;
  return (function () {
    _vm.onMinusGoodsNum(key,index);
  })();
}, "plus": function proxy (key, index) {
    var _vm=this;
  return (function () {
    _vm.onPlusGoodsNum(key,index);
  })();
}},'17-10': {"tap": function proxy (key, index) {
    var _vm=this;
  return (function () {
    _vm.handleRemove(key,index);
  })();
}},'17-11': {"on-handle-cart": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleAddCart.apply(_vm, $args || [$event]);
  })();
}},'17-12': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleSelectAll.apply(_vm, $args || [$event]);
  })();
}},'17-13': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.toSettle.apply(_vm, $args || [$event]);
  })();
}},'17-14': {"close": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showStoreListModal.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'17-16': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.chooseStore(_vm.store);
  })();
}}}, models: {}, refs: undefined });