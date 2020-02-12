"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAddressList = getAddressList;
exports.saveAddressInfo = saveAddressInfo;
exports.getAddressInfo = getAddressInfo;

var _request = require('./../utils/request.js');

// 获取地址列表
function getAddressList() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/address', params);
} // 保存地址信息


function saveAddressInfo() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/address', data, 'POST');
} // 获取地址信息


function getAddressInfo(addressId) {
  return (0, _request.wxRequest)('/address/' + addressId);
}