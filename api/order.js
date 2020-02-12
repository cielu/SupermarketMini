"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrderList = getOrderList;
exports.confirmOrder = confirmOrder;
exports.settleOrder = settleOrder;
exports.getPayInfo = getPayInfo;
exports.getOrderDetail = getOrderDetail;

var _request = require('./../utils/request.js');

// 获取订单列表
function getOrderList() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/order/list', params);
} // 确认订单


function confirmOrder() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/order/confirm', params);
} // 结算订单


function settleOrder() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/order/settle', data, 'POST');
} // 获取支付信息


function getPayInfo() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/order/payInfo', params);
} // 获取订单信息


function getOrderDetail(outTradeNo) {
  return (0, _request.wxRequest)('/order/detail/' + outTradeNo);
}