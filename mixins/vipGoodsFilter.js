"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vipGoodsFilter = void 0;
// VIP商品过滤器
var vipGoodsFilter = {
  filters: {
    isVipGoods: function isVipGoods(_isVipGoods) {
      if (this.userInfo === null) {
        return false;
      }

      if (this.userInfo.vipExpiredAt < this.nowTime) {
        return false;
      }

      return _isVipGoods === 1;
    }
  }
};
exports.vipGoodsFilter = vipGoodsFilter;