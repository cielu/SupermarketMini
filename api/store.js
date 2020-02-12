"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStoreList = getStoreList;
exports.getStoreInfo = getStoreInfo;
exports.getStoreDetail = getStoreDetail;

var _request = require('./../utils/request.js');

// 获取banners
function getStoreList() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/store-list', params);
} // 获取广告


function getStoreInfo(storeId) {
  return (0, _request.wxRequest)('/store/' + storeId + '/info');
} // 获取广告


function getStoreDetail(storeId) {
  return (0, _request.wxRequest)('/store/' + storeId + '/detail');
}