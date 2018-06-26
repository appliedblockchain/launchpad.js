'use strict'

const koaRouter = require('koa-joi-router')
const configureDocs = require('./api/docs-config')
const rootRoute = require('./api/root')
const store = require('./api/store')

const routes = [
  ...rootRoute,
  ...store
]

const router = koaRouter()

router.route(routes)
router.prefix('/api')

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes
}
