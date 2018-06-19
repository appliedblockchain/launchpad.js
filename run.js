'use strict'

const runApp = require('./src/app')
const logger = require('./src/logger')
const readFileContents = require('./readFileContents')

const getContractAddress = (text) => {
  const results = text.match(/0x\S+/)

  return !results ? '' : results[0]
}

readFileContents('./contract-address.txt', async (err, contractAddressFile) => {
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
