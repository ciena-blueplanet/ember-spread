import {expect} from 'chai'
import Ember from 'ember'
import SpreadMixin from 'ember-spread/mixins/spread'
import {
  describe,
  it
} from 'mocha'

describe('SpreadMixin', function () {
  // Replace this with your real tests.
  it('works', function () {
    let SpreadObject = Ember.Object.extend(SpreadMixin)
    let subject = SpreadObject.create()
    // eslint-disable-next-line no-unused-expressions
    expect(subject).to.be.ok
  })
})
