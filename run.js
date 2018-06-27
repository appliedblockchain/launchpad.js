'use strict'

const env = require('./src/env')
const runApp = require('./src/app')

// var fs = require('fs')
// fs.readFile('contractAddress.txt', 'utf8', (err, contractAddress) => {
//   if (err) {
//     throw err
//   }
//   console.log('DATA', contractAddress)
//   runApp(contractAddress)
// })
console.log('env.CONTRACT_ADDRESS', env.CONTRACT_ADDRESS)

runApp(env.CONTRACT_ADDRESS)
