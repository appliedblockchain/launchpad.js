const puppeteer = require('puppeteer')

let browser
let page

describe('generate mnemonic', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch()

    page = await browser.newPage()
    await page.goto('http://localhost:3000/generate-mnemonic')
  })

  it('generated mnemonic has 12 words', async() => {
    const mnemonic = await page.$eval('[data-testid="mnemonicContainer"]', el => el.textContent)
    const wordCount = mnemonic.match(/(\w+)\s{0,1}/g).length
    expect(wordCount).toEqual(12)
  })

  it('generate multiple unique mnemonic', async() => {
    const mnemonicArray = []
    for (let idx = 0; idx < 10; idx += 1) {
      const newMnemonic = await page.$eval('[data-testid="mnemonicContainer"]', el => el.textContent)
      mnemonicArray.push(newMnemonic)
      await page.click('[data-testid="regenerateButton"]')
    }
    const uniqueMnemonicCount = (new Set(mnemonicArray)).size
    expect(mnemonicArray.length).toEqual(uniqueMnemonicCount)
  })

  afterAll(async () => {
    browser.close()
  })
})
