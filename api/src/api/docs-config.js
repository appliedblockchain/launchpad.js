'use strict'

const { version, name } = require('../../package.json')

module.exports = (routes) => ({
  title: name,
  version,
  theme: 'darkly',
  routeHandlers: 'disabled',
  groups: [
    { groupName: '/api', routes }
  ]
})
