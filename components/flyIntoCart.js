"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

var _util = require('./../utils/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: {
    goodsNum: {
      type: Number,
      "default": 0
    }
  },
  data: {
    windowHeight: 816,
    ballX: 0,
    ballY: 0,
    animationX: {},
    animationY: {},
    showBall: true
  },
  created: function created() {
    var _this = this;

    this.$nextTick(function () {
      // console.log(this.$app.$options.globalData.systemInfo)
      _this.windowHeight = _this.$app.$options.globalData.systemInfo.screenHeight; // console.log(this.windowHeight)
    });
  },
  methods: {
    toShoppingCart: function toShoppingCart() {
      (0, _util.redirectCart)();
    },
    setDelayTime: function setDelayTime(sec) {
      return new Promise(function (resolve, reject) {
        setTimeout(function () {
          resolve();
        }, sec);
      });
    },
    // 创建动画
    createAnimation: function createAnimation(ballX, ballY) {
      var _this2 = this;

      var that = this;
      var bottomX = 36; // 屏幕左边的位置 this.systemInfo.windowWidth

      var bottomY = this.windowHeight - 60; // 屏幕底部的位置 (50 + 10)

      var animationX = that.flyX(bottomX, ballX); // 创建小球水平动画

      var animationY = that.flyY(bottomY, ballY); // 创建小球垂直动画

      that.ballX = ballX;
      that.ballY = ballY;
      that.showBall = true;
      that.setDelayTime(50).then(function () {
        // 50ms延时,  确保小球已经显示
        that.animationX = animationX["export"]();
        that.animationY = animationY["export"](); // 400ms延时, 即小球的抛物线时长

        return that.setDelayTime(400);
      }).then(function () {
        that.animationX = _this2.flyX(0, 0, 0)["export"]();
        that.animationY = _this2.flyY(0, 0, 0)["export"]();
        that.showBall = false;
      });
    },
    // 水平动画
    flyX: function flyX(bottomX, ballX, duration) {
      var animation = wx.createAnimation({
        duration: duration || 400,
        timingFunction: 'linear'
      });
      animation.translateX(bottomX - ballX).step();
      return animation;
    },
    // 垂直动画
    flyY: function flyY(bottomY, ballY, duration) {
      var animation = wx.createAnimation({
        duration: duration || 400,
        timingFunction: 'ease-in'
      });
      animation.translateY(bottomY - ballY).step();
      return animation;
    }
  }
}, {info: {"components":{"van-icon":{"path":"../$vendor/@vant/weapp/dist/icon/index"}},"on":{}}, handlers: {'64-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.toShoppingCart($event);
      })();
    
  }}}, models: {}, refs: undefined });