"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MSG_TPL = exports.MAP_KEY = void 0;
// mapKey
var MAP_KEY = '66LBZ-L6LLU-LAEV5-25R42-6QARK-UPFVW'; // 订阅消息

exports.MAP_KEY = MAP_KEY;
var MSG_TPL = {
  groupOrderSuccess: 'uRNV_YfBczqfeTT5YcTWcCP5EeIAIC6luF_WlfUhYJc',
  // 开团成功
  groupOrderStatus: 'pg70eKiYmK_1WsuXjpRN_LYkTjvAtWZrFpM38LqFcWM',
  // 拼团状态
  cancelOrder: '9Ic3M4C6PluvPVprLeFWuu3eyuGLS5eFDuqwYk7Ni0g',
  // 取消订单
  orderSuccess: 'rkJq2-z6isXirE6SP3TrONYwXw3NSZvpS94Y878ATXM',
  // 下单成功
  orderDistribute: 'CFod0hYH8nGYNhL_jWK10LYUXfqRRSFlz_6m2DTx0w8',
  // 订单配送
  lotteryOpenTpl: 'OMHo_Chs5pcmeGzE-UEVwJsjp8e-DyboLj0irbhiGJQ' // 开奖结果通知

}; // routePlan

exports.MSG_TPL = MSG_TPL;

function routePlan(_ref) {
  var name = _ref.name,
      latitude = _ref.latitude,
      longitude = _ref.longitude;
  var key = MAP_KEY; // 使用在腾讯位置服务申请的key

  var referer = '一号小店'; // 调用插件的app的名称

  var endPoint = JSON.stringify({
    // 终点
    'name': name,
    'latitude': latitude,
    'longitude': longitude
  });
  wx.navigateTo({
    url: 'plugin://routePlan/index?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
  });
} // toast


function toast(title) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 2000;
  var TOAST = {
    title: title,
    duration: duration
  };

  if (type === 'smile') {
    TOAST.image = '/images/smile.png';
  } else {
    TOAST.icon = type;
  }

  wx.showToast(TOAST);
} // navigation


function navigate(navigate, targetId) {
  var targetName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var param = ''; // 判断跳转类型

  switch (navigate.type) {
    case 'spellGroupOnline':
      param = 'cateId=' + targetId;
      break;

    case 'spellGroupActivity':
      param = 'activityId=' + targetId;
      break;

    case 'discountActivities':
      param = 'activityId=' + targetId + '&title=' + targetName;
      break;

    case 'goods':
      param = 'goodsCode=' + targetId;
      break;

    case 'categoryList':
      param = 'cateId=' + targetId + '&title=' + targetName;
      break;

    case 'dailySign':
      // param = 'cateId=' + targetId
      break;

    default:
      return false;
  }

  navigateTo(navigate.miniPath, param);
} // navigate to


function navigateTo(path) {
  var param = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  path = param !== '' ? path + '?' + param : path;
  wx.navigateTo({
    url: path
  });
} // navigate back


function navigateBack() {
  var delta = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
  wx.navigateBack({
    delta: delta
  });
} // 跳转到购物车


function navigateCart() {
  navigateTo('/pages/shoppingCart/cart');
} // switch home


function switchHome() {
  wx.switchTab({
    url: '/pages/home/index'
  });
}

module.exports = {
  MAP_KEY: MAP_KEY,
  MSG_TPL: MSG_TPL,
  toast: toast,
  navigate: navigate,
  navigateTo: navigateTo,
  navigateCart: navigateCart,
  navigateBack: navigateBack,
  switchHome: switchHome,
  routePlan: routePlan
};