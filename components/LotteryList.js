"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _core = _interopRequireDefault(require('./../vendor.js')(0));

var _util = _interopRequireWildcard(require('./../utils/util.js'));

var _lottery = require('./../api/lottery.js');

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  data: {
    nowTime: 0
  },
  props: {
    lotteryList: {
      type: Array,
      "default": []
    },
    isMineLottery: {
      type: Boolean,
      "default": false
    }
  },
  created: function created() {
    this.nowTime = Date.parse(new Date());
  },
  methods: {
    toLotteryDetail: function toLotteryDetail(lotteryId) {
      // console.log(goodsId)
      _util["default"].navigateTo('/pages/lotteryDraw/detail?lotteryId=' + lotteryId);
    },
    joinLotteryDraw: function joinLotteryDraw(lottery, index) {
      var _this2 = this;

      (0, _lottery.joinLottery)({
        lotteryId: lottery.lotteryId
      }).then(function (res) {
        _util["default"].toast(res.msg);

        if (res.status === 'success') {
          lottery.lotteryJoiner.joinTimes += 1;
          lottery.lotteryJoiner.lotteryJoinNum += 1;

          _this2.$set(_this2.lotteryList, index, lottery);
        }
      });
    },
    doLotteryDraw: function doLotteryDraw(index) {
      // console.log(index)
      var lottery = this.lotteryList[index];

      var _this = this; // 判断是不是我发起的抽奖


      if (this.isMineLottery) {
        // 判断抽奖参与人次
        if (lottery.lotteryJoiner.joinTimes === 0) {
          wx.showModal({
            title: '删除提示',
            content: '删除操作将不可恢复，确认要删除吗？',
            success: function success(res) {
              if (res.confirm) {
                // 删除lottery
                (0, _lottery.deleteLottery)({
                  lotteryId: lottery.lotteryId
                }).then(function (res) {
                  _util["default"].toast(res.msg);

                  _this.$emit('delete-lottery', index);
                });
              }
            }
          });
        }
      } else {
        if (wx.requestSubscribeMessage) {
          var _this3 = this;

          wx.requestSubscribeMessage({
            tmplIds: [_util.MSG_TPL.lotteryOpenTpl],
            complete: function complete(res) {
              _this3.joinLotteryDraw(lottery, index);
            }
          });
        } else {
          _this.joinLotteryDraw(lottery, index);
        }
      }
    }
  }
}, {info: {"components":{"end-line":{"path":"./endLine"},"van-count-down":{"path":"./../$vendor/@vant/weapp/dist/count-down/index"}},"on":{}}, handlers: {'81-0': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.toLotteryDetail(item.lotteryId);
  })();
}},'81-1': {"tap": function proxy (index) {
    var _vm=this;
  return (function () {
    _vm.doLotteryDraw(index);
  })();
}}}, models: {}, refs: undefined });