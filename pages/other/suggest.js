"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'setting',
  mixins: [_statusBar["default"]],
  data: {
    cateIdx: 0,
    cates: ['商品质量', '优惠活动', '支付问题', '退单问题', '退货问题', '商家问题', '其他'],
    userInfo: null,
    form: {
      cateType: '商品质量',
      content: '',
      phone: '',
      images: []
    }
  },
  onLoad: function onLoad() {},
  onShow: function onShow() {
    this.userInfo = this.$app.$options.globalData.userInfo;
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
      _util["default"].toast('反馈');
    },
    chooseType: function chooseType(idx) {
      this.cateIdx = idx;
      this.form.cateType = this.cates[idx];
    },
    removeImg: function removeImg(idx) {
      console.log(idx);
      this.form.images.splice(idx, 1);
    },
    uploadImg: function uploadImg() {
      if (this.form.images.length >= 3) {
        _util["default"].toast('最多上传3张图片');

        return;
      }

      var _this = this;

      wx.chooseImage({
        count: 3,
        success: function success(res) {
          var images = _this.form.images;
          _this.form.images = images.concat(res.tempFilePaths);
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
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-field":{"path":"../../$vendor/@vant/weapp/dist/field/index"}},"on":{"18-0":["clickLeft"]}}, handlers: {'18-0': {"clickLeft": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'18-1': {"tap": function proxy (idx) {
    
    var _vm=this;
      return (function () {
        _vm.chooseType(idx);
      })();
    
  }},'18-2': {"tap": function proxy (idx) {
    
    var _vm=this;
      return (function () {
        _vm.removeImg(idx);
      })();
    
  }},'18-3': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.uploadImg($event);
      })();
    
  }},'18-4': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.submitSuggest($event);
      })();
    
  }}}, models: {}, refs: undefined });