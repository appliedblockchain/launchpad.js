const BaseError = require('./BaseError')

class DataNotFound extends BaseError {
  constructor() {
    super('data_not_found')
  }
}

module.exports = DataNotFound
