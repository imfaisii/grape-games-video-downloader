const puppeteer = require('puppeteer')
var userAgent = require('user-agents');

try {
  (async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setUserAgent(userAgent.random().toString())
    await page.setViewport({ width: 1280, height: 800 })
    await page.goto('https://turquoise.health/providers', { waitUntil: 'networkidle2' })

    console.log("waiting for 15 seconds")

    await new Promise(r => setTimeout(r, 15000));

    if (await page.$("#checkbox") !== null) {
      //hcaptcha
      console.log("hcaptcha")
      // cf-chl-widget-jsjzo
    } else if (await page.$("iframe") !== null) {
      // cloudflare
      console.log("cloudflare")

      const iframeElement = await page.$('iframe');
      const frame = await iframeElement.contentFrame();
      await frame.$eval('input[type=checkbox]', input => input.click());

      console.log("clicked")
    }
    else console.log('both not found');

    console.log("done")

    // await browser.close()

  })()
} catch (err) {
  console.error(err)
}