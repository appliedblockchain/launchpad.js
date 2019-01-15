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

    const deployedContracts = await Promise.all(
      contractNames.map(async (contractName) => {

        console.log(`Deploying contract: ${contractName}....\n\n\n`)

        const { abi, bytecode } = contracts[contractName]
        const contract = new web3.eth.Contract(abi, { from, data: bytecode })
        const deployedContract = await contract.deploy({ arguments: [] }).send(sendParams)

        console.log(`>>> Contract: ${contractName} deployed.\n\n\n`)

        return {
          contractName,
          ...deployedContract
        }
      })
    )

    const deployedContractObject = deployedContracts.reduce((output, contract) => {
      const { contractName, options, _jsonInterface } = contract

      console.log(`Preparing JSON for contract: ${contractName}...\n\n\n`)

      output[contractName] = {
        address: options.address,
        abi: _jsonInterface
      }
      return output
    }, {})

    const contractsJSON = `module.exports = ${JSON.stringify(deployedContractObject, {}, 2).replace(/"/g, '\'')}\n`

    console.log('Writing contract contract information....\n\n\n')

    const path = join(__dirname, '../../api/contracts/index.js')
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
