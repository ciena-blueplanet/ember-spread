# Ember-spread

A mixin that can be used to [`spread`](https://sebmarkbage.github.io/ecmascript-rest-spread/) a property object 
against the top level of a component.  Spread allows a component helper to be used without knowing the properties 
the target component will require.

E.g.

```
{{component fooComponent
  options=fooOptions
}}
```

or

```
{{known-component
  header=(component headerComponent
    options=headerOptions
  )
  body=(component bodyComponent
    options=bodyOptions
  )
  footer=(component footerComponent
    options=footerOptions
  )
}}
```

Data-driven scenarios will find this particularly useful, since both the component and properties can be retrieved
from an external API

## Installation

* `ember install ember-spread`

## Demo

http://ciena-blueplanet.github.io/ember-spread/

## Usage

Component
```
import SpreadMixin from 'ember-spread'

export default Ember.Component.extend(SpreadMixin, {
  ...
})
```

Template instance
```
{{component-foo
  options=bar
}}
```

* The spread function operates based on the didReceiveAttrs lifecycle hook, so be sure to call `this._super(...arguments)` if
  your component also uses that hook
* Spread only acts on an object hash (the `hash` helper can be used)
* `options` is the default property that will be spread
* If you need to customize the target property you can set the target using the `spread` property, i.e.

```
{{component-foo
  baz=bar
  spread='baz'
}}
```
