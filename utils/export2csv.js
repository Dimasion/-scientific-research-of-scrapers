const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path')

async function export2csv (data, filename = 'out', rootPath = './csv') {
  const csvWriter = createCsvWriter({
    path: path.join(rootPath, `${filename}.csv`),
    header: [
      {id: 'markName', title: 'Марка авто'},
      {id: 'modelName', title: 'Модель авто'},
      {id: 'uah', title: 'Ціна'},
      {id: 'year', title: 'Рік'},
      {id: 'race', title: 'Пробіг'},
      {id: 'location', title: 'Локація'},
      {id: 'fuelName', title: 'Двигун'},
      {id: 'category', title: 'Тип авто'},
      {id: 'gearboxName', title: 'Коробка передач'},
      {id: 'phone', title: 'Контактний телефон'},
      {id: 'title', title: 'Титул'},
      {id: 'description', title: 'Опис'},
    ]
  })

  return new Promise(resolve => {
    csvWriter
      .writeRecords(data)
      .then(() => {
        resolve()
        console.log('The CSV file was written successfully')
      })
  })
}

export { export2csv }