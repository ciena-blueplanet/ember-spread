import {expect} from 'chai'
import Ember from 'ember'
const {Component, computed} = Ember
import {$hook, initialize as initializeHook} from 'ember-hook'
import {setupComponentTest} from 'ember-mocha'
import SpreadMixin from 'ember-spread'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe, it} from 'mocha'

import sinon from 'sinon'

const SpreadComponent = Component.extend(SpreadMixin, {
  // == Properties ============================================================

  mergedProperties: ['mergedProperty'],
  classNames: 'base-class',
  hook: 'spreadTest',
  layout: hbs`
    <div data-test={{hook 'spreadProperty'}}>
      {{property}}
    </div>
    <div data-test={{hook 'mergedProperty'}}>
      {{mergedPropertyJson}}
    </div>
  `,
  mergedProperty: {baseValue: true},
  mergedPropertyJson: computed('mergedProperty', function () {
    return JSON.stringify(this.get('mergedProperty'))
  }).readOnly(),

  // == Actions ===============================================================

  click () {
    // Note: A get is not used in this case; onClick is a function on the
    // local component, not a computed property
    this.onClick()
  }
})

describe('ember-spread', function () {
  setupComponentTest('ember-spread', {
    integration: true
  })

  let handler

  beforeEach(function () {
    initializeHook()
    this.registry.register('component:spread-test', SpreadComponent)
    handler = sinon.spy()
  })

  describe('when using the default (options) spread property', function () {
    beforeEach(function () {
      this.setProperties({
        options: {
          tagName: 'span',
          elementId: 'test-id',
          classNames: 'test-class',
          property: 'Neat',
          mergedProperty: {testValue: true},
          onClick: handler
        }
      })

      this.render(hbs`
        {{spread-test
          options=options
        }}
      `)
    })

    it('should bind spread properties as local properties', function () {
      expect($hook('spreadProperty').text().trim()).to.equal('Neat')
    })

    it('should set static properties as plain local properties', function () {
      expect($hook('spreadTest').attr('id')).to.equal('test-id')
      expect($hook('spreadTest').prop('tagName').toLowerCase()).to.equal('span')
    })

    it('should concatenate properties, if they are listed as concatenatedProperties', function () {
      expect($hook('spreadTest').attr('class')).to.include('base-class').and.include('test-class')
    })

    it('should merge properties, if they are listed as mergedProperties', function () {
      expect($hook('mergedProperty').text()).to.include('baseValue').and.include('testValue')
    })

    it('should bind spread functions as local functions', function () {
      // Note: In the spreadTest component above the onClick function
      // is called directly without retrieving the function using `get`
      $hook('spreadTest').click()
      expect(handler).to.have.callCount(1)
    })

    describe('and a source property changes', function () {
      beforeEach(function () {
        this.set('options.property', 'Woah')
      })

      it('should update the local property', function () {
        expect($hook('spreadProperty').text().trim()).to.equal('Woah')
      })
    })
  })

  describe('when using a custom spread property', function () {
    beforeEach(function () {
      this.setProperties({
        options: {
          tagName: 'span',
          elementId: 'test-id',
          classNames: 'test-class',
          property: 'Neat',
          mergedProperty: {testValue: true},
          onClick: handler
        }
      })

      this.render(hbs`
        {{spread-test
          foo=options
          spreadOptions=(hash
            property='foo'
          )
        }}
      `)
    })

    it('should bind spread properties as local properties', function () {
      expect($hook('spreadProperty').text().trim()).to.equal('Neat')
    })

    it('should set static properties as plain local properties', function () {
      expect($hook('spreadTest').attr('id')).to.equal('test-id')
      expect($hook('spreadTest').prop('tagName').toLowerCase()).to.equal('span')
    })

    it('should concatenate properties, if they are listed as concatenatedProperties', function () {
      expect($hook('spreadTest').attr('class')).to.include('base-class').and.include('test-class')
    })

    it('should merge properties, if they are listed as mergedProperties', function () {
      expect($hook('mergedProperty').text()).to.include('baseValue').and.include('testValue')
    })

    it('should bind spread functions as local functions', function () {
      // Note: In the spreadTest component above the onClick function
      // is called directly without retrieving the function using `get`
      $hook('spreadTest').click()
      expect(handler).to.have.callCount(1)
    })

    describe('and a source property changes', function () {
      beforeEach(function () {
        this.set('options.property', 'Woah')
      })

      it('should update the local property', function () {
        expect($hook('spreadProperty').text().trim()).to.equal('Woah')
      })
    })
  })

  describe('when providing a source binding', function () {
    describe('and using the default (options) spread property', function () {
      beforeEach(function () {
        this.set('options', Ember.Object.create({}))

        this.render(hbs`
          {{spread-test
            options=options
            spreadOptions=(hash
              source=(hash
                object=this
                property='options'
              )
            )
          }}
        `)
      })

      describe('and a source property is added', function () {
        beforeEach(function () {
          this.set('options.property', 'Crazy')
        })

        it('should bind new source properties as local properties', function () {
          expect($hook('spreadProperty').text().trim()).to.equal('Crazy')
        })

        describe('and a source property changes', function () {
          beforeEach(function () {
            this.set('options.property', 'Booya')
          })

          it('should update the local property', function () {
            expect($hook('spreadProperty').text().trim()).to.equal('Booya')
          })
        })
      })

      describe('and a source function is added', function () {
        beforeEach(function () {
          this.set('options.onClick', handler)
        })

        it('should bind new source functions as local functions', function () {
          // Note: In the spreadTest component above the onClick function
          // is called directly without retrieving the function using `get`
          $hook('spreadTest').click()
          expect(handler).to.have.callCount(1)
        })
      })
    })

    describe('and using a custom spread property', function () {
      beforeEach(function () {
        this.set('options', Ember.Object.create({}))

        this.render(hbs`
          {{spread-test
            foo=options
            spreadOptions=(hash
              property='foo'
              source=(hash
                object=this
                property='options'
              )
            )
          }}
        `)
      })

      describe('and a source property is added', function () {
        beforeEach(function () {
          this.set('options.property', 'Crazy')
        })

        it('should bind new source properties as local properties', function () {
          expect($hook('spreadProperty').text().trim()).to.equal('Crazy')
        })

        describe('and a source property changes', function () {
          beforeEach(function () {
            this.set('options.property', 'Booya')
          })

          it('should update the local property', function () {
            expect($hook('spreadProperty').text().trim()).to.equal('Booya')
          })
        })
      })

      describe('and a source function is added', function () {
        beforeEach(function () {
          this.set('options.onClick', handler)
        })

        it('should bind new source functions as local functions', function () {
          // Note: In the spreadTest component above the onClick function
          // is called directly without retrieving the function using `get`
          $hook('spreadTest').click()
          expect(handler).to.have.callCount(1)
        })
      })
    })

    describe('and the component is destroyed', function () {
      beforeEach(function () {
        this.setProperties({
          options: Ember.Object.create({}),
          condition: true
        })

        this.render(hbs`
          {{spread-test
            options=options
            spreadOptions=(hash
              source=(hash
                object=this
                property='options'
              )
            )
          }}

          {{#if condition}}
            {{spread-test
              options=options
              spreadOptions=(hash
                source=(hash
                  object=this
                  property='options'
                )
              )
            }}
          {{/if}}
        `)
      })

      it('should clean up the source property listener', function () {
        expect(this.get('options._spreadListeners')).to.have.lengthOf(2)
        this.set('condition', false)
        expect(this.get('options._spreadListeners')).to.have.lengthOf(1)
      })
    })
  })
})
