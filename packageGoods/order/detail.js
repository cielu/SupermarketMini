"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _order = require('./../../api/order.js');

var _common = require('./../../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  mixins: [_statusBar["default"]],
  data: {
    showAll: false,
    statusText: ['已取消', '待支付', '待发货', '已发货', '已收货', '已完成'],
    outTradeNo: '',
    orderDetail: [],
    orderInfo: {},
    storeInfo: {},
    receiveAddr: {}
  },
  onLoad: function onLoad(options) {
    // 没有传订单号
    if (typeof options.outTradeNo === 'undefined') {
      _util["default"].toast('系统错误!');

      this.onClickBack();
      return false;
    }

    this.outTradeNo = options.outTradeNo;
    this.getOrderDetail();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    contactDeliver: function contactDeliver() {
      _util["default"].toast('联系骑手');
    },
    payOrder: function payOrder() {
      var order = this.orderInfo;
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
    },
    copyTradeNo: function copyTradeNo() {
      wx.setClipboardData({
        data: this.outTradeNo
      });
    },
    // 获取订单详情
    getOrderDetail: function getOrderDetail() {
      var _this = this;

      // 请求API
      (0, _order.getOrderDetail)(this.outTradeNo).then(function (res) {
        if (res.status === 'success') {
          var _res$data = res.data,
              orderInfo = _res$data.orderInfo,
              orderDetail = _res$data.orderDetail,
              storeInfo = _res$data.storeInfo,
              receiveAddr = _res$data.receiveAddr;
          orderInfo.paidAt = (0, _common.unixToLocal)(orderInfo.paidAt);
          orderInfo.outTradeNo = (0, _common.beautifyStr)(_this.outTradeNo);
          _this.orderInfo = orderInfo;
          _this.orderDetail = orderDetail;
          _this.storeInfo = storeInfo;
          _this.receiveAddr = receiveAddr;
        }
      });
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.getOrderDetail();
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"van-cell":{"path":"../../$vendor/@vant/weapp/dist/cell/index"},"van-button":{"path":"../../$vendor/@vant/weapp/dist/button/index"}},"on":{"32-0":["clickLeft"],"32-1":["tap"]}}, handlers: {'32-0': {"clickLeft": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'32-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.copyTradeNo($event);
      })();
    
  }},'32-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.contactDeliver($event);
      })();
    
  }},'32-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showAll=!_vm.showAll;
      })();
    
  }},'32-4': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.payOrder($event);
      })();
    
  }}}, models: {}, refs: undefined });