'use strict'

const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const docs = require('koa-docs')
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')
const respond = require('koa-respond')
const abi = require('@appliedblockchain/store-contract-artefacts')
const { middleware, routes, configureDocs } = require('./api')
const logger = require('./logger')
const { notFoundHandler, errorHandler } = require('./middleware')
const setupWeb3 = require('./setupWeb3')
const checkContractDeployment = require('./checkContractDeployment')
const healthcheck = require('./healthcheck')
const assignToContext = require('./assignToContext')

const createServer = async (contractAddress) => {
  if (!contractAddress) {
    throw new Error(
      'You must run \'npm run deploy-contract\' with a valid contract before starting the server'
    )
  }

  logger.debug('Creating server...')

  const { contracts, web3 } = await setupWeb3({ abi, contractAddress })
  await checkContractDeployment(web3, contractAddress)

  const app = new Koa()

  app
    .use(assignToContext({ contracts, web3 }))
    .use(errorHandler)
    .use(healthcheck(contractAddress))
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
