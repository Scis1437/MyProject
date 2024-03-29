import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Redirect from "../../../item/Redirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Logout from "../../../item/logout";
import CountdownTimer from "../../../item/countDownTimer";
function Gradding() {
  const router = useRouter();
  const { station_Id, studentCode, method, station_name } = router.query;
  const [points, setPoints] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState();
  const [subTest, setSubtest] = useState();
  const [selectedTestId, setSelectedTestId] = useState(null);
  const [test, setTest] = useState();
  const [station, setStation] = useState();
  const [name, setName] = useState();
  const [time, setTime] = useState(10);
  const [shouldStartCountdown, setShouldStartCountdown] = useState(false);

  const handleStartCountdown = () => {
    setShouldStartCountdown(true);
  };
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

  const parseJwt = (bearerToken) => {
    const token = bearerToken.split(" ")[1];
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  };
  console.log(station_Id);
  const closeOrderPost = () => {
    setConfirmDeleteAll(true);
  };

  useEffect(() => {
    const fetchSubtest = async () => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/subtest/`,
          {
            // params: { stationId },
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log(response.data);

        const filterData = response.data.filter(
          (item) => item.station_Id === station_Id
        );

        console.log(filterData);

        setSubtest(filterData);
      } catch (error) {
        setErrMsg(error);
      }
    };

    const fetchStation = async () => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/station/${station_Id}`,
          config
        );
        console.log(response.data);
        const filterData = response.data.filter(
          (item) => item.id === station_Id
        );

        setStation(filterData[0]);
      } catch (error) {
        setErrMsg(error);
      }
    };

    const fetchStudent = async () => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/student/${studentCode}`,
          config
        );

        console.log(response.data);

        setName(response.data);
      } catch (error) {
        setErrMsg(error);
      }
    };

    // Trigger API requests whenever stationId or studentCode changes
    fetchSubtest();
    fetchStation();
    fetchStudent();
  }, [station_Id, studentCode]);

  function MethodCheck(data) {
    // const {method} = query.method;
    // console.log(method)
    if (true) {
      return (
        <select
          className="h-5 "
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
          <option value="0">fail</option>
          <option value="10">pass</option>
          <option value="0">0</option>
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
  const cheterHandle = async () => {
    const data = {
      id: studentCode,
    };
    try {
      const response = await axios.put(
        `https://my-project-ppdr.vercel.app/cheated`,
        data,
        config
      );
      console.log(`err add cheted`);
    } catch (error) {
      setErrMsg(error);
    }
  };
  const addScore = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(
        `https://my-project-ppdr.vercel.app/test`,
        data,
        config
      );
      console.log(`add data complete`);
    } catch (error) {
      setErrMsg(error);
    }
  };

  const handleScoreSave = async () => {
    const user = parseJwt(`Bearer ${localStorage.getItem("access")}`);
    if (await subTest?.some((testData) => testData.score === "null")) {
      setErrMsg("Please assign a score for all tests before submitting.");
      console.log("err have null");
      return;
    } else {
      subTest?.forEach((testData) =>
        addScore({
          station_Id: testData.station_Id,
          student_id: studentCode,
          test_number: testData.test_number,
          score: parseInt(testData.score),
          station_name: station_name,
          // station_teacher:  user.username,
          station_teacher: user.UserInfo.username,
          test_name: testData.test_name,
          name: name?.name,
        })
      );
      alert("Test data saved successfully");
      router.push({
        pathname: "/menu/grading/",
      });
    }
  };
  if (shouldRedirect) {
    return <Redirect to="/menu/grading" />;
  }

  const handleScoreChange = (testNumber, score) => {
    console.log(`test number and score: ${testNumber} , ${score}`);
    const updatedSubTests = subTest.map((subTest) => {
      if (subTest.test_number === testNumber) {
        return { ...subTest, score };
      }
      return subTest;
    });
    setSubtest(updatedSubTests);
    // console.log(subTest)
  };
  const handleTimerComplete = () => {
    console.log("Timer has completed!");
    alert("time out!");
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
        <div className="flex flex-row justify-between w-full">
          <p className="text-white font-extrabold text-xl w-full md:text-2xl">
            {station_name}
          </p>
          <div className="logout-position">
            <Logout />
          </div>
        </div>
      </div>

      <div className="container ">
        <div className="flex justify-between">
          <div className="">
            <p className="text-subheader ">
              student code : <span className="font-normal">{studentCode}</span>
            </p>
            <p className="text-subheader mt-2">
              student name : <span className="font-normal">{name?.name}</span>{" "}
            </p>
            {/* <div className="flex">
              <p className="pr-4 ">set time out : </p>{" "}
              <input
                className=" rounded-md w-20 bg-gray-input pl-4  border-none"
                onChange={(e) => setTime(e.target.value)}
              ></input>
            </div> */}
            <div>
              <input
                className=" rounded-md  bg-input-green pl-3 border-none mt-2 mr-1 text-center"
                placeholder="enter time limit (minute)"
                onChange={(e) => setTime(e.target.value)}
              ></input>
              <button className="semi-btn" onClick={handleStartCountdown}>
                START
              </button>
            </div>{" "}
          </div>{" "}
          {shouldStartCountdown && <CountdownTimer minutes={time} />}
        </div>

        <table className="table-auto w-full mt-4">
          <thead className="rounded-xl border-radius-table h-8  px-5 bg-gray-table">
            <tr className="rounded-lg bg-gray-table">
              <th className="w-1/2 px-4 py-2">Title</th>
              <th className="w-1/2 px-10   py-2 text-right">Point</th>
            </tr>
          </thead>
          <tbody>
            {/* {Object.entries(title).map(([id, title]) => ( */}
            {subTest?.map((testData) => (
              <tr
                key={testData.test_number}
                // className="bg-gray-100 border-b mx-4 odd:bg-white even:bg-slate-50 cursor-pointer"
                className="bg-gray-100 mx-4 color-table "
              >
                <td className=" px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 ">
                  {testData.test_name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
                  {/* <MethodCheck data = {testData}/> */}
                  <select
                    className="rounded-md  border-none p-1 "
                    value={testData.score || null}
                    onChange={(e) =>
                      handleScoreChange(testData.test_number, e.target.value)
                    }
                  >
                    <option value="null">select</option>
                    <option value="0">fail</option>
                    <option value="10">pass</option>
                    <option value="0">0</option>
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
          <div className="flex gap-1">{/* {" "} */}</div>
          <div className="flex gap-2">
            {/* <button className="semi-delete-btn mt-2" onClick={cheterHandle}>
              CHEAT
            </button> */}
            <div className="flex justify-between">
              <div className="flex gap-1">{/* {" "} */}</div>
              <div className="flex flex-col gap-2 justify-end">
                {/* <button className="semi-delete-btn mt-2" onClick={cheterHandle}>
                  CHEAT
                </button> */}
                <div className="w-full flex justify-end">
                     <button className="semi-btn mt-2" onClick={handleScoreSave}>
                  SUBMIT
                </button>
                </div>
             
                <p className="error-msg ">{errMsg}</p>
              </div>
              
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Gradding;
