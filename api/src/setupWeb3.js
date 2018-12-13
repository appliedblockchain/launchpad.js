const Web3 = require('web3')
const config = require('config')
const ETHEREUM_JSONRPC_ENDPOINT = config.get('ETHEREUM_JSONRPC_ENDPOINT')

const abiDecoder = require('abi-decoder')

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
  const HelloWorldContract = new web3.eth.Contract(abi, contractAddress)
  HelloWorldContract.options.from = await getFromAddress(web3)

  abiDecoder.addABI(abi)

  return {
    contracts: {
      HelloWorldContract
    },
    web3
  }
}

module.exports = setupWeb3
