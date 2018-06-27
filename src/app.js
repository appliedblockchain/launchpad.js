const assert = require('assert')
const createServer = require('./server')
const logger = require('./logger')
const env = require('./env')

const runApp = (contractAddress) => {
  createServer(contractAddress)
    .then((app) => (
      app.listen(env.PORT, (err) => {
        assert(!err, err)
        console.log('Contract deployed at ', process.env.CONTRACT_ADDRESS)
        console.log(`Docs available at http://localhost:${env.PORT}/docs`)
        logger.debug(`Server listening on ${env.PORT} in ${env.NODE_ENV} mode`)
      })
    ), (err) => {
      logger.error('Error while starting up server', err)
      process.exit(1)
    })
}

module.exports = runApp
