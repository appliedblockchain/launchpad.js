const init = require('./helpers/init')

const { from, gas, web3 } = init()

web3.require('Store.sol')

describe('Store', () => {
  const data = 'someData0x12345'
  let Store

  afterAll(async () => {
    web3.close()
  })

  it('deploys', async () => {
    Store = await web3.deploy('Store', [], { from, gas })

    expect(typeof Store.options.address).toBe('string')
    expect(Store.options.address.length > 1).toBe(true)
  })

  it('sets a value', async () => {
    await Store.methods.set(data).send({ from, gas })

    const result = await Store.methods.get().call()

    expect(result).toEqual(data)
  })

  it('stored the latest writer to the contract', async () => {
    await Store.methods.set(data).send({ from, gas })

    const result = await Store.methods.getLatestWriter().call()

    expect(result).toEqual(from)
  })
})
