const createServer = require('../src/server')
const contracts = require('../contracts')

const setupAppForTest = async () => {
  const contractAddresses = Object.keys(contracts).map(
    contractName => contracts[contractName].address)

  return createServer(contractAddresses)
}




module.exports = setupAppForTest
