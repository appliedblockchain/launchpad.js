const BaseError = require('./BaseError')
const DataNotFound = require('./DataNotFound')
const InternalServerError = require('./InternalServerError')
const Forbidden = require('./Forbidden')
const Unauthorized = require('./Unauthorized')

module.exports = {
  BaseError,
  DataNotFound,
  InternalServerError,
  Forbidden,
  Unauthorized
}
