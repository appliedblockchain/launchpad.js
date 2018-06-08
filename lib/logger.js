const { APP_NAME } = require('./constants')
const { createLogger, WARN } = require('bunyan')
const env = require('./env')

module.exports = createLogger({
  name: APP_NAME,
  level: env.LOG_LEVEL || WARN
})
