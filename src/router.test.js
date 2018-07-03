const request = require('supertest')
const setupAppForTest = require('../test/utils.js')
const { API_PREFIX } = require('./constants')

let app

describe('router', () => {
  beforeAll(async () => {
    app = await setupAppForTest()
  })

  afterAll(async () => {
    await app.close()
  })

  describe(`${API_PREFIX} (root)`, () => {
    describe('GET', () => {
      it('returns 200', async () => {
        const { status, body } = await request(app)
          .get(API_PREFIX)

        expect(status).toEqual(200)
        expect(body).toEqual({ message: 'hello world' })
      })
    })

    describe('/store', () => {
      const requestData = {
        data: { name: 'foo', email: 'bar' }
      }

      describe('POST', () => {
        it('posts data to the smart contract', async () => {
          const { status, body } = await request(app)
            .post(`${API_PREFIX}/store`)
            .send(requestData)

          expect(status).toEqual(200)
          expect(body).toEqual({ message: 'Data set successfully' })
        })
      })
    })
  })
})
