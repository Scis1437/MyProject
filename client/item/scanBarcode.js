import React, { useState, useEffect, useRef } from "react";
import Scanner from "./Scanner";
import Link from "next/link";
import Redirect from "./Redirect";
import { useRouter } from "next/router";
import axios, { all } from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
function ScanBarcode() {
  const [studentCode, setStudentCode] = useState("");
  const [errMsg, setErrMsg] = useState();
  const [studentData, setStudentData] = useState([]);
  const [data, setData] = useState();
  const [station, setStation] = useState();
  const [teacher, setTeacher] = useState();
  const [allStation, setAllStation] = useState();
  const [subTest, setSubtest] = useState();
  const [studentStatus, setStudentStatus] = useState("Complete");
  const parseJwt = (bearerToken) => {
    const token = bearerToken.split(" ")[1];
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  };

  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  function Gradding({ station_Id, station, studentCode }) {
    const router = useRouter();
    const [redirecting, setRedirecting] = useState(false);

    const station_name = station;



    const handleOnClick = () => {
      if (studentStatus === "Complete") {
        console.log("This station already graded");
      } else {
        setRedirecting(true);
      }
    };

    if (redirecting) {
      // console.log(redirectData)

      router.push({
        pathname: "/menu/gradding/gradding",
        query: { studentCode, station_Id, station_name },
      });

      return null;
    }

    return (
      <tr
        className="bg-gray-100 mx-4  odd:bg-table-odd even:bg-slate-50cursor-pointer"
        onClick={handleOnClick}
      >
        <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
          {station}
        </td>
        {/* className={`text-title-table text-end ${
                  items.status === "Complete" ? "text-correct-green" : "text-red-incomplete"
                }`} */}

        <td className={`text-sm font-light px-6 py-4 whitespace-nowrap text-center ${
                    studentStatus === "Complete" ? "text-correct-green" : "text-red-incomplete"
                }`}>
          {studentStatus}
        </td>
      </tr>
    );
  }

  useEffect(() => {
    const fetchTeacher = async () => {
      const user = parseJwt(`Bearer ${localStorage.getItem("access")}`);
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/teacher/`,
          config
        );
        const filterData = await response.data.filter(
          (item) => item.username === user.UserInfo.username
        );

        setTeacher(filterData);
        return filterData;
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };

    const fetchStation = async (teacher) => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/station/`,
          config
        );
        setAllStation(response.data);
        const filterData = await response.data.filter(
          (item) => item.station_teacher === teacher[0].id
        );

        setStation(filterData);
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };
    // fetchSubtest()
    Promise.all([fetchTeacher(), setTeacher()]).then(([teacher]) => {
      fetchStation(teacher);
    });
  }, []);
  // const fetchStudent = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://my-project-ppdr.vercel.app/student/`,
  //       config
  //     );

  //     setStudentData(response.data);
  //     console.log(studentData);
  //   } catch (error) {
  //     setErrMsg("Error searching for student data");
  //   }
  // };

  const searchStudent = async (e) => {
    e.preventDefault();
    try {
      const [studentResponse, testResponse] = await Promise.all([
        axios.get(`https://my-project-ppdr.vercel.app/student/${studentCode}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`https://my-project-ppdr.vercel.app/test?student_id=${studentCode}`, {
          
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      console.log(studentResponse.data);
      console.log(testResponse.data);



      const filterStudent = testResponse.data.filter(
        (item) => item.student_id === studentCode
      );
      const filterData =  filterStudent.filter(
        (item) => item.station_Id === station[0].id
      );      

     console.log(filterStudent )
      console.log(filterData)
      console.log(filterData.length === 0)
      setData(studentResponse.data);
      setSubtest(testResponse.data);


      if (filterData.length === 0) {
        setStudentStatus("Incomplete");
      }else{
             setStudentStatus("Complete");
      }
 
      console.log(filterData);
    } catch (error) {
      setErrMsg("Error searching for student data");
    }


  };

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
            <div className="flex w-20">
              <p className="whitespace-nowrap text-lg">student code :</p>
              <input
                id="student_code"
                value={studentCode}
                className="input"
                onChange={(e) => setStudentCode(e.target.value)}
              />

              <button className="btn" onClick={(e) => searchStudent(e)}>
                confirm
              </button>
            </div>

            <p className="text-lg">student name : {data?.name}</p>
          </div>
          <table className="table-auto w-full">
            <thead>
              <tr className="w-full rounded-lg bg-gray-table ">
                <th className="rounded-tl-lg text-sm  md:text-lg font-medium text-gray-900 px-6 py-4 ">
                  Station
                </th>
                <th className="rounded-tr-lg text-sm  md:text-lg font-medium text-gray-900 px-6 py-4 ">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {/* allStation */}
              {station?.map((item) => (
                <Gradding
                  key={item.id}
                  station={item.station_name}
                  studentCode={studentCode}
                  station_Id={item.id}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ScanBarcode;
