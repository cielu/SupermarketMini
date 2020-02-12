"use strict";

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
  classes: ['avatar-class', 'title-class', 'row-class'],
  props: {
    row: {
      type: Number,
      value: 0
    },
    title: Boolean,
    avatar: Boolean,
    loading: {
      type: Boolean,
      value: true
    },
    animate: {
      type: Boolean,
      value: true
    },
    avatarSize: {
      type: String,
      value: '32px'
    },
    avatarShape: {
      type: String,
      value: 'round'
    },
    titleWidth: {
      type: String,
      value: '40%'
    },
    rowWidth: {
      type: null,
      value: '100%',
      observer: function observer(val) {
        this.setData({
          isArray: val instanceof Array
        });
      }
    }
  },
  data: {
    isArray: false
  }
});