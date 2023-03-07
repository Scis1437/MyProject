const { prisma } = require("../db");
const xlsx = require("xlsx");
const fs = require("fs");
// const jsonObject = require('/data.json')
const getDataFromDatabase = async (req, res) => {
  const dataScore = await prisma.test.findMany({
    // where: {
        
    //     station_Id:  req.body.station_id,
        
        
    // },
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
    const sheet = xlsx.utils.sheet_add_json(workbook.Sheets["Sheet1"], dataScore, {

      origin: "A2",
    });
    
    const headers = Object.keys(dataScore[0]);
    headers.forEach((header, index) => {
      const cellAddress = xlsx.utils.encode_cell({ row: 1, col: index });
      sheet[cellAddress] = { t: "s", v: header };
    });
    // Set column width
    sheet["!cols"] = [{ width: 5 }, { width: 20 }, { width: 20 },{ width: 10 }, { width: 20 }, { width: 5 },{ width: 15 },{ width: 5 }];
    
    xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");
  
    const excelData = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
    await fs.promises.writeFile("data_Allstation_Score.xlsx", excelData);
    //await fs.promises.sendFile("data_station_Score.xls", excelData);
    console.log("Excel file saved");

    res.setHeader("Content-Type", "application/vnd.ms-excel");
    res.setHeader("Content-Disposition", "attachment; filename=data_Allstation_Score.xlsx");
    res.download("data_Allstation_Score.xlsx")

    res.sendStatus(200);

  };

  const getDataStationScore = async (req, res) => {
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
      const sheet = xlsx.utils.sheet_add_json(workbook.Sheets["Sheet1"], dataScore, {
  
        origin: "A2",
      });
      
      const headers = Object.keys(dataScore[0]);
      headers.forEach((header, index) => {
        const cellAddress = xlsx.utils.encode_cell({ row: 1, col: index });
        sheet[cellAddress] = { t: "s", v: header };
      });
      // Set column width
      sheet["!cols"] = [{ width: 5 }, { width: 20 }, { width: 20 },{ width: 10 }, { width: 20 }, { width: 5 },{ width: 15 },{ width: 5 }];
      
      xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");
    
      const excelData = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
      await fs.promises.writeFile("data_station_Score.xlsx", excelData);
      //await fs.promises.sendFile("data_station_Score.xls", excelData);
      console.log("Excel file saved");
  
      res.setHeader("Content-Type", "application/vnd.ms-excel");
      res.setHeader("Content-Disposition", "attachment; filename=data_station_Score.xlsx");
      res.download("data_station_Score.xlsx")
  
      res.sendStatus(200);
  
    };


module.exports = {getDataFromDatabase,getDataStationScore,}
