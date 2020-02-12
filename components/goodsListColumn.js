"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

var _x = require('./../vendor.js')(4);

var _store = _interopRequireDefault(require('./../store/index.js'));

var _util = _interopRequireDefault(require('./../utils/util.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].component({
  store: _store["default"],
  props: {
    goodsList: {
      type: Array,
      "default": []
    },
    storeInfo: {
      type: Object,
      "default": null
    }
  },
  computed: _objectSpread({}, (0, _x.mapState)({
    cartGoodsNum: function cartGoodsNum(state) {
      if (this.storeInfo !== null && typeof state.shoppingCart[this.storeInfo.storeId] !== 'undefined') {
        return state.shoppingCart[this.storeInfo.storeId]['goodsNum'];
      }

      return {};
    }
  })),
  methods: {
    redirectToGoodsDetail: function redirectToGoodsDetail(goodsCode) {
      _util["default"].navigateTo('/packageGoods/goods/detail?goodsCode=' + goodsCode);
    },
    handleAddIntoCart: function handleAddIntoCart(goods) {
      this.$emit('on-handle-cart', goods);
    }
  }
}, {info: {"components":{"end-line":{"path":"endLine"},"vip-price-box":{"path":"vipPriceBox"},"purchase-btn":{"path":"purchaseBtn"}},"on":{"58-2":["tap"]}}, handlers: {'58-0': {"tap": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.redirectToGoodsDetail(item.goodsCode);
      })();
    
  }},'58-1': {"tap": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.redirectToGoodsDetail(item.goodsCode);
      })();
    
  }},'58-2': {"tap": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.handleAddIntoCart(item);
      })();
    
  }}}, models: {}, refs: undefined });