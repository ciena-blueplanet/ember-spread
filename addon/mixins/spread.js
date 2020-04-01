/**
 * ember-spread mixin
 *
 * Spreads the properties from a source object against the root level of the local object
 */

import {makeArray} from '@ember/array'
import {assert} from '@ember/debug'
import {defineProperty} from '@ember/object'
import {readOnly} from '@ember/object/computed'
import Mixin from '@ember/object/mixin'
import {isNone, typeOf} from '@ember/utils'
const {assign, keys} = Object
import {PropTypes} from 'ember-prop-types'

// Constants
const SPREAD_PROPERTY = 'options'
// Reserved keys used by spread on source property
const EXCLUDED_PROPERTIES = ['setUnknownProperty', '_spreadListeners']

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
        object: PropTypes.oneOfType([
          PropTypes.EmberObject,
          PropTypes.object
        ]),
        property: PropTypes.string.isRequired
      })
    })

    // State
  },

  // == Functions =============================================================
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

    const concatenatedProperties = this.concatenatedProperties
    const mergedProperties = this.mergedProperties

    // NOTE: disabled linting rule to stay as close as possible to Ember core's code
    // eslint-disable-next-line complexity
    keys(spreadableHash).forEach((key) => {
      if (EXCLUDED_PROPERTIES.includes(key)) {
        return
      }

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
        this.notifyPropertyChange(`${key}`)
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
        this.notifyPropertyChange(`${key}`)
        return
      }
      defineProperty(this, key, readOnly(`${spreadProperty}.${key}`))
      this.notifyPropertyChange(`${key}`)
    })
  },

  /**
   * Reset local properties to undefined for each property in the spread hash to break the observer.
   * Properties listed in the component's `concatenatedProperties` or `mergedProperties`
   * are remain untouched.
   *
   * All other readOnly computed properties properties are being reset to undefined.
   *
   * Note: We're currently using the private Ember defineProperty function
   * which is required to establish observer chains (accept computed properties)
   *
   */
  _resetSpreadProperties () {
    const staticProperties = ['tagName', 'elementId']
    const concatenatedProperties = this.concatenatedProperties || makeArray()
    const mergedProperties = this.mergedProperties || makeArray()
    const spreadProperties = this.get('_spreadProperties')

    if (isNone(spreadProperties)) {
      return
    }

    spreadProperties.forEach(key => {
      // We don't reset tagName, elementId, concatenatedProperties and
      // mergedProperties as we won't support change them on the fly.
      if (staticProperties.includes(key) ||
        concatenatedProperties.includes(key) ||
        mergedProperties.includes(key)
      ) {
        return
      }

      // As user has replaced/reset the spreadable property on source object, we are
      // going to remove all registered computed properties.
      defineProperty(this, key, undefined, undefined)
    })
    this.set('_spreadProperties', new Set())
  },

  // == Ember Lifecycle Hooks =================================================
  init () {
    this._super(...arguments)
    const {propertyPath, spreadSource} = this._getSpreadSource()
    if (spreadSource) {
      const spreadProperties = new Set(Object.keys(spreadSource))
      this.set('_spreadProperties', spreadProperties)
      this._addSetUnsupportedProperty(propertyPath)
      this._defineSpreadProperties(propertyPath, spreadSource)
    }

    this.addObserver(propertyPath, this, this._sourceChangeObserverHandler)
  },

  /**
   * return an object that has the source object that needs to be spread onto current
   * component and the path to the source relative to the current object.
   * @returns {{spreadSource: object, propertyPath: string}} a hash with spread source reference and its path.
   * @private
   */
  _getSpreadSource () {
    // Get the source of  spreadable hash, can be either
    // this.options (default) OR
    // this.${spreadOptions.property} (custom)
    // spreadOptions.source.object.${spreadOptions.source.property} (with dynamic properties)
    let propertyPath = this.get('spreadOptions.property') || SPREAD_PROPERTY
    if (this.get('spreadOptions.source.object')) {
      const pathSuffix = this.get('spreadOptions.source.property') || SPREAD_PROPERTY
      propertyPath = `spreadOptions.source.object.${pathSuffix}`
    }
    return {
      propertyPath,
      spreadSource: this.get(propertyPath)
    }
  },

  /**
   * Adding {@code setUnknownProperty} to the spread source object if it does not have it
   * in order to be able to detect addition of properties in the spread source object.
   * @param {string} spreadPropertyPath - path to the spread source object (relative to current component)
   * @private
   */
  _addSetUnsupportedProperty (spreadPropertyPath) {
    const spreadSource = this.get(`${spreadPropertyPath}`)
    spreadSource.setUnknownProperty = (key, value) => {
      spreadSource[key] = value
      this._defineSpreadProperties(spreadPropertyPath, {
        [`${key}`]: value
      })
      this.get('_spreadProperties').add(key)
    }
  },

  /**
   * observer to detect changes in the spread source reference so that we can update
   * spread properties
   * @private
   */
  _sourceChangeObserverHandler () {
    const {propertyPath, spreadSource} = this._getSpreadSource()
    if (spreadSource === undefined) {
      this._resetSpreadProperties()
    } else if (spreadSource.setUnknownProperty === undefined) {
      this._resetSpreadProperties()
      this._addSetUnsupportedProperty(propertyPath)
    }
    if (spreadSource) {
      this._defineSpreadProperties(propertyPath, spreadSource)
    }
  },

  willDestroy () {
    this._super(...arguments)
    this._resetSpreadProperties()
    this.set('_spreadProperties', undefined)
    const {propertyPath} = this._getSpreadSource()
    this.removeObserver(propertyPath, this, this._sourceChangeObserverHandler)
  }

  // == DOM Events ============================================================

  // == Actions ===============================================================
})
