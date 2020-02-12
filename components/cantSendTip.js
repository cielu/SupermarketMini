"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: {
    showTip: {
      type: Boolean,
      "default": false
    },
    tipStyle: {
      type: String,
      "default": ''
    },
    tip: {
      type: String,
      "default": '当前位置不在配送范围内，换个地址试试吧！'
    }
  },
  methods: {
    tapTipBox: function tapTipBox() {
      wx.navigateTo({
        url: '/pages/other/location'
      });
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'106-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.tapTipBox($event);
      })();
    
  }}}, models: {}, refs: undefined });