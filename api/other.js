"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBanners = getBanners;
exports.getAdverts = getAdverts;
exports.getGridsMenu = getGridsMenu;
exports.getCurrentArea = getCurrentArea;
exports.sendSmsCode = sendSmsCode;
exports.getSignData = getSignData;
exports.signNow = signNow;
exports.getIntegralLog = getIntegralLog;
exports.getUserRedPacks = getUserRedPacks;
exports.getOssSignature = getOssSignature;
exports.publishSuggest = publishSuggest;

var _request = require('./../utils/request.js');

// 获取banners
function getBanners() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'homePage';
  return (0, _request.wxRequest)('/banner/' + params);
} // 获取广告


function getAdverts() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'homePage';
  return (0, _request.wxRequest)('/advert/' + params);
} // 获取珊格菜单


function getGridsMenu() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'homePage';
  return (0, _request.wxRequest)('/grid-menu/' + params);
} // 获取位置信息


function getCurrentArea() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('https://apis.map.qq.com/ws/geocoder/v1', params);
} // 发送短信验证码


function sendSmsCode() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/send-sms', data, 'POST');
} // 获取签到数据


function getSignData() {
  return (0, _request.wxRequest)('/sign/data');
} // 立即签到


function signNow() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/sign', data, 'POST');
} // 积分记录


function getIntegralLog() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/user/integral-log', params);
} // 用户红包


function getUserRedPacks() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/user/red-packs', params);
} // alioss 签名


function getOssSignature() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/alioss/signature', params, 'GET', false);
} // 反馈提交


function publishSuggest() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/suggest', data, 'POST');
}