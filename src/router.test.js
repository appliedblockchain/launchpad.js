const request = require('supertest')
const createServer = require('./server')
const { API_PREFIX } = require('./constants')

let app
let contractAddress

describe('router', () => {
  beforeAll(async () => {
    contractAddress = process.env.CONTRACT_ADDRESS

    app = await createServer(contractAddress)
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

      describe('GET', () => {
        it('gets data from the smart contract', async () => {
          const { status, body } = await request(app)
            .get(`${API_PREFIX}/store`)

          expect(status).toEqual(200)
          expect(body).toEqual({ result: requestData })
        })
      })

      describe('/latestWriter', () => {
        describe('GET', () => {
          it('gets the latest writer of the contract', async () => {
            const { status, body } = await request(app)
              .get(`${API_PREFIX}/store/latestWriter`)

            expect(status).toEqual(200)
            expect(body).toEqual({ result: expect.any(String) })
          })
        })
      })
    })
  })
})
