'use strict'

const getValue = require('./getValue')
const putValue = require('./putValue')
const getLatestWriter = require('./getLatestWriter')

module.exports = [
  getValue,
  putValue,
  getLatestWriter
]
