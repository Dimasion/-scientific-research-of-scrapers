var Crawler = require("crawler")

import {
    export2csv,
    getProductData,
    getListLinks
} from '../utils'

async function scrape (pages = 10, size = 100, brand = 'bmw') {
    const start = new Date()
    const urls = []
    const data = []
    const baseURL = 'https://auto.ria.com/car'
    const productCrawler = new Crawler({
        maxConnections: 300,
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                const url = res.request.uri.href
                console.log('DOWNLOAD', url)
                data.push({
                    itemLink: url,
                    ...getProductData(res.body)
                })
            }
            done();
        }
    })
    const listCrawler = new Crawler({
        maxConnections : 300,
        headers: {
            cookie: `ipp=${size}`
        },
        // This will be called for each crawled page
        callback : function (error, res, done) {
            if(error){
                console.log(error);
            }else{
                const url = res.request.uri.href
                console.log('DOWNLOAD', url)
                getListLinks(res.body).forEach(link => {
                    productCrawler.queue(link)
                })
            }
            done();
        }
    })

    for (let i = 1; i <= pages; i++) {
        urls.push(`${baseURL}/${brand}?page=${i}&size=${size}`)
    }

    listCrawler.queue(urls)


    productCrawler.on('drain',async () => {
        await export2csv(data, 'bmw-crawler')
        const end = new Date() - start
        console.log('Ellapsed time:', end, 'ms')
    })
}


scrape(1, 10)