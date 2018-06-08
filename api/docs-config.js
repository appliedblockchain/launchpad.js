'use strict'

var packageJson = require('../package.json')

const { version, name } = packageJson

module.exports = (routes) => ({
  title: name,
  version,
  theme: 'darkly',
  routeHandlers: 'disabled',
  groups: [
    { groupName: '/api', routes }
  ]
})
