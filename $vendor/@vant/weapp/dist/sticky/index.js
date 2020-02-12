"use strict";

var _component = require('./../common/component.js');

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
      observer: 'observeContent'
    },
    disabled: {
      type: Boolean,
      observer: function observer(value) {
        if (!this.mounted) {
          return;
        }

        value ? this.disconnectObserver() : this.initObserver();
      }
    },
    container: {
      type: null,
      observer: function observer(target) {
        if (typeof target !== 'function' || !this.data.height) {
          return;
        }

        this.observeContainer();
      }
    }
  },
  data: {
    height: 0,
    fixed: false
  },
  methods: {
    getContainerRect: function getContainerRect() {
      var nodesRef = this.data.container();
      return new Promise(function (resolve) {
        return nodesRef.boundingClientRect(resolve).exec();
      });
    },
    initObserver: function initObserver() {
      var _this = this;

      this.disconnectObserver();
      this.getRect(ROOT_ELEMENT).then(function (rect) {
        _this.setData({
          height: rect.height
        });

        wx.nextTick(function () {
          _this.observeContent();

          _this.observeContainer();
        });
      });
    },
    disconnectObserver: function disconnectObserver(observerName) {
      if (observerName) {
        var observer = this[observerName];
        observer && observer.disconnect();
      } else {
        this.contentObserver && this.contentObserver.disconnect();
        this.containerObserver && this.containerObserver.disconnect();
      }
    },
    observeContent: function observeContent() {
      var _this2 = this;

      var offsetTop = this.data.offsetTop;
      this.disconnectObserver('contentObserver');
      var contentObserver = this.createIntersectionObserver({
        thresholds: [0.9, 1]
      });
      contentObserver.relativeToViewport({
        top: -offsetTop
      });
      contentObserver.observe(ROOT_ELEMENT, function (res) {
        if (_this2.data.disabled) {
          return;
        }

        _this2.setFixed(res.boundingClientRect.top);
      });
      this.contentObserver = contentObserver;
    },
    observeContainer: function observeContainer() {
      var _this3 = this;

      if (typeof this.data.container !== 'function') {
        return;
      }

      var height = this.data.height;
      this.getContainerRect().then(function (rect) {
        _this3.containerHeight = rect.height;

        _this3.disconnectObserver('containerObserver');

        var containerObserver = _this3.createIntersectionObserver({
          thresholds: [0.9, 1]
        });

        _this3.containerObserver = containerObserver;
        containerObserver.relativeToViewport({
          top: _this3.containerHeight - height
        });
        containerObserver.observe(ROOT_ELEMENT, function (res) {
          if (_this3.data.disabled) {
            return;
          }

          _this3.setFixed(res.boundingClientRect.top);
        });
      });
    },
    setFixed: function setFixed(top) {
      var _this$data = this.data,
          offsetTop = _this$data.offsetTop,
          height = _this$data.height;
      var containerHeight = this.containerHeight;
      var fixed = containerHeight && height ? top >= height - containerHeight && top < offsetTop : top < offsetTop;
      this.$emit('scroll', {
        scrollTop: top,
        isFixed: fixed
      });
      this.setData({
        fixed: fixed
      });
    }
  },
  mounted: function mounted() {
    this.mounted = true;

    if (!this.data.disabled) {
      this.initObserver();
    }
  },
  destroyed: function destroyed() {
    this.disconnectObserver();
  }
});