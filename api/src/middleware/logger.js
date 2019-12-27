/* eslint no-undef: "error", no-use-before-define: 0 */ // TODO: remove
/**
 *
 * Code mostly taken from koa-logger, but uses a winston console logger with a unique requestId
 *
 * If logspout and papertrail are set up properly, and if an error is thrown, then the client siede error
 * will contain the requestId
 *
 * And you can look it up directly on papertrail to get the stacktrace(useful for staging/production)
 * or in the docker output during development
 *
 */
'use strict'

const Counter = require('passthrough-counter')
const humanize = require('humanize-number')
const bytes = require('bytes')
const util = require('util')

const { APP_NAME } = require('../constants')
const winston = require('winston')
const config = require('config')
const LOG_LEVEL = config.get('LOG_LEVEL')
const uuid = require('uuid/v4')
const chalk = require('chalk')

const customFormat = winston.format.printf(({ level, message, requestId }) => {
  return `${level}: ${message} - requestId: ${requestId}`
})

function getLogger(extraTransports) {
  return winston.createLogger({
    name: APP_NAME,
    format: customFormat,
    // format: winston.format.simple(),
    defaultMeta: {
      requestId: uuid()
    },
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        level: LOG_LEVEL,
        colorize: true
      }),
      ...extraTransports
    ]
  })
}

const definePrint = ({ logger }) =>
  (function () {
    const transporter = logger
    return function printFunc(...args) {
      const str = util.format(...args)
      transporter.info(str)
    }
  }())

const definePrintError = ({ logger }) =>
  (function () {
    const transporter = logger

    return function printFunc(...args) {
      const str = util.format(...args)
      transporter.error(str)
    }
  }())

const defineDone = ({ ctx, start, counter, print, res }) =>
  (function (event) {
    res.removeListener('finish', this)
    res.removeListener('close', this)
    log(print, ctx, start, counter ? counter.length : 0, null, event)
  })

/**
 * Logging Middleware, creates a winston logger with a unique request id for each request
 and log the lifecycle of the request
 *
 * Also attach the logger to the koa ctx object for additional info
 *
 * @param  {[type]} extraTransports Array of winston transport to use on top of the Console one
 * @return {function}  the middleware function
 */
function middleware(extraTransports = []) {
  return async (ctx, next) => {
    const logger = getLogger(extraTransports)

    // For use in request handlers
    ctx.logger = logger

    const print = definePrint({ logger })
    const printError = definePrintError({ logger })

    // request
    const start = Date.now()

    print(
      '  ' + chalk.gray('<--') +
      ' ' + chalk.bold('%s') +
      ' ' + chalk.gray('%s'),
      ctx.method,
      ctx.originalUrl
    )

    try {
      await next()
    } catch (err) {
      // log uncaught downstream errors
      log(printError, ctx, start, null, err)
      throw err
    }

    // calculate the length of a streaming response
    // by intercepting the stream with a counter.
    // only necessary if a content-length header is currently not set.
    const length = ctx.response.length
    const body = ctx.body
    let counter
    if (length == null && body && body.readable) {
      ctx.body = body
        .pipe(counter = Counter()) // eslint-disable-line
        .on('error', ctx.onerror)
    }

    // log when the response is finished or closed,
    // whichever happens first.
    const res = ctx.res

    const done = defineDone({ ctx, start, counter, print, res })

    const onfinish = done.bind(done, 'finish')
    const onclose = done.bind(done, 'close')

    res.once('finish', onfinish)
    res.once('close', onclose)
  }
}

/**
 * Log helper.
 */

const colorCodes = {
  7: 'magenta',
  5: 'red',
  4: 'yellow',
  3: 'cyan',
  2: 'green',
  1: 'green',
  0: 'yellow'
}

function log(print, ctx, start, len, err, event) {
  // get the status code of the response
  const status = err
    ? (err.isBoom ? err.output.statusCode : err.status || 500)
    : (ctx.status || 404)

  // get the human readable response length
  let length
  if (~[ 204, 205, 304 ].indexOf(status)) {
    length = ''
  } else if (len == null) {
    length = '-'
  } else {
    length = bytes(len).toLowerCase()
  }

  const upstream = err ? 'xxx' : event === 'close' ? '-x-' : '-->'

  // set the color of the status code;
  const s = status / 100 | 0
  const color = colorCodes.hasOwnProperty(s) ? colorCodes[s] : 0

  print(
    '  ' + upstream +
    ' ' + chalk.bold('%s') +
    ' ' + chalk.gray('%s') +
    ' ' + chalk[color]('%s') +
    ' ' + chalk.gray('%s') +
    ' ' + chalk.gray('%s'),
    ctx.method,
    ctx.originalUrl,
    status,
    time(start),
    length
  )
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time(start) {
  const delta = Date.now() - start
  return humanize(delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's')
}

module.exports = middleware
