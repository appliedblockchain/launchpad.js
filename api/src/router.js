'use strict'

const koaRouter = require('koa-joi-router')
const { ipfs, transactions } = require('@appliedblockchain/mantle-api')

const configureDocs = require('./api/docs-config')
const rootRoute = require('./api/root')
const notes = require('./api/notes')
const error = require('./api/Error/getError')
const { API_PREFIX } = require('./constants')

const router = koaRouter()

router.route(notes)
router.route(error)
router.use(ipfs.createRouter().prefix('/ipfs').middleware())
router.use(transactions.createRouter().middleware())
router.route(rootRoute)
router.prefix(API_PREFIX)

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes: {
    error,
    notes,
    default: rootRoute,
    ipfs: ipfs.routes,
    transactions: transactions.routes
  }
}
