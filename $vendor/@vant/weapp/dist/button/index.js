"use strict";

var _component = require('./../common/component.js');

var _button = require('./../mixins/button.js');

var _openType = require('./../mixins/open-type.js');

(0, _component.VantComponent)({
  mixins: [_button.button, _openType.openType],
  classes: ['hover-class', 'loading-class'],
  data: {
    style: ''
  },
  props: {
    icon: String,
    plain: Boolean,
    block: Boolean,
    round: Boolean,
    square: Boolean,
    loading: Boolean,
    hairline: Boolean,
    disabled: Boolean,
    loadingText: String,
    customStyle: String,
    loadingType: {
      type: String,
      value: 'circular'
    },
    type: {
      type: String,
      value: 'default'
    },
    size: {
      type: String,
      value: 'normal'
    },
    loadingSize: {
      type: String,
      value: '20px'
    },
    color: {
      type: String,
      observer: function observer(color) {
        var style = '';

        if (color) {
          style += "color: ".concat(this.data.plain ? color : 'white', ";");

          if (!this.data.plain) {
            // Use background instead of backgroundColor to make linear-gradient work
            style += "background: ".concat(color, ";");
          } // hide border when color is linear-gradient


          if (color.indexOf('gradient') !== -1) {
            style += 'border: 0;';
          } else {
            style += "border-color: ".concat(color, ";");
          }
        }

        if (style !== this.data.style) {
          this.setData({
            style: style
          });
        }
      }
    }
  },
  methods: {
    onClick: function onClick() {
      if (!this.data.disabled && !this.data.loading) {
        this.$emit('click');
      }
    }
  }
});