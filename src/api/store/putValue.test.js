'use strict'

const route = require('./putValue')

const { handler } = route

const REQUEST_DATA = { data: 'SOME DATA' }

describe('routes/putValue', () => {
  const estimatedGasUsage = 5000
  const sendMock = jest.fn()
  const estimateGasMock = jest.fn(() => estimatedGasUsage)
  const setMock = jest.fn(() => ({
    send: sendMock,
    estimateGas: estimateGasMock
  }))

  let ctx

  beforeEach(() => {
    const request = {
      body: {
        data: REQUEST_DATA
      }
    }
    const StoreContract = {
      methods: {
        set: setMock
      }
    }
    const contracts = { StoreContract }

    ctx = { contracts, request }
  })

  afterEach(() => {
    setMock.mockRestore()
  })

  context('handler', () => {
    it('calls the set contract method', async () => {
      await handler(ctx)

      expect(setMock).toHaveBeenCalledWith(REQUEST_DATA)
      expect(estimateGasMock).toHaveBeenCalled()
      expect(sendMock).toHaveBeenCalledWith({
        gas: estimatedGasUsage
      })
    })
  })
})
