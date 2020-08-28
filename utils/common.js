"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../vendor.js')(2));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// 时间戳格式化
function unixToLocal(unixTime) {
  if (unixTime === 0 || unixTime === '') {
    return '';
  }

  var date = new Date(parseInt(unixTime) * 1000);
  var time = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-') + '  ' + [date.getHours(), date.getMinutes()].join(':');
  return time;
} // 判断是否是手机号


function isPhoneNumber(tel) {
  return /^0?1[3|4|5|6|7|8][0-9]\d{8}$/.test(tel);
} // toDecimal


function toDecimal(number) {
  return Math.round((number * 100).toPrecision(12)) / 100;
} // 隐藏手机号


function hidePhone(phone) {
  return phone.replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2');
} // 银行卡号美化


function beautifyStr(str) {
  return str.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
} // 美化时间


function beautifyNum(num) {
  return num < 10 ? '0' + num : num;
} // 获取分钟


function getMinutesArr() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var minutes = [];

  for (var i = start; i < 60; i++) {
    minutes.push(beautifyNum(i));
  }

  return minutes;
} // 获取小时


function getHourArrBetween() {
  var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;
  var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 22;
  var hourArr = []; // 遍历小时时间

  for (var i = start; i <= end; i++) {
    hourArr.push(beautifyNum(i));
  }

  return hourArr;
} // 获取未来14天


function getFutureDaysArr() {
  var length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 14;
  // 星期映射数组
  var weekDayArr = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  var nowDate = new Date();
  var dateArr = []; // 获取未来天数

  for (var i = 0; i < length; i++) {
    var milliseconds = nowDate.getTime() + 1000 * 86400 * i; // 当i为0代表当前日期，为1时可以得到明天的日期，以此类推

    var newDate = new Date(milliseconds);
    var month = newDate.getMonth() + 1; // 获取当前月

    var day = newDate.getDate(); // 获取当前日

    var weekDay = weekDayArr[newDate.getDay()]; // 设置月

    month = beautifyNum(month); // 设置日期

    day = beautifyNum(day);

    switch (i) {
      case 0:
        weekDay = weekDay + '(今天)';
        break;

      case 1:
        weekDay = weekDay + '(明天)';
        break;

      case 2:
        weekDay = weekDay + '(后天)';
        break;

      default:
        break;
    } // push 到数组


    dateArr.push(month + '月' + day + '日 ' + weekDay);
  }

  return dateArr;
} // 富文本里的图片宽度自适应


function formatRichTextImg(html) {
  // 筛选出图片
  html = html.replace(/<img[^>]*>/gi, function (match, capture) {
    // 去除原始 style，增加 自定义 style
    return match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '').replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" '); // match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '')
    // match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '')
  }); // 替换换行符为br标签

  return html.replace(/(↵)+/g, '<br/>');
} // 设置导航栏颜色


function setNavBarColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#ffffff';
  wx.setNavigationBarColor({
    frontColor: color,
    backgroundColor: 'transparent',
    animation: {
      duration: 50,
      timingFunc: 'easeIn'
    }
  });
} // 设置购物车 badge


function setCartBadge(number) {
  wx.setTabBarBadge({
    index: 2,
    text: number.toString()
  });
} // 上传图片


function uploadImage(_x, _x2) {
  return _uploadImage.apply(this, arguments);
}

function _uploadImage() {
  _uploadImage = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime2["default"].mark(function _callee(token, filePath) {
    var dir,
        randomTime,
        key,
        uploadRes,
        _args = arguments;
    return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dir = _args.length > 2 && _args[2] !== undefined ? _args[2] : 'asset/';
            // set key
            randomTime = new Date().getTime() + Math.random();
            key = dir + randomTime + '.png'; // 上传图片

            _context.next = 5;
            return wx.uploadFile({
              url: token.host,
              filePath: filePath,
              name: 'file',
              formData: {
                dir: dir,
                key: key,
                policy: token.policy,
                OSSAccessKeyId: token.accessid,
                signature: token.signature
              }
            });

          case 5:
            uploadRes = _context.sent;
            uploadRes.key = key;
            return _context.abrupt("return", uploadRes);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _uploadImage.apply(this, arguments);
}

module.exports = {
  unixToLocal: unixToLocal,
  toDecimal: toDecimal,
  hidePhone: hidePhone,
  isPhoneNumber: isPhoneNumber,
  beautifyStr: beautifyStr,
  getMinutesArr: getMinutesArr,
  getFutureDaysArr: getFutureDaysArr,
  getHourArrBetween: getHourArrBetween,
  formatRichTextImg: formatRichTextImg,
  setNavBarColor: setNavBarColor,
  setCartBadge: setCartBadge,
  uploadImage: uploadImage
};