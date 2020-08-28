"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _cities = require('./../../utils/cities.js');

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"]],
  data: {
    platform: 'devtools',
    scrollHeight: 1000,
    cityData: {},
    pyIdx: ['★', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'W', 'X', 'Y', 'Z'],
    points: [],
    searchKey: '',
    // 搜索关键字
    moving: false,
    scrollToId: 'cur',
    showPy: 'A',
    timer: null,
    selectData: []
  },
  onLoad: function onLoad(options) {
    if (this.currentArea === null) {
      this.locateArea();
    }

    this.platform = this.$app.$options.globalData.systemInfo.platform;
    this.scrollHeight = this.$app.$options.globalData.systemInfo.screenHeight;
    this.cityData = _cities.cities;
  },
  onShow: function onShow() {
    var _this = this;

    this.timer = setTimeout(function () {
      _this.getNavPoints();
    }, 300);
  },
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea'])),
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x.mapActions)(['syncCurrentArea']), {
    // vuex 方法
    // 其他方法
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    locateArea: function locateArea() {
      var reLocate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.syncCurrentArea(reLocate);
    },
    // 输入
    onSearchInput: function onSearchInput(e) {
      var selectData = [];
      var cityData = JSON.parse(JSON.stringify(this.cityData));
      var value = e.$wx.detail.value;

      if (value !== '') {
        for (var i in cityData) {
          for (var j in cityData[i]) {
            if (cityData[i][j].fullName.includes(value)) {
              selectData.push(cityData[i][j].fullName);
            }
          }
        }
      }

      this.searchKey = value;
      this.selectData = selectData;
    },
    clearSearchKey: function clearSearchKey() {
      this.searchKey = '';
      this.selectData = [];
    },
    selectCity: function selectCity(cityName) {
      // eslint-disable-next-line no-undef
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];
      prevPage.$wepy.current_city = cityName;
      wx.navigateBack({
        delta: 1
      });
    },

    /**
     * 设置当前激活的元素
     */
    setActive: function setActive(py) {
      if (typeof py !== 'undefined' && py !== this.showPy) {
        this.showPy = py;
        this.scrollToId = py === '★' ? 'cur' : py; // 振动反馈

        if (this.platform !== 'devtools') {
          wx.vibrateShort();
        }
      }
    },

    /**
     * 手指触摸动作开始
     */
    onTouchStart: function onTouchStart(e) {
      var name = e.target.dataset.name;
      if (this.moving || typeof name === 'undefined') return;
      this.setActive(name);
      this.moving = true;
    },

    /**
     * 手指触摸后移动
     */
    onTouchMove: function onTouchMove(e) {
      // 非移动，则设置为移动
      if (!this.moving) {
        this.moving = true;
      }

      var target = this.getTargetFromPoint(e.changedTouches[0].pageY);

      if (target !== undefined) {
        this.setActive(target.dataset.name);
      }
    },

    /**
     * 手指触摸动作结束
     */
    onTouchEnd: function onTouchEnd(e) {
      var _this2 = this;

      this.onTouchMove(e);
      if (!this.moving) return;
      this.timer = setTimeout(function () {
        _this2.moving = false;
      }, 300);
    },

    /**
     * 获取右侧导航对应的坐标
     */
    getNavPoints: function getNavPoints() {
      var _this3 = this;

      wx.createSelectorQuery().selectAll('.pinYin').boundingClientRect().exec(function (rects) {
        _this3.points = rects[0].map(function (n) {
          return _objectSpread({}, n, {
            offsets: [n.top, n.top + n.height]
          });
        });
      });
    },

    /**
     * 根据坐标获得对应的元素
     */
    getTargetFromPoint: function getTargetFromPoint(y) {
      var points = this.points;
      var target;

      for (var i = points.length - 1; i >= 0; i--) {
        var _points$i$offsets = _slicedToArray(points[i].offsets, 2),
            a = _points$i$offsets[0],
            b = _points$i$offsets[1]; // 1.判断是否为第一个元素且大于最大坐标点
        // 2.判断是否为最后一个元素且小于最小坐标点
        // 3.判断是否包含于某个坐标系内


        if (i === points.length - 1 && y > b || i === 0 && y < a || y >= a && y <= b) {
          target = points[i];
          break;
        }
      }

      return target;
    }
  }),
  onUnload: function onUnload() {
    clearTimeout(this.timer);
  }
}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"37-0":["clickLeft"],"37-2":["tap"]}}, handlers: {'37-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'37-1': {"input": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onSearchInput.apply(_vm, $args || [$event]);
  })();
}},'37-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.clearSearchKey.apply(_vm, $args || [$event]);
  })();
}},'37-3': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.selectCity(_vm.currentArea.ad_info.city);
  })();
}},'37-4': {"tap": function proxy () {
    var _vm=this;
  return (function () {
    _vm.locateArea(true);
  })();
}},'37-5': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.selectCity(item.fullName);
  })();
}},'37-6': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.selectCity(item);
  })();
}},'37-7': {"touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'37-8': {"touchend": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onTouchEnd.apply(_vm, $args || [$event]);
  })();
}, "touchstart": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onTouchStart.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onTouchMove.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });