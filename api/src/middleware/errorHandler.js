const logger = require('../logger')
const Sentry = require('@sentry/node')
const dsn = process.env.SENTRY_DSN || ''
const BaseError = require('../helpers/Errors/BaseError')

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
    BaseError.handleErrorResponse(ctx, err)

    logger.error(err.stack)
  }
}
