const request = require('supertest')
const createServer = require('./server')
const {
  GIT_COMMIT_SHA_DEFAULT,
  GIT_TAG_DEFAULT
} = require('./healthcheck')

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

  describe('/health', () => {
    describe('GET', () => {
      it('responds with the current contract address', async () => {
        const { status, body } = await request(app)
          .get('/health')
          .expect('Content-Type', /json/)

        expect(status).toEqual(200)
        expect(body).toEqual({
          storeContractAddress: contractAddress,
          commit: GIT_COMMIT_SHA_DEFAULT,
          tag: GIT_TAG_DEFAULT
        })
      })
    })
  })
})
