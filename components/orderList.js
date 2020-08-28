"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

var _util = _interopRequireDefault(require('./../utils/util.js'));

var _order = require('./../api/order.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  data: {
    orderType: ['配送', '线下', '拼团'],
    statusText: ['已取消', '待支付', '已支付', '骑手已接单', '配送中', '已送达', '已完成', '待退款', '', '已退款'],
    orderList: []
  },
  props: {
    list: {
      type: Array,
      "default": []
    }
  },
  watch: {
    list: function list(newVal) {
      this.orderList = newVal;
    }
  },
  methods: {
    toCategory: function toCategory() {
      wx.switchTab({
        url: '/pages/category/index'
      });
    },
    toOrderDetail: function toOrderDetail(outTradeNo) {
      _util["default"].navigateTo('/packageGoods/order/detail?outTradeNo=' + outTradeNo);
    },
    inviteJoinGroup: function inviteJoinGroup(order) {
      _util["default"].navigateTo('/packageGoods/spellGroup/invite?orderId=' + order.orderId);
    },
    // ensureReceive(order) {
    //   console.log(order)
    // },
    payOrder: function payOrder(order) {
      (0, _order.getPayInfo)({
        orderId: order.orderId
      }).then(function (res) {
        // 发布成功则跳回
        if (res.status === 'success') {
          var payCfg = res.data; // 微信支付

          wx.requestPayment({
            timeStamp: payCfg.timestamp,
            nonceStr: payCfg.nonceStr,
            "package": payCfg["package"],
            signType: 'MD5',
            paySign: payCfg.paySign,
            success: function success(res) {
              wx.redirectTo({
                url: '/packageGoods/order/index?outTradeNo=' + order.outTradeNo
              });
            },
            fail: function fail(res) {
              _util["default"].toast('您取消了支付');
            }
          });
        } else {
          _util["default"].toast(res.msg);
        }
      });
    }
  }
}, {info: {"components":{"end-line":{"path":"./endLine"}},"on":{}}, handlers: {'88-0': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.toOrderDetail(item.outTradeNo);
  })();
}},'88-1': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.inviteJoinGroup(item);
  })();
}},'88-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.toCategory.apply(_vm, $args || [$event]);
  })();
}},'88-3': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.payOrder(item);
  })();
}}}, models: {}, refs: undefined });