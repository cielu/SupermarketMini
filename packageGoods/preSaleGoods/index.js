"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _goods = require('./../../api/goods.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  mixins: [_statusBar["default"]],
  data: {
    activeTab: 1,
    activeChildrenCate: 1,
    tabs: [],
    childrenCategories: [1, 2, 3, 4, 5, 6, 7, 8],
    preSaleGoodsList: []
  },
  onLoad: function onLoad() {
    this.loadPreSaleGoods();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    loadPreSaleGoods: function loadPreSaleGoods() {
      var _this = this;

      (0, _goods.getGuessULikeGoods)({
        page: 1
      }).then(function (res) {
        console.log(res); // if (res.result.data.length < res.result.per_page) {
        //   this.showSpin = false
        // }

        _this.preSaleGoodsList = res.data.data;
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {
    console.log('onReachBottom');
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"50-0":["clickLeft"]}}, handlers: {'50-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'50-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/packageGoods/goods/detail');
  })();
}}}, models: {}, refs: undefined });