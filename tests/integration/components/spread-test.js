import Ember from 'ember'
import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import {describeComponent, it} from 'ember-mocha'
import hbs from 'htmlbars-inline-precompile'
import {beforeEach, describe} from 'mocha'
import sinon from 'sinon'
import SpreadMixin from 'ember-spread'

import {integration} from 'dummy/tests/helpers/ember-test-utils/describe-component'

describeComponent(...integration('spread'), function () {
  let handler

  beforeEach(function () {
    initializeHook()

    this.registry.register('component:spread-test', Ember.Component.extend(SpreadMixin, {

      // == Properties ============================================================

      hook: 'spread-test',
      layout: hbs`
        <div data-test={{hook 'spread-property'}}>
          {{property}}
        </div>
      `,

      // == Actions ===============================================================

      click () {
        this.onClick()
      }
    }))

    handler = sinon.spy()
  })

  describe('when using the default (options) spread property', function () {
    beforeEach(function () {
      this.setProperties({
        options: {
          property: 'Neat',
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
      expect($hook('spread-property').text().trim()).to.equal('Neat')
    })

    it('should bind spread functions as local functions', function () {
      $hook('spread-test').click()

      expect(handler).to.have.callCount(1)
    })

    it('should update local properties when the source property changes', function () {
      this.set('options.property', 'Woah')

      expect($hook('spread-property').text().trim()).to.equal('Woah')
    })
  })

  describe('when using a custom spread property', function () {
    beforeEach(function () {
      this.setProperties({
        options: {
          property: 'Neat',
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
      expect($hook('spread-property').text().trim()).to.equal('Neat')
    })

    it('should bind spread functions as local functions', function () {
      $hook('spread-test').click()

      expect(handler).to.have.callCount(1)
    })

    it('should update local properties when the source property changes', function () {
      this.set('options.property', 'Woah')

      expect($hook('spread-property').text().trim()).to.equal('Woah')
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

      it('should bind new source properties as local properties', function () {
        this.set('options.property', 'Crazy')

        expect($hook('spread-property').text().trim()).to.equal('Crazy')
      })

      it('should bind new source functions as local functions', function () {
        this.set('options.onClick', handler)

        $hook('spread-test').click()

        expect(handler).to.have.callCount(1)
      })

      it('should update new local properties when the source property changes', function () {
        this.set('options.property', 'Crazy')

        expect($hook('spread-property').text().trim()).to.equal('Crazy')

        this.set('options.property', 'Booya')

        expect($hook('spread-property').text().trim()).to.equal('Booya')
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

      it('should bind new source properties as local properties', function () {
        this.set('options.property', 'Crazy')

        expect($hook('spread-property').text().trim()).to.equal('Crazy')
      })

      it('should bind new source functions as local functions', function () {
        this.set('options.onClick', handler)

        $hook('spread-test').click()

        expect(handler).to.have.callCount(1)
      })

      it('should update new local properties when the source property changes', function () {
        this.set('options.property', 'Crazy')

        expect($hook('spread-property').text().trim()).to.equal('Crazy')

        this.set('options.property', 'Booya')

        expect($hook('spread-property').text().trim()).to.equal('Booya')
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
        expect(this.get('options._spreadListeners').length).to.equal(2)

        this.set('condition', false)

        expect(this.get('options._spreadListeners').length).to.equal(1)
      })
    })
  })
})
