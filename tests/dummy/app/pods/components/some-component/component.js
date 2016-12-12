import Ember from 'ember'
import layout from './template'
import SpreadMixin from 'ember-spread'

export default Ember.Component.extend(SpreadMixin, {
  layout,

  click () {
    this.onClick('bar')
  }
})
