import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Redirect from "../../../item/Redirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { ScreenRotationSharp } from "@material-ui/icons";

const title = {
  1: "active listening",
  2: "Demonstrating empathy in response patient cues",
  3: "An appropriate level of eye contact thoughtout the consulation",
  4: "open, relax yet professional body language",
};

function Gradding() {
  const router = useRouter();
  const { stationId, studentCode , method ,data} = router.query;
  const [points, setPoints] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [student ,setStudent] = useState([]);
  const [errMsg , setErrMsg] = useState()
  const [subTest, setSubtest] = useState();
  // const [stationId, setStationId] = useState();
  

  const handlePointChange = (titleId, pointValue) => {
    setPoints((prevPoints) => ({ ...prevPoints, [titleId]: pointValue }));
  };
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // const fetchStation = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9000/station/`,
  //       config
  //     );
  //     const filterData =  await response.data.filter(
  //       (item) =>  item.station_name === station
  //        );
  //     setStationId(filterData);
  //   } catch (error) {
  //     setErrMsg("Error searching for student data");
  //   }
  // };

  // const fetchTest = async () => {
  //   try {
  //     //   const response = await axios.get(
  //     //     `http://localhost:9000/Test/620719000`,
  //     // config

  //     //   );
  //     const response = await axios.get(
  //       `http://localhost:9000/student/${studentCode}`,
  //       config
  //     );

  //    const filterData =  await response.data.filter(
  //    (item) =>  item.id === studentCode  
  //     );
  //     // const filterData2 =  await filterData[0].test.filter(
  //     //   (item) =>  item.station_Id === studentId
  //     //    );     
  //     const statusCheck = (filterData[0].tests.filter(
  //       (item) =>  item.station_name === station_Id
  //        ))
  //     console.log(statusCheck )
  //     setStationId(statusCheck.station_Id[0])
  //   } catch (error) {
  //     setErrMsg("Error fetch test");
  //   }
  // };

  // const fetchStudent = async () => {
  //   try {
  //     const response = await axios.get(
  //       `http://localhost:9000/student/`,
  //       config
  //     );

    
  //     const student = response.data.find((student) => student.id === studentCode);
      
  //     setStudent(student);

  //   } catch (error) {
  //     setErrMsg("Error searching for student data");
  //   }
  // };
 
  useEffect(() => {  
    const fetchSubtest = async () => {
    

    try {
      const response = await axios.get(`http://localhost:9000/subtest`, {
        params: {  stationId },
        headers: { Authorization: `Bearer ${token}` },
      });
      const filterData =  await response.data.filter(
        (item) =>  item.station_Id === stationId
         );

        console.log(filterData)
        console.log(response.data)
        setSubtest(filterData );
        

      {
      }
    } catch (error) {
      setErrMsg(error);
    }
  };
    // fetchStudent();
    fetchSubtest();
    // fetchStation();
    // fetchSubtest();
  }, []);
  if (shouldRedirect) {
    return <Redirect to="/menu/gradding" />;
  }
  console.log(stationId)
  function MethodCheck() {
    // const {method} = query.method; 
    // console.log(method)
    if (true) {
      return (
        <select
        className="h-5"
        // defaultValue={ <option value="0">0</option>}
        // onChange={(e) => {
        //   const newData = test.map((item) => {
        //     if (item.station_Id === list.station_Id) {
        //       return {
        //         ...item,
        //         score: parseInt(e.target.value),
        //       };
        //     } else {
        //       return item;
        //     }
        //   });
        //   setTest(newData);
        // }}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
      );
    } else if (method === "pass/fail") {
      return (
        <select
    
        >
          <option value=""></option>
          <option value="pass">pass</option>
          <option value="fail">fail</option>
        </select>
      );
    }
  }

  return (
    <div className="background">
      <div className="header-page">
        <div className="flex items-center ">
          <FontAwesomeIcon
            className="backward-btn"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>{" "}
        <p className="text-header">{stationId}</p>
      </div>

      <div className="container ">
        <div>
          <p>student code : {studentCode}</p>
          <p>student name : {stationId} </p>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="w-full">
              <th className="w-1/2 px-4 py-2">Title</th>
              <th className="w-1/2 px-4 py-2 text-right">Point</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(title).map(([id, title]) => (
              <tr
                key={id}
                className="bg-gray-100 border-b mx-4 odd:bg-white even:bg-slate-50 cursor-pointer"
              >
                <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {title}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
                  <MethodCheck />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between">
          <div className="flex">
            {/* {" "} */}
            <p>comment : </p>
            <input></input>
          </div>

          <button className="btn" onClick={() => setShouldRedirect(true)}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gradding;
