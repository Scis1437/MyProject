import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Redirect from "../../../item/Redirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Logout from "../../../item/logout";
function Gradding() {
  const router = useRouter();
  const { stationId, studentCode, method, data } = router.query;
  const [points, setPoints] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [subTest, setSubtest] = useState();
  // const [stationId, setStationId] = useState();
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [test, setTest] = useState();
  const [station , setStation] = useState() ;
  const [name , setName ]= useState()
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
  // station_Id:true,
  // student_id:true,

  useEffect(() => {
    const fetchSubtest = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/subtest`, {
          params: { stationId },
          headers: { Authorization: `Bearer ${token}` },
        });
        const filterData = await response.data.filter(
          (item) => item.station_Id === stationId
        );

        console.log(filterData);
        console.log(response.data);
        setSubtest(filterData);

        {
        }
      } catch (error) {
        setErrMsg(error);
      }
    };

    const fetchStation = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/station/${stationId}`, config );
        const filterData = await response.data.filter(
          (item) => item.id=== stationId
        );

      
        // console.log(response.data);  
        // console.log(filterData);
        setStation(filterData);

        {
        }
      } catch (error) {
        setErrMsg(error);
      }
    };

    const fetchStudent = async () => {
 
        try {
          const response = await axios.get(
            `http://localhost:9000/student/${studentCode}`,
            config
          );
  
     

         
        const filterData = await response.data.filter(
          (item) => item.id=== studentCode
        );

      
        console.log(response.data);  

        setName (filterData);

        {
        }
      } catch (error) {
        setErrMsg(error);
      }
    };
    // fetchStudent();
    fetchSubtest();
    fetchStation();
    fetchStudent();
    // fetchStation();
    // fetchSubtest();
  }, []);
  function MethodCheck(data) {
    // const {method} = query.method;
    // console.log(method)
    if (true) {
      return (
        <select
          className="h-5"
          defaultValue={<option value="0">0</option>}
          onChange={(e) => {
            const newData = subTest.map((item) => {
              if (item.station_Id === data.station_Id) {
                return {
                  ...item,
                  score: parseInt(e.target.value),
                };
              } else {
                // return item;
              } 
            });
            setTest(newData);
            // setSelectedTestId(data.station_Id);
          }}
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
        <select>
          <option value=""></option>
          <option value="pass">pass</option>
          <option value="fail">fail</option>
        </select>
      );
    }
  }
  
  const addScore = async (data) => {
    console.log(data)
    try {
      const response = await axios.post(
        `http://localhost:9000/test`,
        data,
        config,
        {}
      );
      alert("Test data saved successfully");
      //  return <Redirect to="/menu/gradding"/>
 
    } catch (error) {
      setErrMsg(error);
    }
  };
  const handleScoreSave = () => {   

    subTest?.forEach((testData) => 
     addScore({
        station_Id: testData.station_Id,
        student_id: studentCode,
        test_number: testData.test_number,
        score: parseInt(testData.score) ,
        station_name : station[0].station_name ,
        station_teacher : station[0].station_teacher ,
        test_name : testData.test_name,
        name : name[0].name 
      }))
    // if (selectedTestId) {
   
      // const testData = test.find((item) => item.station_Id === selectedTestId);
      // console.log(testData);
      // addScore({
      //   station_Id: testData.station_Id,
      //   student_id: studentCode,
      //   test_number: testData.test_number,
      //   score: testData.score,
      //   station_name : station[0].station_name ,
      //   station_teacher : station[0].station_teacher ,
      //   test_name : testData.test_name,
      //   name : name[0].name 
      // });
    
    // }
  };
  if (shouldRedirect) {
    return <Redirect to="/menu/gradding" />;
  }

  const handleScoreChange = (testNumber, score) => {
    console.log(`test number and score: ${testNumber} , ${score}`)
    const updatedSubTests = subTest.map((subTest) => {
      if (subTest.test_number === testNumber) {
        return { ...subTest, score };
      }
      return subTest;   
    });
    setSubtest(updatedSubTests);
    // console.log(subTest)
  };


  
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
          <p>student name : {name?.name} </p>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="w-full">
              <th className="w-1/2 px-4 py-2">Title</th>
              <th className="w-1/2 px-4 py-2 text-right">Point</th>
            </tr>
          </thead>
          <tbody>
            {/* {Object.entries(title).map(([id, title]) => ( */}
            {subTest?.map((testData) => (
              <tr
                key={testData.test_number}
                className="bg-gray-100 border-b mx-4 odd:bg-white even:bg-slate-50 cursor-pointer"
              >
                <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {testData.test_name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
                  {/* <MethodCheck data = {testData}/> */}
                  <select className="h-5"
            value={testData.score}
            onChange={(e) => handleScoreChange(testData.test_number, e.target.value)}
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

          <button className="btn"
            onClick={handleScoreSave}
           >

            SUBMIT
          </button>
        </div>
      </div>
      <div className="absolute top-3.5 right-3.5 "><Logout/></div>
    </div>
  );
}

export default Gradding;
