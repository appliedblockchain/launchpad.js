const Store = artifacts.require('Store')

describe('Store', () => {
  it("should set a value", async () => {
    const value = { data: 1 }
    const stringValue = JSON.stringify(value)

    const instance = await Store.deployed()

    await instance.set(stringValue)
    const result = await instance.get()
    const parsedResult = JSON.parse(result)

    expect(parsedResult).to.deep.equal(value)
  })
})
