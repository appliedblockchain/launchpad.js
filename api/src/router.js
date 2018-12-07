'use strict'

const koaRouter = require('koa-joi-router')
const { ipfs, parityProxy } = require('@appliedblockchain/mantle-api')

const configureDocs = require('./api/docs-config')
const { routes: rootRoutes } = require('./api/root') // or const rootRoutes = require('./api/root/routes')
const { routes: noteRoutes } = require('./api/notes') // or const noteRoutes = require('./api/notes/routes')
const { routes: errorRoutes } = require('./api/Error')
const { API_PREFIX } = require('./constants')

const router = koaRouter()

router.route(noteRoutes)
router.route(errorRoutes)
router.use('', ipfs.createRouter().prefix('/ipfs').middleware())
router.use('', parityProxy.createRouter().middleware())
router.route(rootRoutes)
router.prefix(API_PREFIX)

module.exports = {
  configureDocs,
  middleware: router.middleware(),
  routes: {
    error: errorRoutes,
    notes: noteRoutes,
    default: rootRoutes,
    ipfs: ipfs.routes,
    transactions: parityProxy.routes
  }
}
