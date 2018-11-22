'use strict'

const koaRouter = require('koa-joi-router')
const configureDocs = require('./api/docs-config')
const rootRoute = require('./api/root')
const notes = require('./api/notes')
const error = require('./api/Error/getError')
const transactions = require('./api/transactions')
const { API_PREFIX } = require('./constants')

const routes = [ ...rootRoute, ...notes, error, ...transactions ]

const router = koaRouter()

router.route(routes)
router.prefix(API_PREFIX)

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes
}
