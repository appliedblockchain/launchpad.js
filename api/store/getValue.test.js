'use strict'

const route = require('./getValue')

describe('routes/contracts', () => {
  context('#getValue()', () => {
    test('returns the value stored in the contract', async () => {
      const ctx = { body: {} }
      const next = () => new Promise(resolve => resolve())

      await route.handler(ctx, next)

      expect(ctx.body).toBe('OK')
    })
  })
})
