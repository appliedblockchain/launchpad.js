'use strict'

const { getContractAddress } = require('./src/helpers')
const runApp = require('./src/app')

const contractAddress = getContractAddress(process.env.CONTRACT_ADDRESS)

runApp(contractAddress)
