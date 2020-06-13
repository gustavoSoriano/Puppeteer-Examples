const puppeteer   = require("puppeteer")

const Run = async () => {
  try{
    const navegador = await puppeteer.launch({args: ['--no-sandbox'], headless: true})
    const pagina    = await navegador.newPage() 
    await pagina.goto(`https://github.com`)
    await pagina.screenshot({path:'./github.png'})
    await navegador.close()
  } 
  catch (err) {
    console.log(`error: `, err.message)
  }
}
Run()  
