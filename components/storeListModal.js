"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

var _x = require('./../vendor.js')(4);

var _store = _interopRequireDefault(require('./../store/index.js'));

var _util = require('./../utils/util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].component({
  store: _store["default"],
  props: {
    showModal: {
      type: Boolean,
      "default": false
    },
    modalStyle: {
      type: String,
      "default": ''
    },
    storeList: {
      type: Array,
      "default": []
    },
    storeId: {
      type: Number,
      "default": null
    }
  },
  data: {
    screenHeight: 600,
    statusBarHeight: 20
  },
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea'])),
  created: function created() {
    var _this = this;

    this.$nextTick(function () {
      _this.screenHeight = _this.$app.$options.globalData.systemInfo.screenHeight;
      _this.statusBarHeight = _this.$app.$options.globalData.systemInfo.statusBarHeight;
    });
  },
  methods: {
    chooseLocation: function chooseLocation() {
      (0, _util.navigateTo)('/pages/other/location');
    },
    chooseStore: function chooseStore(store) {
      if (this.storeId !== store.storeId) {
        this.$emit('choose-store', store);
      }
    },
    onStoreModalClose: function onStoreModalClose(e) {
      this.$emit('on-modal-close', e);
    }
  }
}, {info: {"components":{"van-popup":{"path":"../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"../$vendor/@vant/weapp/dist/icon/index"},"van-notice-bar":{"path":"../$vendor/@vant/weapp/dist/notice-bar/index"}},"on":{"61-0":["touchmove","close"],"61-3":["tap"]}}, handlers: {'61-0': {"touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }, "close": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onStoreModalClose($event);
      })();
    
  }},'61-2': {"touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }},'61-3': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.chooseLocation($event);
      })();
    
  }},'61-4': {"tap": function proxy (store) {
    
    var _vm=this;
      return (function () {
        _vm.chooseStore(store);
      })();
    
  }}}, models: {}, refs: undefined });