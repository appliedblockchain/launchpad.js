const assert = require('assert')
const createServer = require('./server')
const logger = require('./logger')
const env = require('./env')

const runApp = (contractAddress) => new Promise((resolve, reject) => {
  createServer(contractAddress)
    .then((app) => (
      app.listen(env.PORT, (err) => {
        assert(!err, err)
        console.log(`Docs available at http://localhost:${env.PORT}/docs`)
        logger.debug(`Server listening on ${env.PORT} in ${env.NODE_ENV} mode`)
        resolve(app)
      })
    ), (err) => {
      logger.error('Error while starting up server', err)
      process.exit(1)
      reject(err)
    })
})

module.exports = runApp
