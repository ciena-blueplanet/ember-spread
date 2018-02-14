module.exports = {
  coverageEnvVar: 'COVERAGE',
  coverageFolder: 'coverage',
  excludes: [
    '**/dummy/**/*',
    '**/mirage/**/*',
    '**/polyfills/**/*'
  ],
  useBabelInstrumenter: true,
  reporters: [
    'html',
    'json-summary',
    'lcov',
    'text-summary'
  ]
}
