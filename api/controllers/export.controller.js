
const {prisma} = require('../db')
const xlsx = require('xlsx')
const fs = require('fs')

const getDataFromDatabase = async (req,res)=>{
    const tests = await prisma.test.findMany({})
    
    res.json(tests)
}
async function generateExcel() {
  const data = await getDataFromDatabase() // query the database to get the data

  const sheet = xlsx.utils.json_to_sheet(data)

  const workbook = xlsx.utils.book_new()
  xlsx.utils.book_append_sheet(workbook, sheet, 'Sheet1')

  const excelData = xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' })

  const fileName = 'data.xlsx'
  fs.writeFile(fileName, excelData, (err) => {
    if (err) {
      console.error(err)
    } else {
      console.log(`Excel file saved as ${fileName}`)
    }
  })
}

module.exports = { generateExcel}