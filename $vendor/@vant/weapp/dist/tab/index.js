"use strict";

var _component = require('./../common/component.js');

(0, _component.VantComponent)({
  relation: {
    name: 'tabs',
    type: 'ancestor',
    linked: function linked(target) {
      this.parent = target;
    },
    unlinked: function unlinked() {
      this.parent = null;
    }
  },
  props: {
    dot: {
      type: Boolean,
      observer: 'update'
    },
    info: {
      type: null,
      observer: 'update'
    },
    title: {
      type: String,
      observer: 'update'
    },
    disabled: {
      type: Boolean,
      observer: 'update'
    },
    titleStyle: {
      type: String,
      observer: 'update'
    },
    name: {
      type: [Number, String],
      value: ''
    }
  },
  data: {
    active: false
  },
  methods: {
    getComputedName: function getComputedName() {
      if (this.data.name !== '') {
        return this.data.name;
      }

      return this.index;
    },
    updateRender: function updateRender(active, parent) {
      var parentData = parent.data;
      this.inited = this.inited || active;
      this.setData({
        active: active,
        shouldRender: this.inited || !parentData.lazyRender,
        shouldShow: active || parentData.animated
      });
    },
    update: function update() {
      if (this.parent) {
        this.parent.updateTabs();
      }
    }
  }
});