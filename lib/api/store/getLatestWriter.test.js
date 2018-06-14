const route = require('./getLatestWriter')

const { requestHandler } = route

const LATEST_WRITER = '0x123456789'

describe('routes/getLatestWriter', () => {
  const callMock = jest.fn(() => LATEST_WRITER)
  const getLatestWriterMock = jest.fn(() => ({
    call: callMock
  }))

  let contract
  let ctx

  beforeEach(() => {
    ctx = {}
    contract = {
      methods: {
        getLatestWriter: getLatestWriterMock
      }
    }
  })

  afterEach(() => {
    getLatestWriterMock.mockRestore()
  })

  context('requestHandler', () => {
    it('calls the getLatestWriter contract method', async () => {
      await requestHandler(ctx, contract)

      expect(getLatestWriterMock).toHaveBeenCalled()
      expect(callMock).toHaveBeenCalled()
      expect(ctx.body).toEqual(LATEST_WRITER)
    })
  })
})
