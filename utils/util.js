"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAP_KEY = void 0;
// mapKey
var MAP_KEY = '66LBZ-L6LLU-LAEV5-25R42-6QARK-UPFVW'; // toast

exports.MAP_KEY = MAP_KEY;

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


function redirectCart() {
  wx.redirectTo({
    url: '/pages/shoppingCart/cart'
  });
} // switch home


function switchHome() {
  wx.switchTab({
    url: '/pages/home/index'
  });
}

module.exports = {
  MAP_KEY: MAP_KEY,
  toast: toast,
  navigate: navigate,
  navigateTo: navigateTo,
  redirectCart: redirectCart,
  navigateBack: navigateBack,
  switchHome: switchHome
};