const { prisma } = require("../db");
const xlsx = require("xlsx");
const fs = require("fs");
// const jsonObject = require('/data.json')
const getDataFromDatabase = async (req, res) => {
  const dataScore = await prisma.test.findMany({
    where: {
        
        station_Id:  req.body.station_id,
        
        
    },
    select:{
        station_Id:true,
        station_name:true,
        station_teacher:true,
        
        student_id:true,
        name:true,
        
        
        test_number:true,
        test_name:true,
        score:true
    },

      
})
    

    const jsonData = JSON.stringify(dataScore);
    await fs.promises.writeFile("data.json", jsonData);
    console.log("JSON file saved");
  
    const workbook = xlsx.utils.book_new();
    const sheet = xlsx.utils.json_to_sheet(dataScore);
  
    xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");
  
    const excelData = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
    await fs.promises.writeFile("data_station_Score.xlsx", excelData);
    console.log("Excel file saved");
    res.attachment("data.xlsx");
    res.sendStatus(200);
  };
module.exports = {getDataFromDatabase}
