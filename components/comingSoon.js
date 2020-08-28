"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: {
    desc: {
      type: String,
      "default": '商家正在筹备中，敬请期待!'
    }
  },
  data: {
    statusBarHeight: 20
  },
  created: function created() {
    var _this = this;

    this.$nextTick(function () {
      _this.statusBarHeight = _this.$app.$options.globalData.systemInfo.statusBarHeight;
    });
  },
  methods: {
    cooperate: function cooperate() {
      wx.makePhoneCall({
        phoneNumber: '18569401993'
      });
    }
  }
}, {info: {"components":{"cant-send-tip":{"path":"./cantSendTip"}},"on":{}}, handlers: {'78-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.cooperate.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });