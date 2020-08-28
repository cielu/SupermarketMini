"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _common = require('./../../utils/common.js');

var _other = require('./../../api/other.js');

var _x = require('./../../vendor.js')(4);

var _auth = require('./../../api/auth.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  name: 'MineIndex',
  mixins: [_statusBar["default"]],
  data: {
    adverts: [],
    user: null,
    storeInfo: null,
    orderNum: {},
    userType: ['0'],
    imgDomain: '',
    tabs: {
      // bounty: {val: 0, name: '奖励金'},
      lotteryDraw: {
        val: 0,
        name: '抽奖'
      },
      redPack: {
        val: 0,
        name: '红包'
      },
      integral: {
        val: 0,
        name: '积分'
      }
    }
  },
  computed: _objectSpread({
    applySettlement: function applySettlement() {
      return this.StoreInfo != null && this.storeInfo.storeId > 10004;
    },
    isDistributor: function isDistributor() {
      return this.userType.indexOf('2') > -1;
    }
  }, (0, _x.mapState)(['userInfo'])),
  onShow: function onShow() {
    var _this = this;

    if (this.userInfo !== null) {
      // 获取用户信息
      (0, _auth.getUserCenter)().then(function (res) {
        if (res.status === 'success') {
          var _res$data = res.data,
              userInfo = _res$data.userInfo,
              orderNum = _res$data.orderNum;

          _store["default"].dispatch('setUserInfo', userInfo);

          _this.user = userInfo;
          _this.orderNum = orderNum;
          _this.tabs.integral.val = userInfo.integral;
          _this.tabs.lotteryDraw.val = userInfo.lotteryChance;
          _this.userType = _this.user.userType.split(',');
          _this.user.phone = (0, _common.hidePhone)(_this.user.phone);
        }
      });
    } else {
      this.user = null;
      this.userType = ['0'];
    }

    this.storeInfo = this.$app.$options.globalData.storeInfo;
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    redirectTo: function redirectTo(path) {
      if (this.userInfo === null) {
        _util["default"].navigateTo('/pages/other/login');

        return true;
      }

      _util["default"].navigateTo(path);
    },
    toOrder: function toOrder(type) {
      if (this.userInfo === null) {
        _util["default"].navigateTo('/pages/other/login');

        return true;
      }

      _util["default"].navigateTo('/packageGoods/order/index?type=' + type);
    },
    toService: function toService() {
      _util["default"].navigateTo('/pages/other/suggest');
    },
    toSetting: function toSetting() {
      _util["default"].navigateTo('/pages/other/setting');
    },
    clickTab: function clickTab(type) {
      // 申明跳转path
      var path = ''; // 根据类型进行点击判断

      switch (type) {
        case 'integral':
          path = '/pages/mine/integralLog';
          break;

        case 'redPack':
          path = '/pages/mine/redPack';
          break;

        case 'lotteryDraw':
          path = '/pages/lotteryDraw/index';
          break;
      }

      if (this.userInfo === null) {
        _util["default"].navigateTo('/pages/other/login');

        return true;
      }

      _util["default"].navigateTo(path);
    },
    clickAdvert: function clickAdvert(item) {
      // console.log(item)
      switch (item.type) {
        case 'url':
          _util["default"].navigateTo('/pages/other/webview?src=' + item.target);

          break;
      }
    },
    loadAdverts: function loadAdverts() {
      var _this2 = this;

      (0, _other.getAdverts)('minePage').then(function (res) {
        if (res.status === 'success') {
          _this2.adverts = res.data.mineMedium;
        }
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {// this.loadAdverts()
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{}}, handlers: {'18-0': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/mine/info');
  })();
}},'18-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/other/login');
  })();
}},'18-2': {"tap": function proxy (key) {
    var _vm=this;
  return (function () {
    _vm.clickTab(key);
  })();
}},'18-3': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.toOrder('all');
  })();
}},'18-4': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.toOrder('waitPay');
  })();
}},'18-5': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.toOrder('waitReceive');
  })();
}},'18-6': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.toOrder('hasFinished');
  })();
}},'18-7': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.toService.apply(_vm, $args || [$event]);
  })();
}},'18-8': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.clickAdvert(item);
  })();
}},'18-9': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/distributor/orderTaking');
  })();
}},'18-10': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/address/index');
  })();
}},'18-11': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/dailySign/index');
  })();
}},'18-12': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/merchant/apply');
  })();
}},'18-13': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/other/suggest');
  })();
}},'18-14': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.toSetting.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });