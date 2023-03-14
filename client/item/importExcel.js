import * as XLSX from "xlsx";
import React, { useState, useEffect } from "react";
function ImportExcelPage() {
  const [excelData, setExcelData] = useState(null);
  function handleFileUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const data = event.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(sheetData);
      // TODO: Do something with the sheet data
    };

    reader.readAsBinaryString(file);
  }
  useEffect(() => {
    if (excelData) {
      const id = 0; // assuming the name is in the first column
      const name = 1; // assuming the email is in the second column

      //   const mappedData = excelData.slice(1).map((row) => ({
      // student_id: row[id],
      // student_name: row[name],

      //   }));

      const mappedData = excelData.map((row) => ({
        student_id: row[id],
        student_name: row[name],
      }));

      console.log(mappedData);
    }
  }, [excelData]);

  return (
    <div className="flex flex-col ">
      <h1 className="text-right">Import Excel Page</h1>
      <input className=" ml-auto" type="file" onChange={handleFileUpload} />
    </div>
  );
}

export default ImportExcelPage;
