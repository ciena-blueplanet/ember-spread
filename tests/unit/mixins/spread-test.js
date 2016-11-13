/* jshint expr:true */
import { expect } from 'chai';
import {
  describe,
  it
} from 'mocha';
import Ember from 'ember';
import SpreadMixin from 'ember-spread/mixins/spread';

describe('SpreadMixin', function() {
  // Replace this with your real tests.
  it('works', function() {
    let SpreadObject = Ember.Object.extend(SpreadMixin);
    let subject = SpreadObject.create();
    expect(subject).to.be.ok;
  });
});
