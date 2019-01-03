'use strict'

const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const compress = require('koa-compress')
const respond = require('koa-respond')
const docs = require('@appliedblockchain/koa-docs')
const { middleware, routes, configureDocs } = require('./router')
const logger = require('./logger')

const {
  notFoundHandler,
  errorHandler
} = require('./middleware')
const { web3, contracts, checkDeployment } = require('./util/web3')
var Prometheus = require('./middleware/monitor')
const { healthcheck } = require('./healthcheck')

const createServer = async contractAddresses => {
  if (!contractAddresses) {
    throw new Error(
      'You must run start the server with a valid ' +
        `contract. Address received: ${contractAddresses}`
    )
  }

  await checkDeployment()

  logger.debug('Creating server...')

  const [ from ] = await web3.eth.getAccounts()
  Object.keys(contracts).forEach(key => {
    const contract = contracts[key]
    contract.options = { ...contract.options, from, gas: 50000000 }
  })

  const app = new Koa()
  app
    .use(errorHandler)
<<<<<<< HEAD
    .use(healthcheck(web3))
=======
    .use(cors())
    .use(healthcheck(contractAddress, web3))
>>>>>>> app and docker metrics with prometheus
    .use(docs.get('/docs', configureDocs(
      { groupName: 'default', routes: routes.default, prefix: '/api' }
    )))
    .use(Prometheus.injectMetricsRouter)
    .use(compress())
    .use(respond())
    .use(Prometheus.requestCounters)
    .use(Prometheus.responseCounters)
    .use(middleware)
    .use(notFoundHandler)

  const server = http.createServer(app.callback())

  Prometheus.mantleCounter.inc({
    mantle_custom_metrics_label: 2000
  })

  server.on('close', async () => {
    logger.debug('Server closing')
  })

  server.on('error', async error => {
    console.log('Error', error)
  })

  logger.debug('Server created.')

  return server
}

module.exports = createServer
