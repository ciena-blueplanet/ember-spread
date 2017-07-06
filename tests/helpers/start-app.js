import Ember from 'ember'
const {merge, run} = Ember

import Application from '../../app'
import config from '../../config/environment'

export default function startApp (attrs) {
  let attributes = merge({}, config.APP)
  attributes = merge(attributes, attrs) // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes)
    application.setupForTesting()
    application.injectTestHelpers()
    return application
  })
}
