import Component from '@ember/component'
import EmberObject, {computed} from '@ember/object'
import {expect} from 'chai'
import {$hook, initialize as initializeHook} from 'ember-hook'
import SpreadMixin from 'ember-spread'
import {integration} from 'ember-test-utils/test-support/setup-component-test'
import hbs from 'htmlbars-inline-precompile'
import {afterEach, beforeEach, describe, it} from 'mocha'

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
    <div data-test={{hook 'spreadAnotherProperty'}}>
      {{anotherProperty}}
    </div>
    <div data-test={{hook 'mergedProperty'}}>
      {{mergedPropertyJson}}
    </div>
  `,
  mergedProperty: {baseValue: true},
  mergedPropertyJson: computed('mergedProperty', function () {
    return JSON.stringify(this.mergedProperty)
  }).readOnly(),

  // == Actions ===============================================================

  click () {
    // Note: A get is not used in this case; onClick is a function on the
    // local component, not a computed property
    this.onClick()
  }
})

const test = integration('ember-spread')

describe(test.label, function () {
  test.setup()

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
    describe('standard usage', function () {
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

    describe('dynamic property in custom spread property', function () {
      beforeEach(function () {
        this.setProperties({
          options: {
            tagName: 'span',
            elementId: 'test-id',
            classNames: 'test-class',
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

      it('should display rendered value when property is replaced', function () {
        this.set('options.property', 'Hoth')
        expect($hook('spreadProperty').text().trim()).to.equal('Hoth')
      })

      it('should display rendered value with source is replaced', function () {
        this.set('options', {
          property: 'Hoth2'
        })
        expect($hook('spreadProperty').text().trim()).to.equal('Hoth2')
      })
    })
  })

  describe('when providing a source binding', function () {
    describe('and using the default (options) spread property', function () {
      beforeEach(function () {
        this.set('options', EmberObject.create({}))

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
        this.set('options', EmberObject.create({}))

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
  })

  describe('when providing source binding and source property is empty object', function () {
    beforeEach(function () {
      this.set('options', EmberObject.create({}))

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

    afterEach(function () {
      this.set('options', undefined)
    })

    describe('and source property is replaced by an empty object', function () {
      beforeEach(function () {
        this.set('options', EmberObject.create({}))
      })

      describe('and source property is replaced by a new object', function () {
        beforeEach(function () {
          this.set('options', EmberObject.create({
            property: 'foo'
          }))
        })

        it('should update the local property', function () {
          expect($hook('spreadProperty').text().trim()).to.equal('foo')
        })
      })
    })

    describe('and source property is replaced by a new object', function () {
      beforeEach(function () {
        this.set('options', EmberObject.create({
          property: 'foo'
        }))
      })

      it('should update the local property', function () {
        expect($hook('spreadProperty').text().trim()).to.equal('foo')
      })
    })
  })

  describe('when providing source binding and source property is undefined', function () {
    beforeEach(function () {
      this.set('options', undefined)

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

    afterEach(function () {
      this.set('options', undefined)
    })

    describe('and source property is replaced by an new object', function () {
      beforeEach(function () {
        this.set('options', EmberObject.create({
          property: 'foo'
        }))
      })

      it('should bind listener to source property', function () {
        expect($hook('spreadProperty').text().trim()).to.equal('foo')
      })

      describe('and source property is replaced by an empty object', function () {
        beforeEach(function () {
          this.set('options', EmberObject.create({}))
        })

        it('should empty the rendered value', function () {
          expect($hook('spreadProperty').text().trim()).to.equal('')
        })
      })
    })
  })

  describe('when providing source binding and source property is an object', function () {
    beforeEach(function () {
      this.set('options', EmberObject.create({
        property: 'foo'
      }))

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

    afterEach(function () {
      this.set('options', undefined)
    })

    it('should render the local property', function () {
      expect($hook('spreadProperty').text().trim()).to.equal('foo')
    })

    describe('and source property is replaced by a new object with old key', function () {
      beforeEach(function () {
        this.set('options', EmberObject.create({
          property: 'bar'
        }))
      })

      it('should update the local property', function () {
        expect($hook('spreadProperty').text().trim()).to.equal('bar')
      })
    })

    describe('and source property is replaced by a new object with out old key', function () {
      beforeEach(function () {
        this.set('options', EmberObject.create({
          anotherProperty: 'foo'
        }))
      })

      it('should update the local property', function () {
        expect($hook('spreadAnotherProperty').text().trim()).to.equal('foo')
      })
    })

    describe('and source property is replaced by a new object with both old key and new key', function () {
      beforeEach(function () {
        this.set('options', EmberObject.create({
          anotherProperty: 'foo',
          property: 'bar'
        }))
      })

      it('should render proper value for property and anotherProperty', function () {
        expect($hook('spreadAnotherProperty').text().trim()).to.equal('foo')
        expect($hook('spreadProperty').text().trim()).to.equal('bar')
      })
    })

    describe('and source property is replaced by undefined', function () {
      beforeEach(function () {
        this.set('options', undefined)
      })

      it('should remove listener and watcher on source property', function () {
        expect(this.options).to.equal(undefined)
      })

      describe('and source property is replaced by a new object', function () {
        beforeEach(function () {
          this.set('options', EmberObject.create({
            anotherProperty: 'foo',
            property: 'bar'
          }))
        })

        it('should render proper value for property and anotherProperty', function () {
          expect($hook('spreadAnotherProperty').text().trim()).to.equal('foo')
          expect($hook('spreadProperty').text().trim()).to.equal('bar')
        })
      })
    })
  })

  describe('when removing previous set property', function () {
    beforeEach(function () {
      this.setProperties({
        options: {
          property: 'Neat'
        }
      })

      this.render(hbs`
        {{spread-test
          options=options
        }}
      `)
    })

    it('should empty the displayed value', function () {
      this.setProperties({
        options: {}
      })
      expect($hook('spreadProperty').text().trim()).to.equal('')
    })
  })

  describe('when adding dynamic property in default spread (options)', function () {
    beforeEach(function () {
      this.setProperties({
        options: {}
      })

      this.render(hbs`
        {{spread-test
          options=options
        }}
      `)
    })

    it('should bind spread properties as local properties', function () {
      this.set('options', {
        property: 'Sweet'
      })
      expect($hook('spreadProperty').text().trim()).to.equal('Sweet')
    })

    describe('when modify dynamic property once again', function () {
      beforeEach(function () {
        this.set('options.property', 'ABC')
      })
      it('should update the rendered value', function () {
        expect($hook('spreadProperty').text().trim()).to.equal('ABC')
      })
    })
  })
})
