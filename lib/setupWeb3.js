const Web3 = require('web3')
const abi = require('@appliedblockchain/store-contract-artefacts')

if (!process.env.CONTRACT_ADDRESS) {
  throw new Error(
    'You must provide a CONTRACT_ADDRESS environment variable when starting the server'
  )
}

const ethereumClientAddress = 'http://localhost:8545'
const web3 = new Web3(ethereumClientAddress)

let fromAddress
// '0x9139211574011393291A9EfBC69Bff2D1fBa25CA'
const StoreContract = new web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS)

const getFromAddress = async () => {
  if (!fromAddress) {
    const accounts = await web3.eth.getAccounts()
    const firstAddress = accounts[0]

    fromAddress = firstAddress
  }

  return fromAddress
}

module.exports = {
  StoreContract: StoreContract,
  address: getFromAddress
}

// export const setupWeb3 = async () => {
//   const accounts = await web3.eth.getAccounts()
//
// }
//
// const tester = async () => {
//   const accountAddress = accounts[0]
//   await StoreContract.methods.set('{ SOME DATA }').send({
//     from: accountAddress,
//     gas: 50000000
//   })
//
//   const data = await StoreContract.methods.get().call()
//   console.log('Get data:', data)
//
//   console.log('Accounts: ', accounts)
// }
//
// tester()
