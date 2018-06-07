'use strict'

const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')

const createServer = async () => {
  console.log('Creating server...')
  const app = new Koa()

  app
    .use(compress())
    .use(bodyParser())
    .use(cors())

  const server = http.createServer(app.callback())

  server.on('close', () => {
    console.log('Server closing')
  })

  return server
}

module.exports = createServer
