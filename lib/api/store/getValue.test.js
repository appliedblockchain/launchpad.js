'use strict'

const route = require('./getValue')

describe('routes/contracts', () => {
  context('#getValue()', () => {
    it('returns the value stored in the contract', async () => {
      const ctx = { body: {} }
      await route.handler(ctx)

      expect(ctx.body).toBe('STORE')
    })
  })
})
