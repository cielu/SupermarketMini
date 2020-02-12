"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

var _util = _interopRequireDefault(require('./../utils/util.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: {
    isShowScopeModal: {
      type: Boolean,
      "default": false
    }
  },
  methods: {
    onGetUserInfo: function onGetUserInfo(e) {
      if (typeof e.$wx.detail.userInfo === 'undefined') {
        _util["default"].toast(e.$wx.detail.errMsg);

        return;
      }

      this.$emit('get-user-info', e.$wx.detail.userInfo);
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'63-0': {"getuserinfo": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onGetUserInfo($event);
      })();
    
  }}}, models: {}, refs: undefined });