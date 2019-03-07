'use strict'

const koaRouter = require('koa-joi-router')

const router = koaRouter()

const rootHandler = async ctx => {
  ctx.ok({ status: 'OK' })
}

const rootRoute = {
  method: 'get',
  path: '/',
  meta: {
    swagger: {
      summary: 'The root route',
      description: 'The root route, used for some default infra healthchecks',
      tags: [ 'root', 'healthcheck' ]
    }
  },
  handler: rootHandler
}

router.route(rootRoute)

module.exports = router.middleware()
