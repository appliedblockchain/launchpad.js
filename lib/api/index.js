'use strict'

const koaRouter = require('koa-joi-router')
const health = require('./health')

const router = koaRouter()
const routes = [
  ...health
]

router.route(routes)
router.prefix('/api')

module.exports = {
  middleware: router.middleware(),
  routes
}
