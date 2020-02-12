"use strict";

var _component = require('./../common/component.js');

var _utils = require('./../common/utils.js');

(0, _component.VantComponent)({
  field: true,
  classes: ['input-class', 'right-icon-class'],
  props: {
    size: String,
    icon: String,
    label: String,
    error: Boolean,
    fixed: Boolean,
    focus: Boolean,
    center: Boolean,
    isLink: Boolean,
    leftIcon: String,
    rightIcon: String,
    disabled: Boolean,
    autosize: Boolean,
    readonly: Boolean,
    required: Boolean,
    password: Boolean,
    iconClass: String,
    clearable: Boolean,
    clickable: Boolean,
    inputAlign: String,
    placeholder: String,
    customStyle: String,
    confirmType: String,
    confirmHold: Boolean,
    holdKeyboard: Boolean,
    errorMessage: String,
    arrowDirection: String,
    placeholderStyle: String,
    errorMessageAlign: String,
    selectionEnd: {
      type: Number,
      value: -1
    },
    selectionStart: {
      type: Number,
      value: -1
    },
    showConfirmBar: {
      type: Boolean,
      value: true
    },
    adjustPosition: {
      type: Boolean,
      value: true
    },
    cursorSpacing: {
      type: Number,
      value: 50
    },
    maxlength: {
      type: Number,
      value: -1
    },
    type: {
      type: String,
      value: 'text'
    },
    border: {
      type: Boolean,
      value: true
    },
    titleWidth: {
      type: String,
      value: '90px'
    }
  },
  data: {
    focused: false,
    system: (0, _utils.getSystemInfoSync)().system.split(' ').shift().toLowerCase()
  },
  methods: {
    onInput: function onInput(event) {
      var _this = this;

      var _ref = event.detail || {},
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? '' : _ref$value;

      this.setData({
        value: value
      });
      wx.nextTick(function () {
        _this.emitChange(value);
      });
    },
    onFocus: function onFocus(event) {
      this.setData({
        focused: true
      });
      this.$emit('focus', event.detail);
    },
    onBlur: function onBlur(event) {
      this.setData({
        focused: false
      });
      this.$emit('blur', event.detail);
    },
    onClickIcon: function onClickIcon() {
      this.$emit('click-icon');
    },
    onClear: function onClear() {
      var _this2 = this;

      this.setData({
        value: ''
      });
      wx.nextTick(function () {
        _this2.emitChange('');

        _this2.$emit('clear', '');
      });
    },
    onConfirm: function onConfirm() {
      this.$emit('confirm', this.data.value);
    },
    emitChange: function emitChange(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
    noop: function noop() {}
  }
});