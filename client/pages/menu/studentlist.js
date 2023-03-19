import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  faChevronCircleLeft,
  faCaretDown,
} from "@fortawesome/free-solid-svg-icons";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import axios from "axios";
import Logout from "../../item/logout";
import ImportExcelPage from "../../item/importExcel";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function Redirect({ to }) {
  const router = useRouter();
  console.log("Redirect_work");
  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

function StudentList() {
  const [error, setError] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [data, setData] = useState([]);
  const [station, setStation] = useState([]);
  const [subTest, setSubtest] = useState();
  const [search, setSearch] = useState(null);
  const [status, setStatus] = useState(false);
  const [role, setRole] = useState(0);
  const [user, setUser] = useState(null);
  const [teacher, setTeacher] = useState(null);
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
  useEffect(() => {
    const fetchData = async () => {
      const data = parseJwt(`Bearer ${localStorage.getItem("access")}`);

      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/teacher/`,
          config
        );
        const filterData = response.data.filter(
          (item) => item.username === data.UserInfo.username
        );

        setUser(filterData[0]);
        console.log(filterData);
        setRole(data.UserInfo.role);

        const studentResponse = await axios.get(
          `https://my-project-ppdr.vercel.app/student/`,
          config
        );
        setData(studentResponse.data);

        const stationResponse = await axios.get(
          `https://my-project-ppdr.vercel.app/station/`,
          config
        );
        console.log(stationResponse.data);
        //  setStation(stationResponse.data);
        if (data.UserInfo.role === 1) {
          setStation(stationResponse.data);
        } else {
          const filterStation = stationResponse.data.filter(
            (item) => item.station_teacher === filterData[0].id
          );
          setStation(filterStation);
        }

        // setStation(filterStation);
      } catch (error) {
        setError("Error fetching data");
      }
    };

    fetchData();
  }, []);
  const searchStudent = async (e) => {
    e.preventDefault();
    const studentId = studentCode.studentCode;
    if (!studentId) {
      setError("Student code is required.");
      return;
    }
    if (!/^\d{9}$/.test(studentId)) {
      setError("Student code must be a 9-digit number.");
      return;
    }
    const student = data?.find((student) => student.id === studentId);
    if (student != null) {
      setSearch([student]);
      setStatus(false);
    } else {
      setSearch(null);
      setStatus(true);
    }
  };

  const deleteAllStudent = async () => {
    await axios.delete(
      `https://my-project-scis1437.vercel.app/student`,
      config
    );
    alert("delete all sudent!");
  };
  const List = (dataSet) => {
    const handleSaveTest = async (studentId, stationId, testNumber, score) => {
      console.log(`studentId : ${studentId}`);
      console.log(`stationId : ${stationId}`);
      console.log(` testNumber : ${testNumber}`);
      console.log(` score : ${score}`);

      const data = {
        student_id: studentId,
        station_Id: stationId,
        test_number: testNumber,
        score: score,
      };
      try {
        const response = await axios.put(
          `https://my-project-ppdr.vercel.app/test/`,
          data,
          config
        );
        // console.log(response.data);
        alert("Test data saved successfully");
      } catch (error) {
        setError("Error saving test data");
      }
    };
    const DropdownTitle = (props) => {
      const { student } = props;
      const studentId = student.id;
      const [test, setTest] = useState();
      // console.log(student.id)
      // console.log(studentId)
      const fetchSubtest = async (data) => {
        const station_Id = data;

        try {
          const response = await axios.get(
            `https://my-project-ppdr.vercel.app/subtest`,
            {
              params: { station_Id },
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          await setSubtest(response.data);
          console.log(response.data);
          {
          }
        } catch (error) {
          setErrMsg(error);
        }
      };
      const fetchTest = async () => {
        try {
          const response = await axios.get(
            `https://my-project-ppdr.vercel.app/test/`,
            {
              student_id: studentId,
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const filterData = response.data.filter(
            (item) => item.student_id === studentId
          );
          const filterStation = filterData.filter(
            (item) => item.station_Id === props.id
          );

          setTest(filterStation);
          // useEffect(() => {
          //   fetchSubtest (filterStation.station_Id) ;
          // }, []);
          console.log(response.data);
          console.log(subTest);
          console.log(filterStation);
        } catch (error) {
          setError("Error fetch test ");
        }
      };
      useEffect(() => {
        fetchTest();
      }, []);

      // console.log(test);
      const [dropdownTitle, setDropdownTitle] = useState(false);

      // const filterStation = test.filter(
      //   (item) => item.station_Id === 2
      // );
      //   console.log(filterData) ;
      // console.log(test);
      // console.log(props);
      //  console.log(station)
      console.log(test);
      const handleScoreSave = (e) => {
        e.preventDefault();
        test.forEach((testData) => {
          handleSaveTest(
            student.id,
            testData.station_Id,
            testData.test_number,
            testData.score
          );
        });
      };

      return (
        <div>
          <div onClick={() => setDropdownTitle(!dropdownTitle)}>
            <div className="mx-4 text-lg">{props.station_name}</div>
          </div>

          {dropdownTitle ? (
            <div>
              <form className="">
                {test?.map((list, index) => {
                  return (
                    <div
                      className="flex justify-between w-full px-6"
                      key={index}
                    >
                      <label className="text-base  w-full " htmlFor="subStation">
                        {list.test_name}
                      </label>

                      <select
                        className="rounded-md  border-none  p-0"
                        defaultValue={list.score}
                        onChange={(e) => {
                          const newData = test.map((item) => {
                            console.log(item.test_number === list.test_number);
                            if (item.test_number === list.test_number) {
                              return {
                                ...item,
                                score: parseInt(e.target.value),
                              };
                            } else {
                              return item;
                            }
                          });
                          setTest(newData);
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
                    </div>
                  );
                })}
              </form>
              <div className="flex w-full justify-end mt-2">
                  <button
                className="semi-btn mx-4"
                onClick={(event) => handleScoreSave(event)}
              >
                Save
              </button>
              </div>
            
            </div>
          ) : null}
        </div>
      );
    };

    // if (!Array.isArray(dataSet)) {
    //   return <div>Data set is not an array</div>;
    // }
    // https://my-project-scis1437.vercel.app/export

    const [dropdown, setDropdown] = useState(false);
    const [student, setStudent] = useState(dataSet);
    const [isRotated, setIsRotated] = useState(false);

    const handleRotate = () => {
      console.log("Rotate");
      setIsRotated(!isRotated);
    };

    return (
      <div className="py-2 " key={student.id}>
        <div
          className="rounded-md bg-table-odd h-7 py-5 flex items-center"
          onClick={() => setDropdown(!dropdown)}
        >
          <div className="flex items-cen" onClick={handleRotate}>
            <FontAwesomeIcon
              icon={faCaretDown}
              className={`flex mt-4 items-center pl-4 ${
                isRotated ? "fa-rotate-0 ml-1 mt-0 pl-1" : "fa-rotate-270"
              }`}
            />
          </div>

          <p className="text-sm md:text-lg mx-1 flex ">{student.id}</p>
        </div>

        {dropdown ? (
          <div className="bg-gray-table">
            {station?.map((list) => {
              return (
                <DropdownTitle key={list.id} {...list} student={student} />
              );
            })}

            {/* <button className="btn" onClick={() => handleSaveTest()}>
              SAVE
            </button> */}
          </div>
        ) : null}
      </div>
    );
  };
  const exportScore = async () => {
    try {
      const response = await axios.get(
        `https://my-project-scis1437.vercel.app/export`,
        config
      );

      console.log(response.data);
    } catch (error) {
      setError("Error export ");
    }
  };

  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }
  // console.log(data);
  // console.log(search);
  // console.log(studentCode);

  return (
    <div className="background">
      <div className="header-page">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="backward-btn"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="text-white font-extrabold text-xl w-full md:text-2xl">
            STUDENT LIST
          </p>
          <div className="logout-position">
            <Logout />
          </div>
        </div>
      </div>
      <div className="container  ">
        <div className="flex w-full items-center justify-between">
          <div className="flex gap-1">
            <p className="text-subheader ">search for student : </p>
            <input
              type="text"
              id="studentCode"
              name="studentCode"
              placeholder="62061xxxx"
              value={studentCode.value}
              onChange={(e) => setStudentCode({ studentCode: e.target.value })}
              className="input_box h-7"
            />

            <button
              className="semi-btn"
              onClick={(e) => {
                searchStudent(e);
              }}
            >
              SUBMIT
            </button>
            <div className="flex cursor-pointer " onClick={exportScore}>
              <FileDownloadRoundedIcon className="flex items-center mt-1 text-gray-dark" />
              <p className="">export</p>
            </div>
          </div>
          {role === 1 && (
            <div className="">
              <button
                className="bg-btn-red rounded-2xl px-2 py-1 md:px-3 font-semibold text-white text-xs md:text-sm w-28"
                onClick={deleteAllStudent}
              >
                DELETE ALL
              </button>
            </div>
          )}
        </div>
        <div className=" mt-4">
          <div className=" ">{role === 1 && <ImportExcelPage />}</div>
        </div>
        <p>{error}</p>
        {status ? <p>No data found</p> : null}
        <div className=" ">
          <div className="overflow-y-scroll h-screen ">
            {search && search.length > 0
              ? search.map((list) => {
                  return <List key={list.id} {...list} />;
                })
              : data.map((list) => {
                  return (
                    <div key={list.id}>
                      <List {...list} />
                    </div>
                  );
                })}
            {/* {data.map((list) => {
    console.log(studentCode);
    return <List key={list.id} {...list} student={studentCode} />;
  })} */}
          </div>
        </div>
      </div>

      <div className="logout-position">
        <Logout />
      </div>
    </div>
  );
}

export default StudentList;
