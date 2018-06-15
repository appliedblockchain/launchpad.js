const route = require('./getLatestWriter')

const { handler } = route

const LATEST_WRITER = '0x123456789'

describe('routes/getLatestWriter', () => {
  const callMock = jest.fn(() => LATEST_WRITER)
  const getLatestWriterMock = jest.fn(() => ({
    call: callMock
  }))

  let ctx

  beforeEach(() => {
    const StoreContract = {
      methods: {
        getLatestWriter: getLatestWriterMock
      }
    }
    const contracts = { StoreContract }

    ctx = { contracts }
  })

  afterEach(() => {
    getLatestWriterMock.mockRestore()
  })

  context('handler', () => {
    it('calls the getLatestWriter contract method', async () => {
      await handler(ctx)

      expect(getLatestWriterMock).toHaveBeenCalled()
      expect(callMock).toHaveBeenCalled()
      expect(ctx.body).toEqual(LATEST_WRITER)
    })
  })
})
