"use strict";

var _puppeteer = require("./scrappers/puppeteer");

var _utils = require("./utils");

(async () => {
  const start = new Date();
  const data = await (0, _puppeteer.scrapper)({
    pages: 2,
    size: 20
  });
  await (0, _utils.export2csv)(data, 'bmw', true);
  const end = new Date() - start;
  console.log('Ellapsed time:', end, 'ms');
})();