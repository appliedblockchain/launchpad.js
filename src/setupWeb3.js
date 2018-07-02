const Web3 = require('web3')
const config = require('config')
const ETHEREUM_CLIENT_ADDRESS = config.get('ETHEREUM_CLIENT_ADDRESS')

const getFromAddress = async (web3) => {
  const accounts = await web3.eth.getAccounts()
  const firstAddress = accounts[0]

  return firstAddress
}

const setupWeb3 = async ({
  abi,
  contractAddress,
  ethereumClientAddress = ETHEREUM_CLIENT_ADDRESS
}) => {
  const web3 = new Web3(ethereumClientAddress)

  const StoreContract = new web3.eth.Contract(abi, contractAddress)
  StoreContract.options.from = await getFromAddress(web3)

  return {
    contracts: {
      StoreContract
    },
    web3
  }
}

module.exports = setupWeb3
