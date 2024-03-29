const { prisma } = require("../db");
const xlsx = require("xlsx");
const fs = require("fs");
// const jsonObject = require('/data.json')
// const getDataFromDatabase = async (req, res) => {
//   const dataScore = await prisma.test.findMany({
//     // where: {
        
//     //     station_Id:  req.body.station_id,
        
        
//     // },
//     select:{
//         station_Id:true,
//         station_name:true,
//         station_teacher:true,
        
//         student_id:true,
//         name:true,
        
        
//         test_number:true,
//         test_name:true,
//         score:true
//     },

      
// })
    

//     const jsonData = JSON.stringify(dataScore);
//     await fs.promises.writeFile("data.json", jsonData);
//     console.log("JSON file saved");
  
//     const workbook = xlsx.utils.book_new();
//     const sheet = xlsx.utils.sheet_add_json(workbook.Sheets["Sheet1"], dataScore, {

//       origin: "A2",
//     });
    
//     const headers = Object.keys(dataScore[0]);
//     headers.forEach((header, index) => {
//       const cellAddress = xlsx.utils.encode_cell({ row: 1, col: index });
//       sheet[cellAddress] = { t: "s", v: header };
//     });
//     // Set column width
//     sheet["!cols"] = [{ width: 5 }, { width: 20 }, { width: 20 },{ width: 10 }, { width: 20 }, { width: 5 },{ width: 15 },{ width: 5 }];
    
//     xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");
  
//     const excelData = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
//     await fs.promises.writeFile("data_Allstation_Score.xlsx", excelData);
//     //await fs.promises.sendFile("data_station_Score.xls", excelData);
//     console.log("Excel file saved");

//     res.setHeader("Content-Type", "application/vnd.ms-excel");
//     res.setHeader("Content-Disposition", "attachment; filename=data_Allstation_Score.xlsx");
//     res.download("data_Allstation_Score.xlsx")

//     res.sendStatus(200);

//   };
const getDataFromDatabase = async (req, res) => {
  const dataScore = await prisma.test.findMany({
    // your database query here
  });

  // create a new workbook
  const workbook = xlsx.utils.book_new();

  // convert your data to an array of arrays (2D array)
  const data = dataScore.map((item) => [
    item.station_Id,
    item.station_name,
    item.station_teacher,
    item.student_id,
    item.name,
    item.test_number,
    item.test_name,
    item.score,
  ]);

  // create a new worksheet and add the data to it
  const worksheet = xlsx.utils.aoa_to_sheet([
    ["Station ID", "Station Name", "Station Teacher", "Student ID", "Name", "Test Number", "Test Name", "Score"],
    ...data,
  ]);

  // add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, "Test Scores");

  // generate the Excel file buffer
  const excelBuffer = xlsx.write(workbook, { type: "buffer" });

  // set the response headers to indicate that a file is being downloaded
  res.setHeader("Content-Disposition", "attachment; filename=TestScores.xlsx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

  // send the Excel file buffer as the response
  res.send(excelBuffer);

  // alternatively, you can save the file to disk using the fs module
  // fs.writeFileSync("TestScores.xlsx", excelBuffer);
};
const getDataStationScore = async (req, res) => {
  const dataScore = await prisma.test.findMany({
          where: {
          
          station_teacher:  req.query.station_teacher,
          
          
      },
  });

  // create a new workbook
  const workbook = xlsx.utils.book_new();

  // convert your data to an array of arrays (2D array)
  const data = dataScore.map((item) => [
    item.station_Id,
    item.station_name,
    item.station_teacher,
    item.student_id,
    item.name,
    item.test_number,
    item.test_name,
    item.score,
  ]);

  // create a new worksheet and add the data to it
  const worksheet = xlsx.utils.aoa_to_sheet([
    ["Station ID", "Station Name", "Station Teacher", "Student ID", "Name", "Test Number", "Test Name", "Score"],
    ...data,
  ]);

  // add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, "Test Scores");

  // generate the Excel file buffer
  const excelBuffer = xlsx.write(workbook, { type: "buffer" });

  // set the response headers to indicate that a file is being downloaded
  res.setHeader("Content-Disposition", "attachment; filename=TestStationScores.xlsx");
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

  // send the Excel file buffer as the response
  res.send(excelBuffer);

  // alternatively, you can save the file to disk using the fs module
  // fs.writeFileSync("TestScores.xlsx", excelBuffer);
};
  // const getDataStationScore = async (req, res) => {
  //   const dataScore = await prisma.test.findMany({
  //     where: {
          
  //         station_Id:  req.query.station_id,
          
          
  //     },
  //     select:{
  //         station_Id:true,
  //         station_name:true,
  //         station_teacher:true,
          
  //         student_id:true,
  //         name:true,
          
          
  //         test_number:true,
  //         test_name:true,
  //         score:true
  //     },
  
        
  // })
      
  
  //     const jsonData = JSON.stringify(dataScore);
  //     await fs.promises.writeFile("data.json", jsonData);
  //     console.log("JSON file saved");
    
  //     const workbook = xlsx.utils.book_new();
  //     const sheet = xlsx.utils.sheet_add_json(workbook.Sheets["Sheet1"], dataScore, {
  
  //       origin: "A2",
  //     });
      
  //     const headers = Object.keys(dataScore[0]);
  //     headers.forEach((header, index) => {
  //       const cellAddress = xlsx.utils.encode_cell({ row: 1, col: index });
  //       sheet[cellAddress] = { t: "s", v: header };
  //     });
  //     // Set column width
  //     sheet["!cols"] = [{ width: 5 }, { width: 20 }, { width: 20 },{ width: 10 }, { width: 20 }, { width: 5 },{ width: 15 },{ width: 5 }];
      
  //     xlsx.utils.book_append_sheet(workbook, sheet, "Sheet1");
    
  //     const excelData = xlsx.write(workbook, { type: "buffer", bookType: "xlsx" });
  //     await fs.promises.writeFile("data_station_Score.xlsx", excelData);
  //     //await fs.promises.sendFile("data_station_Score.xls", excelData);
  //     console.log("Excel file saved");
  
  //     res.setHeader("Content-Type", "application/vnd.ms-excel");
  //     res.setHeader("Content-Disposition", "attachment; filename=data_station_Score.xlsx");
  //     res.download("data_station_Score.xlsx")
  
  //     res.sendStatus(200);
  
  //   };


module.exports = {getDataFromDatabase,getDataStationScore,}
