'use strict'

const assert = require('assert')
const createServer = require('./lib/server')
const env = require('./lib/env')
const logger = require('./lib/logger')

const fs = require('fs')

const readFile = (path, callback) => {
  try {
    const filename = require.resolve(path)
    fs.readFile(filename, 'utf8', callback)
  } catch (e) {
    callback(e)
  }
}

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

readFile('./contract-address.txt', (err, contractAdddressFile) => {
  if (err) {
    logger.error('Could not retrieve ./contract-address.txt file', err)
  }

  const contractAddress = getContractAddress(contractAdddressFile)

  if (contractAddress.length) {
    console.log('contractAddress', contractAddress)
    runApp(contractAddress)
  } else {
    logger.error('There was no contract address present in ./contract-address.txt', err)
  }
})
