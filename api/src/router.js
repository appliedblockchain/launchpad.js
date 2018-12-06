'use strict'

const koaRouter = require('koa-joi-router')

const configureDocs = require('./api/docs-config')
const rootRoute = require('./api/root')
const { API_PREFIX } = require('./constants')

const router = koaRouter()

router.route(rootRoute)
router.prefix(API_PREFIX)

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes: {
    default: rootRoute
  }
}
