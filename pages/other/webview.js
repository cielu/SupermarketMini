"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].page({
  mixins: [_statusBar["default"]],
  data: {
    src: 'https://market.linghui.co'
  },
  onLoad: function onLoad(options) {
    if (options.src) this.src = options.src; // loading

    _util["default"].toast('加载中...', 'loading', 1000);
  } //

}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"}},"on":{}}, handlers: {}, models: {}, refs: undefined });