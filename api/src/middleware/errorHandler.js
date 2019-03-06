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
    // ctx.status = err.statusCode || 500
    // const error = {
    //   error: {
    //     name: err.constructor.name,
    //     message: err.message
    //   }
    // }
    // ctx.body = err.toJSON ? err.toJSON() : error

    console.error(err)

    logger.error('Error in request', err)
  }
}
