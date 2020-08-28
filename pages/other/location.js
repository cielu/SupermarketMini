"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireWildcard(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _other = require('./../../api/other.js');

var _location = require('./../../utils/location.js');

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var QQMapWX = require('./../../utils/qqmap-wx-jssdk.min.js'); // 实例化API核心类


var qqmapsdk;

_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"]],
  data: {
    screenHeight: 1000,
    current_city: '长沙市',
    qMap: {
      markers: [{
        iconPath: '/images/shop/marker.png',
        id: 1,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 30,
        height: 30
      }],
      lat: 23.099994,
      lng: 113.324520,
      scale: 16
    },
    local_area: []
  },
  onLoad: function onLoad(options) {
    this.screenHeight = this.$app.$options.globalData.systemInfo.screenHeight;
    qqmapsdk = new QQMapWX({
      key: _util.MAP_KEY
    });
    this.getLocation();
  },
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea'])),
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x.mapActions)(['setCurrentArea']), {
    // vuex 方法
    // 其他方法
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    chooseLocation: function chooseLocation(location) {
      this.qMap.markers[0].id = location.id;
      this.qMap.markers[0].latitude = location.location.lat;
      this.qMap.markers[0].longitude = location.location.lng;
      this.qMap.lat = location.location.lat;
      this.qMap.lng = location.location.lng;
      this.setCurrentArea(location);
    },
    sureLocation: function sureLocation() {
      // eslint-disable-next-line no-undef
      var pages = getCurrentPages();
      var prevPage = pages[pages.length - 2];

      if (typeof prevPage !== 'undefined') {
        wx.navigateBack({
          delta: 1
        });
      }
    },
    changeCity: function changeCity() {
      _util["default"].navigateTo('/pages/other/city');
    },
    getLocation: function getLocation() {
      var _this = this;

      this.local_area = [];
      wx.getLocation({
        type: 'gcj02',
        altitude: true,
        success: function success(res) {
          // 获取附近位置信息
          _this.getLocalLocation(res.latitude, res.longitude);

          _this.qMap.lat = res.latitude;
          _this.qMap.lng = res.longitude;
          _this.qMap.markers[0].latitude = res.latitude;
          _this.qMap.markers[0].longitude = res.longitude;
        }
      });
    },
    getLocalLocation: function getLocalLocation() {
      var _this2 = this;

      var latitude = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var longitude = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (latitude == null) {
        latitude = this.qMap.lat;
        longitude = this.qMap.lng;
      } // 获取附近位置信息


      var params = {
        get_poi: 1,
        key: _util.MAP_KEY,
        location: latitude + ',' + longitude,
        poi_options: 'page_size=20',
        orderby: '_distance'
      }; // api根据经纬度查询附近地点

      (0, _other.getCurrentArea)(params).then(function (res) {
        _this2.current_city = res.result.ad_info.city;
        _this2.local_area = res.result.pois.map(function (item) {
          item._distance = (0, _location.formatDistance)(item._distance);
          return item;
        });
        var currentArea = Object.assign({}, _this2.local_area[0]); // 当前 location

        currentArea.location = res.result.location; // 设置为当前地址

        _this2.setCurrentArea(currentArea);
      })["catch"](function (e) {
        // console.log(e)
        _util["default"].toast('定位失败，请稍后再试');
      });
    },
    // 触发关键词输入提示事件
    getSuggest: function getSuggest(e) {
      var keyword = e.$wx.detail.value;

      if (keyword === '' || keyword.length === 0) {
        this.getLocalLocation();
        return;
      }

      var _this = this; // 搜索附近地址


      qqmapsdk.search({
        // 获取输入框值并设置keyword参数
        keyword: keyword,
        // 用户输入的关键词，可设置固定值,如keyword:'KFC'
        region: this.current_city,
        // 设置城市名，限制关键词所示的地域范围，非必填参数
        orderby: '_distance',
        page_size: 20,
        policy: 1,
        success: function success(res) {
          // 搜索成功后的回调
          _this.local_area = res.data;
        },
        fail: function fail(error) {
          _util["default"].toast('查询地址失败：' + error); // console.error(error)

        }
      });
    }
  }) //

}, {info: {"components":{"van-nav-bar":{"path":"./../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"}},"on":{"38-0":["clickLeft"]}}, handlers: {'38-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'38-1': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.changeCity.apply(_vm, $args || [$event]);
  })();
}},'38-2': {"input": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getSuggest.apply(_vm, $args || [$event]);
  })();
}},'38-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.sureLocation.apply(_vm, $args || [$event]);
  })();
}},'38-4': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.getLocation.apply(_vm, $args || [$event]);
  })();
}},'38-5': {"tap": function proxy (item) {
    var _vm=this;
  return (function () {
    _vm.chooseLocation(item);
  })();
}},'38-6': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.sureLocation.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });