"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _weCropper = _interopRequireDefault(require('./../../vendor.js')(5));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Cropper;

_core["default"].page({
  name: 'cropImage',
  mixins: [_statusBar["default"]],
  data: {
    isIPhoneX: false,
    cropperOpt: {},
    cropImage: {}
  },
  computed: {
    _width: function _width() {
      return this.cropperOpt.width;
    },
    _height: function _height() {
      return this.cropperOpt.height;
    },
    pixelRatio: function pixelRatio() {
      return this.cropperOpt.pixelRatio;
    }
  },
  onLoad: function onLoad(options) {
    if (typeof options.filePath === 'undefined') {
      return this.onClickBack();
    } // 设置裁剪数据


    this.cropImage = options; // 获取配置

    this.isIPhoneX = this.$app.$options.globalData.isIPhoneX;
    var device = this.$app.$options.globalData.systemInfo;
    var width = device.windowWidth;
    var height = device.windowHeight - (this.isIPhoneX ? 110 : 80) - this.statusBarHeight - 44; // 设置裁剪的宽高

    var cropWidth = options.cropWidth || width;
    var cropHeight = options.cropHeight || width / 375 * 210;
    this.cropperOpt = {
      pixelRatio: device.pixelRatio,
      width: width,
      height: height,
      scale: 2.5,
      zoom: 8,
      src: options.filePath,
      cut: {
        x: (width - cropWidth) / 2,
        y: (height - cropHeight) / 2,
        width: cropWidth,
        height: cropHeight
      },
      boundStyle: {
        color: 'green',
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 1
      }
    }; //  cropper

    Cropper = new _weCropper["default"](this.cropperOpt); // .on('ready', (ctx) => {
    //   // console.log(`wecropper is ready for work!`, ctx)
    //   this.$emit('ready', ctx)
    // })
    // .on('beforeImageLoad', (ctx) => {
    //   // console.log(`beforeImageLoad current canvas context:`, ctx)
    //   this.$emit('beforeImageLoad', ctx)
    // })
    // .on('imageLoad', (ctx) => {
    //   // console.log(`picture loaded current canvas context:`, ctx)
    //   this.$emit('imageLoad', ctx)
    // })
    // .on('beforeDraw', (ctx) => {
    //   // console.log(`before canvas draw`, ctx)
    //   this.$emit('beforeDraw', ctx)
    // })
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    // beforeImageLoad () {
    //   console.log('we-cropper beforeImageLoad')
    // },
    // imageLoad () {
    //   console.log('we-cropper imageLoad')
    // },
    pushOrigin: function pushOrigin(src) {
      Cropper.pushOrign(src);
    },
    updateCanvas: function updateCanvas() {
      Cropper.updateCanvas();
    },
    getCropperImage: function getCropperImage() {
      var _this = this;

      // we-cropper v1.3.0 之后 getCropperImage 方法返回 Promise 对象
      Cropper.getCropperImage().then(function (cropPath) {
        // tempFilePath 为裁剪后的图片临时路径
        if (cropPath) {
          // 保存到本地缓存
          var cropImage = Object.assign({}, _this.cropImage, {
            cropPath: cropPath
          });
          wx.setStorageSync('cropImage', cropImage);
          wx.navigateBack({
            delta: 1
          });
        } else {
          _util["default"].toast('获取图片地址失败，请稍后重试');
        }
      });
    },
    getCropperBase64: function getCropperBase64(fn, ev) {
      Cropper.getCropperImage(fn);
    },
    touchStart: function touchStart(e) {
      // console.log('touchStart', e.$wx)
      Cropper.touchStart(e.$wx);
    },
    touchMove: function touchMove(e) {
      Cropper.touchMove(e.$wx);
    },
    touchEnd: function touchEnd(e) {
      // console.log('touchEnd', e.$wx)
      Cropper.touchEnd(e.$wx);
    },
    canvasError: function canvasError(e) {
      _util["default"].toast(e.$wx.detail.errMsg);
    }
  }
}, {info: {"components":{"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"we-cropper":{"path":"./../../components/weCropper"}},"on":{}}, handlers: {'39-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'39-2': {"touchstart": function proxy () {
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
}},'39-6': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getCropperImage.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });