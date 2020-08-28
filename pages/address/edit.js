"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _address = require('./../../api/address.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"]],
  data: {
    addressId: 0,
    navTitle: '添加收货地址',
    tagName: '',
    tags: ['家', '公司', '学校', '自定义'],
    genders: ['先生', '女士'],
    showDialog: false,
    address: {
      tag: '',
      roomNum: '',
      gender: 0,
      linkMan: '',
      linkPhone: '',
      lat: '',
      lng: '',
      province: '',
      city: '',
      district: '',
      isDefault: 1,
      addressDetail: ''
    }
  },
  watch: {
    currentArea: function currentArea(newVal) {
      console.log(newVal);
      this.address.province = newVal.ad_info.province;
      this.address.city = newVal.ad_info.city;
      this.address.district = newVal.ad_info.district;
      this.address.lat = newVal.location.lat;
      this.address.lng = newVal.location.lng;
      this.address.addressDetail = newVal.title;
    }
  },
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea'])),
  onLoad: function onLoad(options) {
    // 编辑或添加
    if (typeof options.addressId !== 'undefined') {
      this.addressId = options.addressId;
      this.navTitle = '编辑收货地址';
      this.loadAddressInfo();
    }
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    chooseLocation: function chooseLocation() {
      _util["default"].navigateTo('/pages/other/location');
    },
    chooseGender: function chooseGender(index) {
      this.address.gender = index + 1;
    },
    chooseTag: function chooseTag(idx) {
      // 判断是否自定义标签
      if (idx < 3) {
        this.address.tag = this.tags[idx];
      } else {
        this.showDialog = true;
      }
    },
    onInputLinkMan: function onInputLinkMan(e) {
      this.address.linkMan = e.$wx.detail.value;
    },
    onInputPhone: function onInputPhone(e) {
      this.address.linkPhone = e.$wx.detail.value;
    },
    onInputRoomNum: function onInputRoomNum(e) {
      this.address.roomNum = e.$wx.detail.value;
    },
    onInputTag: function onInputTag(e) {
      this.tagName = e.$wx.detail.value;
    },
    setCustomTag: function setCustomTag() {
      this.showDialog = false;
      this.address.tag = this.tagName;
      this.$set(this.tags, 3, this.tagName);
    },
    handleSwitch: function handleSwitch(e) {
      this.address.isDefault = e.$wx.detail.value ? 1 : 0;
    },
    loadAddressInfo: function loadAddressInfo() {
      var _this = this;

      if (this.addressId !== 0) {
        (0, _address.getAddressInfo)(this.addressId).then(function (res) {
          _this.address = res.data;
        });
      }
    },
    saveAddress: function saveAddress() {
      var _this2 = this;

      if (!this.address.linkMan) {
        _util["default"].toast('请输入收货人姓名');

        return;
      }

      if (!this.address.linkPhone) {
        _util["default"].toast('请输入收货人手机号');

        return;
      }

      if (!this.address.addressDetail) {
        _util["default"].toast('请选择收货地址');

        return;
      }

      if (!this.address.roomNum) {
        _util["default"].toast('请输入门牌号');

        return;
      }

      if (!this.address.linkMan) {
        _util["default"].toast('请输入收货人姓名');

        return;
      }

      (0, _address.saveAddressInfo)(this.address).then(function (res) {
        if (res.status === 'success') {
          _util["default"].toast('已保存');

          _this2.onClickBack();
        }
      });
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadAddressInfo();
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-popup":{"path":"./../../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"29-0":["clickLeft"],"29-9":["close","touchmove"]}}, handlers: {'29-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'29-1': {"input": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onInputLinkMan.apply(_vm, $args || [$event]);
  })();
}},'29-2': {"tap": function proxy (index) {
    var _vm=this;
  return (function () {
    _vm.chooseGender(index);
  })();
}},'29-3': {"input": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onInputPhone.apply(_vm, $args || [$event]);
  })();
}},'29-4': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.chooseLocation.apply(_vm, $args || [$event]);
  })();
}},'29-5': {"input": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onInputRoomNum.apply(_vm, $args || [$event]);
  })();
}},'29-6': {"tap": function proxy (idx) {
    var _vm=this;
  return (function () {
    _vm.chooseTag(idx);
  })();
}},'29-7': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleSwitch.apply(_vm, $args || [$event]);
  })();
}},'29-8': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.saveAddress.apply(_vm, $args || [$event]);
  })();
}},'29-9': {"close": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showDialog=false;
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'29-11': {"input": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onInputTag.apply(_vm, $args || [$event]);
  })();
}},'29-12': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showDialog=false;
  })();
}},'29-13': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.setCustomTag();
  })();
}}}, models: {}, refs: undefined });