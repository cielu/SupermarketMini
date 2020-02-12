"use strict";

var _regeneratorRuntime2 = _interopRequireDefault(require('./../../vendor.js')(2));

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _other = require('./../../api/other.js');

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _location = require('./../../utils/location.js');

var _store2 = require('./../../api/store.js');

var _goods = require('./../../api/goods.js');

var _common = require('./../../utils/common.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  // vuex store
  mixins: [_statusBar["default"]],
  data: {
    userInfo: null,
    timer: null,
    storeInfo: null,
    storeList: [],
    loading: true,
    showVanNavBar: true,
    showStoreModal: true,
    showGuessULikeBar: false,
    guessULikeTop: 950,
    pageInTop: true,
    slideLeft: 0,
    // 滑块位置
    slideRatio: 2,
    topBanners: [],
    adverts: [],
    // 广告
    topBgImg: null,
    curBannerIndex: 0,
    topBackground: '#6484e9',
    showTopTabs: false,
    // 是否展示导航栏
    menuTabs: [],
    groupGoods: [],
    guessULikeTabs: [{
      tabDesc: '猜你喜欢',
      tabName: '全部',
      tabId: 0
    }],
    guessULikeGoods: [],
    guessULikePage: 1,
    canLoadMoreGoods: true,
    currentLikedTab: 0
  },
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea', 'shoppingCart'])),
  onLoad: function onLoad() {
    // 当前位置
    this.getLocalStores();
  },
  onShow: function onShow() {
    this.userInfo = this.$app.$options.globalData.userInfo; // 设置当前门店的 badge

    if (this.storeInfo !== null) {
      (0, _common.setCartBadge)(this.shoppingCart[this.storeInfo.storeId].totalNum);
    }
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x.mapActions)(['syncCurrentArea', 'initShoppingCart', 'addIntoCart']), {
    // vuex 方法
    // 本地方法
    loadData: function loadData() {
      // 可加载跟多商品
      this.canLoadMoreGoods = true; // fetch data

      this.loadBanners();
      this.loadAdverts(); // menu tab

      this.loadGridsMenu();
      this.loadGroupGoods();
      this.loadGuessULikeTabs();
      this.loadGuessULikeGoods();
    },
    getLocalStores: function () {
      var _getLocalStores = _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee() {
        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.syncCurrentArea();

              case 2:
                // set current area
                this.loadStores();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getLocalStores() {
        return _getLocalStores.apply(this, arguments);
      }

      return getLocalStores;
    }(),
    tapGrids: function tapGrids(item) {
      _util["default"].navigate(item.navigate, item.targetId, item.targetName);
    },
    onAddIntoCart: function onAddIntoCart(goods) {
      var cartParams = {
        goods: goods,
        skuId: 0,
        returnGoods: true
      };
      this.addIntoCart(cartParams).then(function (_) {
        // 购物车加入成功
        _util["default"].toast('已加入购物车');
      });
    },
    handleStoreModal: function handleStoreModal() {
      this.showStoreModal = !this.showStoreModal; // 当前位置存在门店

      if (this.showStoreModal) {
        (0, _common.setNavBarColor)('#000000');
      } else {
        (0, _common.setNavBarColor)('#ffffff'); // 没有门店信息，并且滚动位置在顶部

        if (this.storeInfo !== null && this.pageInTop) {
          this.showVanNavBar = false;
        }
      }
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    onBannerChange: function onBannerChange(e) {
      this.curBannerIndex = e.$wx.detail.current;

      if (this.topBgImg === null) {
        this.topBackground = this.topBanners[this.curBannerIndex].averageColor;
      }
    },
    onClickAdvert: function onClickAdvert(item) {
      _util["default"].navigate(item.navigate, item.targetId, item.targetName);
    },
    onGridsScroll: function onGridsScroll(e) {
      var slideLeft = e.$wx.detail.scrollLeft * this.slideRatio; // 偏移量过大导致iOS闪屏

      if (slideLeft > (this.menuTabs.length - 5) * 20 || slideLeft < 0) {
        return;
      }

      this.slideLeft = slideLeft;
    },
    clickGussTab: function clickGussTab(index) {
      // 非点击当前tab
      if (index !== this.currentLikedTab) {
        this.canLoadMoreGoods = true;
        this.currentLikedTab = index;
        this.loadGuessULikeGoods();
      } // 滚动到猜你喜欢的位置


      wx.pageScrollTo({
        scrollTop: this.guessULikeTop + 5
      });
    },
    chooseStore: function chooseStore(storeInfo) {
      // set nav hide
      this.showVanNavBar = false;
      this.showStoreModal = false;
      this.currentLikedTab = 0;
      (0, _common.setNavBarColor)('#ffffff');
      this.setStore(storeInfo);
    },
    setStore: function setStore(storeInfo) {
      this.storeInfo = storeInfo;
      this.$app.$options.globalData.storeInfo = storeInfo; // 初始化购物车信息

      this.initShoppingCart(storeInfo); // 重新获取数据

      this.loadData();
    },
    // 获取附近门店
    loadStores: function loadStores() {
      var _this = this;

      this.loading = true; // 获取经纬度

      var _this$currentArea$loc = this.currentArea.location,
          lat = _this$currentArea$loc.lat,
          lng = _this$currentArea$loc.lng; // 获取门店

      (0, _store2.getStoreList)({
        lat: lat,
        lng: lng
      }).then(function (res) {
        // 加载状态
        _this.loading = false; // 附近存在门店

        if (res.data.length > 0) {
          _this.storeList = res.data.map(function (item) {
            item.distance = (0, _location.formatDistance)(item.distance);
            return item;
          }); // 默认设置第一个为门店

          _this.setStore(res.data[0]);
        } else {
          _this.storeList = [];
        }
      });
    },
    loadAdverts: function loadAdverts() {
      var _this2 = this;

      (0, _other.getAdverts)('homePage').then(function (res) {
        _this2.adverts = res.data.homeMedium;

        if (res.data.homeTopBg) {
          _this2.topBgImg = res.data.homeTopBg.imgUrl;
          _this2.topBackground = 'url(' + _this2.topBgImg + ') no-repeat';
        }
      });
    },
    // load banners
    loadBanners: function loadBanners() {
      var _this3 = this;

      (0, _other.getBanners)('homePage').then(function (res) {
        _this3.topBanners = res.data.homeTop;
      });
    },
    // load grids menu
    loadGridsMenu: function loadGridsMenu() {
      var _this4 = this;

      (0, _other.getGridsMenu)('homePage').then(function (res) {
        var newArr = [];

        for (var i = 0; i < res.data.length; i += 2) {
          newArr.push(res.data.slice(i, i + 2));
        }

        _this4.menuTabs = newArr;
        _this4.slideRatio = (100 / (_this4.menuTabs.length * 142) * (700 / _this4.$app.$options.globalData.systemInfo.windowWidth) * 2).toFixed(3);
      });
    },
    //  load group goods
    loadGroupGoods: function loadGroupGoods() {
      var _this5 = this;

      // console.log('load group goods')
      (0, _goods.getGroupGoods)().then(function (res) {
        _this5.groupGoods = res.data.data;
      });
    },
    loadGuessULikeTabs: function loadGuessULikeTabs() {
      var _this6 = this;

      (0, _goods.getGuessULikeTab)().then(function (res) {
        _this6.guessULikeTabs = [{
          tabDesc: '猜你喜欢',
          tabName: '全部',
          tabId: 0
        }].concat(res.data);
      }); // 获取猜你喜欢 tabbar 的位置

      this.timer = setTimeout(function () {
        wx.createSelectorQuery().select('#guessULikeGoods').boundingClientRect(function (rect) {
          _this6.guessULikeTop = rect.top - (_this6.isIPhoneX ? 72 : 50);
        }).exec();
      }, 1000);
    },
    loadGuessULikeGoods: function loadGuessULikeGoods() {
      var _this7 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!this.canLoadMoreGoods) return null; // 获取当前选中的tabId

      var tabId = this.guessULikeTabs[this.currentLikedTab].tabId; // 获取猜你喜欢的商品

      (0, _goods.getGuessULikeGoods)({
        page: page + 1,
        tabId: tabId
      }).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this7.canLoadMoreGoods = false;
        }

        _this7.guessULikePage = res.data.curPage;
        _this7.guessULikeGoods = _this7.guessULikePage === 1 ? res.data.data : _this7.guessULikeGoods.concat(res.data.data);
      });
    }
  }),
  onPageScroll: function onPageScroll(res) {
    // console.log(res, this.guessULikeTop)
    // 小于 this.scrollTop
    if (res.scrollTop < 40) {
      // 存在门店
      if (this.storeInfo != null && this.showVanNavBar && this.topBanners.length > 0) {
        this.showVanNavBar = false;
        this.pageInTop = true;
      }
    } else {
      if (!this.showVanNavBar) {
        this.showVanNavBar = true;
        this.pageInTop = false;
      } // 大于40，并且到了猜你喜欢的位置，或超过其位置


      if (res.scrollTop >= this.guessULikeTop) {
        // 没有显示，则显示
        if (!this.showGuessULikeBar) {
          this.showGuessULikeBar = true;
        }
      } else {
        // 小于猜你喜欢的位置
        if (this.showGuessULikeBar) {
          this.showGuessULikeBar = false;
        }
      }
    }
  },

  /**
   * 卸载组建
   */
  onUnload: function onUnload() {
    clearTimeout(this.timer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // 展示弹窗
    this.showStoreModal = true; // 获取门店

    this.loadStores();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {
    this.loadGuessULikeGoods(this.guessULikePage);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function onShareAppMessage(res) {}
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-search":{"path":"../../$vendor/@vant/weapp/dist/search/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"van-sticky":{"path":"../../$vendor/@vant/weapp/dist/sticky/index"},"van-transition":{"path":"../../$vendor/@vant/weapp/dist/transition/index"},"goods-list-column":{"path":"../../components/goodsListColumn"},"show-add-tip":{"path":"../../components/showAddTip"},"coming-soon":{"path":"../../components/comingSoon"},"store-list-modal":{"path":"../../components/storeListModal"}},"on":{"9-1":["tap"],"9-3":["tap"],"9-12":["on-handle-cart"],"9-13":["on-modal-close","choose-store"]}}, handlers: {'9-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleStoreModal($event);
      })();
    
  }},'9-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleStoreModal($event);
      })();
    
  }},'9-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleStoreModal($event);
      })();
    
  }},'9-3': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/pages/home/index');
      })();
    
  }},'9-4': {"change": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onBannerChange($event);
      })();
    
  }},'9-5': {"tap": function proxy (img) {
    
    var _vm=this;
      return (function () {
        _vm.onClickAdvert(img);
      })();
    
  }},'9-6': {"scroll": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onGridsScroll($event);
      })();
    
  }},'9-7': {"tap": function proxy (grid) {
    
    var _vm=this;
      return (function () {
        _vm.tapGrids(grid);
      })();
    
  }},'9-8': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/packageGoods/spellGroup/index');
      })();
    
  }},'9-9': {"tap": function proxy (item) {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/packageGoods/spellGroup/detail?activityId=' + item.activityId);
      })();
    
  }},'9-10': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.clickGussTab(index);
      })();
    
  }},'9-11': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.clickGussTab(index);
      })();
    
  }},'9-12': {"on-handle-cart": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onAddIntoCart($event);
      })();
    
  }},'9-13': {"on-modal-close": function proxy () {
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