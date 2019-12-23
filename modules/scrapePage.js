import cheerio from 'cheerio'
import { str2int, replaceDots } from '../utils'
import { selectors } from '../config'

async function scrapePage (page, indexes) {
    const $ = cheerio.load(await page.content())
    let data = []

    let hrefs = []
    let productListItemsData = []

    $(selectors.productList.item).each((index, item) => {
        const href = $(item).find(selectors.productList.itemLink).attr('href')

        hrefs.push(href)
        productListItemsData.push({
            gearboxName: $(item).find(selectors.productList.gearboxName).text().trim(),
            fuelName: $(item).find(selectors.productList.fuelName).text().trim(),
            location: $(item).find(selectors.productList.location).text().trim(),
            race: $(item).find(selectors.productList.race).text().trim()
        })
    })

    for (let index = 0; index < hrefs.length; index++) {
        await page.goto(hrefs[index])
        const $ = cheerio.load(await page.content())
        const title = $(selectors.productItem.title).attr('title')
        const titleParts = title.split(' ')

        $(selectors.productItem.description).find('br').replaceWith('\n')

        const fullData = {
            title: title,
            year: str2int(titleParts[titleParts.length - 1]),
            markName: $(selectors.productItem.markName).text(),
            modelName: $(selectors.productItem.modelName).text(),
            uah: str2int($(selectors.productItem.uah).text()),
            ...productListItemsData[index],
            category: replaceDots($(selectors.productItem.category).text()),
            color: $(selectors.productItem.color)
            ? $(selectors.productItem.color).parent('.argument').text().trim()
            : '',
            phone: $(selectors.productItem.phone).data('phone-number'),
            description: $(selectors.productItem.description).text(),
        }
        
        if (indexes) {
            console.log(`Page ${indexes[0]} of ${indexes[1]} - Item ${index + 1} of ${hrefs.length}`)
        }

        data.push(fullData)
    }

    return data
}

export { scrapePage }