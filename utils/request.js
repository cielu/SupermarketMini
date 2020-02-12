"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../vendor.js')(2));

var _util = require('./util.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 请求API
var HOST = 'https://market.linghui.co/api'; // const HOST = 'http://127.0.0.1:8088/api'
// 封装微信请求

var wxRequest =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime2["default"].mark(function _callee(url) {
    var data,
        method,
        showLoading,
        _getApp$$wepy$$option,
        authorization,
        storeInfo,
        _args = arguments;

    return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            method = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'GET';
            showLoading = _args.length > 3 && _args[3] !== undefined ? _args[3] : true;
            // eslint-disable-next-line no-undef
            _getApp$$wepy$$option = getApp().$wepy.$options.globalData, authorization = _getApp$$wepy$$option.authorization, storeInfo = _getApp$$wepy$$option.storeInfo; // 显示加载状态

            showLoading && (0, _util.toast)('加载中...', 'loading', 10000); // wx.showNavigationBarLoading()

            console.log('request params :', data); // 组合url

            url = url.indexOf('http') > -1 ? url : HOST + url; // 数据请求

            return _context.abrupt("return", new Promise(function (resolve, reject) {
              wx.request({
                url: url,
                data: data,
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                  'StoreId': storeInfo === null ? 0 : storeInfo.storeId,
                  'authorization': authorization
                },
                method: method,
                success: function success(res) {
                  // 筛选状态
                  switch (res.statusCode) {
                    case 401:
                      (0, _util.toast)('请重新登录!');
                      wx.removeStorageSync('userInfo');
                      wx.removeStorageSync('authorization');
                      (0, _util.navigateTo)('/pages/other/login');
                      return false;

                    case 500:
                    case 501:
                    case 502:
                      (0, _util.toast)('操作失败，请稍后再试!');
                      return false;

                    default:
                      if (res.data.status === 'expired') {
                        (0, _util.toast)('操作失败，请重试!'); // eslint-disable-next-line no-undef

                        getApp().$wepy.$options.globalData.authorization = res.data.token;
                        wx.setStorageSync('authorization', res.data.token); // 再次请求

                        reject(res);
                      } else {
                        console.log(res.data);
                        resolve(res.data);
                      }

                  }
                },
                fail: function fail(res) {
                  reject(res);
                },
                complete: function complete(res) {
                  wx.hideToast();
                  wx.stopPullDownRefresh();
                }
              });
            }));

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function wxRequest(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = {
  wxRequest: wxRequest
};