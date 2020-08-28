"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(2));

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _common = require('./../../utils/common.js');

var _other = require('./../../api/other.js');

var _uploadImage = require('./../../utils/uploadImage.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  name: 'Setting',
  mixins: [_statusBar["default"]],
  data: {
    isLoading: false,
    cateIdx: 0,
    cates: ['商品质量', '优惠活动', '支付问题', '退单问题', '退货问题', '商家问题', '其他'],
    form: {
      storeId: 0,
      type: '商品质量',
      content: '',
      linkPhone: '',
      outTradeNo: '',
      images: ''
    },
    images: []
  },
  computed: _objectSpread({}, (0, _x.mapState)(['userInfo'])),
  onLoad: function onLoad(query) {
    var storeInfo = this.$app.$options.globalData.storeInfo;

    if (storeInfo != null) {
      this.form.storeId = storeInfo.storeId;
    }
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    submitSuggest: function submitSuggest() {
      var _this2 = this;

      return _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee() {
        var tokenRes, images, i, uploadRes, submitRes;
        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this2.isSubmiting) {
                  _context.next = 3;
                  break;
                }

                _util["default"].toast('数据正在提交');

                return _context.abrupt("return");

              case 3:
                if (!(_this2.form.content === '')) {
                  _context.next = 6;
                  break;
                }

                _util["default"].toast('请填写反馈内容');

                return _context.abrupt("return");

              case 6:
                if (!(_this2.form.linkPhone !== '' && !(0, _common.isPhoneNumber)(_this2.form.linkPhone))) {
                  _context.next = 9;
                  break;
                }

                _util["default"].toast('请填写正确的手机号');

                return _context.abrupt("return");

              case 9:
                if (!(_this2.images.length > 0)) {
                  _context.next = 27;
                  break;
                }

                _context.next = 12;
                return (0, _other.getOssSignature)({
                  dir: 'suggestImg'
                });

              case 12:
                tokenRes = _context.sent;
                images = [];
                i = 0;

              case 15:
                if (!(i < _this2.images.length)) {
                  _context.next = 26;
                  break;
                }

                _context.next = 18;
                return (0, _uploadImage.uploadImage)(_this2.images[i], tokenRes.data, 'suggestImg');

              case 18:
                uploadRes = _context.sent;

                if (!(uploadRes.errMsg !== 'uploadFile:ok')) {
                  _context.next = 22;
                  break;
                }

                _util["default"].toast('图片上传失败');

                return _context.abrupt("return");

              case 22:
                images.push(uploadRes.key);

              case 23:
                i++;
                _context.next = 15;
                break;

              case 26:
                _this2.form.images = images.join(';');

              case 27:
                _this2.isSubmiting = true;
                _context.next = 30;
                return (0, _other.publishSuggest)(_this2.form);

              case 30:
                submitRes = _context.sent;

                _util["default"].toast(submitRes.msg);

                _this2.isSubmiting = false; // 回退

                setTimeout(function () {
                  _this2.onClickBack();
                }, 1500);

              case 34:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    chooseType: function chooseType(idx) {
      this.cateIdx = idx;
      this.form.type = this.cates[idx];
    },
    removeImg: function removeImg(idx) {
      // console.log(idx)
      this.images.splice(idx, 1);
    },
    uploadImg: function uploadImg() {
      if (this.images.length >= 3) {
        _util["default"].toast('最多上传3张图片');

        return;
      }

      var _this = this;

      wx.chooseImage({
        count: 3,
        success: function success(res) {
          var images = JSON.parse(JSON.stringify(_this.images));
          _this.images = images.concat(res.tempFilePaths);
        }
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    console.log('onPullDownRefresh');
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-field":{"path":"./../../$vendor/@vant/weapp/dist/field/index"}},"on":{"34-0":["clickLeft"]}}, handlers: {'34-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'34-1': {"tap": function proxy (idx) {
    var _vm=this;
  return (function () {
    _vm.chooseType(idx);
  })();
}},'34-2': {"tap": function proxy (idx) {
    var _vm=this;
  return (function () {
    _vm.removeImg(idx);
  })();
}},'34-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.uploadImg.apply(_vm, $args || [$event]);
  })();
}},'34-4': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submitSuggest.apply(_vm, $args || [$event]);
  })();
}}}, models: {'10': {
      type: "input",
      expr: "form.content",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "content", $v);
      
    }
    },'11': {
      type: "input",
      expr: "form.linkPhone",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "linkPhone", $v);
      
    }
    },'12': {
      type: "input",
      expr: "form.outTradeNo",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "outTradeNo", $v);
      
    }
    }}, refs: undefined });