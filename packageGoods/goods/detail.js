"use strict";

var _core = _interopRequireDefault(require('./../../vendor.js')(0));

var _x = require('./../../vendor.js')(4);

var _store = _interopRequireDefault(require('./../../store/index.js'));

var _util = _interopRequireDefault(require('./../../utils/util.js'));

var _statusBar = _interopRequireDefault(require('./../../mixins/statusBar.js'));

var _goods = require('./../../api/goods.js');

var _store2 = require('./../../api/store.js');

var _common = require('./../../utils/common.js');

var _goodsNum = require('./../../mixins/goodsNum.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_core["default"].page({
  store: _store["default"],
  mixins: [_statusBar["default"], _goodsNum.goodsNumMixin],
  data: {
    screenHeight: 600,
    cartTotalNum: 0,
    cartGoodsNum: {},
    transparentNav: true,
    isShowAttrModal: false,
    isShowShopInfoModal: false,
    isShowChooseModal: false,
    isShowExplainModal: false,
    fromUid: null,
    goodsCode: null,
    goods: {},
    selectedAttr: {},
    selectArr: [],
    // 存放被选中的值
    hasSelected: '',
    attrItemInfo: {},
    // 存放要和选中的值进行匹配的数据
    subIndex: [],
    // 是否选中 因为不确定是多规格还是单规格，所以这里定义数组来判断
    storeInfo: {},
    markers: [{
      iconPath: '/images/shop/marker.png',
      id: 0,
      latitude: 0,
      longitude: 0,
      width: 30,
      height: 30
    }],
    polyline: [{
      points: [{
        longitude: 0,
        latitude: 0
      }, {
        longitude: 0,
        latitude: 0
      }],
      color: '#FF0000DD',
      width: 2,
      dottedLine: true
    }]
  },
  computed: _objectSpread({}, (0, _x.mapState)({
    currentArea: function currentArea(state) {
      return state.currentArea;
    }
  })),
  watch: {
    currentArea: function currentArea(area) {
      if (area !== null) {
        this.polyline[0].points[1].latitude = area.location.lat;
        this.polyline[0].points[1].longitude = area.location.lng;
      }
    }
  },
  onLoad: function onLoad(options) {
    // 获取传过来的商品编码
    this.goodsCode = options.goodsCode; // 通过分享打开

    if (typeof options.fromUid !== 'undefined') {
      this.fromUid = options.fromUid;
    } // this.sendTime =

  },
  onShow: function onShow() {
    this.loadGoodsDetail();
    this.screenHeight = this.$app.$options.globalData.systemInfo.screenHeight;

    if (this.currentArea === null) {
      this.syncCurrentArea();
    }
  },
  // 事件处理函数(集中保存在methods对象中)
  methods: _objectSpread({}, (0, _x.mapActions)(['syncCurrentArea', 'initShoppingCart', 'addIntoCart', 'reduceCart', 'userInfo']), {
    // vuex 方法
    // 本地其他方法
    redirectTo: function redirectTo(path) {
      _util["default"].navigateTo(path);
    },
    onClickBack: function onClickBack() {
      _util["default"].navigateBack();
    },
    toShoppingCart: function toShoppingCart() {
      _util["default"].navigateCart();
    },
    loadGoodsDetail: function loadGoodsDetail() {
      var _this = this;

      // 进入页面方式非法，直接返回
      if (typeof this.goodsCode === 'undefined') {
        _util["default"].switchHome();

        return;
      }

      (0, _goods.getGoodsDetail)(this.goodsCode).then(function (res) {
        // 根据商品 code 获取商品信息
        var goods = res.data; // 处理图片详情

        if (res.data.goodsDescription) {
          // 格式化图片标签
          goods.goodsDescription = (0, _common.formatRichTextImg)(res.data.goodsDescription);
        } // 图片切割为数组


        goods.goodsImages = goods.goodsImages.split(';'); // 格式化规格属性

        if (goods.goodsAttrs != null) {
          goods.goodsAttrs = goods.goodsAttrs.map(function (item) {
            item.attrValues = item.attrValues.split(';').map(function (item) {
              return {
                name: item,
                isShow: true
              };
            });
            return item;
          });
        }

        for (var i in goods.goodsSku) {
          var sku = goods.goodsSku[i]; // 修改数据结构格式，改成键值对的方式，以方便和选中之后的值进行匹配

          _this.$set(_this.attrItemInfo, sku.a1 + sku.a2 + sku.a3 + sku.a4 + sku.a5, goods.goodsSku[i]);
        }

        delete goods.goodsSku;
        _this.goods = goods; // 获取门店信息

        (0, _store2.getStoreDetail)(goods.storeId).then(function (res) {
          // console.log(res)
          var storeInfo = res.data; // 分享进入页面，则初始化购物车

          if (_this.fromUid !== null) {
            _this.initShoppingCart(storeInfo);
          }

          _this.storeInfo = storeInfo;
          _this.$app.$options.globalData.storeInfo = storeInfo; // 设置地图信息

          _this.markers[0].latitude = storeInfo.lat;
          _this.markers[0].longitude = storeInfo.lng;
          _this.polyline[0].points[0].latitude = storeInfo.lat;
          _this.polyline[0].points[0].longitude = storeInfo.lng;
        });
      });
    },
    previewImg: function previewImg(index) {
      wx.previewImage({
        current: this.goods.goodsImages[index],
        // 当前显示图片的http链接
        urls: this.goods.goodsImages // 需要预览的图片http链接列表

      });
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
    onAddIntoCart: function onAddIntoCart() {
      // 商品类型不是单属性
      if (this.goods.attrType !== 'single') {
        this.isShowChooseModal = true;
      } else {
        this.onPlusGoodsNum();
      }
    },
    onPlusGoodsNum: function onPlusGoodsNum() {
      var addCartParam = {};
      addCartParam['skuId'] = 0; // 商品类型是多规格属性

      if (this.goods.attrType === 'multiple') {
        // 判断是否选择完整
        if (this.selectArr.length < this.goods.goodsAttrs.length) {
          _util["default"].toast('请选择有效的规格');

          return;
        } // 隐藏弹出框


        this.isShowChooseModal = false; // 拿到已选属性的sku id

        addCartParam['skuId'] = this.attrItemInfo[this.selectArr.join('')].skuId;
      }

      addCartParam['goods'] = this.goods;
      addCartParam['returnGoods'] = true; // 选完后加入购物车

      this.addIntoCart(addCartParam).then(function (res) {
        if (res.status === 'error') {
          _util["default"].toast(res.msg);
        } else {
          _util["default"].toast('已加入购物车');
        }
      });
    },
    onMinusGoodsNum: function onMinusGoodsNum() {
      var reduceParam = {
        goods: this.goods,
        skuId: 0
      };
      this.reduceCart(reduceParam);
    },
    contactMerchant: function contactMerchant() {
      wx.makePhoneCall({
        phoneNumber: this.storeInfo.contactTel
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

      return this.attrItemInfo[attrName.join('')].stockNum > 0; // 匹配选中的数据的库存，若不为空返回true反之返回false
    }
  }),
  onPageScroll: function onPageScroll(res) {
    // 小于 300 则导航栏透明
    if (res.scrollTop < 300) {
      if (this.transparentNav === false) {
        this.transparentNav = true;
      }
    } else {
      if (this.transparentNav === true) {
        this.transparentNav = false;
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
    return {
      title: goods.goodsName + '【' + goods.salePrice + '元】',
      imgUrl: goods.goodsCoverUrl,
      path: '/packageGoods/goods/detail?goodsCode=' + goods.goodsCode + '&fromUid=' + this.userInfo.userId,
      success: function success(res) {
        console.log('成功', res);
      }
    };
  }
}, {info: {"components":{"van-popup":{"path":"./../../$vendor/@vant/weapp/dist/popup/index"},"van-icon":{"path":"./../../$vendor/@vant/weapp/dist/icon/index"},"van-loading":{"path":"./../../$vendor/@vant/weapp/dist/loading/index"},"van-stepper":{"path":"./../../$vendor/@vant/weapp/dist/stepper/index"},"van-cell":{"path":"./../../$vendor/@vant/weapp/dist/cell/index"},"van-goods-action":{"path":"./../../$vendor/@vant/weapp/dist/goods-action/index"},"van-goods-action-button":{"path":"./../../$vendor/@vant/weapp/dist/goods-action-button/index"},"van-goods-action-icon":{"path":"./../../$vendor/@vant/weapp/dist/goods-action-icon/index"},"vip-price-box":{"path":"./../../components/vipPriceBox"}},"on":{"43-2":["tap"],"43-3":["tap"],"43-4":["tap"],"43-8":["tap"],"43-9":["minus","plus"],"43-11":["tap"],"43-12":["close","touchmove"],"43-16":["close","touchmove"],"43-18":["close","touchmove"],"43-22":["close","touchmove"]}}, handlers: {'43-0': {"clickLeft": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onClickBack.apply(_vm, $args || [$event]);
  })();
}},'43-1': {"tap": function proxy (index) {
    var _vm=this;
  return (function () {
    _vm.previewImg(index);
  })();
}},'43-2': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showExplainModal.apply(_vm, $args || [$event]);
  })();
}},'43-3': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showChooseModal.apply(_vm, $args || [$event]);
  })();
}},'43-4': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showAttrModal.apply(_vm, $args || [$event]);
  })();
}},'43-5': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showShopInfoModal.apply(_vm, $args || [$event]);
  })();
}},'43-6': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.contactMerchant.apply(_vm, $args || [$event]);
  })();
}},'43-7': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showShopInfoModal.apply(_vm, $args || [$event]);
  })();
}},'43-8': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.toShoppingCart.apply(_vm, $args || [$event]);
  })();
}},'43-9': {"minus": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onMinusGoodsNum.apply(_vm, $args || [$event]);
  })();
}, "plus": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onAddIntoCart.apply(_vm, $args || [$event]);
  })();
}},'43-11': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onAddIntoCart.apply(_vm, $args || [$event]);
  })();
}},'43-12': {"close": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showShopInfoModal.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'43-14': {"markertap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.mapMarkerTap.apply(_vm, $args || [$event]);
  })();
}, "regionchange": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.mapRegionChange.apply(_vm, $args || [$event]);
  })();
}},'43-16': {"close": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showExplainModal.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'43-18': {"close": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showChooseModal.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'43-20': {"tap": function proxy (attrVal, n, index) {
    var _vm=this;
  return (function () {
    _vm.onChooseSku(attrVal.name,n,index);
  })();
}},'43-21': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.onPlusGoodsNum.apply(_vm, $args || [$event]);
  })();
}},'43-22': {"close": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showAttrModal.apply(_vm, $args || [$event]);
  })();
}, "touchmove": function proxy () {
    var _vm=this;
  return (function () {
    !function(){};
  })();
}},'43-24': {"tap": function proxy () {
  var $wx = arguments[arguments.length - 1].$wx;
  var $event = ($wx.detail && $wx.detail.arguments) ? $wx.detail.arguments[0] : arguments[arguments.length -1];
  var $args = $wx.detail && $wx.detail.arguments;
  var _vm=this;
  return (function () {
    _vm.showAttrModal.apply(_vm, $args || [$event]);
  })();
}}}, models: {}, refs: undefined });