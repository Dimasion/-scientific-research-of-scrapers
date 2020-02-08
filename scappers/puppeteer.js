import {
    createBrowser,
    getProductData,
    getListLinks,
    getListData
} from '../utils'

import { URLs } from '../config'

async function scrapper (options = {
    pages: 10,
    size: 10
}) {
    let scrapperData = []

    const url = page => `${URLs.bmw}?page=${page}&size=${options.size}`

    const browser = await createBrowser()
    const page = await browser.newPage()

    for (let i = 1; i <= options.pages; i++) {
        const href = url(i)
        let data = []

        console.log('Downloading LIST page:', href)
        await page.setCookie({
            name: 'ipp',
            value: options.size.toString(),
            url: href
        })
        await page.goto(href)
        const listPageContent = await page.content()
        const hrefs = getListLinks(listPageContent)
        const listData = getListData(listPageContent)

        console.log('Paesed LIST page:', href)

        for (let j = 0; j < hrefs.length; j++) {
            console.log('Downloading PRODUCT page:', hrefs[j])

            await page.goto(hrefs[j])
            const productPageContent = await page.content()
        
            console.log('Parsed PRODUCT page:', hrefs[j])
            data.push({
                itemLink: hrefs[j],
                ...getProductData(productPageContent),
                ...listData[j]
            })
        }

        scrapperData.push(...data)
    }

    await browser.close()

    return scrapperData
}

export { scrapper }