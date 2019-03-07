'use strict'

const runApp = require('./src/app')
const logger = require('./src/logger')
const config = require('config')
const { join } = require('path')
const { fileExistsSync, fileReadSync } = require('fs')

const NODE_ENV = config.get('NODE_ENV')
const PORT = config.get('PORT')

let contractsAddresses = process.env.CONTRACT_ADDRESSES
const contractAddressesPath = join(__dirname, './contracts/build/contractAddresses.json')
if (fileExistsSync(contractAddressesPath)) {
  contractsAddresses = fileReadSync(contractAddresses)
}
contractsAddresses = JSON.stringify(contractsAddresses)

let contractABIs = {}
const contractAbisPath = join(__dirname, './contracts/build/contractABIs.json')
const contractABIs = require(contractAbisPath)
console.log(`Contracts loaded: ${JSON.stringify(Object.keys(contractABIs))}`)

const getCtrAddress = (contractName) => (
  contractsAddresses[contractName].address
)

const loadCtrAddresses = () => (
  Object.keys(contractAddresses).map(
    contractName => getCtrAddress(contractName)
  )
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
