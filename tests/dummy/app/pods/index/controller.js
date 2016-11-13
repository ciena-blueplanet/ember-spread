import Ember from 'ember'

export default Ember.Controller.extend({
  // BEGIN-SNIPPET dot-options
  dotOptions: Ember.Object.create({
    size: 20,
    speak: 'None of my shirts fit...'
  }),
  // END-SNIPPET

  // BEGIN-SNIPPET were-options
  wereShape: 'normal-dot',
  wereOptions: Ember.Object.create({
    size: 40,
    speak: 'This is getting ridiculous...'
  }),
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
        this.set('wereOptions.speak', 'This is getting ridiculous...')
      } else {
        this.set('wereOptions.size', 60)
        this.set('wereOptions.color', 'red')
        this.set('wereOptions.speak', '...and when did I change color?')
      }
    },
    // END-SNIPPET

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

    haunt () {
      if (this.get('hauntShape') === 'were-triangle') {
        this.set('hauntShape', 'normal-dot')
        this.set('hauntOptions.speak', null)
      } else {
        this.set('hauntShape', 'were-triangle')
        this.set('hauntOptions.speak', '01100111 01110010 01101111 01110111 01101100')
      }
    }
  }
})
