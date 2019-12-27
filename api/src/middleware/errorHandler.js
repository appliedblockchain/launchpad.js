'use strict'

const Sentry = require('@sentry/node')
const dsn = process.env.SENTRY_DSN || ''

if (dsn) {
  Sentry.init({ dsn: dsn })
}

module.exports = async (context, next) => {
  const ctx = context

  try {
    await next()
  } catch (err) {
    if (dsn) {
      Sentry.captureException(err, (sentryError, eventId) => {
        console.log(`Reported error ${eventId}`)
      })
    }

    ctx.status = err.status || 500
    ctx.body = {
      status: ctx.status,
      name: err.name,
      message: err.message,
      requestId: ctx.logger.defaultMeta.requestId
    }

    ctx.logger.error(err.stack)
  }
}
