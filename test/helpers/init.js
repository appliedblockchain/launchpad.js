const notALogger = require('@appliedblockchain/not-a-logger')
const { join } = require('path')

const init = ({ gas = 50000000, logger = notALogger } = {}) => {
  const { web3, accounts } = require('@appliedblockchain/cobalt/web3')({
    root: join(__dirname, '..', '..', 'contracts'),
    accounts: 10,
    logger
  })

  const addresses = accounts.map(account => account.address)
  const from = addresses[0]

  return {
    from,
    gas,
    web3
  }
}

module.exports = init
