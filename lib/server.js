'use strict'

const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const docs = require('koa-docs')
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')
const respond = require('koa-respond')
const { middleware, routes } = require('./api')
const logger = require('./logger')
const { notFoundHandler, errorHandler } = require('./middleware')
const configureDocs = require('./api/docs-config')

const createServer = async () => {
  logger.debug('Creating server...')
  const app = new Koa()

  app
    .use(errorHandler)
    .use(docs.get('/docs', configureDocs(routes)))
    .use(compress())
    .use(respond())
    .use(bodyParser())
    .use(cors())
    .use(middleware)
    .use(notFoundHandler)

  const server = http.createServer(app.callback())

  server.on('close', () => {
    console.log('Server closing')
  })

  logger.debug('Server created.')
  return server
}

module.exports = createServer
