"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _common = require('./../../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// other
_core["default"].page({
  name: 'UserInfo',
  mixins: [_statusBar["default"]],
  data: {
    endDate: '',
    actions: ['', '男', '女'],
    userInfo: null,
    phone: null,
    form: {
      birthday: null
    },
    tabs: []
  },
  onLoad: function onLoad() {
    // 设置用户信息
    this.userInfo = this.$app.$options.globalData.userInfo; // 当前日期

    var obj = new Date();
    this.endDate = obj.getFullYear() + '-' + (obj.getMonth() + 1) + '-' + obj.getDate();
  },
  onShow: function onShow() {
    this.phone = (0, _common.hidePhone)(this.userInfo.phone);
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    editUserInfo: function editUserInfo() {
      _util["default"].toast('完成用户信息');
    },
    onChooseBirthday: function onChooseBirthday(e) {
      wx.showModal({
        content: '生日信息一旦确认，则无法更改!',
        success: function success(sm) {
          if (sm.confirm) {
            this.form.birthday = e.$wx.detail.value;
          }
        }
      });
    },
    saveInfo: function saveInfo() {
      _util["default"].toast('别急，正在开发中...');
    },
    showActSheet: function showActSheet() {
      wx.showActionSheet({
        itemList: ['男', '女'],
        success: function success(res) {
          if (res.errMsg === 'showActionSheet:ok') {
            var gender = res.tapIndex + 1;

            _util["default"].toast('选择tab' + gender);
          }
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
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"14-0":["clickLeft"]}}, handlers: {'14-0': {"clickLeft": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'14-1': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onChooseBirthday($event);
      })();
    
  }},'14-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showActSheet($event);
      })();
    
  }},'14-3': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.saveInfo($event);
      })();
    
  }}}, models: {}, refs: undefined });