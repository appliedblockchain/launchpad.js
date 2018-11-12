'use strict'

const http = require('http')
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const compress = require('koa-compress')
const respond = require('koa-respond')
const docs = require('@appliedblockchain/koa-docs')
const { middleware, routes, configureDocs } = require('./router')
const logger = require('./logger')
const {
  notFoundHandler,
  errorHandler,
  assignToContext
} = require('./middleware')
const setupWeb3 = require('./setupWeb3')
const checkContractDeployment = require('./checkContractDeployment')
const { healthcheck } = require('./healthcheck')

const contract = require('../contracts/Notes.json')
const abi = contract.abi

const createServer = async contractAddress => {
  if (!contractAddress) {
    throw new Error(
      'You must run start the server with a valid ' +
        `contract. Address received: ${contractAddress}`
    )
  }
  logger.debug('Creating server...')

  const { contracts, web3 } = await setupWeb3({ abi, contractAddress })
  await checkContractDeployment(web3, contractAddress, contract.contractName)

  const app = new Koa()

  app
    .use(assignToContext({ contracts, web3 }))
    .use(errorHandler)
    .use(healthcheck(contractAddress, web3))
    .use(docs.get('/docs', configureDocs(routes)))
    .use(compress())
    .use(respond())
    .use(bodyParser())
    .use(cors())
    .use(middleware)
    .use(notFoundHandler)

  const server = http.createServer(app.callback())

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
