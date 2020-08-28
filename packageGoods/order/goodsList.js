"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _cart = require('./../../api/cart.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  mixins: [_statusBar["default"]],
  data: {
    storeId: 0,
    cartIds: '',
    goodsList: [],
    statusBarHeight: 50
  },
  onLoad: function onLoad(options) {
    if (typeof options.cartIds === 'undefined') {
      this.onClickBack();
      return;
    }

    this.storeId = options.storeId;
    this.cartIds = options.cartIds;
    this.loadGoods();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    loadGoods: function loadGoods() {
      var _this = this;

      var storeId = this.storeId,
          cartIds = this.cartIds; // 获取购物车商品

      (0, _cart.getCartGoods)({
        storeId: storeId,
        cartIds: cartIds
      }).then(function (res) {
        if (res.status === 'success') {
          _this.goodsList = res.data.map(function (item) {
            // 格式化商品规格
            if (item.skuId > 0) {
              item.goodsSku['attributes'] = item.goodsSku.a1 + ' ' + item.goodsSku.a2 + ' ' + item.goodsSku.a3 + ' ' + item.goodsSku.a4 + ' ' + item.goodsSku.a5;
            }

            return item;
          });
        }
      });
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadGoods();
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"45-0":["clickLeft"]}}, handlers: {'45-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });