"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(2));

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x3 = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _location = require('./../../utils/location.js');

var _store2 = require('./../../api/store.js');

var _goods = require('./../../api/goods.js');

var _common = require('./../../utils/common.js');

var _goodsNum = require('./../../mixins/goodsNum.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"], _goodsNum.goodsNumMixin],
  data: {
    storeInfo: null,
    storeList: [],
    cartGoodsNum: {},
    loading: true,
    showCatePopup: false,
    showStoreModal: false,
    canLoadMore: true,
    curRootIdx: 0,
    curChildIdx: 0,
    // 子分类索引
    categories: [],
    // 左侧导航栏内容
    goodsList: [],
    // 商品列表
    sorts: {
      normal: {
        name: '综合',
        type: 'desc',
        selected: true
      },
      salesNum: {
        name: '销量',
        type: 'desc',
        selected: false
      },
      price: {
        name: '价格',
        type: 'desc',
        selected: false
      }
    },
    // 排序
    curPage: 0,
    scrollTop: 0,
    // 用作跳转后右侧视图回到顶部
    scrollHeight: 730
  },
  computed: _objectSpread({}, (0, _x3.mapState)(['currentArea', 'shoppingCart'])),
  onLoad: function onLoad() {
    // 门店ID
    this.storeInfo = this.$app.$options.globalData.storeInfo; // 顶部status bar 高度，导航栏高度，

    this.scrollHeight = this.$app.$options.globalData.systemInfo.windowHeight - this.statusBarHeight - 90; // 获取附近的门店，若不存在一个门店，则展示无门店的页面

    this.loadStores(); // 获取分类数据

    if (this.storeInfo !== null) {
      this.loadCategory();
    }
  },
  onShow: function onShow() {
    if (this.storeInfo !== null) {
      // 设置当前门店的 badge
      (0, _common.setCartBadge)(this.shoppingCart[this.storeInfo.storeId].totalNum);
    }
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x3.mapActions)(['syncCurrentArea', 'initShoppingCart', 'addIntoCart', 'reduceCart']), {
    // vuex 方法
    // 本地其他方法
    handleStoreModal: function handleStoreModal() {
      this.showStoreModal = !this.showStoreModal;
      (0, _common.setNavBarColor)(this.showStoreModal ? '#000000' : '#ffffff');
    },
    handleSort: function handleSort(key) {
      for (var k in this.sorts) {
        this.sorts[k].selected = false;
      }

      this.sorts[key].selected = true;

      if (key === 'price') {
        this.sorts[key].type = this.sorts[key].type === 'asc' ? 'desc' : 'asc';
      }

      this.loadGoodsList();
    },
    tapRootCateTab: function tapRootCateTab(index) {
      var forceLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      // 点击左侧菜单，获取子分类
      if (index !== this.curRootIdx || forceLoad) {
        this.curRootIdx = index;
        this.curChildIdx = 0; // 点击左边导航

        this.loadGoodsList();
      }
    },
    tapChildCateTab: function tapChildCateTab(index) {
      var forceLoad = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      // 隐藏弹出栏
      this.showCatePopup = false; // 点击当前类目，回到顶部

      this.scrollTop = this.scrollTop > 0 ? 0 : 0.01; // 点击子菜单 tab，获取商品数据

      if (index !== this.curChildIdx || forceLoad) {
        this.canLoadMore = true;
        this.curChildIdx = index;
        this.loadGoodsList();
      }
    },
    onGoodsScrollToLower: function onGoodsScrollToLower(e) {
      // console.log(e)
      if (this.curPage > 0) {
        this.loadGoodsList(this.curPage);
      }
    },
    onGoodsScrollToUpper: function onGoodsScrollToUpper(e) {// console.log(e)
    },
    chooseStore: function chooseStore(storeInfo) {
      // 初始化购物车信息
      this.initShoppingCart(storeInfo); // 设置 tabBar 对应的购物车数量

      (0, _common.setNavBarColor)('#ffffff'); // 重新设置门店

      this.showStoreModal = false; // 设置当前门店

      this.storeInfo = storeInfo;
      this.$app.$options.globalData.storeInfo = storeInfo; // 父级分类 & 子分类

      this.curRootIdx = 0;
      this.curChildIdx = 0; // 获取顶部菜单列表

      this.loadCategory();
    },
    // 获取附近门店
    loadStores: function () {
      var _loadStores = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee() {
        var _this$currentArea$loc, lat, lng, res;

        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.loading = true; // 没有获取到地址信息

                if (!(this.currentArea === null)) {
                  _context.next = 4;
                  break;
                }

                _context.next = 4;
                return this.syncCurrentArea();

              case 4:
                // 获取经纬度
                _this$currentArea$loc = this.currentArea.location, lat = _this$currentArea$loc.lat, lng = _this$currentArea$loc.lng; // 获取门店

                _context.next = 7;
                return (0, _store2.getStoreList)({
                  lat: lat,
                  lng: lng
                });

              case 7:
                res = _context.sent;

                // 附近存在门店
                if (res.data.length > 0) {
                  this.storeList = res.data.map(function (item) {
                    item.distance = (0, _location.formatDistance)(item.distance);
                    return item;
                  });

                  if (this.storeInfo === null) {
                    this.chooseStore(res.data[0]);
                  }
                }

                this.loading = false;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function loadStores() {
        return _loadStores.apply(this, arguments);
      }

      return loadStores;
    }(),
    onMinusGoodsNum: function () {
      var _onMinusGoodsNum = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee2(goods) {
        return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // 减少购物车商品数
                this.reduceCart({
                  goods: goods,
                  skuId: 0
                });

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function onMinusGoodsNum(_x) {
        return _onMinusGoodsNum.apply(this, arguments);
      }

      return onMinusGoodsNum;
    }(),
    onPlusGoodsNum: function () {
      var _onPlusGoodsNum = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee3(goods) {
        var skuId, cartParams;
        return _regeneratorRuntime2["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                skuId = 0; // 判断商品类型

                if (!(goods.attrType === 'multiple')) {
                  _context3.next = 4;
                  break;
                }

                _util["default"].navigateTo('/packageGoods/goods/detail?goodsCode=' + goods.goodsCode);

                return _context3.abrupt("return", false);

              case 4:
                cartParams = {
                  goods: goods,
                  skuId: skuId
                };
                this.addIntoCart(cartParams);

              case 6:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function onPlusGoodsNum(_x2) {
        return _onPlusGoodsNum.apply(this, arguments);
      }

      return onPlusGoodsNum;
    }(),
    loadGoodsList: function loadGoodsList() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // 没有更多数据可以获取
      if (!this.canLoadMore && page !== 0) return null; // 获取当前子分类与根分类

      var rootCate = this.categories[this.curRootIdx];
      var cateId = rootCate.subCategory[this.curChildIdx].cateId;
      var sortName = 'normal';
      var sortType = 'desc';

      for (var k in this.sorts) {
        if (this.sorts[k].selected) {
          sortName = k;
          sortType = this.sorts[k].type;
        }
      }

      var params = {
        page: page + 1,
        cateId: cateId,
        rootCateId: rootCate.cateId,
        sortName: sortName,
        sortType: sortType
      }; // 获取商品数据

      (0, _goods.getGoodsList)(params).then(function (res) {
        // 当前总数小于当前页面大小，则本分类的数据已获取完，获取下一个分类
        if (res.data.curTotal < res.data.curPageSize) {
          _this.canLoadMore = false;
        }

        _this.curPage = res.data.curPage;
        _this.goodsList = _this.curPage === 1 ? res.data.data : _this.goodsList.concat(res.data.data);
      });
    },
    loadCategory: function loadCategory() {
      var _this2 = this;

      this.scrollTop = this.scrollTop > 0 ? 0 : 0.01;
      (0, _goods.getGoodsCategories)({
        storeId: this.storeInfo.storeId
      }).then(function (res) {
        if (res.status === 'success' && res.data.length > 0) {
          _this2.categories = res.data; // 获取该分类下的商品

          _this2.loadGoodsList();
        }
      });
    }
  })
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-search":{"path":"../../$vendor/@vant/weapp/dist/search/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"van-transition":{"path":"../../$vendor/@vant/weapp/dist/transition/index"},"van-overlay":{"path":"../../$vendor/@vant/weapp/dist/overlay/index"},"van-stepper":{"path":"../../$vendor/@vant/weapp/dist/stepper/index"},"coming-soon":{"path":"../../components/comingSoon"},"vip-price-box":{"path":"../../components/vipPriceBox"},"store-list-modal":{"path":"../../components/storeListModal"}},"on":{"10-11":["minus","plus"],"10-13":["on-modal-close","choose-store"]}}, handlers: {'10-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleStoreModal($event);
      })();
    
  }},'10-1': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.tapRootCateTab(index);
      })();
    
  }},'10-2': {"tap": function proxy (idx) {
    
    var _vm=this;
      return (function () {
        _vm.tapChildCateTab(idx);
      })();
    
  }},'10-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showCatePopup=!_vm.showCatePopup;
      })();
    
  }},'10-4': {"tap": function proxy (idx) {
    
    var _vm=this;
      return (function () {
        _vm.tapChildCateTab(idx);
      })();
    
  }},'10-5': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.showCatePopup=!_vm.showCatePopup;
      })();
    
  }},'10-6': {"tap": function proxy (key) {
    
    var _vm=this;
      return (function () {
        _vm.handleSort(key);
      })();
    
  }},'10-7': {"tap": function proxy (key) {
    
    var _vm=this;
      return (function () {
        _vm.handleSort(key);
      })();
    
  }},'10-8': {"scrolltolower": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onGoodsScrollToLower($event);
      })();
    
  }, "scrolltoupper": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onGoodsScrollToUpper($event);
      })();
    
  }},'10-10': {"tap": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.onPlusGoodsNum(item);
      })();
    
  }},'10-11': {"minus": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.onMinusGoodsNum(item);
      })();
    
  }, "plus": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.onPlusGoodsNum(item);
      })();
    
  }},'10-13': {"on-modal-close": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleStoreModal($event);
      })();
    
  }, "choose-store": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.chooseStore($event);
      })();
    
  }}}, models: {}, refs: undefined });