"use strict";

var _utils = require("../utils");

var Crawler = require("crawler");

async function scrape(pages = 1, size = 1, brand = 'bmw') {
  const start = new Date();
  const urls = [];
  const data = [];
  const baseURL = 'https://auto.ria.com/car';
  const productCrawler = new Crawler({
    maxConnections: 10,
    jQuery: false,
    // This will be called for each crawled page
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const url = res.request.uri.href;
        console.log('DOWNLOAD', url);
        data.push({
          itemLink: url,
          ...(0, _utils.getProductData)(res.body)
        });
      }

      done();
    }
  });
  const listCrawler = new Crawler({
    maxConnections: 10,
    jQuery: false,
    headers: {
      cookie: `ipp=${size}`
    },
    // This will be called for each crawled page
    callback: function (error, res, done) {
      if (error) {
        console.log(error);
      } else {
        const url = res.request.uri.href;
        console.log('DOWNLOAD', url);
        (0, _utils.getListLinks)(res.body).forEach(link => {
          productCrawler.queue(link);
        });
      }

      done();
    }
  });

  for (let i = 1; i <= pages; i++) {
    urls.push(`${baseURL}/${brand}?page=${i}&size=${size}`);
  }

  listCrawler.queue(urls);
  productCrawler.on('drain', async () => {
    await (0, _utils.export2csv)(data, 'bmw-crawler');
    const end = new Date() - start;
    console.log('Ellapsed time:', end, 'ms');
  });
}

scrape(1, 100);