"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _order = require('./../../api/order.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  mixins: [_statusBar["default"]],
  data: {
    orderId: 0,
    goodsList: [],
    statusBarHeight: 50
  },
  onLoad: function onLoad(options) {
    if (typeof options.orderId === 'undefined') {
      this.onClickBack();
      return;
    }

    this.orderId = options.orderId.replace(/(^\s*)/g, '');
    this.loadGoods();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    loadGoods: function loadGoods() {
      var _this = this;

      // 获取购物车商品
      (0, _order.getOrderGoods)(this.orderId).then(function (res) {
        if (res.status === 'success') {
          _this.goodsList = res.data;
        }
      });
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadGoods();
  }
}, {info: {"components":{"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{}}, handlers: {'46-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });