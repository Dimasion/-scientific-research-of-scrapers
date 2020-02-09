const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path')

async function export2csv (data, filename = 'out', isAdditional, rootPath = './csv') {

  let header = [
    {id: 'itemLink', title: 'Посилання'},
    {id: 'markName', title: 'Марка авто'},
    {id: 'modelName', title: 'Модель авто'},
    {id: 'title', title: 'Титул'},
    {id: 'year', title: 'Рік'},
    {id: 'uah', title: 'Ціна'},
    {id: 'category', title: 'Тип авто'},
    {id: 'phone', title: 'Контактний телефон'},
    {id: 'color', title: 'Колір'},
    {id: 'description', title: 'Опис'},
  ]

  let additional = [
    {id: 'race', title: 'Пробіг'},
    {id: 'location', title: 'Локація'},
    {id: 'fuelName', title: 'Двигун'},
    {id: 'gearboxName', title: 'Коробка передач'},
  ]

  if (isAdditional) {
    header = header.concat(additional)
  }


  const csvWriter = createCsvWriter({
    path: path.join(rootPath, `${filename}.csv`),
    header
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
