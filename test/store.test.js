const { join } = require('path')
const { web3, accounts } = require('@appliedblockchain/cobalt/web3')({
  root: join(__dirname, '..', 'contracts'),
  accounts: 10,
  logger: console
})

const addresses = accounts.map(account => account.address)
const from = addresses[0]
const gas = 50000000

// Compile one or more sol files.
web3.require('Store.sol')

afterAll(async () => {
  web3.close()
})

describe('Store', () => {
  let Store

  it('deploys', async () => {
    Store = await web3.deploy('Store', [], { from, gas })

    expect(typeof Store.options.address).toBe('string')
    expect(Store.options.address.length > 1).toBe(true)
  })

  it('sets a value', async () => {
    const data = 'someData0x12345'
    await Store.methods.set(data).send({ from, gas })

    const result = await Store.methods.get().call()

    expect(result).toEqual(data)
  })
})
