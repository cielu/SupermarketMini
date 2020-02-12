"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  data: {
    statusbarHeight: 50,
    show_add_tip: false,
    timeOut: null
  },
  created: function created() {
    var _this = this;

    // 获取当前时间戳
    var timestamp = Math.ceil(new Date().valueOf() / 1000); // 判断是否已经显示过

    var todayHasShow = wx.getStorageSync('has_show_tip'); // 24小时内展示过，则不展示

    if (todayHasShow !== '' && timestamp - todayHasShow < 60 * 60 * 24) return null; // 状态栏高度

    this.$nextTick(function () {
      _this.statusbarHeight = _this.$app.$options.globalData.systemInfo.statusBarHeight;
    }); // 没显示过，则进行展示

    this.show_add_tip = true; // 关闭时间

    this.timeOut = setTimeout(function () {
      // 隐藏 tip
      _this.show_add_tip = false; // 保存到缓存中

      wx.setStorageSync('has_show_tip', timestamp);
    }, 5000);
  },
  onUnload: function onUnload() {
    clearTimeout(this.timeOut);
  }
}, {info: {"components":{},"on":{}}, handlers: {}, models: {}, refs: undefined });