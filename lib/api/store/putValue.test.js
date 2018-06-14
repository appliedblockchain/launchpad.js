'use strict'

const route = require('./putValue')

describe('routes/contracts', () => {

  context('#putValue()', () => {
    it('puts a value to the contract', async () => {
      const request = {
        body: {
          data: 'SOME DATA'
        }
      }

      const ctx = { request }
      await route.handler(ctx)

      expect(ctx.body).toBe('OK')
    })
  })
})
