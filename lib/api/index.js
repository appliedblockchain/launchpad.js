'use strict'

const koaRouter = require('koa-joi-router')
const configureDocs = require('./docs-config')
const health = require('./health')
const rootRoute = require('./root')
const store = require('./store')

const router = koaRouter()
const routes = [
  ...health,
  ...rootRoute,
  ...store
]

router.route(routes)
router.prefix('/api')

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes
}
