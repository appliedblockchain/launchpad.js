const { APP_NAME } = require('./constants')
const winston = require('winston')
const config = require('config')
const LOG_LEVEL = config.get('LOG_LEVEL')

const logger = winston.createLogger({
  name: APP_NAME,
  format: winston.format.simple(),
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      level: LOG_LEVEL,
      format: winston.format.simple()
    })
  ]
})

// logger.error('ERROR')
// logger.warn('WARN')
// logger.info('INFO')
// logger.verbose('VERBOSE')
// logger.debug('DEBUG')
// logger.silly('SILLY')

module.exports = logger
