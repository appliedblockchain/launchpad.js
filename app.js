'use strict'

const assert = require('assert')
const createServer = require('./src/server')
const env = require('./src/env')
const logger = require('./src/logger')
const { getContractAddress } = require('./src/helpers')

const runApp = (contractAddress) => {
  createServer(contractAddress).then(
    app => (
      app.listen(env.PORT, (err) => {
        assert(!err, err)
        console.log(`Docs available at http://localhost:${env.PORT}/docs`)
        logger.debug(`Server listening on ${env.PORT} in ${env.NODE_ENV} mode`)
      })
    ),
    err => {
      logger.error('Error while starting up server', err)
      process.exit(1)
    }
  )
}

const contractAddress = getContractAddress(env.CONTRACT_ADDRESS)

runApp(contractAddress)
