'use strict'

const env = require('./src/env')
const { getContractAddress } = require('./src/helpers')
const runApp = require('./src/app')

const contractAddress = getContractAddress(env.CONTRACT_ADDRESS)

runApp(contractAddress)
