"use strict";

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const baseURL = 'https://auto.ria.com/car';

async function scrape(pages = 1, size = 10, brand = 'bmw') {
  const start = new Date();
  const listTextPromises = [];
  const listPromises = [];
  const productTextPromises = [];
  const productPromises = [];

  for (let i = 1; i <= pages; i++) {
    const paginationURL = `${baseURL}/${brand}?page=${i}&size=${size}`;
    listPromises.push((0, _nodeFetch.default)(paginationURL, {
      headers: {
        cookie: `ipp=${size}`
      }
    }));
  }

  console.log('Downloading LIST pages...');
  const listResponses = await Promise.all(listPromises);

  for (let i = 0; i < listResponses.length; i++) {
    listTextPromises.push(listResponses[i].text().then(text => (0, _utils.getListLinks)(text)));
  }

  const listLinksResponse = await Promise.all(listTextPromises);
  console.log('Parsed LIST pages...');

  for (let i = 0; i < listLinksResponse.length; i++) {
    listLinksResponse[i].forEach(link => {
      productPromises.push((0, _nodeFetch.default)(link));
    });
  }

  console.log('Downloading PRODUCT pages...');
  const productResponses = await Promise.all(productPromises);

  for (let i = 0; i < productResponses.length; i++) {
    productTextPromises.push(productResponses[i].text().then(text => {
      return {
        itemLink: productResponses[i].url,
        ...(0, _utils.getProductData)(text)
      };
    }));
  }

  const productDataResponses = await Promise.all(productTextPromises);
  console.log('Parsed PRODUCT pages.');
  await (0, _utils.export2csv)(productDataResponses, 'bmw-own');
  const end = new Date() - start;
  console.log('Ellapsed time:', end, 'ms');
}

scrape();