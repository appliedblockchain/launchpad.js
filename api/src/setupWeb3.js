const Web3 = require('web3')
const config = require('config')
const ETHEREUM_JSONRPC_ENDPOINT = config.get('ETHEREUM_JSONRPC_ENDPOINT')

const abiDecoder = require('abi-decoder')

const contracts = require('../contracts')

const getFromAddress = async web3 => {
  const accounts = await web3.eth.getAccounts()
  const firstAddress = accounts[0]

  return firstAddress
}

const setupWeb3 = async (ethereumClientAddress = ETHEREUM_JSONRPC_ENDPOINT) => {
  const web3 = new Web3(ethereumClientAddress)

  // Reduce list of contract deployed to contract object
  const _contracts = await Object.keys(contracts).reduce(async (contractAccumulater, contractName) => {
    const { abi, address } = contracts[contractName]
    const contract = new web3.eth.Contract(abi, address)
    contract.options.from = await getFromAddress(web3)
    abiDecoder.addABI(abi)
    const oContracts = await contractAccumulater
    oContracts[contractName] = contract
    return oContracts
  }, Promise.resolve({}))

  return {
    contracts: _contracts,
    web3
  }
}

module.exports = setupWeb3
