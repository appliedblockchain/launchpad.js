'use strict'

const route = require('./getLatestWriter')

describe('routes/contracts', () => {
  context('#getLatestWriter()', () => {
    it('returns the id of the last person who wrote to the contract', async () => {
      const ctx = { body: {} }
      await route.handler(ctx)

      expect(ctx.body).toBe('someId0x12345')
    })
  })
})
