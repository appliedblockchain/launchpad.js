'use strict'

const route = require('./putValue')
const { DEFAULT_GAS_AMOUNT } = require('../../constants')

const { handler } = route

const REQUEST_DATA = { data: 'SOME DATA' }

describe('routes/putValue', () => {
  const sendMock = jest.fn()
  const setMock = jest.fn(() => ({
    send: sendMock
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
      expect(sendMock).toHaveBeenCalledWith({
        gas: DEFAULT_GAS_AMOUNT
      })
    })
  })
})
