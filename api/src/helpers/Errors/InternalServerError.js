const BaseError = require('./BaseError')

class InternalServerError extends BaseError {
  constructor() {
    super('internal')
  }
}

module.exports = InternalServerError
