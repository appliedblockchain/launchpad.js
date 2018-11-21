const frontend = 'http://localhost:3000'

module.exports = async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', frontend)

  await next()
}
