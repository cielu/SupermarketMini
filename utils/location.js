"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../vendor.js')(2));

var _util = require('./util.js');

var _other = require('./../api/other.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 加入购物车
function getLocation() {
  return _getLocation.apply(this, arguments);
} // 获取地址


function _getLocation() {
  _getLocation = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime2["default"].mark(function _callee() {
    var reLocate,
        timestamp,
        curAreaCreatedAt,
        currentArea,
        _args = arguments;
    return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            reLocate = _args.length > 0 && _args[0] !== undefined ? _args[0] : false;
            // decline
            timestamp = Math.ceil(new Date().valueOf() / 1000);
            curAreaCreatedAt = wx.getStorageSync('curAreaCreatedAt');
            currentArea = wx.getStorageSync('currentArea'); // 已存储位置，并且存储的位置1天内有效

            if (!(currentArea !== '' && curAreaCreatedAt && curAreaCreatedAt > timestamp - 60 * 60 * 24 && !reLocate)) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", currentArea);

          case 6:
            _context.next = 8;
            return requestLocation(timestamp);

          case 8:
            currentArea = _context.sent;
            return _context.abrupt("return", currentArea);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getLocation.apply(this, arguments);
}

function requestLocation(timestamp) {
  return new Promise(function (resolve, reject) {
    wx.getLocation({
      type: 'gcj02',
      altitude: true,
      success: function success(res) {
        // 获取附近位置信息
        var params = {
          get_poi: 1,
          key: _util.MAP_KEY,
          location: res.latitude + ',' + res.longitude
        }; // api根据经纬度查询附近地点

        (0, _other.getCurrentArea)(params).then(function (res) {
          var currentArea = res.result.pois[0];
          wx.setStorageSync('currentArea', currentArea);
          wx.setStorageSync('curAreaCreatedAt', timestamp);
          resolve(currentArea);
        });
      },
      fail: function fail(res) {
        // console.log(res)
        (0, _util.toast)('获取地理位置失败!');
        reject(res);
      }
    });
  });
} // 距离格式化


function formatDistance(distance) {
  // 超过1千米
  if (distance > 1000) {
    return (distance / 1000).toFixed(2) + 'km';
  } else if (distance > 100) {
    return Math.round(distance / 100) * 100 + 'm';
  }

  return distance === 0 ? '' : Math.round(distance) + 'm';
}

module.exports = {
  getLocation: getLocation,
  formatDistance: formatDistance
};