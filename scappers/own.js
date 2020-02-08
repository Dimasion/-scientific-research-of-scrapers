import fetch from 'node-fetch'
import {
    export2csv,
    getProductData,
    getListLinks
} from '../utils'

const baseURL = 'https://auto.ria.com/car'

async function scrape (pages = 100, size = 100, brand = 'bmw') {
    const start = new Date()

    const listTextPromises = []
    const listPromises = []

    const productTextPromises = []
    const productPromises = []


    for (let i = 1; i <= pages; i++) {
        const paginationURL = `${baseURL}/${brand}?page=${i}&size=${size}`
        listPromises.push(fetch(paginationURL, {
            headers: {
                cookie: `ipp=${size}`
            }
        }))
    }
    console.log('Downloading LIST pages...')
    const listResponses = await Promise.all(listPromises)

    for (let i = 0; i < listResponses.length; i++) {
        listTextPromises.push(listResponses[i].text().then(text => getListLinks(text)))
    }
    const listLinksResponse = await Promise.all(listTextPromises)

    console.log('Parsed LIST pages...')

    for (let i = 0; i < listLinksResponse.length; i++) {
        listLinksResponse[i].forEach(link => {
            productPromises.push(fetch(link))
        })
    }
    
    console.log('Downloading PRODUCT pages...')
    const productResponses = await Promise.all(productPromises)

    for (let i = 0; i < productResponses.length; i++) {
        productTextPromises.push(productResponses[i].text().then(text => {
            return {
                itemLink: productResponses[i].url,
                ...getProductData(text)
            }
        }))
    }
    const productDataResponses = await Promise.all(productTextPromises)

    console.log('Parsed PRODUCT pages.')

    await export2csv(productDataResponses, 'bmw-own')

    const end = new Date() - start
    console.log('Ellapsed time:', end, 'ms')
}

scrape()