import React, { useState, useEffect, useContext } from "react";
import Homemodule from "../styles/Home.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import Edit from "../pages/menu/station";
import { Student } from "../../api/config/roles_list";
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_PUBLIC_API_URL;
const AddExam = ({ visible, handleClose }) => {
  const [dataInput, setDataInput] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [teacher, setTeacher] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [station, setStation] = useState();
  const [maxId, setMaxId] = useState();
  const router = useRouter();
  const [createPostOpen, setCreatePostOpen, prop, setProp] =
    useContext(AppContext);
  const validateInput = (input) => {
    if (!input) {
      return "Input value cannot be empty";
    }
    if (!/^[a-zA-Z\s]+$/.test(input)) {
      return "Input value can only contain letters and spaces";
    }
    return null;
  };

  const validateTeacher = (teacher) => {
    if (!teacher) {
      return "Please select a teacher";
    }
    return null;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(selectedTeacher);
    const inputErr = await validateInput(dataInput.station_name);
    const teacherErr = await validateTeacher(selectedTeacher);
    console.log(inputErr, teacherErr);
    if (!inputErr && !teacherErr) {
      addStation();
    }
    setErrMsg(inputErr || teacherErr);
  };
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // console.log(dataInput);

  useEffect(() => {
    const fetchStation = async () => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/station/`,
          config
        );

        await generateId(response.data);
        setStation(response.data);
        fetchTeacher(response.data);
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };

    const fetchTeacher = async (data) => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/teacher/`,
          config
        );
        console.log(data);
        console.log(response.data);
        // const filteredData = await response.data.filter(
        //   (item) => item.id !== data.station_teacher
        // );
        // const filteredData = await response.data.filter(
        //   (item) => !data.station_id.includes(item.id)
        // );
        const filteredData = await response.data.filter((item) => {
          for(let i=0; i<data.length; i++){
            if(item.id === data[i].station_teacher){
              return false; 
            }
          }
          return true;
        });
        
        console.log(filteredData);
        setTeacher(filteredData);
      } catch (error) {
        setErrMsg(error);
      }
    };
    fetchStation();
  }, []);
  const handleSelectChange = (event) => {
    setSelectedTeacher(event.target.value);
  };
  function generateId(e) {
    let maxId = Math.max(...e?.map((item) => item.id));
    setMaxId(maxId + 1);
  }

  const addStation = async () => {
    const data = {
      id: String(maxId),
      station_name: dataInput?.station_name,
      station_teacher: parseInt(selectedTeacher),
    };
    console.log("data added");
    try {
      setCreatePostOpen(false);
      const response = await axios.post(
        `https://my-project-ppdr.vercel.app/station/`,
        // {
        //   id: maxId,
        //   station_name: dataInput?.station_name,
        //   station_teacher: parseInt(selectedTeacher),
        // },
        data,
        config
      );

      // const response = await axios.post(`https://my-project-ppdr.vercel.app/station/`,
      // data,
      // config);

      alert(`Add ${data.station_name} station complete`);
      // setDataInput(response);
      window.location.reload(false);
    } catch (error) {
      setErrMsg("fetch error");
    }
  };

  if (!visible) return null;

  return (
    <div
      className="absolute inset-2/4 bg-opacity-30 ml-50 flex items-center justify-center 
    p-2 md:p-5 rounded-md bg-gray-light shadow-lg shadow-gray"
    >
      <form className=" flex flex-col justify-center " onSubmit={handleSubmit}>
        <div className="flex mb-4 text-lg  ">
          <label className="mr-2 font-bold">Station : </label>
          <input
            className=" rounded-md w-20 bg-input-green pl-3 mx-2 "
            defaultValue={null}
            onChange={(e) =>
              setDataInput({ ...dataInput, station_name: e.target.value })
            }
          ></input>
        </div>
        <div className="flex mb-4">
          {/* <label className="mr-4">Grading method :</label>
          <select className="h-5 mx-2 rounded-md">
            <option value="1">pass/fail</option>
            <option value="2">score</option>
          </select> */}
        </div>
        <div className="flex mb-4 h-full items-center">
          <label className=" text-lg mr-2">Assign to :</label>
          <select
            className="rounded-md  border-none p-1 "
            value={selectedTeacher}
            onChange={handleSelectChange}
          >
            <option value={null}>Select a teacher</option>
            {teacher?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        {errMsg && <span className="error-message">{errMsg}</span>}
        <div className="flex  w-full items-center gap-1  ">
          <button
            onClick={(e) => {
              handleSubmit(e), handleClose();
            }}
            className="btn w-full "
          >
            submit
          </button>
          <button
            onClick={() => {
              handleClose();
            }}
            className="delete-btn w-full "
          >
            cancle
          </button>
        </div>

        {/* <TodoList /> */}
      </form>
    </div>
  );
};

export default AddExam;
