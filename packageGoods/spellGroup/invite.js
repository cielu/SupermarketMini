"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _goods = require('./../../api/goods.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  mixins: [_statusBar["default"]],
  data: {
    goods: {},
    curPage: 0,
    nowTime: 0,
    groupCode: 0,
    orderId: 0,
    groupOrder: {},
    userInfo: {},
    joinUsers: [],
    spellGoodsList: [],
    canLoadMoreGoods: true,
    statusBarHeight: 50
  },
  onLoad: function onLoad(options) {
    // options
    if (options.groupCode) {
      this.groupCode = options.groupCode;
    }

    if (options.orderId) {
      this.orderId = options.orderId;
    }

    this.nowTime = Date.parse(new Date());
    this.loadGroupGoodsInvite();
    this.loadSpellGoods();
  },
  onShow: function onShow() {
    this.userInfo = this.$app.$options.globalData.userInfo;
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    onClickHome: function onClickHome() {
      _util["default"].switchHome();
    },
    loadGroupGoodsInvite: function loadGroupGoodsInvite() {
      var _this = this;

      var groupCode = this.groupCode,
          orderId = this.orderId; // 获取购物车商品

      (0, _goods.getGroupGoodsInvite)({
        groupCode: groupCode,
        orderId: orderId
      }).then(function (res) {
        if (res.status === 'success') {
          _this.goods = res.data.goodsDetail;
          _this.groupOrder = res.data.groupOrder;
          _this.joinUsers = res.data.joinUsers;
        } else {
          _util["default"].toast(res.msg);
        }
      });
    },
    joinSpellGroup: function joinSpellGroup() {
      // 用户是自己 =》邀请
      if (this.userInfo.userId !== this.groupOrder.createrId) {
        // 参团
        var storeId = this.goods.storeId;
        var _this$groupOrder = this.groupOrder,
            activityId = _this$groupOrder.activityId,
            groupCode = _this$groupOrder.groupCode,
            groupNum = _this$groupOrder.groupNum,
            joinNum = _this$groupOrder.joinNum;
        var params = 'storeId=' + storeId + '&activityId=' + activityId + '&groupCode=' + groupCode; // 拼团人数已达上限

        if (groupNum - joinNum === 0) {
          _util["default"].navigateTo('/packageGoods/order/confirmSingle', params);
        } else {
          _util["default"].navigateTo('/packageGoods/spellGroup/detail', params);
        }
      }
    },
    loadSpellGoods: function loadSpellGoods() {
      var _this2 = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (!this.canLoadMoreGoods) return null; // 判断分类ID
      // 获取分类ID

      var params = {
        isRecommend: 1,
        page: page + 1,
        cateId: 0
      }; // 获取团购商品

      (0, _goods.getGroupGoods)(params).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this2.canLoadMoreGoods = false;
        }

        _this2.curPage = res.data.curPage;
        _this2.spellGoodsList = page === 0 ? res.data.data : _this2.spellGoodsList.concat(res.data.data);
      });
    }
  },
  onPullDownRefresh: function onPullDownRefresh() {
    this.canLoadMoreGoods = true;
    this.loadSpellGoods();
    this.loadGroupGoodsInvite();
  },
  onReachBottom: function onReachBottom() {
    this.loadSpellGoods(this.curPage);
  },
  onShareAppMessage: function onShareAppMessage(options) {
    var goods = this.goods;
    var userInfo = this.userInfo;
    return {
      title: '一号小店拼团【' + goods.groupPrice + '元】' + goods.groupName,
      imgUrl: goods.goodsCoverUrl,
      path: '/packageGoods/spellGroup/invite?groupCode=' + this.groupOrder.groupCode + '&from_uid=' + userInfo.userId,
      success: function success(res) {
        console.log('成功', res);
      }
    };
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"van-divider":{"path":"../../$vendor/@vant/weapp/dist/divider/index"},"van-count-down":{"path":"../../$vendor/@vant/weapp/dist/count-down/index"},"end-line":{"path":"../../components/endLine"}},"on":{"35-0":["tap"],"35-1":["tap"]}}, handlers: {'35-0': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'35-1': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickHome($event);
      })();
    
  }},'35-2': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.joinSpellGroup($event);
      })();
    
  }},'35-3': {"tap": function proxy (goods) {
    
    var _vm=this;
      return (function () {
        _vm.toSpellGroup(goods);
      })();
    
  }}}, models: {}, refs: undefined });