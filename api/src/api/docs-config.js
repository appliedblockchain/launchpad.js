'use strict'

const { version, name } = require('../../package.json')

module.exports = (...groups) => ({
  title: name,
  version,
  theme: 'darkly',
  routeHandlers: 'disabled',
  groups
})
