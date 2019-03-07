const Web3 = require('web3')
const abiDecoder = require('abi-decoder')
const config = require('config')
const ETHEREUM_JSONRPC_ENDPOINT = config.get('ETHEREUM_JSONRPC_ENDPOINT')
const { join } = require('path')

const contractAbisPath = join(__dirname, './contracts/build/contractABIs.json')
const contractABIs = require(contractAbisPath)
console.log(`Contracts loaded: ${JSON.stringify(Object.keys(contractABIs))}`)

const web3 = new Web3(ETHEREUM_JSONRPC_ENDPOINT)

// Reduce list of contract deployed to contract object
const contracts = Object.keys(contractABIs).reduce((contractABIs, contractName) => {
  const { abi } = contractABIs[contractName]
  const { address } = contractAddresses[contractName]
  const contract = new web3.eth.Contract(abi, address)
  abiDecoder.addABI(abi)
  contractABIs[contractName] = contract
  return contractABIs
}, {})

const checkDeployment = async () => {
  Object.keys(contractABIs).forEach(async (contractName) => {
    const { address } = contractABIs[contractName]
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
