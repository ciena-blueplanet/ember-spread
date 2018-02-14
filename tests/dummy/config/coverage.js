module.exports = {
  coverageEnvVar: 'COVERAGE',
  coverageFolder: 'coverage',
  excludes: [
    '**/dummy/**/*'
  ],
  useBabelInstrumenter: true,
  reporters: [
    'html',
    'json-summary',
    'lcov',
    'text-summary'
  ]
}
