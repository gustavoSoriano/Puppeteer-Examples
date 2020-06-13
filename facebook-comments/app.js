const puppeteer   = require("puppeteer")
const Pause       = _ => new Promise( res => setTimeout(() => res(true), _) )

const credentials = {
    email: "",
    pass: "",
    account: "klerison.auditore",
}

const Run = async () => {
    const navegador = await puppeteer.launch({args: ['--no-sandbox'], headless: false})
    const pagina    = await navegador.newPage() 
    await pagina.goto(`https://www.facebook.com/`)
    await Pause(3000)

    try{
        console.log('\x1b[33m%s\x1b[0m', `Realizando login...`)
        await pagina.type("#email", credentials.email)
        await pagina.type("#pass", credentials.pass)
        await pagina.click("input[type='submit']")

        await Pause(2000)
        await pagina.goto(`https://www.facebook.com/${credentials.account}`)
        console.log('\x1b[33m%s\x1b[0m', `Preparando para comentar...`)
        await Pause(5000)

        for (let i=0; i<205; i++) 
        {
            await pagina.click('._7c_r')
            await pagina.type('._7c_r', 'Comentário ' + i.toString() )
            await pagina.keyboard.press('Enter')
            await Pause(1000)
        }
    } 
    catch (err) {
        console.log('\x1b[33m%s\x1b[0m', `error na rotina: `, err.message)
    }
}
Run()    
