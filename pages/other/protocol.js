"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  // mixins = [testMixin]
  data: {
    lists: [{
      name: '用户协议',
      path: '/pages/other/webview'
    }, {
      name: '其他信息',
      path: '/pages/other/webview'
    }]
  },
  onLoad: function onLoad(options) {// util.wxRequest('/service/delete').then(res => {
    //   util.toast(res.msg)
    //   if (res.status === 'success') {
    //   }
    // })
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: {
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    }
  } //

}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"}},"on":{}}, handlers: {'20-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('{{item.path}}');
      })();
    
  }}}, models: {}, refs: undefined });