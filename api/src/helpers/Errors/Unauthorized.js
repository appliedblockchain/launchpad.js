const BaseError = require('./BaseError')

class Unauthorized extends BaseError {
  constructor() {
    super('unauthorized')
  }
}

module.exports = Unauthorized
