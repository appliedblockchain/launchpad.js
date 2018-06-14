'use strict'

const route = require('./putValue')
const { DEFAULT_GAS_AMOUNT } = require('../../constants')

const { requestHandler } = route

const FROM_ADDRESS = '0x12345'
const REQUEST_DATA = { data: 'SOME DATA' }

describe('routes/putValue', () => {
  const addressMock = jest.fn(() => FROM_ADDRESS)
  const sendMock = jest.fn()
  const setMock = jest.fn(() => ({
    send: sendMock
  }))

  let address
  let contract
  let ctx

  beforeEach(() => {
    const request = {
      body: {
        data: REQUEST_DATA
      }
    }
    ctx = { request }
    address = addressMock
    contract = {
      methods: {
        set: setMock
      }
    }
  })

  afterEach(() => {
    addressMock.mockRestore()
    setMock.mockRestore()
  })

  context('requestHandler', () => {
    it('calls the set contract method', async () => {
      await requestHandler(ctx, contract, address)

      expect(addressMock).toHaveBeenCalled()
      expect(setMock).toHaveBeenCalledWith(REQUEST_DATA)
      expect(sendMock).toHaveBeenCalledWith({
        from: FROM_ADDRESS,
        gas: DEFAULT_GAS_AMOUNT
      })
    })
  })
})
