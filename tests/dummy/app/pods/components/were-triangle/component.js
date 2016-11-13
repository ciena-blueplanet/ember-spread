import Ember from 'ember'
import layout from './template'
// BEGIN-SNIPPET mixin
import SpreadMixin from 'ember-spread'

export default Ember.Component.extend(SpreadMixin, {
// END-SNIPPET
  classNames: ['were-triangle'],
  layout,

  canvasSize: Ember.computed('size', function () {
    return Number(this.get('size')) * 2
  })
})
