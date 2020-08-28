"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _order = require('./../../api/order.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  mixins: [_statusBar["default"]],
  data: {
    curPage: 1,
    userInfo: null,
    orderList: [],
    curTab: 'canTaking',
    canLoadMore: true,
    orderTabs: {
      canTaking: {
        name: '可接单',
        val: 0
      },
      waitTaking: {
        name: '待取货',
        val: 0
      },
      sendTaking: {
        name: '配送中',
        val: 0
      },
      finished: {
        name: '已完成',
        val: 0
      }
    }
  },
  onShow: function onShow() {
    this.loadTakingOrders();
    this.loadTakingOrderCount();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    onClickHome: function onClickHome() {
      _util["default"].switchHome();
    },
    clickTab: function clickTab(idx) {
      // 当前tab
      if (this.curTab === idx) return; // 切换tab

      this.curTab = idx;
      this.curPage = 0;
      this.canLoadMore = true;
      this.orderList = [];
      this.loadTakingOrders();
    },
    merchantRoute: function merchantRoute(_ref) {
      var address = _ref.address,
          lat = _ref.lat,
          lng = _ref.lng;

      // 路线规划
      _util["default"].routePlan({
        name: address,
        latitude: lat,
        longitude: lng
      });
    },
    buyerRoute: function buyerRoute(_ref2) {
      var addressDetail = _ref2.addressDetail,
          lat = _ref2.lat,
          lng = _ref2.lng;

      _util["default"].routePlan({
        name: addressDetail,
        latitude: lat,
        longitude: lng
      });
    },
    makePhoneCall: function makePhoneCall(phoneNumber) {
      wx.makePhoneCall({
        phoneNumber: phoneNumber
      });
    },
    // 完成取货
    changeStatus: function changeStatus(index, type) {
      // 订单状态
      var order = this.orderList[index];
      var title, content;

      switch (type) {
        case 'finishGetGoods':
          // 完成取货
          if (order.status !== 2) return;
          title = '确认取货';
          content = '您确认已经拿到商品了吗';
          break;

        case 'sureArrive':
          // 确认送达
          if (order.status !== 3) return;
          title = '确认送达';
          content = '您确认已经送到买家手中了吗';
          break;
      }

      var _this = this; // 确认弹窗


      wx.showModal({
        title: title,
        content: content,
        success: function success(res) {
          if (res.confirm) {
            // 更新状态
            (0, _order.updateStatus)({
              outTradeNo: order.outTradeNo,
              type: type
            }).then(function (res) {
              _util["default"].toast(res.msg);

              if (res.status === 'success') {
                // 判断操作状态 完成取货
                switch (type) {
                  case 'finishGetGoods':
                    // 减少待取货数量 & 增加配送中数量
                    _this.orderTabs.waitTaking.val -= 1;
                    _this.orderTabs.sendTaking.val += 1;
                    _this.orderList[index].status = 3;
                    break;

                  case 'sureArrive':
                    // 减少配送中数量 & 增加已完成数量
                    _this.orderTabs.sendTaking.val -= 1;
                    _this.orderTabs.finished.val += 1;
                    _this.orderList[index].status = 4;
                    break;
                }
              }
            });
          }
        }
      });
    },
    grabOrder: function grabOrder(index) {
      var _this = this;

      var order = _this.orderList[index];
      if (order.status !== 1) return;
      wx.showModal({
        title: '确认接单',
        content: '接单后请准时送达！',
        success: function success(res) {
          if (res.confirm) {
            // 立即抢单
            (0, _order.grabOrderNow)({
              outTradeNo: order.outTradeNo
            }).then(function (res) {
              _util["default"].toast(res.msg); // 抢单成功


              switch (res.status) {
                case 'success':
                  // 减少可取货数量 & 增加待取货数量
                  _this.orderTabs.canTaking.val -= 1;
                  _this.orderTabs.waitTaking.val += 1;
                  _this.orderList[index].status = 2;
                  break;

                case 'robbed':
                  // 减少可取货数量
                  _this.orderTabs.canTaking.val -= 1;
                  _this.orderList[index].status = 2;
                  break;

                default:
              }
            });
          }
        }
      });
    },
    loadTakingOrderCount: function loadTakingOrderCount() {
      var _this2 = this;

      (0, _order.getTakingOrderCount)().then(function (res) {
        if (res.status === 'success') {
          var orderTabs = Object.assign({}, _this2.orderTabs);

          for (var key in orderTabs) {
            orderTabs[key].val = res.data[key];
          }

          _this2.orderTabs = orderTabs;
        }
      });
    },
    loadTakingOrders: function loadTakingOrders() {
      var _this3 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // 获取活动商品
      if (!this.canLoadMore && page !== 0) return null; // 获取接单列表

      (0, _order.getTakingOrder)(this.curTab, {
        page: page + 1
      }).then(function (res) {
        if (res.status !== 'success') {
          _util["default"].toast(res.msg);

          return;
        } // 当前总数小于当前页面大小，则无更多数据


        if (res.data.curTotal < res.data.curPageSize) {
          _this3.canLoadMore = false;
        }

        _this3.curPage = res.data.curPage;
        _this3.orderList = _this3.curPage === 1 ? res.data.data : _this3.orderList.concat(res.data.data);
      });
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.curPage = 0;
    this.canLoadMore = true;
    this.loadTakingOrderCount();
    this.loadTakingOrders(this.curPage);
  } //

}, {info: {"components":{"van-popup":{"path":"./../../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"30-0":["tap"],"30-1":["tap"]}}, handlers: {'30-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'30-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickHome.apply(_vm, $args || [$event]);
  })();
}},'30-2': {"tap": function proxy (idx) {
    var _vm=this;
  return (function () {
    _vm.clickTab(idx);
  })();
}},'30-3': {"tap": function proxy (order) {
    var _vm=this;
  return (function () {
    _vm.merchantRoute(order.storeDetail);
  })();
}},'30-4': {"tap": function proxy (order) {
    var _vm=this;
  return (function () {
    _vm.buyerRoute(order.distributeAddress);
  })();
}},'30-5': {"tap": function proxy (key) {
    var _vm=this;
  return (function () {
    _vm.grabOrder(key);
  })();
}},'30-6': {"tap": function proxy (order) {
    var _vm=this;
  return (function () {
    _vm.merchantRoute(order.storeDetail);
  })();
}},'30-7': {"tap": function proxy (order) {
    var _vm=this;
  return (function () {
    _vm.makePhoneCall(order.storeDetail.contactTel);
  })();
}},'30-8': {"tap": function proxy (key) {
    var _vm=this;
  return (function () {
    _vm.changeStatus(key,'finishGetGoods');
  })();
}},'30-9': {"tap": function proxy (order) {
    var _vm=this;
  return (function () {
    _vm.buyerRoute(order.distributeAddress);
  })();
}},'30-10': {"tap": function proxy (order) {
    var _vm=this;
  return (function () {
    _vm.makePhoneCall(order.distributeAddress.linkPhone);
  })();
}},'30-11': {"tap": function proxy (key) {
    var _vm=this;
  return (function () {
    _vm.changeStatus(key,'sureArrive');
  })();
}},'30-12': {"tap": function proxy (order) {
    var _vm=this;
  return (function () {
    _vm.makePhoneCall(order.storeDetail.contactTel);
  })();
}},'30-13': {"tap": function proxy (order) {
    var _vm=this;
  return (function () {
    _vm.makePhoneCall(order.distributeAddress.linkPhone);
  })();
}}}, models: {}, refs: undefined });