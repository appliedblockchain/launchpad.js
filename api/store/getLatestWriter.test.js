'use strict'

const route = require('./getLatestWriter')

describe('routes/contracts', () => {
  context('#getLatestWriter()', () => {
    test('returns the id of the last person who wrote to the contract', async () => {
      const ctx = { body: {} }
      const next = () => new Promise(resolve => resolve())

      await route.handler(ctx, next)

      expect(ctx.body).toBe('someId0x12345')
    })
  })
})
