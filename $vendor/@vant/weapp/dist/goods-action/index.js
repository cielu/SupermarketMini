"use strict";

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
  relation: {
    type: 'descendant',
    name: 'goods-action-button',
    linked: function linked(child) {
      this.children.push(child);
    },
    unlinked: function unlinked(child) {
      this.children = this.children.filter(function (item) {
        return item !== child;
      });
    }
  },
  beforeCreate: function beforeCreate() {
    this.children = [];
  },
  props: {
    safeAreaInsetBottom: {
      type: Boolean,
      value: true
    }
  }
});