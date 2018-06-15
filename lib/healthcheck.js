const { healthcheck: abHealthcheck } = require('@appliedblockchain/koa-healthcheck')

const healthcheck = (contractAddress) => {
  return abHealthcheck({
    custom: {
      storeContractAddress: contractAddress
    }
  })
}

module.exports = healthcheck
