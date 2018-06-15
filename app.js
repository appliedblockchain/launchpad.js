'use strict'

const assert = require('assert')
const createServer = require('./lib/server')
const env = require('./lib/env')
const logger = require('./lib/logger')
const readFileContents = require('./readFileContents')

const getContractAddress = (text) => {
  const results = text.match(/0x\S+/)

  return !results ? '' : results[0]
}

const runApp = (contractAdddress) => {
  createServer(contractAdddress).then(
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

readFileContents('./contract-address.txt', (err, contractAdddressFile) => {
  if (err) {
    logger.error('Could not retrieve ./contract-address.txt file', err)
  }

  const contractAddress = getContractAddress(contractAdddressFile)

  if (contractAddress.length) {
    runApp(contractAddress)
  } else {
    logger.error('There was no contract address present in ./contract-address.txt', err)
  }
})
