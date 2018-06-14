'use strict'

const koaRouter = require('koa-joi-router')
const health = require('./health')
const store = require('./store')

const router = koaRouter()
const routes = [
  ...health,
  ...store
]

router.route(routes)
router.prefix('/api')

module.exports = {
  middleware: router.middleware(),
  routes
}
