"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _goods = require('./../../api/goods.js');

var _goodsNum = require('./../../mixins/goodsNum.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"], _goodsNum.goodsNumMixin],
  data: {
    activityTitle: '促销活动',
    activityId: 0,
    curPage: 0,
    goodsNum: 0,
    nowTime: null,
    storeInfo: null,
    goodsList: [],
    cartGoodsNum: {},
    canLoadMore: true
  },
  computed: _objectSpread({}, (0, _x.mapState)(['userInfo'])),
  onLoad: function onLoad(options) {
    // 标题有传入
    if (typeof options.title === 'undefined') {
      _util["default"].toast('参数非法!');

      _util["default"].navigateBack();

      return;
    }

    this.activityTitle = options.title;
    this.activityId = options.activityId;
    this.userInfo = this.$app.$options.globalData.userInfo;
    this.storeInfo = this.$app.$options.globalData.storeInfo;
    this.loadActivityGoods();
  },
  onShow: function onShow() {
    this.nowTime = Date.parse(new Date()) / 1000;
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x.mapActions)(['addIntoCart']), {
    // vuex 方法
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    toShoppingCart: function toShoppingCart() {
      _util["default"].redirectCart();
    },
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    onPlusGoodsNum: function onPlusGoodsNum(event, goods) {
      var _this = this;

      // console.log(event, goods)
      // x, y表示手指点击横纵坐标, 即小球的起始坐标
      var _event$touches$ = event.touches[0],
          clientX = _event$touches$.clientX,
          clientY = _event$touches$.clientY; // 加入购物车

      var cartParams = {
        goods: goods,
        skuId: 0
      };
      this.addIntoCart(cartParams).then(function (_) {
        _this.$refs['flyIntoCart'].createAnimation(clientX, clientY);
      });
    },
    loadActivityGoods: function loadActivityGoods() {
      var _this2 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // 获取活动商品
      if (!this.canLoadMore && page !== 0) return null;
      var params = {
        page: page + 1,
        activityId: this.activityId
      };
      (0, _goods.getGoodsList)(params).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this2.canLoadMore = false;
        }

        _this2.curPage = res.data.curPage;
        _this2.goodsList = _this2.curPage === 1 ? res.data.data : _this2.goodsList.concat(res.data.data);
      });
    }
  }),

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.canLoadMore = true;
    this.loadActivityGoods();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {
    this.loadActivityGoods(this.curPage);
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"vip-price-box":{"path":"../../components/vipPriceBox"},"fly-into-cart":{"path":"../../components/flyIntoCart"},"purchase-btn":{"path":"../../components/purchaseBtn"},"end-line":{"path":"../../components/endLine"}},"on":{"24-0":["clickLeft"],"24-1":["tap"]},"refs":[]}, handlers: {'24-0': {"clickLeft": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'24-1': {"tap": function proxy (goods) {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onPlusGoodsNum($event,goods);
      })();
    
  }}}, models: {}, refs: [] });