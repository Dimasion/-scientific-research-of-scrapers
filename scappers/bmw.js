import cheerio from 'cheerio'

import { createBrowser, str2int } from '../utils'
import { URLs, selectors } from '../config'

import { scrapePage } from '../modules'

async function scrapeBmwCars (paramOptions) {
    let scrapperData = []

    const defaultOptions = { pages: 10, size: 100 }
    const options = { ...defaultOptions, ...paramOptions }

    const url = page => `${URLs.bmw}?page=${page}&size=${options.size}`

    const browser = await createBrowser()
    const page = await browser.newPage()
    
    await page.goto(url(1))

    const $ = cheerio.load(await page.content())
    const lastPageCount = str2int($(selectors.productList.lastPaginationItem).text())
    const lastPage = options.pages > lastPageCount ? lastPageCount : options.pages

    const firstPageData = await scrapePage(page, [1, lastPage])

    scrapperData.push(...firstPageData)

    for (let index = 2; index <= lastPage; index++) {
        await page.goto(url(index))
        const data = await scrapePage(page, [index, lastPage])

        scrapperData.push(...data)
    }

    await browser.close()

    return scrapperData
}

export { scrapeBmwCars }