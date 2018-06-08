'use strict'

const Router = require('koa-joi-router')
const health = require('./health')

const router = new Router()

const routes = [
  health
]

router.route(routes)
router.prefix('/api')

module.exports = routes
