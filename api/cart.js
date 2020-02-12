"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGoodsIntoCart = addGoodsIntoCart;
exports.reduceCartGoods = reduceCartGoods;
exports.updateCartGoods = updateCartGoods;
exports.removeCartGoods = removeCartGoods;
exports.getCartGoods = getCartGoods;

var _request = require('./../utils/request.js');

// 加入购物车
function addGoodsIntoCart() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  data.optionType = 'increase';
  return (0, _request.wxRequest)('/cart/manage', data, 'POST', false);
} // 减少购物车商品


function reduceCartGoods() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  data.optionType = 'decrease';
  return (0, _request.wxRequest)('/cart/manage', data, 'POST', false);
}

function updateCartGoods() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/cart/update', data, 'POST', false);
} // 移除购物车商品


function removeCartGoods() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/cart/remove', data, 'POST');
} // 获取购物车商品


function getCartGoods() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/cart/goods', params);
}