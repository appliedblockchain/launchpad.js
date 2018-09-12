const createServer = require('../src/server')

const setupAppForTest = async () => {
  return createServer(process.env.CONTRACT_ADDRESS)
}

module.exports = setupAppForTest
