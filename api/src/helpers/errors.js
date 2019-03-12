'use strict'

/**
 *  Create custom errors here
 */

exports.ForbiddenError = class ForbiddenError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'ForbiddenError'
    this.status = 403
    Error.captureStackTrace(this, ForbiddenError)
  }
}


exports.BadRequestError = class BadRequestError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'BadRequestError'
    this.status = 400
    Error.captureStackTrace(this, BadRequestError)
  }
}

exports.NotFoundError = class NotFoundError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'NotFoundError'
    this.status = 404
    this.message = this.message || 'Not Found'
    Error.captureStackTrace(this, NotFoundError)
  }
}

exports.InternalServerError = class InternalServerError extends Error {
  constructor(...args) {
    super(...args)
    this.name = 'InternalServerError'
    this.status = 500
    this.message = this.message || 'Not Found'
    Error.captureStackTrace(this, InternalServerError)
  }
}
