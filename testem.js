/* eslint-env node */
var Reporter = require('ember-test-utils/reporter')

module.exports = {
  disable_watching: true,
  framework: 'mocha',
  launch_in_ci: [
    'Chrome',
    'Firefox'
  ],
  launch_in_dev: [
    'Chrome'
  ],
  reporter: new Reporter(),
  test_page: 'tests/index.html?hidepassed'
}
