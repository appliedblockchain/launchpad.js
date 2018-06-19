const path = require('path')
const fs = require('fs')
const rootDir = path.dirname(require.main.filename)

const readFileContents = (path, callback) => {
  const filePath = `${rootDir}${path}`

  try {
    const filename = require.resolve(filePath)
    fs.readFile(filename, 'utf8', callback)
  } catch (e) {
    callback(e)
  }
}

module.exports = readFileContents
