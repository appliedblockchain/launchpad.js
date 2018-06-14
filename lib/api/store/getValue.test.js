const route = require('./getValue')

const { requestHandler } = route

const RESPONSE_DATA = { data: 'SOME DATA' }

describe('routes/getValue', () => {
  const callMock = jest.fn(() => RESPONSE_DATA)
  const getMock = jest.fn(() => ({
    call: callMock
  }))

  let contract
  let ctx

  beforeEach(() => {
    ctx = {}
    contract = {
      methods: {
        get: getMock
      }
    }
  })

  afterEach(() => {
    getMock.mockRestore()
  })

  context('requestHandler', () => {
    it('calls the set contract method', async () => {
      await requestHandler(ctx, contract)

      expect(getMock).toHaveBeenCalled()
      expect(callMock).toHaveBeenCalled()
      expect(ctx.body).toEqual(RESPONSE_DATA)
    })
  })
})
