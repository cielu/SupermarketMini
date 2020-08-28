"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLotteryList = getLotteryList;
exports.getLotteryChance = getLotteryChance;
exports.getLotteryJoiners = getLotteryJoiners;
exports.getWinnerJoiners = getWinnerJoiners;
exports.getMineWinnerLog = getMineWinnerLog;
exports.getLotteryDetail = getLotteryDetail;
exports.deleteLottery = deleteLottery;
exports.joinLottery = joinLottery;
exports.submitLottery = submitLottery;

var _request = require('./../utils/request.js');

// 提交抽奖数据
function getLotteryList() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/lottery/list', params);
} // 获取抽奖机会等信息


function getLotteryChance() {
  return (0, _request.wxRequest)('/lottery/chance');
} // 获取参与人物


function getLotteryJoiners() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/lottery/joiners', params);
} // 获取中奖用户


function getWinnerJoiners() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/lottery/winners', params);
} // 获取我的中奖记录


function getMineWinnerLog() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/lottery/mine-winner-log', params);
} // 获取抽奖详情


function getLotteryDetail(id) {
  return (0, _request.wxRequest)('/lottery/detail/' + id);
} // 删除抽奖


function deleteLottery() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/lottery/remove', data, 'POST');
} // 参与抽奖


function joinLottery() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return (0, _request.wxRequest)('/lottery/join', data, 'POST');
} // 提交抽奖数据


function submitLottery(data) {
  return (0, _request.wxRequest)('/lottery/publish', data, 'POST');
}