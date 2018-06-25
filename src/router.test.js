const http = require('http')
const request = require('supertest')
const Koa = require('koa')
const koaRouter = require('koa-joi-router')
const app = new Koa()

const router = koaRouter()

router.get('/', async ctx => {
  ctx.body = {
    data: 'Sending some JSON'
  }
})
app.use(router.middleware())

const server = http.createServer(app.callback())

// const createServer = require('./server')

// let app
//
// describe('GET /health', () => {
//   beforeAll(async () => {
//     const testContractAddress = '0xe3CD7E8bf081c2839B856be723b36F7C809468bA'
//
//     app = await createServer(testContractAddress)
//   })
//
//   afterAll(async () => {
//     await app.close()
//   })
//
//   it('responds with the current contract address', async () => {
//     expect.assertions(1)
//     const response = await request(app).get('/health')
//
//     expect(response.status).toEqual(200)
//     //
//     // .expect('Content-Type', /json/)
//     // .expect(200)
//     // .then(response => {
//     //   expect(response.status).toEqual(200)
//     // })
//   })
// })


describe('GET /health', () => {
  afterAll(async () => {
    try {
      await server.close()
    } catch (err) {
      console.log('Err', err)
    }
  })

  it('should work', async () => {
    const response = await request(server)
      .get('/')
      .set('Accept', 'application/json')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body.data).toEqual('Sending some JSON')
  })
})
