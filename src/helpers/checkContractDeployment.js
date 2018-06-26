'use strict'

const assert = require('assert')

const checkContractDeployment = async (web3, contractAddress, contractName) => {
  assert(contractAddress, `No address for ${contractName} given`)

  const code = await web3.eth.getCode(contractAddress)

  assert(
    code !== '0x0' && code !== '0x',
    `No code at the specified contract address for ${contractName}.`
  )
}

module.exports = checkContractDeployment
