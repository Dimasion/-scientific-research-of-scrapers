import { scrapper } from './scrappers/puppeteer'
import { export2csv } from './utils'

(async () => {
    const start = new Date()
    const data = await scrapper({
        pages: 1,
        size: 10
    })

    await export2csv(data, 'bmw', true)
    const end = new Date() - start
    console.log('Ellapsed time:', end, 'ms')
})()
