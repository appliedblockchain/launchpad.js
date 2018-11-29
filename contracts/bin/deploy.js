'use strict'

const dotenv = require('dotenv')
dotenv.config()
const fs = require('fs')
const { join } = require('path')
const Web3 = require('web3')
const contractsDirectory = join(__dirname, '../build/contracts')
const contractsFilenames = fs.readdirSync(contractsDirectory).filter(f => /\.json$/.test(f))


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
  const web3 = new Web3(
    new Web3.providers.HttpProvider(
      process.env.PROVIDER || 'http://localhost:8545'
    )
  )

  try {
    const coinbase = await web3.eth.getCoinbase()
    const from = process.env.FROM || coinbase // default from for parity-solo

    const sendParams = {
      from,
      gas: 50000000
    }

    const { abi, bytecode } = contracts.Notes
    let Notes = new web3.eth.Contract(abi, { from, data: bytecode })
    Notes = await Notes.deploy({ arguments: [] }).send(sendParams)

    const addresses = `export CONTRACT_ADDRESS="${Notes.options.address}"`
    const path = join(__dirname, '../../api/contracts/exportAddresses.sh')
    fs.writeFileSync(path, addresses)
    console.log('done:\n', addresses)
    console.log(`addresses saved at ${path}`)
  } catch (err) {
    if (err.message === 'Invalid JSON RPC response: ""') {
      console.error('Error: Unable to connect to network, is parity running?')
    } else {
      console.error(err)
    }
  }
})()
