/**
 * Mosty taken from koa-logger, but uses a winston console logger with a unique requestId
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

function getLogger(extraTransports) {
  return winston.createLogger({
    name: APP_NAME,
    format: winston.format.simple(),
    defaultMeta: {
      requestId: uuid()
    },
    exitOnError: false,
    transports: [
      new winston.transports.Console({
        level: LOG_LEVEL,
        colorize: true,
        format: winston.format.simple()
      }),
      ...extraTransports
    ]
  })
}

/**
 * Logging Middleware, creates a winston logger with a unique request id for each request, and log the lifecycle of the request
 * Also attach the logger to the koa ctx object for additional info
 * @param  {[type]} extraTransports Array of winston transport to use on top of the Console one
 * @return {function}  the middleware function
 */
function middleware(extraTransports = []) {
  return async function logger (ctx, next) {
    const logger = getLogger(extraTransports)

    // For use in request handlers
    ctx.logger = logger

    const print = (function () {
      const transporter = logger
      return function printFunc (...args) {
        const str = util.format(...args)
        transporter.info(str)
      }
    }())

    const printError = (function () {
      const transporter = logger

      return function printFunc (...args) {
        const str = util.format(...args)
        transporter.error(str)
      }
    }())

    // request
    const start = Date.now()

    print('  ' + chalk.gray('<--') +
      ' ' + chalk.bold('%s') +
      ' ' + chalk.gray('%s'),
    ctx.method,
    ctx.originalUrl)

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

    const onfinish = done.bind(null, 'finish')
    const onclose = done.bind(null, 'close')

    res.once('finish', onfinish)
    res.once('close', onclose)

    function done (event) {
      res.removeListener('finish', onfinish)
      res.removeListener('close', onclose)
      log(print, ctx, start, counter ? counter.length : length, null, event)
    }
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

function log (print, ctx, start, len, err, event) {
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

  print('  ' + upstream +
    ' ' + chalk.bold('%s') +
    ' ' + chalk.gray('%s') +
    ' ' + chalk[color]('%s') +
    ' ' + chalk.gray('%s') +
    ' ' + chalk.gray('%s'),
  ctx.method,
  ctx.originalUrl,
  status,
  time(start),
  length)
}

/**
 * Show the response time in a human readable format.
 * In milliseconds if less than 10 seconds,
 * in seconds otherwise.
 */

function time (start) {
  const delta = Date.now() - start
  return humanize(delta < 10000 ? delta + 'ms' : Math.round(delta / 1000) + 's')
}

module.exports = middleware

