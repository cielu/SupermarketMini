"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../vendor.js')(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 获取文件名称
function getFileName() {
  return 'xxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
} // 上传图片


function uploadImage(_x, _x2) {
  return _uploadImage.apply(this, arguments);
}

function _uploadImage() {
  _uploadImage = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime2["default"].mark(function _callee(filePath, token) {
    var dir,
        _args = arguments;
    return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dir = _args.length > 2 && _args[2] !== undefined ? _args[2] : '';
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              // set key
              var key = 'app/' + dir + '/' + getFileName() + '.png'; // 上传图片

              wx.uploadFile({
                url: token.host,
                filePath: filePath,
                name: 'file',
                formData: {
                  dir: dir,
                  key: key,
                  policy: token.policy,
                  OSSAccessKeyId: token.accessid,
                  signature: token.signature
                },
                success: function success(res) {
                  res.key = key;
                  resolve(res);
                },
                fail: function fail(res) {
                  reject(res);
                }
              });
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _uploadImage.apply(this, arguments);
}

module.exports = {
  uploadImage: uploadImage
};