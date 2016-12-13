/* jshint node:true*/
/* global require, module */
var EmberAddon = require('ember-cli/lib/broccoli/ember-addon')

module.exports = function (defaults) {
  var app = new EmberAddon(defaults, {
    'ember-cli-mocha': {
      useLintTree: false
    },
    snippetSearchPaths: ['tests/dummy/app']
  })

  if (app.env === 'test') {
    ;[
      'bower_components/sinon-chai/lib/sinon-chai.js',
      'bower_components/chai-jquery/chai-jquery.js'
    ].forEach((path) => {
      app.import(path, {type: 'test'})
    })
  }

  return app.toTree()
}
