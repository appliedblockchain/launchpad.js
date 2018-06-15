const Web3 = require('web3')

let fromAddress
let StoreContract

const getFromAddress = async (web3) => {
  const accounts = await web3.eth.getAccounts()
  const firstAddress = accounts[0]

  return firstAddress
}

const setupWeb3 = async (abi, contractAddress) => {
  const ethereumClientAddress = 'http://localhost:8545'
  const web3 = new Web3(ethereumClientAddress)

  fromAddress = await getFromAddress(web3)
  StoreContract = new web3.eth.Contract(abi, contractAddress)
}

module.exports = {
  setupWeb3,
  StoreContract: StoreContract,
  address: fromAddress
}
