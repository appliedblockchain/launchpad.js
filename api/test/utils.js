const createServer = require('../src/server')
const loadContractAddresses = require('../src/util/loadContractAddresses')

const setupAppForTest = async () => {
  return createServer(loadContractAddresses())
}




module.exports = setupAppForTest
