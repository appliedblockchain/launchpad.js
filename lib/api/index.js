'use strict'

const koaRouter = require('koa-joi-router')
const configureDocs = require('./docs-config')
const rootRoute = require('./root')
const store = require('./store')

const router = koaRouter()
const routes = [
  ...rootRoute,
  ...store
]

router.route(routes)
router.prefix('/api')

console.log('Routes', routes)

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes
}
