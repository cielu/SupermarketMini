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
}, {info: {"components":{"cant-send-tip":{"path":"cantSendTip"}},"on":{}}, handlers: {'60-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.cooperate($event);
      })();
    
  }}}, models: {}, refs: undefined });