const Web3 = require('web3')
const abiDecoder = require('abi-decoder')
const config = require('config')
const ETHEREUM_JSONRPC_ENDPOINT = config.get('ETHEREUM_JSONRPC_ENDPOINT')

// const contractsJSON = require('../../contracts/contractABIs.json')

const { execSync } = require('child_process')
console.log('PWD --- ', execSync('pwd').toString())

const contractsJSON = require('../../../contracts/build/contractABIs.json')

const web3 = new Web3(ETHEREUM_JSONRPC_ENDPOINT)

// Reduce list of contract deployed to contract object
const contracts = Object.keys(contractsJSON).reduce((_contracts, contractName) => {
  const { abi, address } = contractsJSON[contractName]
  const contract = new web3.eth.Contract(abi, address)
  abiDecoder.addABI(abi)
  _contracts[contractName] = contract
  return _contracts
}, {})

const checkDeployment = async () => {
  Object.keys(contractsJSON).forEach(async (contractName) => {
    const { address } = contractsJSON[contractName]
    const code = await web3.eth.getCode(address)
    if (code === '0x0' || code === '0x') {
      throw new Error(`No code at the specified contract address: ${address}`)
    }
  })
}

module.exports = {
  web3,
  contracts,
  checkDeployment
}
