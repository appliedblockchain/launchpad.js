'use strict'

const route = require('./putValue')

describe('routes/contracts', () => {
  context('#putValue()', () => {
    it('returns the value stored in the contract', async () => {
      const ctx = { body: {} }
      await route.handler(ctx)

      expect(ctx.body).toBe('OK')
    })
  })
})
