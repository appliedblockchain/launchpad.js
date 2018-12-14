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
    // TOOD: handle error respones
    console.log('Error', err)
  }

  /* @name toJson
   * @desc return error as json object
   * @return JSON */
  toJson() {
    const { code, status, message, description, extra } = this
    return {
      code,
      status,
      message,
      description,
      extra
    }
  }
}

module.exports = BaseError
