const yenv = require('yenv')
const { keyblade } = require('keyblade')
const logger = require('./logger')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

module.exports = keyblade(yenv(), {
  message: key => `[yenv] ${key} not found in the loaded environment`,
  logBeforeThrow: message => logger.error(message)
})
