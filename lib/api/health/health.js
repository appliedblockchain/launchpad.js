'use strict'

// Should include latest build number and latest git commit hash
const handler = async (ctx) => {
  ctx.body = 'OK'
}

module.exports = {
  method: 'GET',
  path: '/health',
  handler
}
