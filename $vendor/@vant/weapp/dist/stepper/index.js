"use strict";

var _component = require('./../common/component.js');

var _utils = require('./../common/utils.js');

var LONG_PRESS_START_TIME = 600;
var LONG_PRESS_INTERVAL = 200; // add num and avoid float number

function add(num1, num2) {
  var cardinal = Math.pow(10, 10);
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

(0, _component.VantComponent)({
  field: true,
  classes: ['input-class', 'plus-class', 'minus-class'],
  props: {
    value: {
      type: null,
      observer: function observer(value) {
        if (value === '') {
          return;
        }

        var newValue = this.range(value);

        if (typeof newValue === 'number' && +this.data.value !== newValue) {
          this.setData({
            value: newValue
          });
        }
      }
    },
    integer: Boolean,
    disabled: Boolean,
    inputWidth: {
      type: null,
      observer: function observer() {
        this.setData({
          inputStyle: this.computeInputStyle()
        });
      }
    },
    buttonSize: {
      type: null,
      observer: function observer() {
        this.setData({
          inputStyle: this.computeInputStyle(),
          buttonStyle: this.computeButtonStyle()
        });
      }
    },
    asyncChange: Boolean,
    disableInput: Boolean,
    decimalLength: {
      type: Number,
      value: null
    },
    min: {
      type: null,
      value: 1
    },
    max: {
      type: null,
      value: Number.MAX_SAFE_INTEGER
    },
    step: {
      type: null,
      value: 1
    },
    showPlus: {
      type: Boolean,
      value: true
    },
    showMinus: {
      type: Boolean,
      value: true
    },
    disablePlus: Boolean,
    disableMinus: Boolean,
    longPress: {
      type: Boolean,
      value: true
    }
  },
  data: {
    focus: false,
    inputStyle: '',
    buttonStyle: ''
  },
  created: function created() {
    this.setData({
      value: this.range(this.data.value)
    });
  },
  methods: {
    isDisabled: function isDisabled(type) {
      if (type === 'plus') {
        return this.data.disabled || this.data.disablePlus || this.data.value >= this.data.max;
      }

      return this.data.disabled || this.data.disableMinus || this.data.value <= this.data.min;
    },
    onFocus: function onFocus(event) {
      this.$emit('focus', event.detail);
    },
    onBlur: function onBlur(event) {
      var value = this.range(this.data.value);
      this.triggerInput(value);
      this.$emit('blur', event.detail);
    },
    // limit value range
    range: function range(value) {
      value = String(value).replace(/[^0-9.-]/g, ''); // format range

      value = value === '' ? 0 : +value;
      value = Math.max(Math.min(this.data.max, value), this.data.min); // format decimal

      if ((0, _utils.isDef)(this.data.decimalLength)) {
        value = value.toFixed(this.data.decimalLength);
      }

      return value;
    },
    onInput: function onInput(event) {
      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? '' : _ref$value;

      this.triggerInput(value);
    },
    onChange: function onChange() {
      var type = this.type;

      if (this.isDisabled(type)) {
        this.$emit('overlimit', type);
        return;
      }

      var diff = type === 'minus' ? -this.data.step : +this.data.step;
      var value = add(+this.data.value, diff);
      this.triggerInput(this.range(value));
      this.$emit(type);
    },
    longPressStep: function longPressStep() {
      var _this = this;

      this.longPressTimer = setTimeout(function () {
        _this.onChange();

        _this.longPressStep();
      }, LONG_PRESS_INTERVAL);
    },
    onTap: function onTap(event) {
      var type = event.currentTarget.dataset.type;
      this.type = type;
      this.onChange();
    },
    onTouchStart: function onTouchStart(event) {
      var _this2 = this;

      if (!this.data.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
      var type = event.currentTarget.dataset.type;
      this.type = type;
      this.isLongPress = false;
      this.longPressTimer = setTimeout(function () {
        _this2.isLongPress = true;

        _this2.onChange();

        _this2.longPressStep();
      }, LONG_PRESS_START_TIME);
    },
    onTouchEnd: function onTouchEnd() {
      if (!this.data.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
    },
    triggerInput: function triggerInput(value) {
      this.setData({
        value: this.data.asyncChange ? this.data.value : value
      });
      this.$emit('change', value);
    },
    computeInputStyle: function computeInputStyle() {
      var style = '';

      if (this.data.inputWidth) {
        style = "width: ".concat((0, _utils.addUnit)(this.data.inputWidth), ";");
      }

      if (this.data.buttonSize) {
        style += "height: ".concat((0, _utils.addUnit)(this.data.buttonSize), ";");
      }

      return style;
    },
    computeButtonStyle: function computeButtonStyle() {
      var style = '';
      var size = (0, _utils.addUnit)(this.data.buttonSize);

      if (this.data.buttonSize) {
        style = "width: ".concat(size, ";height: ").concat(size, ";");
      }

      return style;
    }
  }
});