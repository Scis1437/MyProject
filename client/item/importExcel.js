// import * as XLSX from "xlsx";
import xlsx from "xlsx";
import React, { useState, useEffect } from "react";

function ImportExcelPage() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const xlsx = require('xlsx');
  const handleFile = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const workbook = xlsx.read(content, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
        const attributeNames = sheetData[0];
        const dataRows = sheetData.slice(1);
        const dataArray = dataRows.map((row) =>
          row.reduce((obj, value, index) => {
            obj[attributeNames[index]] = value;
            return obj;
          }, {})
        );
        setData(dataArray);
      };
      reader.readAsBinaryString(files[0]);
    }       

  };
   console.log(data) 
  return (
    <div>
      <input type="file" onChange={handleFile} />
      {/* {data.length > 0 && (
        <table>
          <thead>
            <tr>{data[0].map((cell, i) => <th key={i}>{cell}</th>)}</tr>
          </thead>
          <tbody>
            {data.slice(1).map((row, i) => (
              <tr key={i}>
                {row.map((cell, j) => (
                  <td key={j}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )} */}
    </div>
  );
}



export default ImportExcelPage;
