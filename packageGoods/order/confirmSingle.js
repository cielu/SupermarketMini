"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(2));

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireWildcard(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _sendTime = require('./../../utils/send-time.js');

var _address = require('./../../api/address.js');

var _order = require('./../../api/order.js');

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"]],
  data: {
    scrollTop: 0,
    statusBarHeight: 50,
    isShowTimeModal: false,
    isShowAddressModal: false,
    showRedPackModal: false,
    addressList: [],
    redPackList: [],
    goods: {},
    form: {
      type: 'cart',
      cartIds: '',
      goodsId: 0,
      activityId: 0,
      groupCode: 0,
      goodsNum: 1,
      addressId: 0,
      storeId: 0,
      sendTime: '请选择',
      userRemark: ''
    },
    address: {},
    storeInfo: {},
    totalDiscount: 0,
    settle: {
      totalPrice: 0,
      goodsTotalPrice: 0,
      goodsTotalNum: 0,
      sendFee: 0,
      packingFee: 0,
      vipSaveFee: 0,
      storeDiscount: 0,
      promActivities: [],
      redPackFee: 0,
      redPackIds: '',
      canUseRedPack: false
    },
    hasSubmit: false,
    genders: ['未知', '先生', '女士'],
    acDateIdx: 0,
    acHourIdx: 0,
    dateItems: [],
    hourItems: []
  },
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea'])),
  onLoad: function onLoad(options) {
    // console.log(options)
    if (typeof options.storeId === 'undefined') {
      this.onClickBack();
    } // 开团购买


    if (options.activityId) {
      this.form.type = 'group';
      this.form.activityId = options.activityId;
    } // 单独购买


    if (options.goodsId) {
      this.form.type = 'buyAlone';
      this.form.goodsId = options.goodsId;
    } // 参团


    if (options.groupCode) {
      this.form.groupCode = options.groupCode;
    } // 商品数量


    if (options.goodsNum) {
      this.form.goodsNum = options.goodsNum;
    }

    this.form.storeId = options.storeId;
  },
  onShow: function onShow() {
    this.loadData();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x.mapActions)(['syncCurrentArea']), {
    // vuex 方法
    // 其他方法
    loadData: function loadData() {
      var _this2 = this;

      return _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee() {
        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this2.getCurrentArea();

              case 2:
                _context.next = 4;
                return _this2.confirmOrder();

              case 4:
                _this2.formatTime();

                _this2.loadAddressList();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    addAddress: function addAddress(addressId) {
      _util["default"].navigateTo('/pages/address/edit', 'addressId=' + addressId);
    },
    toGoodsList: function toGoodsList() {
      var _this$form = this.form,
          storeId = _this$form.storeId,
          cartIds = _this$form.cartIds;

      _util["default"].navigateTo('/packageGoods/order/goodsList', 'storeId=' + storeId + '&cartIds=' + cartIds);
    },
    onChooseRedPack: function onChooseRedPack(ev) {
      this.showRedPackModal = false; //  toggle checkbox

      var redPack = this.redPackList[ev.currentTarget.dataset.index];

      if (typeof redPack === 'undefined') {
        return;
      } // 判断红包


      if (redPack.userRid === this.settle.redPackIds) {
        this.settle.redPackIds = '';
        this.settle.redPackFee = 0;
        this.settle.totalPrice += redPack.discountAmount;
      } else {
        this.settle.redPackIds = redPack.userRid;
        this.settle.redPackFee = redPack.discountAmount;
        this.settle.totalPrice -= redPack.discountAmount;
      }
    },
    chooseAddress: function chooseAddress(index) {
      this.address = this.addressList[index];
      this.form.addressId = this.address.addressId;
      this.isShowAddressModal = false;
    },
    formatTime: function formatTime() {
      // 获取日期
      var hourItems = [];
      var date = new Date(); // 获取今天

      var today = date.getDay();
      var curHour = date.getHours();
      var curMin = date.getMinutes();
      var bizStart = ['00', '00'];
      var bizEnd = ['23', '00']; // 获取店铺的营业时间 (06:00-23:00)

      var bizHours = this.storeInfo.bizHours.split('-');

      if (typeof bizHours !== 'undefined') {
        // 获取营业时间的小时与分钟
        bizStart = bizHours[0].split(':'); // 当前时间还没到开店营业时间

        if (curHour < bizStart[0]) {
          curHour = parseInt(bizStart[0]);
          curMin = parseInt(bizStart[1]); // 关门时间

          this.preSendTime = '今天' + bizHours[0];
        }

        if (bizHours.length === 2) {
          bizEnd = bizHours[1].split(':'); // 当前时间大于开店时间

          if (curHour > parseInt(bizEnd[0])) {
            this.preSendTime = '明天' + bizHours[1];
          }
        }
      }

      var startTime = curHour + ':' + curMin;

      if (curHour >= 23) {
        startTime = bizStart.join(':');
      } else {
        this.form.sendTime = "\u7ACB\u5373\u914D\u9001(\u9884\u8BA1".concat((0, _sendTime.formatTime)(curHour + 1) + ':' + (0, _sendTime.formatTime)(curMin), "\u9001\u8FBE)");
        hourItems.push(this.form.sendTime);
      }

      this.dateItems = (0, _sendTime.getSendDay)(today, curHour);
      this.dateItems[0].children = hourItems.concat((0, _sendTime.getSendDuration)(startTime, bizEnd.join(':')));
    },
    onChooseDate: function onChooseDate(i) {
      this.acDateIdx = i;
      this.acHourIdx = 0;
      this.scrollTop = this.scrollTop === 0 ? 0.01 : 0;

      if (i > 0) {
        if (this.dateItems[i].children.length === 0) {
          var bizHours = this.storeInfo.bizHours.split('-');
          var startHour = bizHours[0];
          var endHour = '23:30';

          if (bizHours.length === 2) {
            endHour = bizHours[1];
          }

          this.dateItems[i].children = (0, _sendTime.getSendDuration)(startHour, endHour);
        }
      }
    },
    onChooseTime: function onChooseTime(i) {
      this.acHourIdx = i;
      var dateItem = this.dateItems[this.acDateIdx];
      var tmpText = dateItem.children[i];

      if (dateItem.idx > 0) {
        tmpText = dateItem.text + tmpText;
      }

      this.form.sendTime = tmpText;
      this.handleTimeModal();
    },
    onPlusGoodsNum: function onPlusGoodsNum() {
      this.form.goodsNum++; // 实付价

      var price = 0;

      if (this.form.type === 'group') {
        price = this.goods.groupPrice;
      } else {
        price = this.goods.salePrice;
      } // 实付价


      this.settle.goodsTotalPrice = this.form.goodsNum * price;
      this.settle.totalPrice = this.settle.goodsTotalPrice - this.settle.redPackFee;
    },
    onMinusGoodsNum: function onMinusGoodsNum() {
      // 购买数量必须大于等于起购数量
      if (this.form.goodsNum > this.goods.saleStartNum) {
        this.form.goodsNum--;
      }

      var price = this.goods.salePrice;

      if (this.form.type === 'group') {
        price = this.goods.groupPrice;
      } // 实付价


      this.settle.goodsTotalPrice = this.form.goodsNum * price;
      this.settle.totalPrice = this.settle.goodsTotalPrice - this.settle.redPackFee;
    },
    handleRemarkInput: function handleRemarkInput(e) {
      this.form.userRemark = e.$wx.detail.value;
    },
    handleSubmit: function handleSubmit() {
      if (wx.requestSubscribeMessage) {
        var _this = this;

        wx.requestSubscribeMessage({
          tmplIds: [_util.MSG_TPL.groupOrderSuccess, // 开团成功
          _util.MSG_TPL.groupOrderStatus, // 拼团状态
          _util.MSG_TPL.cancelOrder // 取消订单
          ],
          complete: function complete(res) {
            _this.doSubmitForm();
          }
        });
      } else {
        this.doSubmitForm();
      }
    },
    doSubmitForm: function doSubmitForm() {
      var _this3 = this;

      if (this.hasSubmit) {
        _util["default"].toast('请勿重复提交!');

        return;
      }

      if (this.form.sendTime === '请选择') {
        _util["default"].toast('请选择送达时间');

        return;
      }

      if (this.form.addressId === 0) {
        _util["default"].toast('请选择收货地址');

        return;
      }

      this.hasSubmit = true;
      this.form.redPackIds = this.settle.redPackIds; // 结算订单

      (0, _order.settleOrder)(this.form).then(function (res) {
        _this3.hasSubmit = false; // 发布成功则跳回

        if (res.status === 'success') {
          var _res$data = res.data,
              payCfg = _res$data.payCfg,
              outTradeNo = _res$data.outTradeNo; // 微信支付

          wx.requestPayment({
            timeStamp: payCfg.timestamp,
            nonceStr: payCfg.nonceStr,
            "package": payCfg["package"],
            signType: 'MD5',
            paySign: payCfg.paySign,
            success: function success(res) {
              wx.redirectTo({
                url: '/packageGoods/order/index?outTradeNo=' + outTradeNo
              });
            },
            fail: function fail(res) {
              _util["default"].toast('您取消了支付');
            }
          });
        } else {
          _util["default"].toast(res.msg);
        }
      })["catch"](function (_) {
        _this3.hasSubmit = false;

        _util["default"].toast('网络错误，提交订单失败');
      });
    },
    handleAddressModal: function handleAddressModal() {
      this.isShowAddressModal = !this.isShowAddressModal;
    },
    handleTimeModal: function handleTimeModal() {
      this.isShowTimeModal = !this.isShowTimeModal;
    },
    // 获取当前位置
    getCurrentArea: function getCurrentArea() {
      var _this4 = this;

      return _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee2() {
        return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(_this4.currentArea === null)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return _this4.syncCurrentArea();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 确认订单
    confirmOrder: function confirmOrder() {
      var _this5 = this;

      return _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee3() {
        var res;
        return _regeneratorRuntime2["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // 传入参数
                if (_this5.currentArea !== null) {
                  _this5.form.lat = _this5.currentArea.location.lat;
                  _this5.form.lng = _this5.currentArea.location.lng;
                } // get data


                _context3.next = 3;
                return (0, _order.confirmOrder)(_this5.form);

              case 3:
                res = _context3.sent;
                _this5.storeInfo = res.data.store;
                _this5.address = res.data.address;
                _this5.goods = res.data.goods;
                _this5.settle = res.data.settle;
                _this5.redPackList = res.data.redPackList; // 重制 收获地址 & 可用红包

                _this5.form.addressId = _this5.address.addressId; // 有选择红包

                _this5.form.redPackIds = _this5.settle.redPackIds;

                if (_this5.goods === null) {
                  _util["default"].toast('商品不存在，请重新下单');
                }

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }))();
    },
    loadAddressList: function loadAddressList() {
      var _this6 = this;

      (0, _address.getAddressList)().then(function (res) {
        _this6.addressList = res.data.data;
      });
    }
  }),
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadData();
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-popup":{"path":"./../../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"van-stepper":{"path":"./../../$vendor/@vant/weapp/dist/stepper/index"},"van-checkbox":{"path":"./../../$vendor/@vant/weapp/dist/checkbox/index"},"van-cell":{"path":"./../../$vendor/@vant/weapp/dist/cell/index"}},"on":{"48-0":["clickLeft"],"48-3":["minus","plus"],"48-5":["tap"],"48-8":["close","touchmove"],"48-10":["tap"],"48-13":["close","touchmove"],"48-16":["tap"],"48-17":["close","touchmove"],"48-19":["tap"],"48-22":["tap"]}}, handlers: {'48-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'48-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleAddressModal.apply(_vm, $args || [$event]);
  })();
}},'48-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleTimeModal.apply(_vm, $args || [$event]);
  })();
}},'48-3': {"minus": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onMinusGoodsNum.apply(_vm, $args || [$event]);
  })();
}, "plus": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onPlusGoodsNum.apply(_vm, $args || [$event]);
  })();
}},'48-5': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showRedPackModal=!_vm.showRedPackModal;
  })();
}},'48-6': {"input": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleRemarkInput.apply(_vm, $args || [$event]);
  })();
}},'48-7': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleSubmit.apply(_vm, $args || [$event]);
  })();
}},'48-8': {"close": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleTimeModal.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'48-10': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleTimeModal.apply(_vm, $args || [$event]);
  })();
}},'48-11': {"tap": function proxy (idx) {
    var _vm=this;
  return (function () {
    _vm.onChooseDate(idx);
  })();
}},'48-12': {"tap": function proxy (index) {
    var _vm=this;
  return (function () {
    _vm.onChooseTime(index);
  })();
}},'48-13': {"close": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showRedPackModal=false;
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'48-15': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onChooseRedPack.apply(_vm, $args || [$event]);
  })();
}},'48-16': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onChooseRedPack.apply(_vm, $args || [$event]);
  })();
}},'48-17': {"close": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleAddressModal.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'48-19': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleAddressModal.apply(_vm, $args || [$event]);
  })();
}},'48-20': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.addAddress.apply(_vm, $args || [$event]);
  })();
}},'48-21': {"tap": function proxy (index) {
    var _vm=this;
  return (function () {
    _vm.chooseAddress(index);
  })();
}},'48-22': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.addAddress(item.addressId);
  })();
}}}, models: {}, refs: undefined });