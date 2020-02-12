"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.goodsNumMixin = void 0;

var _x = require('./../vendor.js')(4);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var goodsNumMixin = {
  computed: _objectSpread({}, (0, _x.mapState)({
    cartGoodsNum: function cartGoodsNum(state) {
      if (this.storeInfo !== null && typeof state.shoppingCart[this.storeInfo.storeId] !== 'undefined') {
        return state.shoppingCart[this.storeInfo.storeId]['goodsNum'];
      }

      return {};
    },
    totalGoodsNum: function totalGoodsNum(state) {
      if (this.storeInfo !== null && typeof state.shoppingCart[this.storeInfo.storeId] !== 'undefined') {
        return state.shoppingCart[this.storeInfo.storeId]['totalNum'];
      }

      return 0;
    }
  }))
};
exports.goodsNumMixin = goodsNumMixin;