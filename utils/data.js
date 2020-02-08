import cheerio from 'cheerio'
import { str2int, replaceDots } from './index'
import { selectors } from '../config'

function getListData (html) {
    const $ = cheerio.load(html)
    let productListItemsData = []

    $(selectors.productList.item).each((index, item) => {
        productListItemsData.push({
            gearboxName: $(item).find(selectors.productList.gearboxName).text().trim(),
            fuelName: $(item).find(selectors.productList.fuelName).text().trim(),
            location: $(item).find(selectors.productList.location).text().trim(),
            race: $(item).find(selectors.productList.race).text().trim()
        })
    })

    return productListItemsData
}

function getListLinks (html) {
    const $ = cheerio.load(html)
    let hrefs = []

    $(selectors.productList.item).each((index, item) => {
        const href = $(item).find(selectors.productList.itemLink).attr('href')
        hrefs.push(href)
    })

    return hrefs
}

function getProductData (html) {
    const $ = cheerio.load(html)
    const title = $(selectors.productItem.title).attr('title') || $(selectors.productItem.title).text()
    const titleParts = title.split(' ')

    const data = {
        title: title,
        year: titleParts ? str2int(titleParts[titleParts.length - 1]) : '',
        markName: $(selectors.productItem.markName).text() || $(selectors.productItem.markName2).text(),
        modelName: $(selectors.productItem.modelName).text() || $(selectors.productItem.modelName2).text(),
        uah: str2int($(selectors.productItem.uah).text()),
        category: replaceDots($(selectors.productItem.category).text()),
        color: $(selectors.productItem.color)
        ? $(selectors.productItem.color).parent('.argument').text().trim()
        : '',
        phone: $(selectors.productItem.phone).data('phone-number') || '',
        description: $(selectors.productItem.description).text() || $(selectors.productItem.description2).text(),
    }

    return data
}

export { getProductData, getListLinks, getListData }