'use strict'

const rootHandler = require('./handlers/rootHandler')

const routes = [
  {
    method: 'get',
    path: '/',
    handler: rootHandler
  }
]

module.exports = routes
