"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _address = require('./../../api/address.js');

var _util = _interopRequireDefault(require('./../../utils/util.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  mixins: [_statusBar["default"]],
  data: {
    curPage: 1,
    canLoadMore: true,
    addressList: [],
    genders: ['未知', '先生', '女士']
  },
  onLoad: function onLoad(options) {
    this.loadAddressList();
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    editAddress: function editAddress() {
      var addressId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var path = '/pages/address/edit';

      if (addressId !== 0) {
        path += '?addressId=' + addressId;
      }

      _util["default"].navigateTo(path);
    },
    loadAddressList: function loadAddressList() {
      var _this = this;

      var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      // 获取地址列表
      (0, _address.getAddressList)({
        page: page
      }).then(function (res) {
        // 当前总数小于当前页面大小，则无更多数据
        if (res.data.curTotal < res.data.curPageSize) {
          _this.canLoadMore = false;
        }

        _this.addressList = _this.curPage === 1 ? res.data.data : _this.addressList.concat(res.data.data);
      });
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.canLoadMore = true;
    this.loadAddressList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function onReachBottom() {
    if (this.canLoadMore) {
      this.loadAddressList(this.curPage + 1);
    }
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"28-0":["clickLeft"],"28-1":["tap"]}}, handlers: {'28-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'28-1': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.editAddress(item.addressId);
  })();
}},'28-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.editAddress.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });