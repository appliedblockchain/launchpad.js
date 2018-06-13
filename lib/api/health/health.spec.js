'use strict'

const route = require('./health')

describe('routes/health', () => {
  context('#get()', () => {
    test('returns body', async () => {
      const ctx = { body: {} }
      const next = () => new Promise(resolve => resolve())

      await route.handler(ctx, next)

      expect(ctx.body).toBe('OK')
    })
  })
})
