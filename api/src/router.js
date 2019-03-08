'use strict'

const koaRouter = require('koa-joi-router')

const { API_PREFIX } = require('./constants')
const routes = require('./routes')
const { withDocs } = require('@appliedblockchain/docs')
const { baseSpec, specOptions } = require('./swagger-docs-config')

const router = koaRouter()

router.prefix(API_PREFIX)

withDocs(router, routes, baseSpec, specOptions)

module.exports = {
  middleware: router.middleware()
}
