import Ember from 'ember'
const {Controller, computed} = Ember

export default Controller.extend({
  // BEGIN-SNIPPET dot-options
  dotOptions: Ember.Object.create({
    size: 20,
    speak: 'None of my shirts fit...'
  }),
  // END-SNIPPET

  // BEGIN-SNIPPET were-options
  wereShape: 'normal-dot',
  wereOptions: undefined,

  newWereOptions: Ember.Object.create({
    size: 80,
    color: 'red',
    speak: '!!!Ok, this is getting ridiculous...'
  }),
  // END-SNIPPET

  // BEGIN-SNIPPET advanced-options
  noises: ['Grunt', 'growl'],
  verbalizedNoises: computed('noises.[]', function () {
    let verbalizedNoises = ''
    this.get('noises').forEach((noise) => {
      verbalizedNoises = verbalizedNoises.concat(`${noise}...`)
    })
    return verbalizedNoises
  }).readOnly(),
  advancedOptions: computed('verbalizedNoises', function () {
    return {
      color: 'red',
      size: 60,
      speak: this.get('verbalizedNoises'),
      onClick: this.actions.moreNoises.bind(this)
    }
  }).readOnly(),
  // END-SNIPPET

  hauntShape: 'normal-dot',
  hauntOptions: Ember.Object.create({
    size: 16,
    color: 'rgb(220, 36, 46)'
  }),

  actions: {
    // BEGIN-SNIPPET change
    change () {
      if (this.get('wereOptions.color') === 'red') {
        this.set('wereOptions.size', 40)
        this.set('wereOptions.color', 'black')
        this.set('wereOptions.speak', 'Ok, this is getting ridiculous...')
      } else {
        this.set('wereOptions.size', 60)
        this.set('wereOptions.color', 'red')
        this.set('wereOptions.speak', '...and when did I change color?')
      }
    },
    // END-SNIPPET

    haunt () {
      if (this.get('hauntShape') === 'were-triangle') {
        this.set('hauntShape', 'normal-dot')
        this.set('hauntOptions.speak', null)
      } else {
        this.set('hauntShape', 'were-triangle')
        this.set('hauntOptions.speak', '01100111 01110010 01101111 01110111 01101100')
      }
    },

    // BEGIN-SNIPPET transform
    transform () {
      if (this.get('wereShape') === 'were-triangle') {
        this.set('wereShape', 'normal-dot')
        this.set('wereOptions.speak', '...and when did I change color?')
      } else {
        this.set('wereShape', 'were-triangle')
        this.set('wereOptions.speak', '...fooooooooooooobaaaaaaar...')
      }
    },
    // END-SNIPPET

    // BEGIN-SNIPPET more-noises
    moreNoises () {
      this.set('noises', ['Snarf', 'snuffle'])
    },
    // END-SNIPPET
    updateWereOptions () {
      this.set('wereOptions.color', 'red')
    },

    replaceWereOptions () {
      this.set('wereOptions', Ember.Object.create({
        size: 80,
        color: 'green',
        speak: '!!!Ok, this is getting ridiculous...'
      }))
    },

    setUndefined () {
      this.set('wereOptions', undefined)
    }
  }
})
