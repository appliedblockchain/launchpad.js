'use strict'

const { version, name } = require('../package.json')

module.exports = {
  baseSpec: {
    info: {
      title: name,
      description: '',
      version
    },
    basePath: '/',
    tags: []
  },
  specOptions: {
    defaultResponses: {}
  }
}
