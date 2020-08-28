"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isImageFile = isImageFile;
exports.isVideo = isVideo;
exports.chooseFile = chooseFile;
exports.isFunction = isFunction;
exports.isObject = isObject;
exports.isPromise = isPromise;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;

function isImageUrl(url) {
  return IMAGE_REGEXP.test(url);
}

function isImageFile(item) {
  if (item.type) {
    return item.type.indexOf('image') === 0;
  }

  if (item.path) {
    return isImageUrl(item.path);
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  return false;
}

function isVideo(res, accept) {
  return accept === 'video';
}

function chooseFile(_ref) {
  var accept = _ref.accept,
      multiple = _ref.multiple,
      capture = _ref.capture,
      compressed = _ref.compressed,
      maxDuration = _ref.maxDuration,
      sizeType = _ref.sizeType,
      camera = _ref.camera,
      maxCount = _ref.maxCount;

  switch (accept) {
    case 'image':
      return new Promise(function (resolve, reject) {
        wx.chooseImage({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          sizeType: sizeType,
          success: resolve,
          fail: reject
        });
      });

    case 'media':
      return new Promise(function (resolve, reject) {
        wx.chooseMedia({
          count: multiple ? Math.min(maxCount, 9) : 1,
          sourceType: capture,
          maxDuration: maxDuration,
          sizeType: sizeType,
          camera: camera,
          success: resolve,
          fail: reject
        });
      });

    case 'video':
      return new Promise(function (resolve, reject) {
        wx.chooseVideo({
          sourceType: capture,
          compressed: compressed,
          maxDuration: maxDuration,
          camera: camera,
          success: resolve,
          fail: reject
        });
      });

    default:
      return new Promise(function (resolve, reject) {
        wx.chooseMessageFile({
          count: multiple ? maxCount : 1,
          type: 'file',
          success: resolve,
          fail: reject
        });
      });
  }
}

function isFunction(val) {
  return typeof val === 'function';
}

function isObject(val) {
  return val !== null && _typeof(val) === 'object';
}

function isPromise(val) {
  return isObject(val) && isFunction(val.then) && isFunction(val["catch"]);
}