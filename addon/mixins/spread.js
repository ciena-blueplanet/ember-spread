import Ember from 'ember'
const {
  Mixin,
  assert,
  computed: {
    readOnly
  },
  defineProperty,
  get,
  getWithDefault,
  isNone,
  isPresent,
  set,
   typeOf
} = Ember
const {keys} = Object

export default Mixin.create({
  init () {
    this._super(...arguments)

    const spreadProperty = getWithDefault(this, 'spreadOptions.property') || 'options'
    const options = get(this, `attrs.${spreadProperty}`)
    if (isPresent(options)) {
      assert(`${spreadProperty} requires a hash parameter`, typeOf(options) === 'object')
      keys(get(this, spreadProperty)).forEach((key) => {
        const value = get(this, spreadProperty)[key]
        if (typeOf(value) === 'function') {
          set(this, key, value)
          return
        }
        defineProperty(this, key, readOnly(`${spreadProperty}.${key}`))
      })

      const spreadContext = get(this, 'spreadOptions.context')
      const spreadSource = get(this, 'spreadOptions.source')
      if (isPresent(spreadContext) && isPresent(spreadSource)) {
        assert('The spread context must be a class instance', typeOf(spreadContext) === 'instance')
        assert('The spread source must be a string', typeOf(spreadSource) === 'string')

        const spreadListeners = get(spreadContext, `${spreadSource}._spreadListeners`)
        if (isNone(spreadListeners)) {
          get(spreadContext, spreadSource).set('_spreadListeners', [this])
        } else {
          spreadListeners.push(this)
        }

        defineProperty(get(spreadContext, spreadSource), '_spreadListeners', [])
        defineProperty(get(spreadContext, spreadSource), 'setUnknownProperty', undefined,
          function (key, value) {
            this[key] = value
            this._spreadListeners.forEach(listener => {
              defineProperty(listener, key, readOnly(`${spreadProperty}.${key}`))
            })
            spreadContext.get(spreadSource).notifyPropertyChange(key)
          }
        )
      }
    }
  },

  willDestroy () {
    const spreadContext = get(this, 'spreadOptions.context')
    const spreadSource = get(this, 'spreadOptions.source')
    if (isPresent(spreadContext) && isPresent(spreadSource)) {
      assert('The spread context must be a class instance', typeOf(spreadContext) === 'instance')
      assert('The spread source must be a string', typeOf(spreadSource) === 'string')

      const spreadListeners = get(spreadContext, `${spreadSource}._spreadListeners`)
      if (isPresent(spreadListeners)) {
        spreadListeners.splice(spreadListeners.indexOf(this), 1)
      }
    }
  }
})
