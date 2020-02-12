"use strict";

var _component = require('./../common/component.js');

var _transition = require('./../mixins/transition.js');

(0, _component.VantComponent)({
  classes: ['enter-class', 'enter-active-class', 'enter-to-class', 'leave-class', 'leave-active-class', 'leave-to-class'],
  mixins: [(0, _transition.transition)(true)]
});