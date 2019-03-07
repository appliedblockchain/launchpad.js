'use strict'

const runApp = require('./src/app')
const logger = require('./src/logger')
const config = require('config')

const NODE_ENV = config.get('NODE_ENV')
const PORT = config.get('PORT')

const contracts = require('./contracts/contractABIs.json')

const loadCtrAddresses = () => (
  Object.keys(contracts).map(
    contractName => getCtrAddress(contractName)
  )
)

const getCtrAddress = (contractName) => (
  contracts[contractName].address
)

;(async () => {
  try {
    // TODO: Validate contarct setup
    const contractAddresses = loadCtrAddresses()

    await runApp(contractAddresses)

    logger.debug(`Server listening on ${PORT} in '${NODE_ENV}' mode`)
    logger.debug(`Contract deployed at ${JSON.stringify(contractAddresses, null, 2)}`)
    logger.debug(`Docs available at http://localhost:${PORT}/docs`)
  } catch (err) {
    logger.error('Error while starting up server')
    logger.error(err)
    process.exit(1)
  }
})()
