'use strict'

const router = require('koa-joi-router')
const health = require('./health')

const rootRouter = router()

const routes = [
  ...health
]

rootRouter.route(routes)
rootRouter.prefix('/api')

module.exports = {
  middleware: rootRouter.middleware(),
  routes
}
