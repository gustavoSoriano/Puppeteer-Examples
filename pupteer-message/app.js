const puppeteer = require("puppeteer")
const _number   = "+55 16 99765-9374"
const _message  = "E ai, beleza?"

const Awating = async (page, element, message) => {
  console.log(message)
  await page.waitFor(2000)
  if( !await page.$(element) )return await Awating(page, element, message)
}

async function Run() {
  const browser = await puppeteer.launch({args: ['--no-sandbox'], headless: false})
  const page    = await browser.newPage()

  await page.setViewport({ width: 0, height: 0 })
  await page.goto("https://web.whatsapp.com", { waitUntil: "networkidle0" })
  await Awating( page, "#pane-side", "Awaiting Scan..." )

  await page.goto(`https://web.whatsapp.com/send?phone=${_number}&text=${_message}`)
  await Awating( page, 'div[title="Anexar"]', "Awaiting Chat..." )

  await page.click('div[title="Anexar"]')
  await Awating( page, "input[accept]", "Awaiting Upload..." )

  const imageInput = await page.$("input[accept]")
  await page.screenshot({path:'./image.png'})
  await imageInput.uploadFile("./image.png")

  await Awating( page, 'span[data-icon="send"]', "Awaiting Send..." )
  await page.click('span[data-icon="send"]')
  
  await page.waitFor(1000)
  await browser.close()
}
Run()
