import { scrapeBmwCars } from './scappers'
import { export2csv } from './utils'

(async () => {
    const data = await scrapeBmwCars({
        pages: 20,
        size: 100
    })

    await export2csv(data, 'bmw')
})()
