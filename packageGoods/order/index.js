"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _order = require('./../../api/order.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  name: 'MineOrder',
  mixins: [_statusBar["default"]],
  data: {
    curPage: 1,
    userInfo: null,
    curTab: 'all',
    orderTabs: {
      all: {
        name: '全部',
        val: ''
      },
      hasCancel: {
        name: '已取消',
        val: '-1'
      },
      waitPay: {
        name: '待支付',
        val: '0'
      },
      waitReceive: {
        name: '待收货',
        val: '2'
      },
      hasFinished: {
        name: '已完成',
        val: '3'
      }
    },
    orderList: []
  },
  onLoad: function onLoad(options) {
    if (typeof options.type !== 'undefined') {
      this.curTab = options.type;
    }
  },
  onShow: function onShow() {
    this.loadOrder();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    clickTab: function clickTab(idx) {
      this.curTab = idx;
      this.curPage = 1;
      this.canLoadMore = true;
      this.loadOrder();
    },
    loadOrder: function loadOrder() {
      var _this = this;

      if (this.canLoadMore === false) {
        wx.stopPullDownRefresh();

        _util["default"].toast('没有更多订单了');

        return;
      }

      var form = {};
      form.page = this.curPage;

      if (this.curTab !== 0) {
        console.log(this.curTab);
        form.status = this.orderTabs[this.curTab].val;
      }

      (0, _order.getOrderList)(form).then(function (res) {
        // 当前总数小于当前页面大小，则本分类的数据已获取完，获取下一个分类
        if (res.data.curTotal < res.data.curPageSize) {
          _this.canLoadMore = false;
        }

        _this.curPage = res.data.curPage;
        _this.orderList = form.page === 1 ? res.data.data : _this.orderList.concat(res.data.data);
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.curPage = 1;
    this.loadOrder();
  },
  onReachBottom: function onReachBottom() {
    this.curPage += 1;
    this.loadOrder();
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"van-tabs":{"path":"../../$vendor/@vant/weapp/dist/tabs/index"},"van-tab":{"path":"../../$vendor/@vant/weapp/dist/tab/index"},"order-list":{"path":"../../components/orderList"}},"on":{"28-0":["clickLeft"]}}, handlers: {'28-0': {"clickLeft": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'28-1': {"tap": function proxy (idx) {
    
    var _vm=this;
      return (function () {
        _vm.clickTab(idx);
      })();
    
  }}}, models: {}, refs: undefined });