'use strict'

const koaRouter = require('koa-joi-router')
const health = require('./health')
const store = require('./store')

const router = koaRouter()
const routes = [
  ...health,
  ...store
]
console.log('routes', routes)
router.route(routes)
router.prefix('/api')

module.exports = {
  middleware: router.middleware(),
  routes
}
