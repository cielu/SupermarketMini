"use strict";

var _component = require('./../common/component.js');

var _pageScroll = require('./../mixins/page-scroll.js');

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ROOT_ELEMENT = '.van-sticky';
(0, _component.VantComponent)({
  props: {
    zIndex: {
      type: Number,
      value: 99
    },
    offsetTop: {
      type: Number,
      value: 0,
      observer: 'onScroll'
    },
    disabled: {
      type: Boolean,
      observer: 'onScroll'
    },
    container: {
      type: null,
      observer: 'onScroll'
    },
    scrollTop: {
      type: null,
      observer: function observer(val) {
        this.onScroll({
          scrollTop: val
        });
      }
    }
  },
  mixins: [(0, _pageScroll.pageScrollMixin)(function (event) {
    if (this.data.scrollTop != null) {
      return;
    }

    this.onScroll(event);
  })],
  data: {
    height: 0,
    fixed: false,
    transform: 0
  },
  mounted: function mounted() {
    this.onScroll();
  },
  methods: {
    onScroll: function onScroll() {
      var _this = this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          scrollTop = _ref.scrollTop;

      var _this$data = this.data,
          container = _this$data.container,
          offsetTop = _this$data.offsetTop,
          disabled = _this$data.disabled;

      if (disabled) {
        this.setDataAfterDiff({
          fixed: false,
          transform: 0
        });
        return;
      }

      this.scrollTop = scrollTop || this.scrollTop;

      if (typeof container === 'function') {
        Promise.all([this.getRect(ROOT_ELEMENT), this.getContainerRect()]).then(function (_ref2) {
          var _ref3 = _slicedToArray(_ref2, 2),
              root = _ref3[0],
              container = _ref3[1];

          if (offsetTop + root.height > container.height + container.top) {
            _this.setDataAfterDiff({
              fixed: false,
              transform: container.height - root.height
            });
          } else if (offsetTop >= root.top) {
            _this.setDataAfterDiff({
              fixed: true,
              height: root.height,
              transform: 0
            });
          } else {
            _this.setDataAfterDiff({
              fixed: false,
              transform: 0
            });
          }
        });
        return;
      }

      this.getRect(ROOT_ELEMENT).then(function (root) {
        if (offsetTop >= root.top) {
          _this.setDataAfterDiff({
            fixed: true,
            height: root.height
          });

          _this.transform = 0;
        } else {
          _this.setDataAfterDiff({
            fixed: false
          });
        }
      });
    },
    setDataAfterDiff: function setDataAfterDiff(data) {
      var _this2 = this;

      wx.nextTick(function () {
        var diff = Object.keys(data).reduce(function (prev, key) {
          if (data[key] !== _this2.data[key]) {
            prev[key] = data[key];
          }

          return prev;
        }, {});

        _this2.setData(diff);

        _this2.$emit('scroll', {
          scrollTop: _this2.scrollTop,
          isFixed: data.fixed || _this2.data.fixed
        });
      });
    },
    getContainerRect: function getContainerRect() {
      var nodesRef = this.data.container();
      return new Promise(function (resolve) {
        return nodesRef.boundingClientRect(resolve).exec();
      });
    }
  }
});