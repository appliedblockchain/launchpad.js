const { register, Counter, Summary } = require('prom-client')

const numOfRequests = new Counter({
  name: 'mantle_num_of_requests',
  help: 'Number of requests made',
  labelNames: [ 'method' ]
})

const pathsTaken = new Counter({
  name: 'mantle_path_taken',
  help: 'Paths taken in the app',
  labelNames: [ 'path' ]
})

const responses = new Summary({
  name: 'mantle_responses',
  help: 'Response time in millis',
  labelNames: [ 'method', 'path', 'status' ]
})

const startCollection = () => {
  require('prom-client').collectDefaultMetrics()
}

const requestCounters = async (ctx, next) => {
  if (ctx.path !== '/metrics') {
    numOfRequests.inc({ method: ctx.method })
    pathsTaken.inc({ path: ctx.path })
  }
  await next()
}

const responseCounters = async (ctx, next) => {
  const started = Date.now()
  await next()
  if (ctx.path !== '/metrics') {
    const elapsed = (Date.now() - started)
    responses.labels(ctx.method, ctx.url, ctx.status).observe(elapsed)
  }

}

const injectMetricsRouter = async (ctx, next) => {
  if (ctx.path === '/metrics') {
    ctx.set('Content-Type', register.contentType)
    ctx.body = register.metrics()
  } else {
    await next()
  }
}

module.exports = {
  numOfRequests,
  pathsTaken,
  responses,
  startCollection,
  requestCounters,
  responseCounters,
  injectMetricsRouter
}
