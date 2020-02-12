"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _goods = require('./../../api/goods.js');

var _store2 = require('./../../api/store.js');

var _goodsNum = require('./../../mixins/goodsNum.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"], _goodsNum.goodsNumMixin],
  data: {
    storeInfo: null,
    cateId: 0,
    curPage: 0,
    title: '一号小店',
    userInfo: null,
    activeCateIdx: 0,
    canLoadMore: true,
    categories: [],
    goodsList: []
  },
  onLoad: function onLoad(options) {
    if (typeof options.cateId === 'undefined') {
      _util["default"].navigateBack();

      return;
    }

    this.title = options.title;
    this.cateId = options.cateId; // 门店ID

    this.storeInfo = this.$app.$options.globalData.storeInfo; // 没有获取到门店数据 (可能是分享点进来的)

    if (this.storeInfo === null) {
      if (typeof options.storeId === 'undefined') {
        _util["default"].switchHome();

        return;
      } // 设置门店ID信息


      this.storeInfo = {
        storeId: options.storeId
      }; // 获取门店信息数据 && 初始化 购物车

      this.loadStoreInfo();
    }

    this.loadCategories();
  },
  onShow: function onShow() {
    this.userInfo = this.$app.$options.globalData.userInfo;
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x.mapActions)(['initShoppingCart', 'addIntoCart']), {
    // vuex 方法
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    loadStoreInfo: function loadStoreInfo() {
      var _this = this;

      // 获取门店信息
      (0, _store2.getStoreInfo)(this.storeInfo.storeId).then(function (res) {
        _this.storeInfo = res.data;
        _this.$app.$options.globalData.storeInfo = res.data; // 初始化购物车信息

        _this.initShoppingCart(res.data);
      });
    },
    onChangeCategory: function onChangeCategory(idx) {
      if (this.activeCateIdx !== idx) {
        this.activeCateIdx = idx;
        this.loadCateGoods();
      }
    },
    loadCategories: function loadCategories() {
      var _this2 = this;

      // 判断门店信息是否存在
      var params = {
        storeId: this.storeInfo.storeId,
        pid: this.cateId
      };
      (0, _goods.getGoodsCategories)(params).then(function (res) {
        if (res.status === 'success') {
          _this2.categories = res.data;

          _this2.loadCateGoods();
        }
      });
    },
    loadCateGoods: function loadCateGoods() {
      var _this3 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // 获取活动商品
      if (!this.canLoadMore && page !== 0) return null;
      var params = {
        page: page + 1,
        cateId: this.categories[this.activeCateIdx].cateId,
        rootCateId: this.cateId
      };
      (0, _goods.getGoodsList)(params).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this3.canLoadMore = false;
        }

        _this3.curPage = res.data.curPage;
        _this3.goodsList = _this3.curPage === 1 ? res.data.data : _this3.goodsList.concat(res.data.data);
      });
    },
    redirectToGoodsDetail: function redirectToGoodsDetail(goodsCode) {
      _util["default"].navigateTo('/packageGoods/goods/detail?goodsCode=' + goodsCode);
    },
    handleAddIntoCart: function handleAddIntoCart(event, goods) {
      var _this4 = this;

      // x, y表示手指点击横纵坐标, 即小球的起始坐标
      var _event$touches$ = event.touches[0],
          clientX = _event$touches$.clientX,
          clientY = _event$touches$.clientY; // 加入购物车

      var cartParams = {
        goods: goods,
        skuId: 0
      };
      this.addIntoCart(cartParams).then(function (_) {
        _this4.$refs['flyIntoCart'].createAnimation(clientX, clientY);
      });
    }
  }),

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadCategories();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {
    this.loadCateGoods(this.curPage);
  },

  /**
   * 分享
   */
  onShareAppMessage: function onShareAppMessage() {
    return {
      path: '/packageGoods/cateGoods/index?cateId=' + this.cateId + '&storeId=' + this.storeInfo.storeId,
      success: function success(_) {}
    };
  }
}, {info: {"components":{"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"van-tabs":{"path":"../../$vendor/@vant/weapp/dist/tabs/index"},"van-tab":{"path":"../../$vendor/@vant/weapp/dist/tab/index"},"vip-price-box":{"path":"../../components/vipPriceBox"},"fly-into-cart":{"path":"../../components/flyIntoCart"},"purchase-btn":{"path":"../../components/purchaseBtn"},"end-line":{"path":"../../components/endLine"},"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"}},"on":{"25-0":["clickLeft"],"25-4":["tap"]},"refs":[]}, handlers: {'25-0': {"clickLeft": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'25-1': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.onChangeCategory(index);
      })();
    
  }},'25-2': {"tap": function proxy (goods) {
    
    var _vm=this;
      return (function () {
        _vm.redirectToGoodsDetail(goods.goodsCode);
      })();
    
  }},'25-3': {"tap": function proxy (goods) {
    
    var _vm=this;
      return (function () {
        _vm.redirectToGoodsDetail(goods.goodsCode);
      })();
    
  }},'25-4': {"tap": function proxy (goods) {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.handleAddIntoCart($event,goods);
      })();
    
  }}}, models: {}, refs: [] });