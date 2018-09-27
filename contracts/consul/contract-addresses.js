// Usage:
//
// Read contracts addresses from consul, outputs a JSON string:
//
//    node contract-addresses read
//
//
// Write contract addresses JSON to consul:
//
//    node contract-addresses write '{ "ContractOne": "0xAddress", "ContractTwo": "0xAddressTwo" }'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const { initConsul } = require('./lib/ab-consul')

const { HOST, CONSUL_TOKEN, KEY_NAME } = require('./config/consul-config.js')

const consul = initConsul(HOST, CONSUL_TOKEN)

const { getPeers, kvExists, getKv, setKv } = require('./lib/ab-consul-promisify')(consul)

const command = process.argv[2]
const contractAddressesJSON = process.argv[3]

class CommandNotSupportedError extends Error { }
class ContractAddressesJSONNotFoundError extends Error { }
class ContractAddressesJSONParseError extends Error { }
class ConsulWriteError extends Error { }

if (command !== 'read' && command !== 'write') {
  throw new CommandNotSupportedError('Please specify "read" or "write" as first argument.')
}

let contractAddresses
if (command === 'write') {
  if (contractAddressesJSON === undefined) {
    throw new ContractAddressesJSONNotFoundError('Please specify a parameter containing \'{ "contractName": "0xAddress" }\' for each of your contracts (JSON format)')
  }

  contractAddresses = contractAddressesJSON
  // try {
  //   contractAddresses = JSON.parse(contractAddressesJSON)
  // } catch (e) {
  //   throw new ContractAddressesJSONParseError('Please specify a valid JSON as parameter containing \'{ "contractName": "0xAddress" }\' for each of your contracts')
  // }
}

const readAddresses = async () => {
  const keyExists = await kvExists(KEY_NAME)
  if (keyExists) {
    const contractAddresses = await getKv(KEY_NAME)
    console.log(contractAddresses)
} else {
    console.error(`Consul key '${KEY_NAME}' doesn't exists`)
  }
}

const writeAddresses = async (contractAddresses) => {
  // const contractAddressesJSON = JSON.stringify(contractAddresses, null, 2)
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
