"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(2));

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireWildcard(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _common = require('./../../utils/common.js');

var _lottery = require('./../../api/lottery.js');

var _uploadImage = require('./../../utils/uploadImage.js');

var _other = require('./../../api/other.js');

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_core["default"].page({
  name: 'lotteryPublish',
  mixins: [_statusBar["default"]],
  data: {
    type: null,
    isSubmiting: false,
    showLotteryTimeModal: false,
    giftTypes: [{
      title: '实物',
      value: 1
    }, {
      title: '红包',
      value: 2
    }, {
      title: '虚拟',
      value: 3
    }],
    lotteryOpenTime: '',
    lotteryTimePicker: [0, 0, 0],
    lotteryTime: {
      days: [],
      hours: [],
      minutes: []
    },
    form: {
      gifts: [],
      saveDescription: false,
      lotteryOpenType: 1,
      // 开奖类型 ｜ 1时间｜2人次
      lotteryOpenNum: '',
      // 参奖人次
      lotteryOpenTime: 0,
      // 开奖时间
      lotteryDescription: '',
      sponsorCode: ''
    },
    gift: {
      giftType: 1,
      giftCover: '',
      giftTitle: '',
      giftPrice: '',
      giftNum: '',
      redpackFee: '',
      redpackType: 0,
      redpackNum: '',
      redeemCode: ''
    }
  },
  onLoad: function onLoad(query) {
    this.setGiftByIdx(0, Object.assign({}, this.gift)); // 设置日期

    this.lotteryTime = {
      days: (0, _common.getFutureDaysArr)(),
      hours: (0, _common.getHourArrBetween)(),
      minutes: (0, _common.getMinutesArr)()
    };
  },
  onShow: function onShow() {
    // 获取storage cropImage 数据
    var cropImage = wx.getStorageSync('cropImage'); // 判断是否有数据

    if (cropImage !== '' && cropImage !== null) {
      // 数据存储
      var gift = this.getGiftByIdx(cropImage.index);
      gift.giftCover = cropImage.cropPath;
      this.$set(this.form.gifts, cropImage.index, gift);
      wx.removeStorageSync('cropImage');
    }
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    getGiftByIdx: function getGiftByIdx(giftIdx) {
      return Object.assign({}, this.form.gifts[giftIdx]);
    },
    setGiftByIdx: function setGiftByIdx(giftIdx, gift) {
      this.$set(this.form.gifts, giftIdx, gift);
    },
    changeGiftType: function changeGiftType(giftIdx, type) {
      // 获取礼物类型
      var gift = Object.assign({}, this.gift);
      gift.giftType = type; //  set gifts

      this.setGiftByIdx(giftIdx, gift);
    },
    changeRedPackType: function changeRedPackType(giftIdx) {
      var gift = this.getGiftByIdx(giftIdx); // 设置红包类型

      if (gift.redpackType === 1) {
        gift.redpackType = 0;
      } else {
        gift.redpackType = 1;
      }

      this.setGiftByIdx(giftIdx, gift);
    },
    changeOpenCondition: function changeOpenCondition() {
      var _this = this;

      wx.showActionSheet({
        itemList: ['按开奖时间自动开奖', '按参奖人次自动开奖'],
        success: function success(res) {
          _this.form.lotteryOpenType = res.tapIndex + 1;
        }
      });
    },
    onLotteryTimeChange: function onLotteryTimeChange(ev) {
      this.lotteryTimePicker = ev.$wx.detail.value;
    },
    submitLottery: function submitLottery() {
      // 判断是否有订阅消息
      if (wx.requestSubscribeMessage) {
        var _this = this;

        wx.requestSubscribeMessage({
          tmplIds: [_util.MSG_TPL.lotteryOpenTpl],
          // 开奖结果通知
          complete: function complete(res) {
            _this.doSubmitLottery();
          }
        });
      } else {
        this.doSubmitLottery();
      }
    },
    doSubmitLottery: function doSubmitLottery() {
      var _this2 = this;

      return _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee() {
        var form, tokenRes, i, uploadRes, _uploadRes, submitRes;

        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!_this2.isSubmiting) {
                  _context.next = 3;
                  break;
                }

                _util["default"].toast('数据正在提交中');

                return _context.abrupt("return");

              case 3:
                // 提交抽奖数据
                form = JSON.parse(JSON.stringify(_this2.form));
                _context.prev = 4;

                if (!(form.lotteryOpenType === 1 && form.lotteryOpenTime === 0)) {
                  _context.next = 8;
                  break;
                }

                _util["default"].toast('请选择开奖时间');

                return _context.abrupt("return");

              case 8:
                if (!(form.lotteryOpenType === 2 && form.lotteryOpenNum === '')) {
                  _context.next = 11;
                  break;
                }

                _util["default"].toast('请输入开奖人次');

                return _context.abrupt("return");

              case 11:
                form.lotteryOpenNum = parseInt(form.lotteryOpenNum);
                form.lotteryOpenTime = parseInt(form.lotteryOpenTime); // 获取token

                _context.next = 15;
                return (0, _other.getOssSignature)({
                  dir: 'giftCover'
                });

              case 15:
                tokenRes = _context.sent;
                i = 0;

              case 17:
                if (!(i < form.gifts.length)) {
                  _context.next = 35;
                  break;
                }

                if (!(_this2.judgeGiftIsOk(form.gifts[i]) === false)) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("return", false);

              case 20:
                form.gifts[i].giftNum = parseInt(form.gifts[i].giftNum);
                form.gifts[i].giftPrice = parseFloat(form.gifts[i].giftPrice);
                form.gifts[i].redpackNum = parseInt(form.gifts[i].redpackNum);
                form.gifts[i].redpackFee = parseFloat(form.gifts[i].redpackFee);

                if (!(form.gifts[i].giftCover !== '')) {
                  _context.next = 32;
                  break;
                }

                _context.next = 27;
                return (0, _uploadImage.uploadImage)(form.gifts[i].giftCover, tokenRes.data, 'giftCover');

              case 27:
                uploadRes = _context.sent;

                if (!(uploadRes.errMsg !== 'uploadFile:ok')) {
                  _context.next = 31;
                  break;
                }

                _util["default"].toast('图片上传失败');

                return _context.abrupt("return");

              case 31:
                form.gifts[i].giftCover = uploadRes.key;

              case 32:
                i++;
                _context.next = 17;
                break;

              case 35:
                if (!(form.sponsorCode !== '')) {
                  _context.next = 40;
                  break;
                }

                _context.next = 38;
                return (0, _uploadImage.uploadImage)(form.sponsorCode, tokenRes.data, 'sponsorCode');

              case 38:
                _uploadRes = _context.sent;
                form.sponsorCode = _uploadRes.key;

              case 40:
                _this2.isSubmiting = true; // 提交表单数据

                _context.next = 43;
                return (0, _lottery.submitLottery)(JSON.stringify(form));

              case 43:
                submitRes = _context.sent;

                if (submitRes.status === 'error') {
                  _util["default"].toast(submitRes.msg);
                }

                _this2.isSubmiting = false; // 回退

                _this2.onClickBack();

                _context.next = 53;
                break;

              case 49:
                _context.prev = 49;
                _context.t0 = _context["catch"](4);
                console.log(_context.t0);

                _util["default"].toast('数据请求错误！');

              case 53:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[4, 49]]);
      }))();
    },
    judgeGiftIsOk: function judgeGiftIsOk(gift) {
      // 判断不同类型的礼物是否完善
      if ([1, 3].indexOf(gift.giftType) !== -1) {
        // 判断是否有填写标题 & 数量
        if (gift.giftTitle === '') {
          _util["default"].toast('请填写奖品名称');

          return false;
        } // 判断份数


        if (gift.giftNum === '' || gift.giftNum === 0) {
          _util["default"].toast('请填写奖品数量');

          return false;
        } // 判断兑换码


        if (gift.giftType === 3 && gift.redeemCode === '') {
          _util["default"].toast('请填写奖品兑换码');

          return false;
        }
      } // 判断红包


      if (gift.giftType === 2) {
        // 判断数量 & 金额
        if (gift.redpackFee === '') {
          _util["default"].toast('请填写红包金额');

          return false;
        }

        if (gift.redpackNum === '') {
          _util["default"].toast('请填写红包数量');

          return false;
        }
      }

      return true;
    },
    setLotteryOpenTime: function setLotteryOpenTime() {
      try {
        var nowDate = new Date();
        var picker = JSON.parse(JSON.stringify(this.lotteryTimePicker));
        var date = this.lotteryTime.days[picker[0]];
        var hour = this.lotteryTime.hours[picker[1]];
        var minute = this.lotteryTime.minutes[picker[2]];
        var formatDate = date.substr(0, 5).replace(/月/g, '-');
        var year = nowDate.getFullYear(); // 完整日期

        var fullDate = year + '-' + formatDate + ' ' + hour + ':' + minute; // 获取时间戳

        var timestamp = new Date(fullDate).getTime() / 1000; // 判断是否小于当前时间 1小时

        if (timestamp - nowDate.getTime() / 1000 < 3600) {
          _util["default"].toast('开奖时间必须为当前时间1小时后');

          return;
        }

        this.lotteryOpenTime = date + ' ' + hour + ':' + minute;
        this.form.lotteryOpenTime = timestamp;
      } catch (e) {
        this.lotteryTimePicker = [0, 0, 0];

        _util["default"].toast('设置出错，请重新选择');
      }

      this.showLotteryTimeModal = false;
    },
    uploadSponsorCode: function uploadSponsorCode() {
      // 获取图片
      var _this = this;

      wx.chooseImage({
        count: 1,
        success: function success(res) {
          _this.form.sponsorCode = res.tempFilePaths[0];
        }
      });
    },
    optionGiftCover: function optionGiftCover(giftIdx) {
      var _this = this; // 是否修改封面图


      if (this.form.gifts[giftIdx].giftCover === '') {
        wx.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function success(res) {
            // 跳转 并携带 path
            var params = 'filePath=' + res.tempFilePaths[0] + '&column=giftCover&index=' + giftIdx;

            _this.redirectTo('/pages/other/cropImage?' + params);
          }
        });
        return;
      }

      this.form.gifts[giftIdx].giftCover = '';
    }
  }
}, {info: {"components":{"van-popup":{"path":"./../../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"van-uploader":{"path":"./../../$vendor/@vant/weapp/dist/uploader/index"}},"on":{"25-5":["tap"],"25-8":["close","touchmove"]}}, handlers: {'25-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'25-1': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.optionGiftCover(0);
  })();
}},'25-2': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.changeRedPackType(0);
  })();
}},'25-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.changeOpenCondition.apply(_vm, $args || [$event]);
  })();
}},'25-4': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showLotteryTimeModal=true;
  })();
}},'25-5': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.form.sponsorCode='';
  })();
}},'25-6': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.uploadSponsorCode.apply(_vm, $args || [$event]);
  })();
}},'25-7': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.submitLottery.apply(_vm, $args || [$event]);
  })();
}},'25-8': {"close": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showLotteryTimeModal=false;
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'25-10': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showLotteryTimeModal=false;
  })();
}},'25-11': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.setLotteryOpenTime.apply(_vm, $args || [$event]);
  })();
}},'25-12': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onLotteryTimeChange.apply(_vm, $args || [$event]);
  })();
}}}, models: {'0': {
      type: "input",
      expr: "form.gifts[0].giftTitle",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form.gifts[0], "giftTitle", $v);
      
    }
    },'1': {
      type: "input",
      expr: "form.gifts[0].giftPrice",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form.gifts[0], "giftPrice", $v);
      
    }
    },'2': {
      type: "input",
      expr: "form.gifts[0].giftNum",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form.gifts[0], "giftNum", $v);
      
    }
    },'3': {
      type: "input",
      expr: "form.gifts[0].redpackFee",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form.gifts[0], "redpackFee", $v);
      
    }
    },'4': {
      type: "input",
      expr: "form.gifts[0].redpackNum",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form.gifts[0], "redpackNum", $v);
      
    }
    },'5': {
      type: "input",
      expr: "form.gifts[0].redeemCode",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form.gifts[0], "redeemCode", $v);
      
    }
    },'6': {
      type: "input",
      expr: "form.lotteryOpenNum",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "lotteryOpenNum", $v);
      
    }
    },'7': {
      type: "change",
      expr: "form.saveDescription",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "saveDescription", $v);
      
    }
    },'8': {
      type: "input",
      expr: "form.lotteryDescription",
      handler: function set ($v) {
      var _vm=this;
        _vm.$set(_vm.form, "lotteryDescription", $v);
      
    }
    }}, refs: undefined });