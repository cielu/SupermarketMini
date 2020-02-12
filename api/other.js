"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBanners = getBanners;
exports.getAdverts = getAdverts;
exports.getGridsMenu = getGridsMenu;
exports.getCurrentArea = getCurrentArea;
exports.sendSmsCode = sendSmsCode;

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
}