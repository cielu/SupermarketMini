"use strict";

var _core = _interopRequireDefault(require('./../vendor.js')(0));

var _util = _interopRequireDefault(require('./../utils/util.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_core["default"].component({
  props: {
    goodsList: {
      type: Array,
      "default": []
    },
    index: {
      type: Number
    }
  },
  data: {
    status: ['未知', '待支付', '待审核', '已驳回', '招募中', '进行中', '已完成'],
    userInfo: null
  },
  onLoad: function onLoad() {// this.userInfo = this.$parent.$parent.globalData.userInfo
  },
  methods: {
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    }
  }
}, {info: {"components":{"end-line":{"path":"endLine"}},"on":{}}, handlers: {'69-0': {"tap": function proxy () {
    
    var _vm=this;
      return (function () {
        _vm.redirectTo('/packageGoods/spellGroup/detail');
      })();
    
  }}}, models: {}, refs: undefined });