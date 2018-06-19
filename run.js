'use strict'

const runApp = require('./src/app')
const logger = require('./src/logger')
const { readFileContents, getContractAddress } = require('./src/helpers')

readFileContents('/contract-address.txt', async (err, contractAddressFile) => {
  if (err) {
    logger.error('Could not retrieve ./contract-address.txt file', err)
  }

  const contractAddress = getContractAddress(contractAddressFile)

  if (contractAddress.length) {
    await runApp(contractAddress)
  } else {
    logger.error('There was no contract address present in ./contract-address.txt', err)
  }
})
