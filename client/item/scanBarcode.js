import useScanDetection from "use-scan-detection";
import React, { useState, useEffect, useRef } from "react";
import Scanner from "./Scanner";
import Link from "next/link";
import Redirect from "./Redirect";
import { useRouter } from "next/router";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
function ScanBarcode() {
  const saveStudentname = useRef();
  const [results, setResults] = useState([]);
  const [studentCode, setStudentCode] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState();

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
    const [subTest, setSubtest] = useState();
    const [studentStatus, setStudentStatus] = useState("Complete");
    const [stationId, setStationId] = useState(station_Id);
    const [data, setData] = useState({});
    const [redirectData, setRedirectData] = useState();
    const station_name = station;
    const fetchSubtest = async () => {
      const station_Id = stationId;

      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/subtest`,
          {
            params: { station_Id },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);
        setSubtest(response.data);
        // setStudentStatus(data?.map(test => test.test_number))
        // console.log(studentStatus)
        {
        }
      } catch (error) {
        setErrMsg(error);
      }
    };
    const fetchTest = async () => {
      try {
        //   const response = await axios.get(
        //     `http://localhost:9000/Test/620719000`,
        // config

        //   );
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/student/${studentCode}`,
          config
        );

        const filterData = await response.data.filter(
          (item) => item.id === studentCode
        );
        // const filterData2 =  await filterData[0].test.filter(
        //   (item) =>  item.station_Id === studentId
        //    );
        console.log(filterData[0].tests);
        const statusCheck = filterData[0].tests.filter(
          (item) => item.station_Id === station_Id
        );
        console.log(statusCheck);

        console.log(statusCheck.length === 0);
        if (statusCheck.length === 0) {
          setRedirectData(statusCheck);
          setStudentStatus("Incomplete");
        }
        // && item.station_Id === studentId
        // useEffect(() => {
        //   fetchSubtest(filterData.id)
        // }, []);

        // await fetchSubtest();

        setData(filterData[0].tests);
      } catch (error) {
        setErrMsg("Error fetch test");
      }
    };
    useEffect(() => {
      fetchTest();
    }, []);

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
        query: { studentCode, stationId, station_name },
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
          {studentStatus}
        </td>
      </tr>
    );
  }
  // if (shouldRedirect) {
  //   return <Redirect to="/menu/gradding/selectStation" studentCode={data} />;
  // }

  const [studentData, setStudentData] = useState([]);
  const [data, setData] = useState();
  const [station, setStation] = useState();
  const [teacher, setTeacher] = useState();
  const parseJwt = (bearerToken) => {
    const token = bearerToken.split(" ")[1];
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  };

  const [exam, setExam] = useState(null);

  useEffect(() => {
 
    const fetchTeacher = async () => {   
      const data = parseJwt(`Bearer ${localStorage.getItem("access")}`);
    // dataRef.current = data;
    await setExam(data.UserInfo.username);
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/teacher/`,
          config
        );
        const filterData = await response.data.filter(
          (item) => item.username === exam
        );
        console.log(response.data)
        await setTeacher(filterData[0].username);
        
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };
    const fetchStation = async () => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/station/`,
          config
        );
        const filterData = await response.data.filter(
          (item) => item.station_teacher === teacher
        );
        console.log(filterData);
        console.log(response.data);

       await setStation(response.data);
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };
    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/student/`,
          config
        );

        setStudentData(response.data);
        console.log(studentData);
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };

  
    fetchTeacher();
    fetchStation();
    fetchStudent();
  }, []);

  const searchStudent = async (e) => {
    e.preventDefault();

    const studentId = studentCode;
    console.log(studentId);
    const student = studentData.find((student) => student.id === studentId);
    setData(student);
  };

  const handleScan = (result) => {
    let code = result.codeResult.code;
    code = String(code).slice(4, -1);
    setStudentCode(code);
  };

  // if (shouldRedirect) {
  //   return <Redirect to="/menu/gradding/gradding" />;
  // }
  // console.log(role)
  // console.log(teacher)
  // console.log(station);
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
              <p className="whitespace-nowrap">student code :</p>
              <input
                id="student_code"
                value={studentCode}
                className="fit "
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
              {station?.map((item) => (
                <Gradding
                  key={item.id}
                  station={item.station_name}
                  studentCode={studentCode}
                  station_Id={item.id}
                  // method={item.method}
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
