"use strict";

var _common = require('./common.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 更新统计信息
function updateTotalInfo(cartObj, store, userInfo) {
  var returnCartObj = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  // 申明变量
  var total = {
    totalNum: 0,
    totalPrice: 0,
    hasActivity: false // 是否参与活动 || 参与了商品活动，则不参与门店活动

  };
  var cartList = Object.assign({}, cartObj); // 当前时间

  var nowTime = Date.parse(new Date()) / 1000; // 遍历购物车

  for (var activityKey in cartList) {
    var hasReduceMoney = 0; // 已减免

    var subTotalPrice = 0; // 活动商品小记

    var activity = cartList[activityKey];
    activity['activity'].reduceTitle = ''; // 购物车归属的活动

    for (var cartKey in activity['items']) {
      var cartGoods = activity['items'][cartKey]; // 库存不足

      if (cartGoods.stockNum <= 0) {
        continue;
      } // 只统计已勾选的


      if (cartGoods.selected) {
        var price = 0; // 多sku 与 单 sku

        if (cartGoods.skuId > 0) {
          // 价格按照 sku 的来
          price = parseFloat(cartGoods.goodsSku.salePrice);
        } else {
          price = parseFloat(cartGoods.salePrice);
        } // vip 商品并且VIP没有过期 ， 则价格使用VIP价


        if (cartGoods.isVipGoods && userInfo.vipExpiredAt > nowTime) {
          price = (0, _common.toDecimal)(price * parseFloat(store.vipDiscount));
        } // 第二件活动商品


        if (activity.activity.activityId > 0 && activity.activity.type === 'theSecond') {
          // 偶数数量
          var evenNum = parseInt(cartGoods.goodsNum / 2); // 折扣价

          var discountPrice = (0, _common.toDecimal)((cartGoods.goodsNum - evenNum) * price + evenNum * price * activity.activity.discount); // 小记价格 = 奇数数量总价 + 偶数数量折扣价

          subTotalPrice += discountPrice; // 减免价 = 原价 - 已折扣价

          hasReduceMoney = (0, _common.toDecimal)(hasReduceMoney + cartGoods.goodsNum * price - discountPrice);
        } else {
          subTotalPrice += price * cartGoods.goodsNum;
        } // 商品总数


        total.totalNum += cartGoods.goodsNum;
      }
    } // 判断是否活动商品 && 商品是否达标


    if (activity.activity.activityId > 0) {
      // 存在活动，不参与店铺活动
      total.hasActivity = true;

      switch (activity.activity.type) {
        case 'fullScale':
          // 满减 达标 && 减免金额
          if (subTotalPrice > activity.activity.fullPrice) {
            subTotalPrice = (0, _common.toDecimal)(subTotalPrice - activity.activity.discount);
            activity.activity.reduceTitle = '，已省' + activity.activity.discount + '元';
          } else {
            activity.activity.reduceTitle = '，还差' + (0, _common.toDecimal)(activity.activity.fullPrice - subTotalPrice) + '元';
          }

          break;

        case 'discount':
          // 折扣
          var originPrice = subTotalPrice; // 折扣后的价格

          subTotalPrice = originPrice * activity.activity.discount; // 折扣减免

          activity.activity.reduceTitle = '，已省' + (0, _common.toDecimal)(originPrice - subTotalPrice) + '元';
          break;

        case 'theSecond':
          if (hasReduceMoney > 0) {
            activity.activity.reduceTitle = '，已省' + hasReduceMoney + '元';
          }

          break;
      }
    }

    total.totalPrice += subTotalPrice; // 不存在活动，则参与店铺活动

    if (!total.hasActivity) {// total.totalPrice =
    }
  } // 是否需要返回 购物车对象


  if (returnCartObj) {
    total.cartList = cartList;
  } // 返回统计信息


  return total;
} // 格式化购物车 =》按活动类型分组


function groupCartByActivity(goodsList) {
  // 获取已售罄的商品
  var hasSaled = goodsList.filter(function (item) {
    return item.stockNum <= 0;
  }); // 可销售的商品

  var canSale = goodsList.filter(function (item) {
    return item.stockNum > 0;
  }); // 组合为数组

  var cartList = {}; // 转为对象

  canSale.concat(hasSaled).map(function (item) {
    item['selected'] = true; // 如果选择的为sku商品，则增加所选的sku属性

    if (item.skuId > 0) {
      item.goodsSku['attributes'] = item.goodsSku.a1 + ' ' + item.goodsSku.a2 + ' ' + item.goodsSku.a3 + ' ' + item.goodsSku.a4 + ' ' + item.goodsSku.a5;
    } // 活动 ID 作为分组 key


    var activityKey = "activity".concat(item.activityId); // 根据减免活动分组

    if (cartList.hasOwnProperty(activityKey)) {
      cartList[activityKey]['items']["cart".concat(item.cartId)] = item;
    } else {
      item.activity['reduceTitle'] = '';
      cartList[activityKey] = {
        activity: item.activity,
        items: _defineProperty({}, "cart".concat(item.cartId), item)
      };
    }
  });
  return orderObj(cartList);
} // 顺序化对象


function orderObj(object) {
  // 顺序格式化 key
  var ordered = {};
  Object.keys(object).sort().forEach(function (key) {
    ordered[key] = object[key];
  });
  return ordered;
}

module.exports = {
  orderObj: orderObj,
  updateTotalInfo: updateTotalInfo,
  groupCartByActivity: groupCartByActivity
};