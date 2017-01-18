import Ember from 'ember'
const {Component, computed} = Ember

import layout from './template'
// BEGIN-SNIPPET mixin
import SpreadMixin from 'ember-spread'

export default Component.extend(SpreadMixin, {
// END-SNIPPET
  classNames: ['were-triangle'],
  layout,

  canvasSize: computed('size', function () {
    return Number(this.get('size')) * 2
  }).readOnly()
})
