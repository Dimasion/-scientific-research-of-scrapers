import fetch from 'node-fetch'
import {
    export2csv,
    getProductData,
    getListLinks
} from '../utils'

const baseURL = 'https://auto.ria.com/car'

async function scrape (pages = 10, size = 100, brand = 'bmw') {
    const start = new Date()

    let data = []

    for (let i = 1; i <= pages; i++) {
        const paginationURL = `${baseURL}/${brand}?page=${i}&size=${size}`

        console.log('DOWNLOAD', paginationURL)
        const content = await fetch(paginationURL, {
            headers: {
                cookie: `ipp=${size}`
            }
        }).then(res => res.text())

        const links = getListLinks(content)

        for (let j = 0; j < links.length; j++) {
            console.log('DOWNLOAD', links[j])
            const content = await fetch(links[j]).then(res => res.text())

            data.push({
                itemLink: links[j],
                ...getProductData(content)
            })
        }
    }

    await export2csv(data, 'bmw-own-sync')

    const end = new Date() - start
    console.log('Ellapsed time:', end, 'ms')
}

scrape()
