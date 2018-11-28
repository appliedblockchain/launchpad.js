const puppeteer = require('puppeteer')

let browser
let page

describe('load mnenomic', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto('http://localhost:3000/load-mnemonic')
  })

  it('type mnemonic and proceed', async() => {
    await page.type('#mnemonic', 'autumn liar roast east brain hawk fiction typical flower radio lock affair')
    await page.click('button[type=submit]')
  })

  afterAll(async () => {
    browser.close()
  })
})
