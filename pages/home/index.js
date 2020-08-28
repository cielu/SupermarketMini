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
    storeId: 0,
    storeInfo: null,
    storeList: [],
    loading: true,
    showVanNavBar: true,
    showStoreModal: false,
    showActivityModal: false,
    showGuessULikeBar: false,
    gridsInOneLine: false,
    // 导航组 单行显示
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
    topBackground: 'transparent',
    showTopTabs: false,
    // 是否展示导航栏
    storeActies: [],
    // 门店优惠活动，包括VIP折扣活动
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
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea', 'shoppingCart', 'userInfo'])),
  onLoad: function onLoad(options) {
    // 判断进入场景
    if (typeof options.scene !== 'undefined') {
      var tmpArr = options.scene.split('_');

      if (tmpArr[0] === 'store') {
        this.storeId = tmpArr[1];
        this.loadStoreInfo(this.storeId);
      }
    } // 当前位置


    this.getLocalStores();
  },
  onShow: function onShow() {
    // 设置当前门店的 badge
    if (this.storeInfo !== null && this.userInfo !== null) {
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
    getLocalStores: function getLocalStores() {
      var _this = this;

      return _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee() {
        return _regeneratorRuntime2["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _this.syncCurrentArea();

              case 2:
                // set current area
                _this.loadStores();

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    },
    tapGrids: function tapGrids(item) {
      _util["default"].navigate(item.navigate, item.targetId, item.targetName);
    },
    onAddIntoCart: function onAddIntoCart(goods) {
      var cartParams = {
        goods: goods,
        skuId: 0,
        returnGoods: true
      };
      this.addIntoCart(cartParams).then(function (res) {
        // console.log(res)
        if (res.status === 'error') {
          _util["default"].toast(res.msg);
        } else {
          _util["default"].toast('已加入购物车');
        }
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

      if (this.topBgImg === null || this.topBgImg === '') {
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
      if (storeInfo.fullReduce !== '') {
        var fullReduce = JSON.parse(storeInfo.fullReduce);
        fullReduce.sort(function (a, b) {
          return b.full - a.full;
        });
        this.storeActies = fullReduce;
      }

      this.storeInfo = storeInfo;
      this.$app.$options.globalData.storeInfo = storeInfo; // 初始化购物车信息

      if (this.userInfo !== null) {
        this.initShoppingCart(storeInfo);
      } // 重新获取数据


      this.loadData();
    },
    loadStoreInfo: function loadStoreInfo(storeId) {
      var _this2 = this;

      return _asyncToGenerator(
      /*#__PURE__*/
      _regeneratorRuntime2["default"].mark(function _callee2() {
        var res;
        return _regeneratorRuntime2["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return (0, _store2.getStoreInfo)(storeId);

              case 2:
                res = _context2.sent;

                if (res.data.storeId > 0) {
                  _this2.storeInfo = res.data;

                  _this2.setStore(_this2.storeInfo);
                }

              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    },
    // 获取附近门店
    loadStores: function loadStores() {
      var _this3 = this;

      this.loading = true; // 获取经纬度

      var _this$currentArea$loc = this.currentArea.location,
          lat = _this$currentArea$loc.lat,
          lng = _this$currentArea$loc.lng; // 获取门店

      (0, _store2.getStoreList)({
        lat: lat,
        lng: lng
      }).then(function (res) {
        // 加载状态
        _this3.loading = false; // 附近存在门店

        if (res.data.length > 0) {
          _this3.storeList = res.data.map(function (item) {
            item.distance = (0, _location.formatDistance)(item.distance);
            return item;
          });

          if (_this3.storeInfo === null || _this3.storeInfo.storeId === 0) {
            // 默认设置第一个为门店
            _this3.showStoreModal = true;

            _this3.setStore(res.data[0]);
          }
        } else {
          _this3.storeList = [];
        }
      });
    },
    loadAdverts: function loadAdverts() {
      var _this4 = this;

      (0, _other.getAdverts)('homePage').then(function (res) {
        _this4.adverts = res.data.homeMedium;

        if (res.data.homeTopBg) {
          _this4.topBgImg = res.data.homeTopBg.imgUrl;
          _this4.topBackground = 'url(' + _this4.topBgImg + ') no-repeat';
        }
      });
    },
    // load banners
    loadBanners: function loadBanners() {
      var _this5 = this;

      (0, _other.getBanners)('homePage').then(function (res) {
        _this5.topBanners = res.data.homeTop;
      });
    },
    // load grids menu
    loadGridsMenu: function loadGridsMenu() {
      var _this6 = this;

      (0, _other.getGridsMenu)('homePage').then(function (res) {
        if (res.data.length >= 10) {
          var newArr = [];

          for (var i = 0; i < res.data.length; i += 2) {
            newArr.push(res.data.slice(i, i + 2));
          }

          _this6.menuTabs = newArr;
          _this6.gridsInOneLine = false;
        } else {
          _this6.menuTabs = res.data;
          _this6.gridsInOneLine = true;
        }

        _this6.slideRatio = (100 / (_this6.menuTabs.length * 140) * (700 / _this6.$app.$options.globalData.systemInfo.windowWidth) * 2).toFixed(3);
      });
    },
    //  load group goods
    loadGroupGoods: function loadGroupGoods() {
      var _this7 = this;

      // console.log('load group goods')
      (0, _goods.getGroupGoods)().then(function (res) {
        _this7.groupGoods = res.data.data;
      });
    },
    loadGuessULikeTabs: function loadGuessULikeTabs() {
      var _this8 = this;

      (0, _goods.getGuessULikeTab)().then(function (res) {
        _this8.guessULikeTabs = [{
          tabDesc: '猜你喜欢',
          tabName: '全部',
          tabId: 0
        }].concat(res.data); // 获取猜你喜欢位置

        wx.createSelectorQuery().select('#guessULikeGoods').boundingClientRect(function (rect) {
          if (rect) {
            _this8.guessULikeTop = rect.top - (_this8.isIPhoneX ? 72 : 50);
          }
        }).exec();
      });
    },
    loadGuessULikeGoods: function loadGuessULikeGoods() {
      var _this9 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!this.canLoadMoreGoods) return null; // 获取当前选中的tabId

      var tabId = this.guessULikeTabs[this.currentLikedTab].tabId; // 获取猜你喜欢的商品

      (0, _goods.getGuessULikeGoods)({
        page: page + 1,
        tabId: tabId
      }).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this9.canLoadMoreGoods = false;
        }

        _this9.guessULikePage = res.data.curPage;
        _this9.guessULikeGoods = _this9.guessULikePage === 1 ? res.data.data : _this9.guessULikeGoods.concat(res.data.data);
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    // 展示弹窗
    this.showStoreModal = true; // 导航色设为 黑色

    (0, _common.setNavBarColor)('#000000'); // 获取门店

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
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-popup":{"path":"./../../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"van-search":{"path":"./../../$vendor/@vant/weapp/dist/search/index"},"van-transition":{"path":"./../../$vendor/@vant/weapp/dist/transition/index"},"goods-list-column":{"path":"./../../components/goodsListColumn"},"store-list-modal":{"path":"./../../components/storeListModal"},"show-add-tip":{"path":"./../../components/showAddTip"},"coming-soon":{"path":"./../../components/comingSoon"}},"on":{"14-1":["tap"],"14-3":["tap"],"14-17":["on-handle-cart"],"14-18":["on-modal-close","choose-store"],"14-20":["close","touchmove"]}}, handlers: {'14-0': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleStoreModal.apply(_vm, $args || [$event]);
  })();
}},'14-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleStoreModal.apply(_vm, $args || [$event]);
  })();
}},'14-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleStoreModal.apply(_vm, $args || [$event]);
  })();
}},'14-3': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/pages/home/index');
  })();
}},'14-4': {"change": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onBannerChange.apply(_vm, $args || [$event]);
  })();
}},'14-5': {"tap": function proxy (img) {
    var _vm=this;
  return (function () {
    _vm.onClickAdvert(img);
  })();
}},'14-6': {"scroll": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onGridsScroll.apply(_vm, $args || [$event]);
  })();
}},'14-7': {"tap": function proxy (grid) {
    var _vm=this;
  return (function () {
    _vm.tapGrids(grid);
  })();
}},'14-8': {"tap": function proxy (grid) {
    var _vm=this;
  return (function () {
    _vm.tapGrids(grid);
  })();
}},'14-9': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showActivityModal=true;
  })();
}},'14-10': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.onClickAdvert(_vm.adverts[0]);
  })();
}},'14-11': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.onClickAdvert(_vm.adverts[1]);
  })();
}},'14-12': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.onClickAdvert(_vm.adverts[2]);
  })();
}},'14-13': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/packageGoods/spellGroup/index');
  })();
}},'14-14': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.redirectTo('/packageGoods/spellGroup/detail?activityId=' + item.activityId);
  })();
}},'14-15': {"tap": function proxy (index) {
    var _vm=this;
  return (function () {
    _vm.clickGussTab(index);
  })();
}},'14-16': {"tap": function proxy (index) {
    var _vm=this;
  return (function () {
    _vm.clickGussTab(index);
  })();
}},'14-17': {"on-handle-cart": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onAddIntoCart.apply(_vm, $args || [$event]);
  })();
}},'14-18': {"on-modal-close": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.handleStoreModal.apply(_vm, $args || [$event]);
  })();
}, "choose-store": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.chooseStore.apply(_vm, $args || [$event]);
  })();
}},'14-20': {"close": function proxy () {
    var _vm=this;
  return (function () {
    _vm.showActivityModal=false;
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}}}, models: {}, refs: undefined });