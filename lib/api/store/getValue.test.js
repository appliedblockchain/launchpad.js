'use strict'

const route = require('./getValue')

describe('routes/contracts', () => {
  context('#getValue()', () => {
    it('returns the value stored in the contract', async () => {
      const ctx = { body: {} }
      const next = () => new Promise(resolve => resolve())

      await route.handler(ctx, next)

      expect(ctx.body).toBe('OK')
    })

    it('calls \'get\' on the smart contract', () => {

    })
  })
})
