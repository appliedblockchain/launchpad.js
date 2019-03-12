/**
 * BaseError is base custom error
 **/
const ERRORS = require('./errorCodes')

class BaseError extends Error {
  constructor(code, extra = {}) {
    const err = ERRORS[code]
    if (!err) {
      throw new ReferenceError(`Unknown error code ${code}`)
    }

    super(err.message)
    this.code = code
    this.status = err.status
    this.description = err.description
    this.extra = extra // optional additional error information if required
  }

  /* @name handleErrorResponse (static)
   * @desc handles response
   *
   * @ctx {object} Context object from koa
   * @err {object} Error object */
  static handleErrorResponse(ctx, err) {

    // if instanceof error is not Base Error
    if (!(err instanceof this)) {
      err = new BaseError('error')
    }
    ctx.status = err.status

    // if error does not have toJSON function
    ctx.body = err.toJson ? err.toJson(ctx) : {
      error: {
        name: err.constructor.name,
        message: err.message,
        requestId: ctx.logger.defaultMeta.requestId
      }
    }
  }

  /* @name toJson
   * @desc return error as json object
   * @return JSON */
  toJson(ctx) {
    const { code, status, message, description, extra } = this
    const result = {
      code,
      status,
      message,
      description,
      extra
    }

    if (ctx && ctx.logger && ctx.logger.defaultMeta) {
      result.requestId = ctx.logger.defaultMeta.requestId
    }


    return result
  }
}

module.exports = BaseError
