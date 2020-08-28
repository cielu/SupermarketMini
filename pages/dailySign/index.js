"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _goods = require('./../../api/goods.js');

var _other = require('./../../api/other.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'DailySign',
  mixins: [_statusBar["default"]],
  data: {
    curPage: 0,
    todaySign: false,
    signList: [],
    canLoadMoreGoods: true,
    spellGoodsList: [],
    userInfo: {}
  },
  onLoad: function onLoad(options) {
    // 初始化团购商品，并传入对应的类目
    this.loadSpellGoods(); // 获取签到列表

    this.loadSignList();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    signAtOnce: function signAtOnce() {
      var _this = this;

      // 签到
      (0, _other.signNow)().then(function (res) {
        _util["default"].toast(res.msg);

        if (res.status === 'success') {
          _this.signList.map(function (item) {
            if (item.date === '今天') {
              item.hasSign = true;
              _this.userInfo.integral += item.integral;
              _this.userInfo.signDay += 1;
              _this.todaySign = true;
              return item;
            }
          });
        }
      });
    },
    loadSignList: function loadSignList() {
      var _this2 = this;

      // 获取签到数据
      (0, _other.getSignData)().then(function (res) {
        if (res.status === 'success') {
          _this2.todaySign = res.data.todaySign;
          _this2.signList = res.data.signList;
          _this2.userInfo = res.data.userInfo;
        }
      });
    },
    loadSpellGoods: function loadSpellGoods() {
      var _this3 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!this.canLoadMoreGoods) return null; // 获取分类ID

      var params = {
        page: page + 1,
        cateId: 0
      }; // 获取团购商品

      (0, _goods.getGroupGoods)(params).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this3.canLoadMoreGoods = false;
        }

        _this3.curPage = res.data.curPage;
        _this3.spellGoodsList = page === 0 ? res.data.data : _this3.spellGoodsList.concat(res.data.data);
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.canLoadMoreGoods = true;
    this.loadSpellGoods();
    this.loadSignList();
  },
  onReachBottom: function onReachBottom() {
    this.loadSpellGoods(this.curPage);
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"end-line":{"path":"./../../components/endLine"},"spell-goods-items":{"path":"./../../components/spellGoodsItems"}},"on":{"31-0":["clickLeft"]}}, handlers: {'31-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'31-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/mine/integralLog?type=1');
  })();
}},'31-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.signAtOnce.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });