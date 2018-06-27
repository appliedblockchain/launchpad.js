'use strict'

const env = require('./src/env')
const runApp = require('./src/app')

// TODO: why is this a number!?
// deploy script in /bin/deployContracts
console.log('env.CONTRACT_ADDRESS', env.CONTRACT_ADDRESS)
console.log('typeof env.CONTRACT_ADDRESS', typeof env.CONTRACT_ADDRESS)

// returns e.g. 30 (type number)

runApp(env.CONTRACT_ADDRESS)
