'use strict'

const koaRouter = require('koa-joi-router')
const configureDocs = require('./routes/docs-config')
const helloWorldRoutes = require('./routes/helloWorld')
const contractRoutes = require('./routes/contracts')
const { API_PREFIX } = require('./constants')

const router = koaRouter()

router.route(helloWorldRoutes)
router.route(contractRoutes)
router.prefix(API_PREFIX)

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes: {
    default: helloWorldRoutes
  }
}
