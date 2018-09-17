'use strict'

const koaRouter = require('koa-joi-router')
const configureDocs = require('./api/docs-config')
const rootRoute = require('./api/root')
const notes = require('./api/notes')
const { API_PREFIX } = require('./constants')

const routes = [ ...rootRoute, ...notes ]

const router = koaRouter()

router.route(routes)
router.prefix(API_PREFIX)

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes
}
