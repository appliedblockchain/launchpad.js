
const puppeteer = require('puppeteer')

let browser
let page

describe('start page', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch()
    page = await browser.newPage()
    await page.goto('http://localhost:3000/')
  })

  it('has two buttons with', async() => {
    const isExistsGenerateMnemonicBtn = await page.$eval('#btnGenerateMnemonic', el => !!el)
    expect(isExistsGenerateMnemonicBtn).toBe(true)

    const isExistLoadMnemonicBtn = await page.$eval('#btnLoadMnemonic', el => !!el)
    expect(isExistLoadMnemonicBtn).toBe(true)
  })

  afterAll(async () => {
    browser.close()
  })
})
