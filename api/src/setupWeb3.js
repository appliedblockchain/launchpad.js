const Web3 = require('web3')
const config = require('config')
const ETHEREUM_JSONRPC_ENDPOINT = config.get('ETHEREUM_JSONRPC_ENDPOINT')
const ContractEvents = require('./helpers/ContractEvents')

const getFromAddress = async web3 => {
  const accounts = await web3.eth.getAccounts()
  const firstAddress = accounts[0]

  return firstAddress
}

const setupWeb3 = async ({
  abi,
  contractAddress,
  ethereumClientAddress = ETHEREUM_JSONRPC_ENDPOINT
}) => {
  const web3 = new Web3(ethereumClientAddress)
  const NotesContract = new web3.eth.Contract(abi, contractAddress)
  NotesContract.options.from = await getFromAddress(web3)

  ContractEvents.ready(NotesContract)

  return {
    contracts: {
      NotesContract
    },
    web3
  }
}

module.exports = setupWeb3
