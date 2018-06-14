'use strict'

const route = require('./putValue')
const { StoreContract, address } = require('../../setupWeb3')

describe('routes/contracts', () => {

  context('#putValue()', () => {
    it('puts a value to the contract', async () => {
      const request = {
        body: {
          data: 'SOME DATA'
        }
      }

      console.log('address', await address())
      console.log('StoreContract', StoreContract)

      const ctx = { request }
      await route.handler(ctx)

      expect(address).toHaveBeenCalled()
      expect(StoreContract.methods.set).toHaveBeenCalled()

      expect(ctx.body).toBe('OK')
    })
  })
})
