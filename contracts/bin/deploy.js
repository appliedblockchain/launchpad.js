/* eslint no-useless-constructor: "off" */
'use strict'

const { readdirSync, readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const Web3 = require('web3')

const contractsDirectory = join(__dirname, '../build/contracts')
const contractsFilenames = readdirSync(contractsDirectory).filter(f => /\.json$/.test(f))

const config = require('config')
const PROVIDER = config.provider || process.env.PROVIDER

class ContractNotFoundError extends Error {}

const addContract = (contracts, contractFilePath) => {
  const fileString = readFileSync(join(contractsDirectory, contractFilePath))
  try {
    const contract = JSON.parse(fileString)
    const name = contract.contractName
    console.log(`loaded contract: ${name}`)
    contracts[name] = contract
    return contracts
  } catch (err) {
    console.error(`Can not parse contract JSON info - path: ${contractFilePath}`)
    console.log('exiting...')
    process.exit(1)
  }
}

const buildSendParams = (defaultAddress) => {
  const from = process.env.DEFAULT_ADDRESS || process.env.ETH_ADDRESS || process.env.FROM || defaultAddress

  return {
    from,
    gas: 50000000
  }
}

const deployContracts = async ({ ctrNames, contracts, defaultAddress, eth }) => {
  const contractABIs = {}
  for (let i = 0; i < ctrNames.length; i++) {
    const contractName = ctrNames[i]
    console.log(`Deploying contract: ${contractName}....\n`)

    if (contractName === 'Migrations') {
      continue
    }

    const { abi, bytecode } = contracts[contractName]
    const sendParams = buildSendParams(defaultAddress)

    let contract = new eth.Contract(abi, { from: sendParams.from, data: bytecode })
    contract = await contract.deploy().send(sendParams)

    contractABIs[contractName] = { abi, address: contract.options.address, name: contractName }
  }
  return contractABIs
}

const deploy = () => {
  const contracts = contractsFilenames.reduce((contracts, file) => {
    return addContract(contracts, file)
  }, {})

  ;(async () => {
    const provider = new Web3.providers.HttpProvider(PROVIDER)
    const web3 = new Web3(provider)
    const { eth } = web3

    try {
      // load default address (ethereum account)
      const defaultAddress = await web3.eth.getCoinbase()
      console.log(`current 'from' address: ${defaultAddress} (coinbase)`)
      // load a specific address:
      //    const address = await web3.eth.getAccounts()[0]
      //    console.log(`current 'from' address: ${address}`)

      const ctrNames = Object.keys(contracts)
      console.log(`Contracts deployment - contracts: ${ctrNames.join(', ')}`)

      const contractABIs = await deployContracts({ ctrNames, contracts, defaultAddress, eth })
      console.log('Contracts deployed!\n')

      const contractsAbiJSON = JSON.stringify(contractABIs, null, 2)
      const path = join(__dirname, '../build/contractABIs.json')
      writeFileSync(path, contractsAbiJSON)
      console.log(`Contract ABIs saved: ${path}`)

      const contractAddresses = ctrNames.reduce((infos, contract) => {
        const info = contractABIs[contract]
        infos[info.name] = info.address
        return infos
      }, {})
      const ctrAddrsJSON = JSON.stringify(contractAddresses)
      const pathSh = join(__dirname, '../build/contractAddresses.json')
      writeFileSync(pathSh, ctrAddrsJSON)
      console.log(`Contract addresses saved: ${pathSh}`)
    } catch (err) {
      if (err.message === 'Invalid JSON RPC response: ""') {
        console.error('Error: Unable to connect to network, is parity running?')
      } else {
        console.error(err)
      }
    }
  })()
}

const checkContracts = () => {
  if (contractsFilenames.length === 0) {
    throw new ContractNotFoundError('Contracts not found, you should run "npm run compile"')
  }
}

const main = () => {
  checkContracts()

  console.log('deployment started...')
  deploy()
}

main()
