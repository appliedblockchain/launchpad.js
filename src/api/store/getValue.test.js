const route = require('./getValue')

const { handler } = route

const RESPONSE_DATA = { data: 'SOME DATA' }

describe('routes/getValue', () => {
  const callMock = jest.fn(() => RESPONSE_DATA)
  const getMock = jest.fn(() => ({
    call: callMock
  }))
  const okMock = jest.fn()

  let ctx

  beforeEach(() => {
    const StoreContract = {
      methods: {
        get: getMock
      }
    }
    const contracts = { StoreContract }

    ctx = { contracts, ok: okMock }
  })

  afterEach(() => {
    getMock.mockRestore()
  })

  context('handler', () => {
    it('calls the set contract method', async () => {
      await handler(ctx)

      expect(getMock).toHaveBeenCalled()
      expect(callMock).toHaveBeenCalled()
      expect(okMock).toHaveBeenCalledWith({ result: RESPONSE_DATA })
    })
  })
})
