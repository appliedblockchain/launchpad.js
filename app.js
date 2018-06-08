'use strict'

const assert = require('assert')
const createServer = require('./lib/server')
const env = require('./lib/env')
const logger = require('./lib/logger')

createServer().then(
  app => (
    app.listen(env.PORT, (err) => {
      assert(!err, err)
      console.log(`Docs available at http://localhost:${env.PORT}/docs`)
      logger.debug(`Server listening on ${env.PORT} in ${env.NODE_ENV} mode`)
    })
  ),
  err => {
    logger.error('Error while starting up server', err)
    process.exit(1)
  }
)
