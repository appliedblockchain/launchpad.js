/**
 * Usage:
 * Read contracts addresses from consul, outputs a string:
 * node contract-addresses read
 *
 * Write contract addresses to consul:
 * node contract-addresses write '0x...'
 */

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const { initConsul } = require('./lib/ab-consul')
const { HOST, CONSUL_TOKEN, KEY_NAME } = require('./config/consul-config.js')
const consul = initConsul(HOST, CONSUL_TOKEN)
const { getPeers, kvExists, getKv, setKv } = require('./lib/ab-consul-promisify')(consul)

const command = process.argv[2]
const contractAddresses = process.argv[3]

class CommandNotSupportedError extends Error { }
class ContractAddressesNotFoundError extends Error { }
class ConsulWriteError extends Error { }

if (command !== 'read' && command !== 'write') {
  throw new CommandNotSupportedError('Please specify "read" or "write" as first argument.')
}

if (command === 'write') {
  if (contractAddresses === undefined) {
    throw new ContractAddressesNotFoundError('Please specify a parameter containing \'{ "contractName": "0xAddress" }\' for each of your contracts (JSON format)')
  }
}

const readAddresses = async () => {
  const keyExists = await kvExists(KEY_NAME)
  if (keyExists) {
    const contractAddresses = await getKv(KEY_NAME)
    console.log(contractAddresses)
  } else {
    console.error(`Consul key '${KEY_NAME}' doesn't exist`)
  }
}

const writeAddresses = async (contractAddresses) => {
  const success = await setKv(KEY_NAME, contractAddresses)
  if (success) {
    console.log('OK\n"contract_addresses" have been written successfully in Consul.')
  } else {
    throw new ConsulWriteError('You weren\'t able to write to consul. Please check your \'CONSUL_TOKEN\' id and its relative ACL permissions.')
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

    if (command === 'read') {
      await readAddresses()
    }

    if (command === 'write') {
      await writeAddresses(contractAddresses)
    }
  } catch (err) {
    console.error(err)
  }
})()
