[ci-img]: https://img.shields.io/travis/ciena-blueplanet/ember-spread.svg "Travis CI Build Status"
[ci-url]: https://travis-ci.org/ciena-blueplanet/ember-spread

[cov-img]: https://img.shields.io/coveralls/ciena-blueplanet/ember-spread.svg "Coveralls Code Coverage"
[cov-url]: https://coveralls.io/github/ciena-blueplanet/ember-spread

[npm-img]: https://img.shields.io/npm/v/ember-spread.svg "NPM Version"
[npm-url]: https://www.npmjs.com/package/ember-spread

[ember-observer-badge]: http://emberobserver.com/badges/ember-spread.svg "Ember Observer score"
[ember-observer-badge-url]: http://emberobserver.com/addons/ember-spread

[ember-img]: https://img.shields.io/badge/ember-2.3+-orange.svg "Ember 1.13+"

[bithound-img]: https://www.bithound.io/github/ciena-blueplanet/ember-spread/badges/score.svg "bitHound"
[bithound-url]: https://www.bithound.io/github/ciena-blueplanet/ember-spread

# ember-spread

Dynamic options for dynamic components

###### Dependencies

![Ember][ember-img]
[![NPM][npm-img]][npm-url]

###### Health

[![Travis][ci-img]][ci-url]
[![Coveralls][cov-img]][cov-url]

###### Security

[![bitHound][bithound-img]][bithound-url]

###### Ember Observer score
[![EmberObserver][ember-observer-badge]][ember-observer-badge-url]

## Installation
```
ember install ember-spread
```

## Details

A mixin that can be used to [`spread`](https://sebmarkbage.github.io/ecmascript-rest-spread/) a property object
against the top level of a component.  Spread allows a component helper to be used without knowing the properties
the target component will require.

E.g.

```
{{component fooComponent
  options=fooOptions
}}
```

Those options are then flattened onto the target component and observed as normal attributes on the component.
So if `fooComponent` was `my-button` and `fooOptions` was { biz: 'baz' } the above would be the equivalent of:

```
{{my-button
  biz='baz'
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

* The spread function operates based on the init lifecycle hook, so be sure to call `this._super(...arguments)` if
  your component also uses that hook
* Spread only acts on an object hash (the `hash` helper can be used)
* `options` is the default property that will be spread
* If you need to customize the target property you can set the target using the `spreadOptions` property, i.e.

```
{{component-foo
  baz=bar
  spreadOptions=(hash
    property='baz'
  )
}}
```

* If you need completely dynamic properties (added to the hash after instantiation) this can be accomplished
  by providing a source object and property to observe for property additions

```
{{component-foo
  options=foo
  spreadOptions=(hash
    source=(hash
      object=this
      property='foo'
    )
  )
}}
```
