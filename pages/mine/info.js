"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _common = require('./../../utils/common.js');

var _auth = require('./../../api/auth.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  name: 'UserInfo',
  mixins: [_statusBar["default"]],
  data: {
    endDate: '',
    actions: ['', '男', '女'],
    phone: null,
    form: {
      birthday: null,
      gender: 0
    },
    tabs: []
  },
  computed: _objectSpread({}, (0, _x.mapState)(['userInfo'])),
  onLoad: function onLoad() {
    // 当前日期
    var obj = new Date();
    this.endDate = obj.getFullYear() + '-' + (obj.getMonth() + 1) + '-' + obj.getDate();
  },
  onShow: function onShow() {
    this.phone = (0, _common.hidePhone)(this.userInfo.phone);
    this.form.gender = this.userInfo.gender;
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    onChooseBirthday: function onChooseBirthday(e) {
      var _this = this;

      wx.showModal({
        content: '生日信息一旦确认，则无法更改!',
        success: function success(sm) {
          if (sm.confirm) {
            _this.form.birthday = e.$wx.detail.value;
            _this.userInfo.birthday = e.$wx.detail.value;
          }
        }
      });
    },
    saveInfo: function saveInfo() {
      var _this2 = this;

      // 提交表单信息
      (0, _auth.perfectUserInfo)(this.form).then(function (res) {
        _util["default"].toast(res.msg);

        _this2.onClickBack();
      });
    },
    showActSheet: function showActSheet() {
      var _this = this;

      wx.showActionSheet({
        itemList: ['男', '女'],
        success: function success(res) {
          if (res.errMsg === 'showActionSheet:ok') {
            var gender = res.tapIndex + 1;
            _this.form.gender = gender;
            _this.userInfo.gender = gender;
          }
        }
      });
    }
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"19-0":["clickLeft"]}}, handlers: {'19-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'19-1': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onChooseBirthday.apply(_vm, $args || [$event]);
  })();
}},'19-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showActSheet.apply(_vm, $args || [$event]);
  })();
}},'19-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.saveInfo.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });