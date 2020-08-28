"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.basic = void 0;
var basic = Behavior({
  methods: {
    $emit: function $emit() {
      this.triggerEvent.apply(this, arguments);
    },
    set: function set(data, callback) {
      this.setData(data, callback);
      return new Promise(function (resolve) {
        return wx.nextTick(resolve);
      });
    },
    getRect: function getRect(selector, all) {
      var _this = this;

      return new Promise(function (resolve) {
        wx.createSelectorQuery()["in"](_this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }

          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    }
  }
});
exports.basic = basic;