const Store = artifacts.require('Store')

describe('Store', async () => {
  it("should set a value", async (accounts) => {
    const value = { thing: 1 }
    console.log('HIT', accounts)
    const instance = await Store.deployed()
    console.log('INSTANCE', instance)
    const balance = await instance.set(value).call(accounts[0])

    assert.equal(balance.valueOf(), value)
  })
})
