"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductData = getProductData;
exports.getListLinks = getListLinks;
exports.getListData = getListData;

var _cheerio = _interopRequireDefault(require("cheerio"));

var _index = require("./index");

var _config = require("../config");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getListData(html) {
  const $ = _cheerio.default.load(html);

  let productListItemsData = [];
  $(_config.selectors.productList.item).each((index, item) => {
    productListItemsData.push({
      gearboxName: $(item).find(_config.selectors.productList.gearboxName).text().trim(),
      fuelName: $(item).find(_config.selectors.productList.fuelName).text().trim(),
      location: $(item).find(_config.selectors.productList.location).text().trim(),
      race: $(item).find(_config.selectors.productList.race).text().trim()
    });
  });
  return productListItemsData;
}

function getListLinks(html) {
  const $ = _cheerio.default.load(html);

  let hrefs = [];
  $(_config.selectors.productList.item).each((index, item) => {
    const href = $(item).find(_config.selectors.productList.itemLink).attr('href');
    hrefs.push(href);
  });
  return hrefs;
}

function getProductData(html) {
  const $ = _cheerio.default.load(html);

  const title = $(_config.selectors.productItem.title).attr('title') || $(_config.selectors.productItem.title).text();
  const titleParts = title.split(' ');
  const data = {
    title: title,
    year: titleParts ? (0, _index.str2int)(titleParts[titleParts.length - 1]) : '',
    markName: $(_config.selectors.productItem.markName).text() || $(_config.selectors.productItem.markName2).text(),
    modelName: $(_config.selectors.productItem.modelName).text() || $(_config.selectors.productItem.modelName2).text(),
    uah: (0, _index.str2int)($(_config.selectors.productItem.uah).text()),
    category: (0, _index.replaceDots)($(_config.selectors.productItem.category).text()),
    color: $(_config.selectors.productItem.color) ? $(_config.selectors.productItem.color).parent('.argument').text().trim() : '',
    phone: $(_config.selectors.productItem.phone).data('phone-number') || '',
    description: $(_config.selectors.productItem.description).text() || $(_config.selectors.productItem.description2).text()
  };
  return data;
}