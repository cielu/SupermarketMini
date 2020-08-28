"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStoreList = getStoreList;
exports.getStoreInfo = getStoreInfo;
exports.getStoreDetail = getStoreDetail;
exports.applyStore = applyStore;
exports.getApplyStatus = getApplyStatus;

var _request = require('./../utils/request.js');

// 获取banners
function getStoreList() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/store/list', params);
} // 获取门店信息


function getStoreInfo(storeId) {
  return (0, _request.wxRequest)('/store/info/' + storeId);
} // 获取门店详情


function getStoreDetail(storeId) {
  return (0, _request.wxRequest)('/store/detail/' + storeId);
} // 申请门店


function applyStore() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/store/apply', data, 'POST');
} // 获取申请状态


function getApplyStatus() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/store/apply/status', params);
}