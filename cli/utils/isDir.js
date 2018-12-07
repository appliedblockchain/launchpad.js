const fs = require('fs')

const isDir = path => {
  try {
    return fs.statSync(path).isDirectory()
  } catch (err) {
    return false
  }
}

module.exports = isDir