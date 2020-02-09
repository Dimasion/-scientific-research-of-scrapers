"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBrowser = createBrowser;

const puppeteer = require('puppeteer');

async function createBrowser(params = {
  headless: true
}) {
  return puppeteer.launch(params);
}