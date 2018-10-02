process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const { initConsul } = require('./lib/ab-consul')
const { HOST, CONSUL_TOKEN, KEY_NAME } = require('./config/consul-config.js')
const consul = initConsul(HOST, CONSUL_TOKEN)
const { getPeers, kvExists, getKv, setKv } = require('./lib/ab-consul-promisify')(consul)

const command = process.argv[2]
const containerHostName = process.argv[3]

class CommandNotSupportedError extends Error { }
class ContainerHostNameNotFoundError extends Error { }
class ConsulWriteError extends Error { }

if (command !== 'try-acquire' && command !== 'check') {
  throw new CommandNotSupportedError('Please specify "try-acquire" or "check" as first argument.')
}

const tryToAcquireLock = async () => {
  if (containerHostName === undefined) {
    throw new ContainerHostNameNotFoundError('Please specify a container hostname after your command - note: You can get the container hostname via "echo $HOSTNAME"')
  }

  const success = await setKv(KEY_NAME, containerHostName)
  if (success) {
    console.log('OK\n"contract_addresses" have been written successfully in Consul.')
  } else {
    throw new ConsulWriteError('You weren\'t able to write to consul. Please check your \'CONSUL_TOKEN\' id and its relative ACL permissions.')
  }
}

const checkLock = async () => {
  const keyExists = await kvExists(KEY_NAME)
  if (keyExists) {
    const key = await getKv(KEY_NAME)
    console.log(key)
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
      await checkLock()
    }
  } catch (err) {
    console.error(err)
  }
})()
