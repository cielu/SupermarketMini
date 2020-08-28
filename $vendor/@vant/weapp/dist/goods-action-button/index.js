"use strict";

var _component = require('./../common/component.js');

var _link = require('./../mixins/link.js');

var _button = require('./../mixins/button.js');

var _openType = require('./../mixins/open-type.js');

(0, _component.VantComponent)({
  mixins: [_link.link, _button.button, _openType.openType],
  relation: {
    type: 'ancestor',
    name: 'goods-action',
    current: 'goods-action-button'
  },
  props: {
    text: String,
    color: String,
    loading: Boolean,
    disabled: Boolean,
    plain: Boolean,
    type: {
      type: String,
      value: 'danger'
    }
  },
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event.detail);
      this.jumpLink();
    },
    updateStyle: function updateStyle() {
      if (this.parent == null) {
        return;
      }

      var _this$parent$children = this.parent.children,
          children = _this$parent$children === void 0 ? [] : _this$parent$children;
      var length = children.length;
      var index = children.indexOf(this);
      this.setData({
        isFirst: index === 0,
        isLast: index === length - 1
      });
    }
  }
});