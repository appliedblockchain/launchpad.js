'use strict'

const runApp = require('./src/app')
const logger = require('./src/logger')
const config = require('config')

const NODE_ENV = config.get('NODE_ENV')
const PORT = config.get('PORT')



const loadCtrAddresses = () => {
  let contractAddresses = process.env.CONTRACT_ADDRESSES

  if (!contractAddresses) {
    throw new Error('API: could not recover addresses from the environment variable $CONTRACT_ADDRESSES')
  } else {
    contractAddresses = JSON.parse(contractAddresses)
  }

  return contractAddresses
}

;(() => {
  try {
    const contractAddresses = loadCtrAddresses()

    runApp(contractAddresses)

    logger.debug(`Server listening on ${PORT} in '${NODE_ENV}' mode`)
    logger.debug(`Contract deployed at ${JSON.stringify(contractAddresses, null, 2)}`)
    logger.debug(`Docs available at http://localhost:${PORT}/docs`)
  } catch (err) {
    logger.error('Error while starting up server')
    logger.error(err)
    process.exit(1)
  }
})()
