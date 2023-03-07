import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const station = [
  { "History talking patient ": [1, 2, 3] },
  { "Peptic ulcer": [4, 5, 6] },
];

function Redirect({ to }) {
  const router = useRouter();
  console.log("Redirect_work");
  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

function studentlist() {
  const [error, setError] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [data, setData] = useState([]);
  const [station, setStation] = useState([]);
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchStudent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/student/`,
        config
      );

      setData(response.data);
    } catch (error) {
      setError("Error searching for student data");
    }
  };
  // useEffect(() => {

  // }, []);

  const fetchStation = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/station/`,
        config
      );

      setStation(response.data);
    } catch (error) {
      setError("Error searching for student data");
    }
  };
  useEffect(() => {
    fetchStation();
    fetchStudent();
  }, []);

  // console.log(station);
  // console.log(data);
  const searchStudent = async (e) => {
    e.preventDefault();
    const studentId = studentCode.studentCode;

    const student = data.find((student) => student.id === studentId);

    setData([student]);
  };

  const DropdownTitle = (data) => {
    const [test, setTest] = useState();
    const fetchTest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/test/1`,
          config
        );

        setTest(response.data);
      } catch (error) {
        setError("Error fetch test ");
      }
    };
    useEffect(() => {
      fetchTest();
    }, []);

    console.log(test);
    // console.log(data);
    const [dropdownTitle, setDropdownTitle] = useState(false);
    return (
      <div>
        <div onClick={() => setDropdownTitle(!dropdownTitle)}>
          {data.station_name}
        </div>

        {dropdownTitle ? (
          <div>
            <form className="scroll-y">
              {test.map((list) => {
                return (
                  <div className="flex justify-between w-full">
                    <label className="text-xs mx-3 w-full" htmlFor="subStation">
                      {list.station_Id}
                    </label>
    
                    <select className="h-5" defaultValue = {list.score}>
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
          </div>
        ) : null}
      </div>
    );
  };
  const List = (dataSet) => {
    // if (!Array.isArray(dataSet)) {
    //   return <div>Data set is not an array</div>;
    // }

    const [dropdown, setDropdown] = useState(false);

   
    return (
      <div className="py-2 " key={dataSet.id}>
        <div
          className="rounded-md bg-table-odd h-7 py-5 flex items-center"
          onClick={() => setDropdown(!dropdown)}
        >
          <p className="text-sm mx-1 flex ">{dataSet.id}</p>
        </div>

        {dropdown ? (
          <div>
            {station.map((list) => {
              return <DropdownTitle key={list.id} {...list} />;
            })}

            <button className="btn" onClick={() => updateData()} >SAVE</button>
          </div>
        ) : null}
      </div>
    );
  };
  const updateData = () => {
    
  }
  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }

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
        <p className="text-white font-extrabold text-xl w-full md:text-2xl">
          Student list
        </p>
      </div>
      <div className="container ">
        <div className="flex w-full items-center justify-start">
          <p className="text-subheader ">search for student : </p>
          <input
            type="text"
            id="studentCode"
            name="studentCode"
            placeholder="62061xxxx"
            value={studentCode.value}
            onChange={(e) => setStudentCode({ studentCode: e.target.value })}
            className="rounded-md  w-40 md:w-auto h-6 bg-input-green p-2 mr-1"
          />

          <button
            className="btn"
            onClick={(e) => {
              searchStudent(e);
            }}
          >
            SUBMIT
          </button>
        </div>
        <div className="overflow-y-scroll">
          {data.map((list) => {
            return <List key={list.id} {...list} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default studentlist;
