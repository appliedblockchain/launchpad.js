process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const { initConsul } = require('./lib/ab-consul')
const { HOST, CONSUL_TOKEN } = require('./config/consul-config')
const consul = initConsul(HOST, CONSUL_TOKEN)
const { getPeers, kvExists, getKv, setKv } = require('./lib/ab-consul-promisify')(consul)

const command = process.argv[2]
const key = process.argv[3]
const value = process.argv[4]

if (command !== 'set-key-value' && command !== 'get-key-value') {
  throw new Error('Please specify "set-key-value" or "get-key-value" as first argument.')
}

if (!key) {
  throw new Error(`Unable to perform ${command} operation: no key supplied`)
}

if (key.indexOf('mantle-development/') !== 0) {
  throw new Error(`Invalid key: supplied ${key}, expected a key with prefix "mantle-development/"`)
}

const setKeyValue = async () => {
  if (value === undefined) {
    throw new Error(`Unable to set ${key}: no value supplied`)
  }

  const success = await setKv(key, value)
  if (success) {
    console.log(`OK\n${key} set successfully`)
  } else {
    throw new Error('Unable to write to consul. Please check your "CONSUL_TOKEN" and its relative ACL permissions')
  }
}

const getKeyValue = async () => {
  const keyExists = await kvExists(key)
  if (keyExists) {
    const retrievedKey = await getKv(key)
    console.log(retrievedKey)
  } else {
    throw new Error(`Consul key ${key} does not exist`)
  }
}

const checkConnection = async () => {
  const peers = await getPeers()
  if (process.env.DEBUG !== undefined) {
    console.log(`consul is online - ${peers.length} peers`)
  }
}

;(async () => {
  try {
    await checkConnection()

    if (command === 'set-key-value') {
      await setKeyValue()
    }

    if (command === 'get-key-value') {
      await getKeyValue()
    }
  } catch (err) {
    console.error(err)
  }
})()
