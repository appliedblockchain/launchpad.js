process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const { initConsul } = require('./lib/ab-consul')

const { HOST, CONSUL_TOKEN, KEY_NAME } = require('./config/consul-config.js')

const consul = initConsul(HOST, CONSUL_TOKEN)

const { getPeers, kvExists, getKv, setKv } = require('./lib/ab-consul-promisify')(consul)

const command = process.argv[2]
const containerName = process.argv[3]

class CommandNotSupportedError extends Error { }
class ContainerNameNotFoundError extends Error { }
class ConsulWriteError extends Error { }

if (command !== 'read' && command !== 'write') {
  throw new CommandNotSupportedError('Please specify "try-acquire" or "check" as first argument.')
}

if (containerName === undefined) {
  throw new ContainerNameNotFoundError('Please specify a container name after your command - note: You can get the contanier name simply via `whoami`')
}

const tryToAcquireLock = async (contractAddresses) => {
  const contractAddressesJSON = JSON.stringify(contractAddresses, null, 2)
  const success = await setKv(KEY_NAME, contractAddressesJSON)
  if (success) {
    console.log('OK\n"contract_addresses" have been written successfully in Consul.')
  } else {
    throw new ConsulWriteError('You weren\'t able to write to consul. Please check your \'CONSUL_TOKEN\' id and its relative ACL permissions.')
  }
}

const checkLock = async () => {
  const keyExists = await kvExists(KEY_NAME)
  if (keyExists) {
    const test = await getKv(KEY_NAME)
    console.log(test)
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

    if (command === 'try-acquire') {
      await tryToAcquireLock()
    }

    if (command === 'check') {
      await checkLock(contractAddresses)
    }

  } catch (err) {
    console.error(err)
  }
})()
