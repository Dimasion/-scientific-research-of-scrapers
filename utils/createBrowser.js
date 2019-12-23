const puppeteer = require('puppeteer')

async function createBrowser (params = { headless: true }) {
    return puppeteer.launch(params)
}

export { createBrowser }