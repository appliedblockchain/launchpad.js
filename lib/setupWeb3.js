const Web3 = require('web3')

const getFromAddress = async (web3) => {
  const accounts = await web3.eth.getAccounts()
  const firstAddress = accounts[0]

  return firstAddress
}

const setupWeb3 = async ({
  abi,
  contractAddress,
  ethereumClientAddress = 'http://localhost:8545'
}) => {
  const web3 = new Web3(ethereumClientAddress)

  // const fromAddress = await getFromAddress(web3)
  // web3.eth.defaultAccount = await getFromAddress(web3)

  const StoreContract = new web3.eth.Contract(abi, contractAddress)
  StoreContract.options.from = await getFromAddress(web3)

  return {
    StoreContract
  }
}

module.exports = setupWeb3
