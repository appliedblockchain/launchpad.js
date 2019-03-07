'use strict'

const koaRouter = require('koa-joi-router')
const configureDocs = require('./routes/docs-config')
const helloWorldRoute = require('./routes/helloWorld')
const { API_PREFIX } = require('./constants')

const router = koaRouter()

// router.route(rootRoute)
router.route(helloWorldRoute)
router.prefix(API_PREFIX)

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes: {
    default: helloWorldRoute
  }
}
