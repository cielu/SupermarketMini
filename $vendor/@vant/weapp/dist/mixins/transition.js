"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transition = void 0;

var _utils = require('./../common/utils.js');

var getClassNames = function getClassNames(name) {
  return {
    enter: "van-".concat(name, "-enter van-").concat(name, "-enter-active enter-class enter-active-class"),
    'enter-to': "van-".concat(name, "-enter-to van-").concat(name, "-enter-active enter-to-class enter-active-class"),
    leave: "van-".concat(name, "-leave van-").concat(name, "-leave-active leave-class leave-active-class"),
    'leave-to': "van-".concat(name, "-leave-to van-").concat(name, "-leave-active leave-to-class leave-active-class")
  };
};

var transition = function transition(showDefaultValue) {
  return Behavior({
    properties: {
      customStyle: String,
      // @ts-ignore
      show: {
        type: Boolean,
        value: showDefaultValue,
        observer: 'observeShow'
      },
      // @ts-ignore
      duration: {
        type: null,
        value: 300,
        observer: 'observeDuration'
      },
      name: {
        type: String,
        value: 'fade'
      }
    },
    data: {
      type: '',
      inited: false,
      display: false
    },
    methods: {
      observeShow: function observeShow(value, old) {
        if (value === old) {
          return;
        }

        value ? this.enter() : this.leave();
      },
      enter: function enter() {
        var _this = this;

        var _this$data = this.data,
            duration = _this$data.duration,
            name = _this$data.name;
        var classNames = getClassNames(name);
        var currentDuration = (0, _utils.isObj)(duration) ? duration.enter : duration;
        this.status = 'enter';
        this.$emit('before-enter');
        (0, _utils.requestAnimationFrame)(function () {
          _this.checkStatus('enter');

          _this.$emit('enter');

          _this.setData({
            inited: true,
            display: true,
            classes: classNames.enter,
            currentDuration: currentDuration
          });

          (0, _utils.requestAnimationFrame)(function () {
            _this.checkStatus('enter');

            _this.transitionEnded = false;

            _this.setData({
              classes: classNames['enter-to']
            });
          });
        });
      },
      leave: function leave() {
        var _this2 = this;

        if (!this.data.display) {
          return;
        }

        var _this$data2 = this.data,
            duration = _this$data2.duration,
            name = _this$data2.name;
        var classNames = getClassNames(name);
        var currentDuration = (0, _utils.isObj)(duration) ? duration.leave : duration;
        this.status = 'leave';
        this.$emit('before-leave');
        (0, _utils.requestAnimationFrame)(function () {
          _this2.checkStatus('leave');

          _this2.$emit('leave');

          _this2.setData({
            classes: classNames.leave,
            currentDuration: currentDuration
          });

          (0, _utils.requestAnimationFrame)(function () {
            _this2.checkStatus('leave');

            _this2.transitionEnded = false;
            setTimeout(function () {
              return _this2.onTransitionEnd();
            }, currentDuration);

            _this2.setData({
              classes: classNames['leave-to']
            });
          });
        });
      },
      checkStatus: function checkStatus(status) {
        if (status !== this.status) {
          throw new Error("incongruent status: ".concat(status));
        }
      },
      onTransitionEnd: function onTransitionEnd() {
        if (this.transitionEnded) {
          return;
        }

        this.transitionEnded = true;
        this.$emit("after-".concat(this.status));
        var _this$data3 = this.data,
            show = _this$data3.show,
            display = _this$data3.display;

        if (!show && display) {
          this.setData({
            display: false
          });
        }
      }
    }
  });
};

exports.transition = transition;