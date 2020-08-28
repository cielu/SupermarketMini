"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _store = require('./../../api/store.js');

var _common = require('./../../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'ApplySettlement',
  mixins: [_statusBar["default"]],
  data: {
    applyStatus: -1,
    fileList: [],
    errMsg: {
      storeName: '',
      contactName: '',
      contactTel: ''
    },
    form: {
      storeName: '',
      contactName: '',
      contactTel: '',
      address: '',
      isChainStore: 0,
      lat: '',
      lng: '',
      roomNum: ''
    }
  },
  onLoad: function onLoad(options) {
    // 获取我的中奖记录
    this.loadApplyStatus();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    onStoreNameChange: function onStoreNameChange(e) {
      this.errMsg.storeName = '';
      this.form.storeName = e.$wx.detail;
    },
    onContactNameChange: function onContactNameChange(e) {
      this.errMsg.contactName = '';
      this.form.contactName = e.$wx.detail;
    },
    onContactTelChange: function onContactTelChange(e) {
      this.errMsg.contactTel = '';
      this.form.contactTel = e.$wx.detail;
    },
    onSwitchChange: function onSwitchChange(e) {
      this.form.isChainStore = e.$wx.detail;
    },
    chooseLocation: function chooseLocation() {
      var _this = this;

      wx.chooseLocation({
        success: function success(res) {
          // console.log(res)
          if (res.errMsg === 'chooseLocation:ok') {
            _this.form.address = res.address + res.name;
            _this.form.lat = res.latitude;
            _this.form.lng = res.longitude;
          }
        }
      });
    },
    loadApplyStatus: function loadApplyStatus() {
      var _this2 = this;

      (0, _store.getApplyStatus)().then(function (res) {
        if (res.data.applyId > 0) {
          _this2.form = res.data;
          _this2.applyStatus = res.data.applyStatus;
        }
      });
    },
    submitForm: function submitForm() {
      var _this3 = this;

      if (this.form.storeName === '') {
        this.errMsg.storeName = '请填写门店名称';
        return;
      }

      if (this.form.contactName === '') {
        this.errMsg.contactName = '请填写店主姓名';
        return;
      }

      if (this.form.contactTel === '') {
        this.errMsg.contactTel = '请填写联系方式';
        return;
      }

      if (!(0, _common.isPhoneNumber)(this.form.contactTel)) {
        this.errMsg.contactTel = '手机号格式错误';
        return;
      }

      if (this.form.address === '') {
        _util["default"].toast('请选择地理位置');

        return;
      }

      if (this.form.roomNum === '') {
        _util["default"].toast('请填写房间号');

        return;
      }

      this.form.address += '·' + this.form.roomNum; // console.log('submitForm', this.form)

      (0, _store.applyStore)(this.form).then(function (res) {
        _util["default"].toast(res.msg);

        if (res.status === 'success') {
          _this3.applyStatus = 0;
        }
      });
    }
  }
}, {info: {"components":{"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"van-cell":{"path":"./../../$vendor/@vant/weapp/dist/cell/index"},"van-switch":{"path":"./../../$vendor/@vant/weapp/dist/switch/index"},"van-cell-group":{"path":"./../../$vendor/@vant/weapp/dist/cell-group/index"},"van-field":{"path":"./../../$vendor/@vant/weapp/dist/field/index"}},"on":{"32-1":["change"],"32-2":["change"],"32-3":["change"],"32-5":["change"]}}, handlers: {'32-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'32-1': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onStoreNameChange.apply(_vm, $args || [$event]);
  })();
}},'32-2': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onContactNameChange.apply(_vm, $args || [$event]);
  })();
}},'32-3': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onContactTelChange.apply(_vm, $args || [$event]);
  })();
}},'32-4': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.chooseLocation.apply(_vm, $args || [$event]);
  })();
}},'32-5': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onSwitchChange.apply(_vm, $args || [$event]);
  })();
}},'32-6': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submitForm.apply(_vm, $args || [$event]);
  })();
}}}, models: {'9': {
      type: "input",
      expr: "form.roomNum",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "roomNum", $v);
      
    }
    }}, refs: undefined });