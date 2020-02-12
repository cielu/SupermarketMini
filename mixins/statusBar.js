"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  data: {
    statusBarHeight: 50,
    isIPhoneX: false
  },
  created: function created() {
    this.isIPhoneX = this.$app.$options.globalData.isIPhoneX;
    this.statusBarHeight = this.$app.$options.globalData.systemInfo.statusBarHeight;
  }
};
exports["default"] = _default;