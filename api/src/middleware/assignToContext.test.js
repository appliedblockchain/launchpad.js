const assignToContext = require('./assignToContext')

let properties
let contracts
let web3

describe('assignToContext()', () => {
  beforeAll(() => {
    contracts = [ 'NotesContract', 'ExampleContract' ]
    web3 = () => {}
    properties = {
      contracts,
      web3
    }
  })

  it('assigns a set of properties to the context object', async () => {
    const ctx = {}
    const next = () => {}

    const initialCall = assignToContext(properties)
    await initialCall(ctx, next)

    expect(ctx).toEqual(properties)
  })
})
