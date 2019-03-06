'use strict'

const fs = require('fs')
const { join } = require('path')
const Web3 = require('web3')

const contractsDirectory = join(__dirname, '../build/contracts')
const contractsFilenames = fs.readdirSync(contractsDirectory).filter(f => /\.json$/.test(f))

const config = require('config')
const PROVIDER = config.provider || process.env.PROVIDER

if (contractsFilenames.length === 0) {
  throw new Error('Contracts not found, you should run \'npm run compile\'')
}

const contracts = {}
contractsFilenames.forEach(file => {
  const fileString = fs.readFileSync(join(contractsDirectory, file))

  try {
    const contract = JSON.parse(fileString)
    contracts[contract.contractName] = contract
  } catch (err) {
    console.error(`Can not parse ${file}`)
    process.exit(1)
  }
});

(async () => {
  const web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER))

  try {
    const coinbase = await web3.eth.getCoinbase()
    const from = process.env.FROM || coinbase // default from for parity-solo

    const sendParams = {
      from,
      gas: 50000000
    }

    const contractNames = Object.keys(contracts)

    const deployedContracts = {}
    for (let i = 0; i < contractNames.length; i++) {
      const contractName = contractNames[i]
      console.log(`Deploying contract: ${contractName}....\n`)
      const { abi, bytecode } = contracts[contractName]


      let contract = new web3.eth.Contract(abi, { from, data: bytecode })
      contract = await contract.deploy().send(sendParams)

      deployedContracts[contractName] = { abi, address: contract.options.address }
    }

    const contractsJSON = JSON.stringify(deployedContracts, null, 2)

    console.log('Writing contract contract information....\n')

    const path = join(__dirname, '../build/combined.json')
    fs.writeFileSync(path, contractsJSON)
    console.log(`Contract information saved at ${path}`)

  } catch (err) {
    if (err.message === 'Invalid JSON RPC response: ""') {
      console.error('Error: Unable to connect to network, is parity running?')
    } else {
      console.error(err)
    }
  }
})()
