"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGoodsList = getGoodsList;
exports.getGoodsDetail = getGoodsDetail;
exports.getGroupGoods = getGroupGoods;
exports.getGroupGoodsDetail = getGroupGoodsDetail;
exports.getGroupGoodsInvite = getGroupGoodsInvite;
exports.getGroupCategories = getGroupCategories;
exports.getGuessULikeTab = getGuessULikeTab;
exports.getGuessULikeGoods = getGuessULikeGoods;
exports.getGoodsCategories = getGoodsCategories;

var _request = require('./../utils/request.js');

// 获取珊格菜单
function getGoodsList() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/goods', params);
}

function getGoodsDetail(goodsCode) {
  return (0, _request.wxRequest)('/goods/' + goodsCode);
} // 获取团购商品


function getGroupGoods() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/group-goods', params);
} // 获取团购商品


function getGroupGoodsDetail(activityId) {
  return (0, _request.wxRequest)('/group-goods/' + activityId);
} // 获取团购商品 邀请


function getGroupGoodsInvite() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/group-invite', params);
} // 获取拼团类目


function getGroupCategories() {
  return (0, _request.wxRequest)('/group-categories');
} // 获取猜你喜欢tab


function getGuessULikeTab() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/guess-u-like-tab', params);
} // 获取猜你喜欢tab


function getGuessULikeGoods() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/guess-u-like-goods', params);
} // 获取商品分类


function getGoodsCategories() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/category', params);
}