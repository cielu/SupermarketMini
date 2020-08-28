"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

var _weCropper = _interopRequireDefault(require('./../vendor.js')(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  name: 'weCropper',
  props: {
    options: {
      type: Object,
      "default": {}
    }
  },
  data: {
    id: 'cropper',
    cropper: null,
    pixelRatio: 1,
    _width: 300,
    _height: 300,
    targetId: 'targetCropper'
  },
  ready: function ready() {
    var _this = this;

    var options = this.options;
    console.log(options);
    options.id = this.id;
    options.targetId = this.targetId;
    this._width = options.width;
    this._height = options.height;
    this.pixelRatio = options.pixelRatio; //  cropper

    this.cropper = new _weCropper["default"](options).on('ready', function (ctx) {
      console.log("wecropper is ready for work!", ctx);

      _this.$emit('ready', ctx);
    }).on('beforeImageLoad', function (ctx) {
      console.log("beforeImageLoad current canvas context:", ctx);

      _this.$emit('beforeImageLoad', ctx);
    }).on('imageLoad', function (ctx) {
      console.log("picture loaded current canvas context:", ctx);

      _this.$emit('imageLoad', ctx);
    }).on('beforeDraw', function (ctx) {
      console.log("before canvas draw", ctx);

      _this.$emit('beforeDraw', ctx);
    });
  },
  methods: {
    pushOrigin: function pushOrigin(src) {
      this.cropper.pushOrign(src);
    },
    updateCanvas: function updateCanvas() {
      this.cropper.updateCanvas();
    },
    getCropperImage: function getCropperImage() {
      // we-cropper v1.3.0 之后 getCropperImage 方法返回 Promise 对象
      return this.cropper.getCropperImage();
    },
    getCropperBase64: function getCropperBase64(fn, ev) {
      this.cropper.getCropperImage(fn);
    },
    touchStart: function touchStart(e) {
      this.cropper.touchStart(e.$wx);
    },
    touchMove: function touchMove(e) {
      this.cropper.touchMove(e.$wx);
    },
    touchEnd: function touchEnd(e) {
      this.cropper.touchEnd(e.$wx);
    },
    canvasError: function canvasError(e) {
      console.error(e.detail.errMsg);
    }
  }
}, {info: {"components":{},"on":{}}, handlers: {'85-0': {"touchstart": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.touchStart.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.touchMove.apply(_vm, $args || [$event]);
  })();
}, "touchend": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.touchEnd.apply(_vm, $args || [$event]);
  })();
}, "error": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.canvasError.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });