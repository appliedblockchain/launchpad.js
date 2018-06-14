'use strict'

const route = require('./health')

describe('routes/health', () => {
  context('#get()', () => {
    test('returns body', async () => {
      const ctx = { body: {} }
      await route.handler(ctx)

      expect(ctx.body).toBe('OK')
    })
  })
})
