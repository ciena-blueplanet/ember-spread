/**
 * ember-spread mixin
 *
 * Spreads the properties from a source object against the root level of the local object
 */

import Ember from 'ember'
const {Mixin, assert, computed, defineProperty, get, isArray, isNone, makeArray, typeOf} = Ember
const {assign, keys} = Object
import {PropTypes} from 'ember-prop-types'

// Constants
const SPREAD_PROPERTY = 'options'

export default Mixin.create({

  // == Dependencies ==========================================================

  // == Properties ============================================================

  propTypes: {
    // Keywords

    // Options
    options: PropTypes.oneOfType([
      PropTypes.EmberObject,
      PropTypes.object
    ]),
    spreadOptions: PropTypes.shape({
      property: PropTypes.string,
      source: PropTypes.shape({
        object: PropTypes.EmberObject.isRequired,
        property: PropTypes.string.isRequired
      })
    })

    // State
  },

  // == Computed Properties ===================================================

  // == Functions =============================================================

  /**
   * Ember objects have a hook for dealing with previously undefined properties
   * which allows these properties to be brought into the observer system on-the-fly.
   *
   * Sets this object as a listener for any unknown property additions.
   *
   * @param {object} sourceObject - the source object for the spread
   * @param {string} sourceProperty - the source property for the spread
   * @param {string} spreadProperty - the locally bound property for the spread
   */
  _defineSourceListener (sourceObject, sourceProperty, spreadProperty) {
    // Get or create the array of spread listeners on the source object and add this object
    const spreadListeners = get(sourceObject, `${sourceProperty}._spreadListeners`)
    if (isNone(spreadListeners)) {
      get(sourceObject, sourceProperty).set('_spreadListeners', [
        {
          targetObject: this,
          targetProperty: spreadProperty
        }
      ])
    } else {
      spreadListeners.push({
        targetObject: this,
        targetProperty: spreadProperty
      })
    }

    // Define the setUnknownProperty function on the source property so that we can
    // monitor for the addition of new properties and spread them onto the local object
    defineProperty(get(sourceObject, sourceProperty), 'setUnknownProperty', undefined,
      function (key, value) {
        // Set the property to the given value (the expected normal behavior)
        this[key] = value

        // For each listening target object (registered via spread options)
        // spread the new property onto the target object
        this._spreadListeners.forEach(listener => {
          if (typeOf(value) === 'function') {
            listener.targetObject.set(key, value)
          } else {
            defineProperty(listener.targetObject, key,
              computed.readOnly(`${listener.targetProperty}.${key}`)
            )
          }
        })

        // Notify all downstream listeners that the property has changed.
        // This triggers the first observation of the property for the newly
        // defined computed property on the target object(s)
        sourceObject.get(sourceProperty).notifyPropertyChange(key)
      }
    )
  },

  /**
   * Create local properties for each property in the spread hash.
   * Functions are set directly against the local object. Properties listed in
   * the component's `concatenatedProperties` or `mergedProperties` are
   * concatenated / merged appropriately.
   *
   * Note: These properties are not observed for changes.
   *
   * All other properties are readOnly computed properties to retain
   * observer behavior.
   *
   * Note: We're currently using the private Ember defineProperty function
   * which is required to establish observer chains (accept computed properties)
   *
   * @param {string} spreadProperty - the name of the local property containing the hash
   * @param {object} spreadableHash - the hash to spread
   * @param {string[]} staticProperties - properties that are not set up as an alias
   */
  _defineSpreadProperties (spreadProperty, spreadableHash, staticProperties = ['tagName', 'elementId']) {
    assert(
      `${spreadProperty} requires an Ember object or primitive object`,
      ['instance', 'object'].includes(typeOf(spreadableHash))
    )

    const concatenatedProperties = this.get('concatenatedProperties')
    const mergedProperties = this.get('mergedProperties')

    // NOTE: disabled linting rule to stay as close as possible to Ember core's code
    // eslint-disable-next-line complexity
    keys(spreadableHash).forEach((key) => {
      const value = spreadableHash[key]

      if (staticProperties.includes(key) || typeOf(value) === 'function') {
        this.set(key, value)
        return
      }

      // Based on
      // https://github.com/emberjs/ember.js/blob/v2.12.0/packages/ember-runtime/lib/system/core_object.js#L127-L141
      if (Array.isArray(concatenatedProperties) && concatenatedProperties.indexOf(key) !== -1) {
        const baseValue = this[key]

        if (!baseValue) {
          this.set(key, makeArray(value))
        } else if (typeof baseValue.concat === 'function') {
          this.set(key, baseValue.concat(value))
        } else {
          this.set(key, makeArray(baseValue).concat(value))
        }

        return
      }

      // Based on
      // https://github.com/emberjs/ember.js/blob/v2.12.0/packages/ember-runtime/lib/system/core_object.js#L143-L149
      if (Array.isArray(mergedProperties) && mergedProperties.indexOf(key) !== -1) {
        const originalValue = this[key]

        if (typeOf(value) === 'object') {
          if (typeOf(originalValue) === 'object') {
            this.set(key, assign({}, originalValue, value))
          } else {
            this.set(key, assign({}, value))
          }
        }

        return
      }

      defineProperty(this, key, computed.readOnly(`${spreadProperty}.${key}`))
    })
  },

  /**
   * Get the source object and property for the spread hash
   *
   * @returns {object} - the source object and property for the spread hash
   */
  _getSourceContext () {
    return {
      sourceObject: this.get('spreadOptions.source.object'),
      sourceProperty: this.get('spreadOptions.source.property')
    }
  },

  /**
   * @param {object} listener - a listener object for setUnknownProperty
   * @returns {boolean} - true if the given listener came from this object
   */
  _isLocalListener (listener) {
    return listener.targetObject === this
  },

  // == Ember Lifecycle Hooks =================================================

  init () {
    this._super(...arguments)

    // Get the spreadable hash
    const spreadProperty = this.get('spreadOptions.property') || SPREAD_PROPERTY
    const spreadableHash = this.get(spreadProperty)
    if (isNone(spreadableHash)) {
      return
    }

    // Spread the properties in the hash onto the local object
    this._defineSpreadProperties(spreadProperty, spreadableHash)

    // The above spread only works on properties that were defined on the
    // hash when it was passed to this context.  However, if we add a listener
    // to the original object hash in the original context then we can determine
    // when a new property is added and define a property in this context on-the-fly
    const {sourceObject, sourceProperty} = this._getSourceContext()
    if (isNone(sourceObject) || isNone(sourceProperty)) {
      return
    }

    // Define a listener for any new properties on the source property
    this._defineSourceListener(sourceObject, sourceProperty, spreadProperty)
  },

  willDestroy () {
    this._super(...arguments)

    const {sourceObject, sourceProperty} = this._getSourceContext()
    if (isNone(sourceObject) || isNone(sourceProperty)) {
      return
    }

    const spreadListeners = get(sourceObject, `${sourceProperty}._spreadListeners`)

    // Remove this listener from the source object property
    if (isArray(spreadListeners)) {
      spreadListeners.splice(spreadListeners.findIndex(this._isLocalListener), 1)
    }
  }

  // == DOM Events ============================================================

  // == Actions ===============================================================

})
