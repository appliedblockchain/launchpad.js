const assert = require('assert')
const createServer = require('./server')
const logger = require('./logger')
const config = require('config')

const PORT = config.get('PORT')
const NODE_ENV = config.get('NODE_ENV')

const runApp = contractAddress => {
  createServer(contractAddress).then(
    app =>
      app.listen(PORT, err => {
        assert(!err, err)
        console.log('Contract deployed at ', contractAddress)
        console.log(`Docs available at http://localhost:${PORT}/docs`)
        logger.debug(`Server listening on ${PORT} in ${NODE_ENV} mode`)
      }),
    err => {
      logger.error('Error while starting up server', err)
      process.exit(1)
    }
  )
}

module.exports = runApp
