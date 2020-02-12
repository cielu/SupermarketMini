"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regeneratorRuntime2 = _interopRequireDefault(require('./../vendor.js')(2));

var _x7 = _interopRequireDefault(require('./../vendor.js')(4));

var _location = require('./../utils/location.js');

var _common = require('./../utils/common.js');

var _cart = require('./../api/cart.js');

var _util = _interopRequireDefault(require('./../utils/util.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// Vuex store
var _default = new _x7["default"].Store({
  state: {
    currentArea: null,
    // 当前位置信息
    shoppingCart: {} // 购物车

  },
  mutations: {
    SET_CURRENT_AREA: function SET_CURRENT_AREA(state, currentArea) {
      state.currentArea = currentArea;
    },
    SET_SHOPPING_CART: function SET_SHOPPING_CART(state, shoppingCart) {
      state.shoppingCart = shoppingCart;
    }
  },
  actions: {
    setCurrentArea: function setCurrentArea(_ref, currentArea) {
      var commit = _ref.commit;
      commit('SET_CURRENT_AREA', currentArea);
    },
    setShoppingCart: function setShoppingCart(_ref2, shoppingCart) {
      var commit = _ref2.commit;
      commit('SET_SHOPPING_CART', shoppingCart);
    },
    syncCurrentArea: function syncCurrentArea(_ref3) {
      var commit = _ref3.commit;
      var relocate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return new Promise(function (resolve, reject) {
        (0, _location.getLocation)(relocate).then(function (currentArea) {
          // 设置当前地址信息
          commit('SET_CURRENT_AREA', currentArea); // 响应 resolve成功

          resolve();
        })["catch"](function (error) {
          reject(error);
        });
      });
    },
    updateCartNum: function updateCartNum(_ref4, _ref5) {
      var commit = _ref4.commit,
          state = _ref4.state;
      var storeId = _ref5.storeId,
          goodsCode = _ref5.goodsCode,
          num = _ref5.num,
          _ref5$isPlus = _ref5.isPlus,
          isPlus = _ref5$isPlus === void 0 ? true : _ref5$isPlus;
      // 判断购物车商品是否存在
      var shoppingCart = JSON.parse(JSON.stringify(state.shoppingCart));

      if (typeof shoppingCart[storeId] === 'undefined') {
        _util["default"].toast('更新商品数量失败');

        return false;
      } // 设置不同商品码的数量


      if (isPlus) {
        shoppingCart[storeId]['totalNum'] += num;

        if (shoppingCart[storeId]['goodsNum'][goodsCode]) {
          shoppingCart[storeId]['goodsNum'][goodsCode] += num;
        } else {
          shoppingCart[storeId]['goodsNum'][goodsCode] = num;
        }
      } else {
        shoppingCart[storeId]['totalNum'] -= num;

        if (shoppingCart[storeId]['goodsNum'][goodsCode] <= num) {
          delete shoppingCart[storeId]['goodsNum'][goodsCode];
        } else {
          shoppingCart[storeId]['goodsNum'][goodsCode] -= num;
        }
      }

      (0, _common.setCartBadge)(shoppingCart[storeId]['totalNum']); // 设置shopping cart

      commit('SET_SHOPPING_CART', shoppingCart);
    },
    addIntoCart: function () {
      var _addIntoCart = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee(_ref6, _ref7) {
        var commit, state, goods, _ref7$skuId, skuId, _ref7$returnGoods, returnGoods, goodsNum, storeId, shoppingCart, data, res;

        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                commit = _ref6.commit, state = _ref6.state;
                goods = _ref7.goods, _ref7$skuId = _ref7.skuId, skuId = _ref7$skuId === void 0 ? 0 : _ref7$skuId, _ref7$returnGoods = _ref7.returnGoods, returnGoods = _ref7$returnGoods === void 0 ? false : _ref7$returnGoods;
                storeId = goods.storeId;
                shoppingCart = JSON.parse(JSON.stringify(state.shoppingCart)); // 获取不到数据 （数据有问题）

                if (!(typeof shoppingCart[storeId] === 'undefined')) {
                  _context.next = 7;
                  break;
                }

                _util["default"].toast('数据错误，请重试');

                return _context.abrupt("return", false);

              case 7:
                // console.warn('before shopping cart change:', shoppingCart[storeId]['goodsNum'])
                // 第二次以上添加商品,商品没有添加过
                if (typeof shoppingCart[storeId]['goodsNum'][goods.goodsCode] === 'undefined') {
                  goodsNum = goods.saleStartNum;
                  shoppingCart[storeId]['totalNum'] += goodsNum;
                  shoppingCart[storeId]['goodsNum'][goods.goodsCode] = goodsNum;
                } else {
                  goodsNum = goods.saleStepNum;
                  shoppingCart[storeId]['totalNum'] += goodsNum; // 直接在原有基础上增加购买数量

                  shoppingCart[storeId]['goodsNum'][goods.goodsCode] = shoppingCart[storeId]['goodsNum'][goods.goodsCode] += goodsNum;
                } // console.warn('after shopping cart change:', shoppingCart[storeId]['goodsNum'])


                data = {
                  returnGoods: returnGoods,
                  goodsCode: goods.goodsCode,
                  goodsNum: goodsNum,
                  skuId: skuId
                }; // 加入购物车

                _context.next = 11;
                return (0, _cart.addGoodsIntoCart)(data);

              case 11:
                res = _context.sent;

                // console.log(res)
                if (res.status === 'success') {
                  //  设置微信 badge
                  (0, _common.setCartBadge)(shoppingCart[storeId]['totalNum']); // toast('添加成功')

                  commit('SET_SHOPPING_CART', shoppingCart); // 返回购物车商品信息

                  if (returnGoods) res.data.buyNum = goodsNum;
                }

                return _context.abrupt("return", res);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function addIntoCart(_x, _x2) {
        return _addIntoCart.apply(this, arguments);
      }

      return addIntoCart;
    }(),
    reduceCart: function () {
      var _reduceCart = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee2(_ref8, _ref9) {
        var commit, state, goods, _ref9$skuId, skuId, storeId, shoppingCart, beforeNum, data, reduceRes;

        return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                commit = _ref8.commit, state = _ref8.state;
                goods = _ref9.goods, _ref9$skuId = _ref9.skuId, skuId = _ref9$skuId === void 0 ? 0 : _ref9$skuId;
                storeId = goods.storeId;
                shoppingCart = JSON.parse(JSON.stringify(state.shoppingCart)); // 获取不到数据 （数据有问题）

                if (!(typeof shoppingCart[storeId] === 'undefined')) {
                  _context2.next = 7;
                  break;
                }

                _util["default"].toast('数据错误，请重试');

                return _context2.abrupt("return", false);

              case 7:
                // 减少当前
                beforeNum = shoppingCart[storeId]['goodsNum'][goods.goodsCode]; // shoppingCart[storeId]['goodsNum'][goods.goodsCode] -= goods.saleStepNum

                data = {
                  skuId: skuId,
                  goodsCode: goods.goodsCode,
                  goodsNum: goods.saleStepNum
                };
                _context2.next = 11;
                return (0, _cart.reduceCartGoods)(data);

              case 11:
                reduceRes = _context2.sent;

                if (!(reduceRes.status === 'success')) {
                  _context2.next = 20;
                  break;
                }

                // 移除购物车商品
                if (beforeNum - goods.saleStepNum <= 0) {
                  delete shoppingCart[storeId]['goodsNum'][goods.goodsCode];
                } else {
                  shoppingCart[storeId]['goodsNum'][goods.goodsCode] -= goods.saleStepNum;
                }

                shoppingCart[storeId]['totalNum'] -= goods.saleStepNum; //  设置微信 badge

                (0, _common.setCartBadge)(shoppingCart[storeId]['totalNum']); // toast('添加成功')

                commit('SET_SHOPPING_CART', shoppingCart); // return res

                return _context2.abrupt("return", reduceRes);

              case 20:
                _util["default"].toast('操作失败：' + reduceRes.msg);

              case 21:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function reduceCart(_x3, _x4) {
        return _reduceCart.apply(this, arguments);
      }

      return reduceCart;
    }(),
    // 初始化 shoppingCart
    initShoppingCart: function () {
      var _initShoppingCart = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee3(_ref10, storeInfo) {
        var commit, state, storeId, shoppingCart, res, cartGoods, gNum, totalNum, cart;
        return _regeneratorRuntime2["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                commit = _ref10.commit, state = _ref10.state;
                _context3.prev = 1;

                if (!(storeInfo == null)) {
                  _context3.next = 4;
                  break;
                }

                return _context3.abrupt("return", false);

              case 4:
                storeId = storeInfo.storeId; // 获取state中的 购物车数据

                shoppingCart = JSON.parse(JSON.stringify(state.shoppingCart)); // 购物车没有保存该门店的数据

                if (typeof shoppingCart[storeId] === 'undefined') {
                  // 组装 shoppingCart
                  shoppingCart[storeId] = {
                    store: storeInfo,
                    goodsNum: {},
                    totalNum: 0
                  };
                } // 获取某门店购物车数据


                _context3.next = 9;
                return (0, _cart.getCartGoods)({
                  storeId: storeId
                });

              case 9:
                res = _context3.sent;
                // 可销售的商品
                cartGoods = res.data.filter(function (item) {
                  return item.stockNum > 0;
                }); // 获取门店数据

                gNum = {};
                totalNum = 0;

                for (cart in cartGoods) {
                  // 不同sku 同一个商品 code , 之前有出现过
                  if (typeof gNum[cartGoods[cart].goodsCode] !== 'undefined') {
                    gNum[cartGoods[cart].goodsCode] += cartGoods[cart].goodsNum;
                  } else {
                    gNum[cartGoods[cart].goodsCode] = cartGoods[cart].goodsNum;
                  }

                  totalNum += cartGoods[cart].goodsNum;
                }

                shoppingCart[storeId]['totalNum'] = totalNum;
                shoppingCart[storeId]['goodsNum'] = gNum; //  设置微信 badge

                (0, _common.setCartBadge)(totalNum); // 设置shopping cart

                commit('SET_SHOPPING_CART', shoppingCart);
                _context3.next = 23;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](1);
                console.warn('some thing error:', _context3.t0);

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[1, 20]]);
      }));

      function initShoppingCart(_x5, _x6) {
        return _initShoppingCart.apply(this, arguments);
      }

      return initShoppingCart;
    }()
  }
});

exports["default"] = _default;