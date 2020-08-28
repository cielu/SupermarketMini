"use strict";

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
  relation: {
    type: 'descendant',
    name: 'goods-action-button',
    current: 'goods-action',
    linked: function linked() {
      this.updateStyle();
    },
    unlinked: function unlinked() {
      this.updateStyle();
    },
    linkChanged: function linkChanged() {
      this.updateStyle();
    }
  },
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    updateStyle: function updateStyle() {
      var _this = this;

      wx.nextTick(function () {
        _this.children.forEach(function (child) {
          child.updateStyle();
        });
      });
    }
  }
});