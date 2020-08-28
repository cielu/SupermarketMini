"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../../vendor.js')(2));

var _x = require('./../../../vendor.js')(4);

var _util = _interopRequireDefault(require('./../../../utils/util.js'));

var _cart = require('./../../../api/cart.js');

var _shoppingCart = require('./../../../utils/shopping-cart.js');

var _goods = require('./../../../api/goods.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = {
  data: {
    navTitle: '购物车',
    screenWidth: 375,
    storeInfo: null,
    storeId: 0,
    storeList: {},
    storeLength: 0,
    selectAll: true,
    cartList: {},
    cartLength: 0,
    totalPrice: 0,
    nowTime: 1,
    guessULikeGoods: [],
    guessULikePage: 1,
    canLoadMoreGoods: true,
    isShowStoreListModal: false
  },
  watch: {
    cartList: function cartList(newVal) {
      this.cartLength = Object.keys(newVal).length;
    },
    storeList: function storeList(newVal) {
      this.storeLength = Object.keys(newVal).length;
    }
  },
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea', 'shoppingCart', 'userInfo'])),
  onLoad: function onLoad() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.screenWidth = _this2.$app.$options.globalData.systemInfo.screenWidth;
    });

    if (this.currentArea === null) {
      this.syncCurrentArea();
    }
  },
  onShow: function onShow() {
    this.initStore();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x.mapActions)(['syncCurrentArea', 'addIntoCart', 'updateCartNum', 'initShoppingCart']), {
    // vuex 方法
    // 其他方法
    toHomePage: function toHomePage() {
      _util["default"].switchHome();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    initStore: function initStore() {
      // 用户信息 & 当前时间
      this.nowTime = Date.parse(new Date()) / 1000;

      if (this.userInfo === null) {
        _util["default"].navigateTo('/pages/other/login');

        return;
      } // 获取购物车数据


      var storeInfo = this.$app.$options.globalData.storeInfo;
      var shoppingCart = Object.assign({}, this.shoppingCart); // 购物车存在商品

      if (shoppingCart != null) {
        // console.log(shoppingCart)
        var storeKey;
        var storeList = {};

        for (storeKey in shoppingCart) {
          storeList[storeKey] = shoppingCart[storeKey].store;
        } // 购物车所有有数据的门店


        this.storeList = storeList; // 门店信息不存在 -> 拿最后一条key

        if (storeInfo == null) {
          storeInfo = storeList[storeKey];
        }
      } // 购物车 & 门店信息不存在


      if (storeInfo == null) {
        _util["default"].switchHome();

        return;
      } // 设置店铺信息


      this.storeInfo = storeInfo;
      this.storeId = storeInfo.storeId; // 重新获取购物车数据

      this.initShoppingCart(storeInfo);
      this.loadCartGoods();
      this.loadGuessULikeGoods();
    },
    loadCartGoods: function loadCartGoods() {
      var _this3 = this;

      return _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee() {
        var res;
        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(_this3.storeId === 0)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                _context.next = 4;
                return (0, _cart.getCartGoods)({
                  storeId: _this3.storeId
                });

              case 4:
                res = _context.sent;

                if (res.status === 'success') {
                  _this3.cartList = (0, _shoppingCart.groupCartByActivity)(res.data);

                  _this3.updateCartInfo();
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    showStoreListModal: function showStoreListModal() {
      this.isShowStoreListModal = !this.isShowStoreListModal;
    },
    toGoodsDetail: function toGoodsDetail(goodsCode) {
      _util["default"].navigateTo('/packageGoods/goods/detail?goodsCode=' + goodsCode);
    },
    chooseStore: function chooseStore(store) {
      this.storeId = store.storeId;
      this.loadCartGoods();
      this.loadGuessULikeGoods();
      this.showStoreListModal();
    },
    handleGoodsSelect: function handleGoodsSelect(key, index) {
      // 获取要勾选或取消勾选
      this.cartList[key]['items'][index].selected = !this.cartList[key]['items'][index].selected;
      this.updateCartInfo();
    },
    handleSelectAll: function handleSelectAll() {
      // 全选
      var cartObj = this.cartList;
      this.selectAll = !this.selectAll;

      for (var activityKey in cartObj) {
        for (var cartKey in cartObj[activityKey]['items']) {
          // 库存不足
          if (cartObj[activityKey]['items'][cartKey].stockNum <= 0) {
            cartObj[activityKey]['items'][cartKey].selected = false;
          } else {
            cartObj[activityKey]['items'][cartKey].selected = this.selectAll;
          }
        }
      }

      this.updateCartInfo();
    },
    updateCartInfo: function updateCartInfo() {
      var total = (0, _shoppingCart.updateTotalInfo)(this.cartList, this.storeInfo, this.userInfo); // 购物车信息

      this.cartList = total.cartList;
      this.totalPrice = total.totalPrice.toFixed(2);
    },
    handleAddCart: function handleAddCart(goods) {
      var _this4 = this;

      var cartParams = {
        goods: goods,
        skuId: 0,
        returnGoods: true
      };
      this.addIntoCart(cartParams).then(function (res) {
        // console.log('====add into cart res :', res.data.buyNum)
        // 购物车加入成功
        if (res.status === 'success') {
          // 购物车里没有数据，则刷新获取数据
          if (_this4.cartLength === 0) {
            // 当前门店未选中
            _this4.loadCartGoods();
          } else {
            res.data.selected = true; // 复制一个 cartList

            var cartList = Object.assign({}, _this4.cartList);
            var activityKey = "activity".concat(res.data.activityId); // 活动已存在

            if (cartList.hasOwnProperty(activityKey)) {
              // 赋值购物车数据
              cartList[activityKey]['items']["cart".concat(res.data.cartId)] = res.data; // 不需要更新 活动key

              _this4.cartList = cartList;
            } else {
              var activityItem = {
                activity: res.data.activity,
                items: _defineProperty({}, "cart".concat(res.data.cartId), res.data)
              };
              cartList[activityKey] = activityItem; // 顺序格式化

              _this4.cartList = (0, _shoppingCart.orderObj)(cartList);
            }
          }

          _this4.updateCartInfo();
        }
      });
    },
    makeUpABill: function makeUpABill() {
      var activity = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var activityId = 0;
      var activityTitle = '促销活动'; // 有传入活动

      if (activity != null) {
        activityTitle = activity.title;
        activityId = activity.activityId;
      }

      _util["default"].navigateTo('/packageGoods/activity/index?activityId=' + activityId + '&title=' + activityTitle);
    },
    toSettle: function toSettle() {
      // 判断是否达到起送费
      if (this.totalPrice < this.storeInfo.startSendFee) {
        _util["default"].toast('满' + this.storeInfo.startSendFee + '元起送🙄');

        return;
      }

      var cartObj = this.cartList;
      var cartIds = [];

      for (var activityKey in cartObj) {
        for (var itemKey in cartObj[activityKey]['items']) {
          if (cartObj[activityKey]['items'][itemKey].selected) {
            cartIds.push(cartObj[activityKey]['items'][itemKey].cartId);
          }
        }
      }

      var params = 'storeId=' + this.storeId + '&cartIds=' + cartIds.join(','); // 确认订单

      _util["default"].navigateTo('/packageGoods/order/confirm', params);
    },
    handleRemove: function handleRemove(key, index) {
      var _this5 = this;

      // 购物车列表
      var cartList = JSON.parse(JSON.stringify(this.cartList));
      var cartGoods = cartList[key]['items'][index];
      (0, _cart.removeCartGoods)({
        cartId: cartGoods.cartId
      }).then(function (res) {
        // 删除成功
        if (res.status === 'success') {
          delete cartList[key]['items'][index]; // 该活动下没有更多的活动商品

          var itemLength = Object.keys(cartList[key]['items']);

          if (itemLength.length === 0) {
            delete cartList[key];
          }

          _this5.cartList = cartList;
        } // 更新购物车商品数量


        _this5.updateCartNum({
          storeId: _this5.storeId,
          goodsCode: cartGoods.goodsCode,
          num: cartGoods.goodsNum,
          isPlus: false
        }); // 更新购物车数据


        _this5.updateCartInfo();
      });
    },
    onPlusGoodsNum: function onPlusGoodsNum(key, index) {
      var _this6 = this;

      var cartGoods = this.cartList[key]['items'][index];
      var data = {
        updateType: 'increase',
        cartId: cartGoods.cartId,
        goodsNum: cartGoods.saleStepNum
      };
      (0, _cart.updateCartGoods)(data).then(function (res) {
        // console.log(res)
        if (res.status === 'success') {
          _this6.cartList[key]['items'][index].goodsNum += cartGoods.saleStepNum; // 更新Store商品数量

          _this6.updateCartNum({
            storeId: _this6.storeId,
            goodsCode: cartGoods.goodsCode,
            num: cartGoods.saleStepNum
          });

          _this6.updateCartInfo(); // util.toast('添加成功')

        }
      });
    },
    onMinusGoodsNum: function onMinusGoodsNum(key, index) {
      var _this7 = this;

      // console.log(index)
      var _this = this;

      var cartGoods = this.cartList[key]['items'][index]; // 商品数量减少到0 时，则提示，是否删除该商品

      if (cartGoods.goodsNum - cartGoods.saleStepNum === 0) {
        wx.showModal({
          content: '确定要删除该商品吗？',
          success: function success(sm) {
            if (sm.confirm) {
              _this.handleRemove(key, index);
            }
          }
        });
        return;
      }

      var data = {
        updateType: 'decrease',
        cartId: cartGoods.cartId,
        goodsNum: cartGoods.saleStepNum
      };
      (0, _cart.updateCartGoods)(data).then(function (res) {
        // console.log(res)
        if (res.status === 'success') {
          _this.cartList[key]['items'][index].goodsNum -= cartGoods.saleStepNum; // 更新购物车商品数量

          _this.updateCartNum({
            storeId: _this7.storeId,
            goodsCode: cartGoods.goodsCode,
            num: cartGoods.saleStepNum,
            isPlus: false
          }); // 购物车商品为0 的时候，直接删除


          _this.updateCartInfo();
        }
      });
    },
    loadGuessULikeGoods: function loadGuessULikeGoods() {
      var _this8 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (page === 0) {
        this.canLoadMoreGoods = true;
      }

      if (!this.canLoadMoreGoods) return null;
      var form = {
        page: page + 1
      };

      if (this.storeId !== 0) {
        form.storeId = this.storeId;
      } // 获取分类ID


      (0, _goods.getGuessULikeGoods)(form).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this8.canLoadMoreGoods = false;
        }

        _this8.guessULikePage = res.data.curPage;
        _this8.guessULikeGoods = _this8.guessULikePage === 1 ? res.data.data : _this8.guessULikeGoods.concat(res.data.data);
      });
    }
  }),
  // 滚动位置
  onPageScroll: function onPageScroll(res) {
    // 滚动到顶部，则显示 `购物车`
    if (res.scrollTop < 40) {
      if (this.navTitle !== '购物车') {
        this.navTitle = '购物车';
      }
    } else {
      if (this.navTitle === '购物车') {
        this.navTitle = '送至：' + this.currentArea.title;
      }
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.initStore();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {
    this.loadGuessULikeGoods(this.guessULikePage);
  }
};
exports["default"] = _default;