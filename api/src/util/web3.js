const Web3 = require('web3')
const abiDecoder = require('abi-decoder')
const config = require('config')
const ETHEREUM_JSONRPC_ENDPOINT = config.get('ETHEREUM_JSONRPC_ENDPOINT')
const { join } = require('path')

const contractAbisPath = join(__dirname, '../../contracts/contractABIs.json')
const contractABIs = require(contractAbisPath)
console.log(`Contracts loaded: ${JSON.stringify(Object.keys(contractABIs))}`)

const web3 = new Web3(ETHEREUM_JSONRPC_ENDPOINT)

console.log({ contractABIs })

const contracts = Object.keys(contractABIs).reduce((acc, contractName) => {
  const { abi } = contractABIs[contractName]

  const contract = new web3.eth.Contract(abi, '0x0000000000000000000000000000000000000000')
  abiDecoder.addABI(abi)
  acc[contractName] = contract
  return acc
}, {})

const checkDeployment = async () => {
  Object.keys(contracts).forEach(async (contractName) => {
    const { address } = contracts[contractName].options
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
