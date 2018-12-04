const createServer = require('./server')
const config = require('config')

const PORT = config.get('PORT')

const runApp = async contractAddress => {
  const app = await createServer(contractAddress)
  await app.listen(PORT)
}

module.exports = runApp

