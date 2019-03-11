'use strict'

const fs = require('fs')
const { join } = require('path')
const fetch = require('node-fetch')
const wait = (millis) => {
  return new Promise(a => {
    setTimeout(a, millis)
  })
}

async function  makeConfig() {

  const configURL = process.env.CONFIG_URL || 'http://api:3000/api/block-explorer-config'

  let config

  let down = true
  while (down) {
    try {
      const contractsConfig = await fetch(configURL)
      config = await contractsConfig.json()
      down = false
    } catch (err) {
      console.log('Waiting for the api...')
      await wait(1000)
    }

  }

  const path = join(__dirname, '..', 'config.json')
  fs.writeFileSync(path, JSON.stringify(config, null, 2))

}

if (require.main === module) {
  makeConfig()
}

module.exports = makeConfig
