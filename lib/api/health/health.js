'use strict'

// Should include latest build number and latest git commit hash
const handler = async (ctx, next) => {
  ctx.body = 'OK'

  await next()
}

module.exports = {
  method: 'get',
  path: '/health',
  handler
}
