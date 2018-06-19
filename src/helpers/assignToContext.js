
const assignToContext = (properties) => {
  return async (ctx, next) => {
    Object.assign(ctx, properties)

    next()
  }
}

module.exports = assignToContext
