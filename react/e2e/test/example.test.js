const TEST_URL = process.env.TEST_URL || 'http://localhost'

let page
describe('Application', () => {

  beforeAll(async () => {
    page = await global.__BROWSER__.newPage()
    await page.goto(TEST_URL)
  })

  it('should render a home page', async () => {
    // your test code here
  })

})
