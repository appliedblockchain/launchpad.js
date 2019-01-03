const BaseError = require('./BaseError')

class Forbidden extends BaseError {
  constructor() {
    super('forbidden')
  }
}

module.exports = Forbidden
