const fs = require('fs')

const readFileContents = (path, callback) => {
  try {
    const filename = require.resolve(path)
    fs.readFile(filename, 'utf8', callback)
  } catch (e) {
    callback(e)
  }
}

module.exports = readFileContents
