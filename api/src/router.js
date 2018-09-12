'use strict'

const koaRouter = require('koa-joi-router')
const configureDocs = require('./api/docs-config')
const rootRoute = require('./api/root')
const store = require('./api/store')
const { API_PREFIX } = require('./constants')

const routes = [
  ...rootRoute,
  ...store
]

const router = koaRouter()

router.route(routes)
router.prefix(API_PREFIX)

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes
}
