// import * as XLSX from "xlsx";
import xlsx from "xlsx";
import axios from "axios";
import React, { useState, useEffect } from "react";

function ImportExcelPage({ setNewUser }) {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [errMsg, setErrMsg] = useState();
  const XLSX = require("xlsx");

  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const saveStudentData = async () => {
    // const studentData = data.map((student) => ({
    //   id: student.id,
    //   name: student.name,
    // }));
    console.log(`received: ${JSON.stringify(data)}`);
    try {
      const response = await axios.post(
        "https://my-project-ppdr.vercel.app/import-student",
        data, // Wrap the array in an object with a 'data' field
        config // Define the 'config' object with any necessary options
      );
      console.log(`response: ${JSON.stringify(response.data)}`);

      setNewUser(true);
    } catch (error) {
      setErrMsg("Error Save Data ");
    }
  };

  const handleFile = (e) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        const workbook = XLSX.read(content, { type: "binary" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        const attributeNames = sheetData[0];
        const dataRows = sheetData.slice(1);
        const dataArray = dataRows.map((row) =>
          row.reduce((obj, value, index) => {
            obj[attributeNames[index]] = index === 0 ? String(value) : value;
            return obj;
          }, {})
        );

        saveStudentData(dataArray);
        setData(dataArray);
      };
      reader.readAsBinaryString(files[0]);
    }
  };

  return (
    <div>
      <div className="flex">
        <input
          id="file_input"
          type="file"
          class="block text-sm text-sefid-white bg-gray-light border border-gray-300 
            rounded-lg cursor-pointer w-full focus:outline-none  file:bg-gray
             "
          onChange={(e) => handleFile(e)}
        ></input>
        <button className="import-btn" onClick={saveStudentData}>
          {" "}
          import
        </button>
      </div>{" "}
      <p>{errMsg}</p>
    </div>
  );
}

export default ImportExcelPage;
