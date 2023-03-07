import useScanDetection from "use-scan-detection";
import React, { useState, useEffect } from "react";
import Scanner from "./Scanner";
import { Fab, TextareaAutosize, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Link from "next/link";
import Redirect from "./Redirect";
import { useRouter } from "next/router";
import axios from "axios";
const station = [
  { station: "Hisstory talking patient ", status: "Complete", method: "point" },
  { station: "Peptic ulcer ", status: "Incomplete", method: "pass/fail" },
  { station: "Palpation of the thyroid", status: "Complete", method: "point" },
  { station: "Palpation of the thyroid", status: "Complete", method: "point" },
  { station: "Palpation of the thyroid", status: "Complete", method: "point" },
  { station: "Palpation of the thyroid", status: "Complete", method: "point" },
  { station: "Palpation of the thyroid", status: "Complete", method: "point" },
  {
    station: "community-acquired pneumonia",
    status: "Incomplete",
    method: "pass/fail",
  },
];


function Gradding({ station, status, studentCode, method }) {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleOnClick = () => {
    if (status === "Complete") {
      console.log("This station already graded");
    } else {
      setRedirecting(true);
    }
  };

  if (redirecting) {
    router.push({
      pathname: "/menu/gradding/gradding",
      query: { station, studentCode, method },
    });
    return null;
  }

  return (
    <tr
      className="bg-gray-100 mx-4  odd:bg-table-odd even:bg-slate-50cursor-pointer"
      onClick={handleOnClick}
    >
      <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {station}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
        {status}
      </td>
    </tr>
  );
}


function scanBarcode() {
  const [results, setResults] = useState([]);
  const [studentCode, setStudentCode] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if (shouldRedirect) {
    return (
      <Redirect to="/menu/gradding/selectStation" studentCode={data} />
    );
  }

  
    const [studentData, setStudentData] = useState([]);
    const [data , setData] = useState();
    const fetchStudent = async () => {
      let token;
      if (typeof localStorage !== "undefined") {
        token = localStorage.getItem("access");
      }
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      try {
        const response = await axios.get(
          `http://localhost:9000/student/`,
          config
        );
  
        setStudentData(response.data);
      } catch (error) {
        setError("Error searching for student data");
      }
    };
    useEffect(() => {
      fetchStudent();
    }, []);
    if (shouldRedirect) {
      return <Redirect to="/menu/gradding/gradding" />;
    }

    const searchStudent = async (e) => {
      e.preventDefault();    
 
      const studentId = studentCode;

      const student = studentData.find((student) => student.id === studentId)

        setData(student)

    }
   
  
  const handleScan = (result) => {
    let code = result.codeResult.code;
    code = String(code).slice(4, -1);
    setStudentCode(code);

  };


  return (
    <div className="h-10 flex flex-col justify-center">
      <Scanner onDetected={handleScan} />
      <div className="flex flex-col  justify-center w-full">
        {/* <p>{results[0] ? results[0].codeResult.code : "No data scanned"}</p> */}
        <div
          className="flex 
          justify-center w-full"
        >
          {/* <p className="text-sm md:text-m">
            student code : {results[0] ? results[0].codeResult.code : ""}{" "}
          </p>
          <input
            id="student_code"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
          />
          <button className="btn" onClick={() => setShouldRedirect(true)}>
            confirm
          </button> */}
        </div>
        <div>
        <div>
          <div className="flex">
          <p>student code :</p>{" "}
        <input
          id="student_code"
          value={studentCode}
          onChange={(e) => setStudentCode(e.target.value)}
        />
   <button className="btn" onClick={(e) => searchStudent(e)}>
          confirm
        </button>
          </div>
  
          <p>student name : {data?.name}</p>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="w-full rounded-lg bg-gray ">
              <th className="rounded-tl-lg text-sm  md:text-lg font-medium text-gray-900 px-6 py-4 ">
                Station
              </th>
              <th className="rounded-tr-lg text-sm  md:text-lg font-medium text-gray-900 px-6 py-4 ">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {station.map((item, index) => (
              <Gradding
                key={index}
                station={item.station}
                status={item.status}
                studentCode={studentCode}
                method={item.method}
                
              />
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default scanBarcode;
