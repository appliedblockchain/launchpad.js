
// const Register = require('prom-client').register
// var Counter = require('prom-client').Counter
// var Histogram = require('prom-client').Histogram
// var Summary = require('prom-client').Summary
const { register, Counter, Histogram, Summary } = require('prom-client')

const responseTime = require('response-time')

/**
 * A Prometheus counter that counts the invocations of the different HTTP verbs
 * e.g. a GET and a POST call will be counted as 2 different calls
 */
const numOfRequests = new Counter({
  name: 'numOfRequests',
  help: 'Number of requests made',
  labelNames: [ 'method' ]
})

const pathsTaken = new Counter({
  name: 'pathsTaken',
  help: 'Paths taken in the app',
  labelNames: [ 'path' ]
})

const responses = new Summary({
  name: 'responses',
  help: 'Response time in millis',
  labelNames: [ 'method', 'path', 'status' ]
})

const startCollection = () => {
  // Logger.log(Logger.LOG_INFO, `Starting the collection of metrics, the metrics are available on /metrics`);
  require('prom-client').collectDefaultMetrics()
}

const requestCounters = (ctx, next) => {
  if (ctx.req.path !== '/metrics') {
    numOfRequests.inc({ method: ctx.req.method })
    pathsTaken.inc({ path: ctx.req.path })
  }
  next()
}

const responseCounters = responseTime((ctx, time) => {
  if (ctx.path.url !== '/metrics') {
    responses.labels(ctx.req.method, ctx.req.url, ctx.res.statusCode).observe(time)
  }
})

const injectMetricsRouter = async (ctx, next) => {

  // const { method, url } = ctx.request
  // ignore the url using pattern
  // const ignore = shouldIgnoreRequest(url);

  if (ctx.path === '/metrics') {
    ctx.set('Content-Type', register.contentType)
    ctx.body = register.metrics()
  } else {
    console.log('path', ctx.path)
    next()
  }
}

const mantleCounter = new Counter({
  name: 'mantle_custom_metrics',
  help: 'Total number of checkouts',
  labelNames: [ 'mantle_custom_metrics_label' ]
})

module.exports.numOfRequests = numOfRequests
module.exports.pathsTaken = pathsTaken
module.exports.responses = responses
module.exports.startCollection = startCollection
module.exports.requestCounters = requestCounters
module.exports.responseCounters = responseCounters
module.exports.injectMetricsRouter = injectMetricsRouter
module.exports.mantleCounter = mantleCounter
