"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _goods = require('./../../api/goods.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import testMixin from '../../mixins/test'
_core["default"].page({
  config: {
    navigationBarTitleText: '商品列表',
    enablePullDownRefresh: false,
    backgroundColorTop: '#FF7700',
    navigationBarTextStyle: 'white',
    usingComponents: {
      'van-icon': '/vant/icon/index',
      'van-search': '/vant/search/index',
      'van-tab': '/vant/tab/index',
      'van-tabs': '/vant/tabs/index'
    }
  },
  // mixins = [testMixin]
  data: {
    pageTitle: '商品列表',
    currentTab: 0,
    // 对应样式变化
    categoryId: '',
    // 后台查询需要的字段
    categoryArray: [],
    // 分类数组
    goodsList: [] // 商品列表

  },
  onLoad: function onLoad(options) {
    this.loadGoodsList(options.categoryId); // this.loadCategory()
  },
  onShow: function onShow() {// this.userInfo = this.$parent.globalData.userInfo
    // this.avatar = this.$parent.globalData.imgDomain + 'avatar.png'
  },
  loadGoodsList: function loadGoodsList() {
    var _this = this;

    var categoryId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    if (categoryId == null) {
      categoryId = this.categoryId;
    }

    (0, _goods.getGuessULikeGoods)({
      page: 1
    }).then(function (res) {
      _this.goodsList = res.data.data;
    });
  },
  loadCategory: function loadCategory(categoryId) {
    var _this2 = this;

    var url = '/nssfs-web/category/collection/v1/1057100075904731_011_' + categoryId + '__1_applet_4.0.2_.htm';

    _util["default"].wxRequest(url).then(function (res) {
      // console.log(res)
      _this2.childrenArray = res.resultData.categoryList;

      _this2.$apply();
    });
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    clickLeft: function clickLeft() {
      wx.navigateBack({
        delta: 1
      });
    }
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"}},"on":{"27-0":["left-click"]}}, handlers: {'27-0': {"left-click": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.clickLeft($event);
      })();
    
  }}}, models: {}, refs: undefined });