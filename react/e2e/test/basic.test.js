const TEST_URL = process.env.TEST_URL || 'http://localhost'

let page
describe('Launchpad', () => {
  beforeAll(async () => {
    page = await global.__BROWSER__.newPage();
    await page.goto(TEST_URL);
  });

  it('should be titled "Launchpad"', async () => {
    await expect(page.title()).resolves.toMatch('Launchpad');
  });

  it ('should contain a link to the mantle-demo', async () => {
    await page.click(".App-link")
  })
});
