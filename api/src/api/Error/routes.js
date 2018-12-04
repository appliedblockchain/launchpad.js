'use strict'

const getError = require('./getError')

const routes = [
  {
    method: 'get',
    path: '/error',
    handler: getError
  }
]

module.exports = routes
