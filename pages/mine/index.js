"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _common = require('./../../utils/common.js');

var _other = require('./../../api/other.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'userIndex',
  mixins: [_statusBar["default"]],
  data: {
    adverts: [],
    userInfo: null,
    imgDomain: '',
    tabs: {
      bounty: {
        val: 0,
        name: '奖励金'
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
  onLoad: function onLoad() {
    this.loadAdverts();
  },
  onShow: function onShow() {
    var userInfo = this.$app.$options.globalData.userInfo;

    if (userInfo !== null) {
      userInfo.phone = (0, _common.hidePhone)(userInfo.phone);
    }

    this.userInfo = userInfo;
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    toOrder: function toOrder(type) {
      _util["default"].navigateTo('/packageGoods/order/index?type=' + type);
    },
    toService: function toService() {
      _util["default"].navigateTo('/pages/other/suggest');
    },
    dailySign: function dailySign() {
      _util["default"].toast('开发中...');
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
      var _this = this;

      (0, _other.getAdverts)('minePage').then(function (res) {
        if (res.status === 'success') {
          _this.adverts = res.data.mineMedium;
        }
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadAdverts();
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"}},"on":{}}, handlers: {'13-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/pages/mine/info');
      })();
    
  }},'13-1': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/pages/other/login');
      })();
    
  }},'13-2': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.toOrder('all');
      })();
    
  }},'13-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.toOrder('waitPay');
      })();
    
  }},'13-4': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.toOrder('waitReceive');
      })();
    
  }},'13-5': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.toOrder('hasFinished');
      })();
    
  }},'13-6': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.toService($event);
      })();
    
  }},'13-7': {"tap": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.clickAdvert(item);
      })();
    
  }},'13-8': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.dailySign($event);
      })();
    
  }},'13-9': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/pages/address/index');
      })();
    
  }},'13-10': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/pages/other/suggest');
      })();
    
  }},'13-11': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/pages/other/setting');
      })();
    
  }}}, models: {}, refs: undefined });