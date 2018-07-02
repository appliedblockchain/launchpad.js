module.exports = (properties) => async (ctx, next) => {
  Object.assign(ctx, properties)

  await next()
}
