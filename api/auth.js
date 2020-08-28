"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.miniAppLogin = miniAppLogin;
exports.phoneLogin = phoneLogin;
exports.loginByType = loginByType;
exports.getUserCenter = getUserCenter;
exports.perfectUserInfo = perfectUserInfo;

var _request = require('./../utils/request.js');

// 获取banners
function miniAppLogin() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/login/mini-app', data, 'POST');
} // 手机号登录


function phoneLogin() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/login/phone', data, 'POST');
} // 登录表单


function loginByType() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'miniApp';
  var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  // 小程序登录或手机号登录
  if (type === 'miniApp') {
    return miniAppLogin(data);
  }

  return phoneLogin(data);
} // 获取用户信息


function getUserCenter() {
  return (0, _request.wxRequest)('/user/center', null, 'GET', false);
} // 完善用户表单


function perfectUserInfo() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/user/perfect', data, 'POST');
}