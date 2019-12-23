const URLs = {
    home: 'https://auto.ria.com',
    bmw: 'https://auto.ria.com/car/bmw'
}

const selectors = {
    productItem: {
        title: '#heading-cars > div > h1',
        usd: 'section.price > .price_value > strong',
        eur: 'section.price > .price_value--additional > span:nth-child(1) > span',
        uah: 'section.price > .price_value--additional > span:nth-child(3) > span',
        phone: '#phonesBlock > div > span',
        description: '#full-description',
        color: '#description_v3 .car-color',
        markName: '#breadcrumbs > div:nth-child(4) > a > span',
        modelName: '#breadcrumbs > div:nth-child(5) > a > span',
        category: '#description_v3 > dl > dd:nth-child(1)'
    },

    productList: {
        item: 'section.ticket-item',
        itemLink: 'div.content-bar > div.content > div.head-ticket > div > a',
        lastPaginationItem: '#pagination > nav > span:nth-child(8) > a',
        race: '.content-bar > div.content > div.definition-data > ul > li:nth-child(1)',
        fuelName: '.content-bar > div.content > div.definition-data > ul > li:nth-child(3)',
        gearboxName: '.content-bar > div.content > div.definition-data > ul > li:nth-child(4)',
        location: '.content-bar > div.content > div.definition-data > ul > li.item-char.view-location'
    }
}

export { URLs, selectors }