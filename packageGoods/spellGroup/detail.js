"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _goods = require('./../../api/goods.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"]],
  data: {
    screenHeight: 600,
    transpNav: true,
    isShowAttrModal: false,
    isShowShopInfoModal: false,
    isShowChooseModal: false,
    isShowExplainModal: false,
    userInfo: {},
    groupOrders: [],
    goods: {},
    goodsNum: 1,
    nowTime: 0,
    selectedAttr: {},
    selectArr: [],
    // 存放被选中的值
    hasSelected: '',
    attrItemInfo: {},
    // 存放要和选中的值进行匹配的数据
    subIndex: [],
    // 是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
    storeInfo: {
      arriveTime: '现在下单，预计明天09:00分送达'
    },
    markers: [{
      iconPath: '/images/shop/marker.png',
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 30,
      height: 30
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }]
  },
  computed: _objectSpread({}, (0, _x.mapState)(['currentArea'])),
  onLoad: function onLoad(options) {
    // console.log(options)
    if (typeof options.activityId !== 'undefined') {
      this.goods.activityId = options.activityId;
    } // this.sendTime =


    this.screenHeight = this.$app.$options.globalData.systemInfo.screenHeight; // 当前位置无数据

    if (this.currentArea == null) {
      this.syncCurrentArea();
    } // 获取商品详情


    this.loadGoodsDetail();
  },
  onShow: function onShow() {
    this.userInfo = this.$app.$options.globalData.userInfo;
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x.mapActions)(['syncCurrentArea']), {
    // vuex 方法
    // 其他方法
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    toLocation: function toLocation() {
      var _this$storeInfo = this.storeInfo,
          lat = _this$storeInfo.lat,
          lng = _this$storeInfo.lng,
          storeName = _this$storeInfo.storeName,
          address = _this$storeInfo.address; // 使用微信内置地图查看位置

      wx.openLocation({
        latitude: lat,
        // 要去的纬度-地址
        longitude: lng,
        // 要去的经度-地址
        name: storeName,
        address: address
      });
    },
    loadGoodsDetail: function loadGoodsDetail() {
      var _this = this;

      // 进入页面方式非法，直接返回
      if (typeof this.goods.activityId === 'undefined') {
        _util["default"].switchHome();

        return;
      }

      (0, _goods.getGroupGoodsDetail)(this.goods.activityId).then(function (res) {
        // 根据商品 code 获取商品信息
        var goods = res.data.goodsDetail; // 处理图片详情

        if (goods.goodsDescription) {
          goods.goodsDescription = goods.goodsDescription.replace(/<img/gi, '<img style="max-width:100%;height:auto;display:block" ');
        } // 图片切割为数组


        goods.goodsImages = goods.goodsImages.split(';');
        _this.goods = goods;
        _this.nowTime = Date.parse(new Date());
        _this.storeInfo = res.data.storeInfo;
        _this.groupOrders = res.data.groupOrders;
        _this.goodsNum = goods.saleStartNum;
        _this.markers[0].latitude = _this.storeInfo.lat;
        _this.markers[0].longitude = _this.storeInfo.lng;
        _this.polyline[0].points[0].longitude = _this.storeInfo.lng;
        _this.polyline[0].points[0].latitude = _this.storeInfo.lat;
        _this.polyline[0].points[1].longitude = _this.currentArea.location.lng;
        _this.polyline[0].points[1].latitude = _this.currentArea.location.lat;
      });
    },
    previewImg: function previewImg(index) {
      wx.previewImage({
        current: this.goods.goodsImages[index],
        // 当前显示图片的http链接
        urls: this.goods.goodsImages // 需要预览的图片http链接列表

      });
    },
    toShoppingCart: function toShoppingCart() {
      _util["default"].redirectCart();
    },
    showChooseModal: function showChooseModal() {
      this.isShowChooseModal = !this.isShowChooseModal;
    },
    showAttrModal: function showAttrModal() {
      this.isShowAttrModal = !this.isShowAttrModal;
    },
    showExplainModal: function showExplainModal() {
      this.isShowExplainModal = !this.isShowExplainModal;
    },
    showShopInfoModal: function showShopInfoModal() {
      this.isShowShopInfoModal = !this.isShowShopInfoModal;
    },
    onPlusGoodsNum: function onPlusGoodsNum() {
      this.goodsNum += 1;
    },
    onMinusGoodsNum: function onMinusGoodsNum() {
      // 判断是否还能继续减少
      if (this.goodsNum - 1 < this.goods.saleStartNum) {
        this.goodsNum -= 1;
      } else {
        _util["default"].toast('至少拼' + this.goods.saleStartNum + '件');
      }
    },
    contactSell: function contactSell() {
      var contactTel = this.storeInfo.contactTel;
      wx.makePhoneCall({
        phoneNumber: contactTel
      });
    },
    mapRegionChange: function mapRegionChange(e) {
      console.log(e);
    },
    mapMarkerTap: function mapMarkerTap(e) {
      console.log(e);
    },
    mapControlTap: function mapControlTap(e) {
      console.log(e);
    },
    buyAlone: function buyAlone() {
      var params = 'storeId=' + this.storeInfo.storeId + '&goodsId=' + this.goods.goodsId; // 确认订单

      _util["default"].navigateTo('/packageGoods/order/confirmSingle', params);
    },
    doStartGroup: function doStartGroup() {
      var params = 'storeId=' + this.storeInfo.storeId + '&activityId=' + this.goods.activityId; // 确认订单

      _util["default"].navigateTo('/packageGoods/order/confirmSingle', params);
    },
    // 立即参团
    joinAtOnce: function joinAtOnce(groupCode) {
      var storeId = this.storeInfo.storeId;
      var activityId = this.goods.activityId;
      var params = 'storeId=' + storeId + '&activityId=' + activityId + '&groupCode=' + groupCode; // 确认订单

      _util["default"].navigateTo('/packageGoods/order/confirmSingle', params);
    },
    onChooseSku: function onChooseSku(item, n, index) {
      // 库存不足，点击无响应
      if (!this.goods.goodsAttrs[n].attrValues[index].isShow) return; // 没有选过该属性

      if (this.selectArr[n] !== item) {
        this.$set(this.selectArr, n, item);
        this.$set(this.subIndex, n, index);
      } else {
        this.$set(this.selectArr, n, '');
        this.$set(this.subIndex, n, -1); // 去掉选中 属性
      }

      this.hasSelected = this.selectArr.join(' ');
      this.checkItem(n);
    },
    checkItem: function checkItem(n) {
      var goodsAttrs = this.goods.goodsAttrs;
      var attrName = []; // 定义数组存储被选中的值
      // 拿到每个属性对应的值

      for (var i in goodsAttrs) {
        attrName[i] = this.selectArr[i] ? this.selectArr[i] : '';
      }

      var attrLen = goodsAttrs.length; // 已选的长度 等于 所有属性的长度

      if (attrLen === this.selectArr.length) {
        // 判断库存，并记录最终值
        this.setSelectedAttr(attrName.join(';'));
      } // 遍历其他属性是否可选


      for (var _i = 0; _i < attrLen; _i++) {
        // 该行有选过，则对下一行数据遍历
        if (_i === n) continue; // 遍历下一行所有数据，并判断库存

        for (var j in goodsAttrs[_i].attrValues) {
          attrName[_i] = goodsAttrs[_i].attrValues[j].name; // 赋值，存在直接覆盖，不存在往里面添加name值

          goodsAttrs[_i].attrValues[j].isShow = this.isMay(attrName); // 在数据里面添加字段isShow来判断是否可以选择
        }
      }

      this.$forceUpdate(); // 重绘
    },
    setSelectedAttr: function setSelectedAttr(attrName) {
      if (this.attrItemInfo.hasOwnProperty(attrName)) {
        this.selectedAttr = this.attrItemInfo[attrName];
      }
    },
    isMay: function isMay(attrName) {
      // 过滤所有存在空值的情况
      if (attrName.indexOf('') > -1) {
        return true;
      }

      return this.attrItemInfo[attrName.join(';')].stockNum > 0; // 匹配选中的数据的库存，若不为空返回true反之返回false
    }
  }),
  onPageScroll: function onPageScroll(res) {
    // 小于 300 则导航栏透明
    if (res.scrollTop < 300) {
      if (this.transpNav === false) {
        this.transpNav = true;
      }
    } else {
      if (this.transpNav === true) {
        this.transpNav = false;
      }
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function onPullDownRefresh() {
    this.loadGoodsDetail();
  },
  onShareAppMessage: function onShareAppMessage(options) {
    var goods = this.goods;
    var userInfo = this.userInfo;
    return {
      title: '一号小店拼团【' + goods.groupPrice + '元】' + goods.groupName,
      imgUrl: goods.goodsCoverUrl,
      path: '/packageGoods/spellGroup/detail?activityId=' + goods.activityId + '&from_uid=' + userInfo.userId,
      success: function success(res) {
        console.log('成功', res);
      }
    };
  }
}, {info: {"components":{"van-nav-bar":{"path":"../../$vendor/@vant/weapp/dist/nav-bar/index"},"van-icon":{"path":"../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"../../$vendor/@vant/weapp/dist/loading/index"},"van-stepper":{"path":"../../$vendor/@vant/weapp/dist/stepper/index"},"van-popup":{"path":"../../$vendor/@vant/weapp/dist/popup/index"},"van-cell":{"path":"../../$vendor/@vant/weapp/dist/cell/index"},"van-button":{"path":"../../$vendor/@vant/weapp/dist/button/index"},"van-count-down":{"path":"../../$vendor/@vant/weapp/dist/count-down/index"}},"on":{"36-0":["clickLeft"],"36-2":["minus","plus"],"36-4":["tap"],"36-5":["tap"],"36-11":["tap"],"36-12":["tap"],"36-13":["close"],"36-18":["close"],"36-20":["close"],"36-23":["minus","plus"],"36-26":["close"]}}, handlers: {'36-0': {"clickLeft": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onClickBack($event);
      })();
    
  }},'36-1': {"tap": function proxy (index) {
    
    var _vm=this;
      return (function () {
        _vm.previewImg(index);
      })();
    
  }},'36-2': {"minus": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onMinusGoodsNum($event);
      })();
    
  }, "plus": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onPlusGoodsNum($event);
      })();
    
  }},'36-4': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showChooseModal($event);
      })();
    
  }},'36-5': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showAttrModal($event);
      })();
    
  }},'36-6': {"tap": function proxy (order) {
    
    var _vm=this;
      return (function () {
        _vm.joinAtOnce(order.groupCode);
      })();
    
  }},'36-7': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showShopInfoModal($event);
      })();
    
  }},'36-8': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.contactSell($event);
      })();
    
  }},'36-9': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showShopInfoModal($event);
      })();
    
  }},'36-10': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.toShoppingCart($event);
      })();
    
  }},'36-11': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.buyAlone($event);
      })();
    
  }},'36-12': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doStartGroup($event);
      })();
    
  }},'36-13': {"close": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showShopInfoModal($event);
      })();
    
  }},'36-14': {"touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }},'36-15': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.toLocation($event);
      })();
    
  }},'36-16': {"markertap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.mapMarkerTap($event);
      })();
    
  }, "regionchange": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.mapRegionChange($event);
      })();
    
  }},'36-18': {"close": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showExplainModal($event);
      })();
    
  }},'36-19': {"touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }},'36-20': {"close": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showChooseModal($event);
      })();
    
  }},'36-21': {"touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }},'36-22': {"tap": function proxy (attrVal, n, index) {
    
    var _vm=this;
      return (function () {
        _vm.onChooseSku(attrVal.name,n,index);
      })();
    
  }},'36-23': {"minus": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onMinusGoodsNum($event);
      })();
    
  }, "plus": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.onPlusGoodsNum($event);
      })();
    
  }},'36-25': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.doStartGroup($event);
      })();
    
  }},'36-26': {"close": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showAttrModal($event);
      })();
    
  }},'36-27': {"touchmove": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        return($event);
      })();
    
  }},'36-28': {"tap": function proxy () {
    var $event = arguments[arguments.length - 1];
    var _vm=this;
      return (function () {
        _vm.showAttrModal($event);
      })();
    
  }}}, models: {}, refs: undefined });