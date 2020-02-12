"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(2));

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _sendTime = require('./../../utils/send-time.js');

var _address = require('./../../api/address.js');

var _order = require('./../../api/order.js');

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
    addressList: [],
    goodsList: {},
    form: {
      type: 'cart',
      cartIds: '',
      goodsId: 0,
      addressId: 0,
      storeId: 0,
      sendTime: '请选择',
      userRemark: ''
    },
    address: {},
    storeInfo: null,
    settle: {
      totalPrice: 0,
      goodsTotalPrice: 0,
      goodsTotalNum: 0,
      sendFee: 0,
      redPack: 0
    },
    preSendTime: '',
    // 预定配送时间
    hasSubmit: false,
    genders: ['未知', '先生', '女士'],
    acDateIdx: 0,
    acHourIdx: 0,
    dateItems: [],
    hourItems: []
  },
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea'])),
  onLoad: function onLoad(options) {
    console.log(options);

    if (typeof options.storeId === 'undefined') {
      this.onClickBack();
    } // 通过购物车结算进入


    if (options.cartIds) {
      this.form.type = 'cart';
      this.form.cartIds = options.cartIds;
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
    loadData: function () {
      var _loadData = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee() {
        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.getCurrentArea();

              case 2:
                _context.next = 4;
                return this.confirmOrder();

              case 4:
                this.formatTime();
                this.loadAddressList();

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadData() {
        return _loadData.apply(this, arguments);
      }

      return loadData;
    }(),
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
    handleRemarkInput: function handleRemarkInput(e) {
      this.form.userRemark = e.$wx.detail.value;
    },
    handleSubmit: function handleSubmit() {
      var _this = this;

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

      this.hasSubmit = true; // 结算订单

      (0, _order.settleOrder)(this.form).then(function (res) {
        _this.hasSubmit = false; // 发布成功则跳回

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
      });
    },
    handleAddressModal: function handleAddressModal() {
      this.isShowAddressModal = !this.isShowAddressModal;
    },
    handleTimeModal: function handleTimeModal() {
      this.isShowTimeModal = !this.isShowTimeModal;
    },
    // 获取当前位置
    getCurrentArea: function () {
      var _getCurrentArea = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee2() {
        return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(this.currentArea === null)) {
                  _context2.next = 3;
                  break;
                }

                _context2.next = 3;
                return this.syncCurrentArea();

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getCurrentArea() {
        return _getCurrentArea.apply(this, arguments);
      }

      return getCurrentArea;
    }(),
    // 确认订单
    confirmOrder: function () {
      var _confirmOrder2 = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee3() {
        var form, res, settle;
        return _regeneratorRuntime2["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                // 传入参数
                form = Object();

                if (this.form.cartIds !== null) {
                  form['cartIds'] = this.form.cartIds;
                }

                if (this.currentArea !== null) {
                  form.lat = this.currentArea.location.lat;
                  form.lng = this.currentArea.location.lng;
                }

                if (this.form.addressId !== 0) {
                  form.addressId = this.form.addressId;
                }

                form.storeId = this.form.storeId;
                form.type = this.form.type; // get data

                _context3.next = 8;
                return (0, _order.confirmOrder)(form);

              case 8:
                res = _context3.sent;
                this.storeInfo = res.data.store;
                this.address = res.data.address;
                settle = _objectSpread({
                  sendFee: 0,
                  redPack: 0,
                  totalPrice: 0
                }, res.data.settle); // 商品不满足起始配送额

                if (!(settle.goodsTotalPrice < this.storeInfo.startSendFee)) {
                  _context3.next = 18;
                  break;
                }

                _util["default"].toast('不满足起送金额');

                _util["default"].navigateBack();

                return _context3.abrupt("return");

              case 18:
                if (settle.goodsTotalPrice < this.storeInfo.freeSendFee) {
                  settle.sendFee = this.storeInfo.sendFee;
                }

              case 19:
                settle.totalPrice = settle.sendFee + settle.goodsTotalPrice; // 赋值

                this.settle = settle;
                this.form.addressId = this.address.addressId; // 商品不存在

                if (res.data.goods.length === 0) {
                  _util["default"].toast('商品数据错误，请重新下单'); // this.onClickBack(); return

                }

                this.goodsList = res.data.goods;

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function confirmOrder() {
        return _confirmOrder2.apply(this, arguments);
      }

      return confirmOrder;
    }(),
    loadAddressList: function loadAddressList() {
      var _this2 = this;

      (0, _address.getAddressList)().then(function (res) {
        _this2.addressList = res.data.data;
      });
    }
  }),
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadData();
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"van-popup":{"path":"../../$vendor/@vant/weapp/dist/popup/index"},"van-cell":{"path":"../../$vendor/@vant/weapp/dist/cell/index"},"pre-order-box":{"path":"../../components/preOrderBox"}},"on":{"30-0":["clickLeft"],"30-6":["close"],"30-8":["tap"],"30-11":["touchmove","close"],"30-14":["tap"],"30-17":["tap"]}}, handlers: {'30-0': {"clickLeft": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'30-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleAddressModal($event);
      })();
    
  }},'30-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleTimeModal($event);
      })();
    
  }},'30-3': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.toGoodsList($event);
      })();
    
  }},'30-4': {"input": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleRemarkInput($event);
      })();
    
  }},'30-5': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleSubmit($event);
      })();
    
  }},'30-6': {"close": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleTimeModal($event);
      })();
    
  }},'30-7': {"touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }},'30-8': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleTimeModal($event);
      })();
    
  }},'30-9': {"tap": function proxy (idx) {
    
    var _vm=this;
      return (function () {
        _vm.onChooseDate(idx);
      })();
    
  }},'30-10': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.onChooseTime(index);
      })();
    
  }},'30-11': {"touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }, "close": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleAddressModal($event);
      })();
    
  }},'30-13': {"touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }},'30-14': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleAddressModal($event);
      })();
    
  }},'30-15': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.addAddress($event);
      })();
    
  }},'30-16': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.chooseAddress(index);
      })();
    
  }},'30-17': {"tap": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.addAddress(item.addressId);
      })();
    
  }}}, models: {}, refs: undefined });