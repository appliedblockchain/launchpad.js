'use strict'

module.exports = () => {
  let contractAddresses = process.env.CONTRACT_ADDRESSES

  if (!contractAddresses) {
    throw new Error('API: could not recover addresses from the environment variable $CONTRACT_ADDRESSES')
  } else {
    contractAddresses = JSON.parse(contractAddresses)
  }

  return contractAddresses
}
