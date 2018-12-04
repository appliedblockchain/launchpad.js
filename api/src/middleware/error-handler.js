const logger = require('../logger')
const Sentry = require('@sentry/node')
const dsn = process.env.SENTRY_DSN || ''

if (dsn) {
  Sentry.init({ dsn: dsn })
}

module.exports = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    if (dsn) {
      Sentry.captureException(err, (sentryError, eventId) => {
        console.log(`Reported error ${eventId}`)
      })
    }
    ctx.status = err.statusCode || 500
    const error = {
      error: {
        name: err.constructor.name,
        message: err.message
      }, ...err }
    }
    ctx.body = err.toJSON ? err.toJSON() : error
    logger.error('Error in request', err)
  }
}
