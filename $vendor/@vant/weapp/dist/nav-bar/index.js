"use strict";

var _component = require('./../common/component.js');

var _utils = require('./../common/utils.js');

(0, _component.VantComponent)({
  classes: ['title-class'],
  props: {
    title: String,
    fixed: {
      type: Boolean,
      observer: 'setHeight'
    },
    placeholder: {
      type: Boolean,
      observer: 'setHeight'
    },
    leftText: String,
    rightText: String,
    customStyle: String,
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
    statusBarHeight: 0,
    height: 44,
    baseStyle: ''
  },
  created: function created() {
    var _getSystemInfoSync = (0, _utils.getSystemInfoSync)(),
        statusBarHeight = _getSystemInfoSync.statusBarHeight;

    var _this$data = this.data,
        safeAreaInsetTop = _this$data.safeAreaInsetTop,
        zIndex = _this$data.zIndex;
    var paddingTop = safeAreaInsetTop ? statusBarHeight : 0;
    var baseStyle = "z-index: ".concat(zIndex, ";padding-top: ").concat(paddingTop, "px;");
    this.setData({
      statusBarHeight: statusBarHeight,
      height: 44 + statusBarHeight,
      baseStyle: baseStyle
    });
  },
  mounted: function mounted() {
    this.setHeight();
  },
  methods: {
    onClickLeft: function onClickLeft() {
      this.$emit('click-left');
    },
    onClickRight: function onClickRight() {
      this.$emit('click-right');
    },
    setHeight: function setHeight() {
      var _this = this;

      if (!this.data.fixed || !this.data.placeholder) {
        return;
      }

      wx.nextTick(function () {
        _this.getRect('.van-nav-bar').then(function (res) {
          _this.setData({
            height: res.height
          });
        });
      });
    }
  }
});