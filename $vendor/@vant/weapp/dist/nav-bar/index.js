"use strict";

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
  classes: ['title-class'],
  props: {
    title: String,
    fixed: Boolean,
    leftText: String,
    rightText: String,
    leftArrow: Boolean,
    border: {
      type: Boolean,
      value: true
    },
    zIndex: {
      type: Number,
      value: 1
    },
    safeAreaInsetTop: {
      type: Boolean,
      value: true
    }
  },
  data: {
    statusBarHeight: 0
  },
  created: function created() {
    var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
        statusBarHeight = _wx$getSystemInfoSync.statusBarHeight;

    this.setData({
      statusBarHeight: statusBarHeight
    });
  },
  methods: {
    onClickLeft: function onClickLeft() {
      this.$emit('clickLeft');
    },
    onClickRight: function onClickRight() {
      this.$emit('clickRight');
    }
  }
});