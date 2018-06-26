
const assignToContext = (properties) => {
  return async (ctx, next) => {
    Object.assign(ctx, properties)

    await next()
  }
}

module.exports = assignToContext
