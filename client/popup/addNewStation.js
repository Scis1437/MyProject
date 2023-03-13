import React, { useState, useEffect } from "react";
import Homemodule from "../styles/Home.module.css";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || process.env.REACT_APP_PUBLIC_API_URL
const AddExam = ({ visible }) => {
  const [dataInput, setDataInput] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [teacher, setTeacher] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [station, setStation] = useState();
  const [maxId, setMaxId] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    addStation();
  };



  const token = localStorage.getItem("access");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  // console.log(dataInput);
  const fetchTeacher = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/teacher/`,
        config
      );

      setTeacher(response.data);
    } catch (error) {
      setErrMsg(error);
    }
  };
  useEffect(() => {
    fetchTeacher();
  }, []);
  const handleSelectChange = (event) => {
    setSelectedTeacher(event.target.value);
  };
  function generateId(e) {
    let maxId = Math.max(...e?.map((item) => item.id));
    console.log(maxId);
    setMaxId(maxId + 1);
  }
  const fetchStation = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/station/`,
        config
      );
      await generateId(response.data);

      setStation(response.data);
    } catch (error) {
      setErrMsg("Error searching for student data");
    }
  };
  useEffect(() => {
    fetchStation();
  }, []);
  const data = {
    id: String(maxId),
    station_name: dataInput?.station_name,
    station_teacher: selectedTeacher,
  };

  const addStation = async () => {
    console.log(data);
    try {
      // const response = await axios.post(`http://localhost:9000/station/`, {
      //   //   id: true,
      //   //   station_name:true,
      //   //   station_teacher:true,
      //   id: maxId,
      //   station_name: dataInput?.station_name,
      //   station_teacher: selectedTeacher,
      //     // data ,

      //     config,
      // });

      const response = await axios.post(`${BASE_URL}/station/`, data, config);
      console.log(response.data);

      // setDataInput(response);
      // setError("");
    } catch (error) {
      setErrMsg("fetch error");
    }
  };
  const TodoList = () => {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");

    const addTodo = (todo) => {
      const newTodo = {
        id: Math.random(),
        todo: todo,
        // id: 1 ,
        // todo:"csadsda"
      };

      // add the todo to the list
      setList([...list, newTodo]);

      // clear input box
      setInput("");
    };

    const deleteTodo = (id) => {
      // Filter out todo with the id
      const newList = list.filter((todo) => todo.id !== id);

      setList(newList);
    };

    return (
      <div className="">
        <h1>title</h1>{" "}
        <ul>
          {list.map((todo) => (
            <li key={todo.id}>
              {todo.todo}
              <button
                className="bg-btn-red rounded-md"
                onClick={() => deleteTodo(todo.id)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-1 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className=" input"
          />

          {/* <select className="h-5 mx-2">
            <option value="1">pass/fail</option>
            <option value="2">score</option>
          </select> */}

          <button className="btn" onClick={() => addTodo(input)}>
            Add
          </button>
        </div>
        <div
          className="flex flex-col w-full items-center "
          onClick={() => addStation()}
        >
          <button className="btn w-full ">submit</button>
        </div>
      </div>
    );
  };

  if (!visible) return null;

  return (
    <div className="absolute inset-2/4 bg-opacity-30 ml-50 flex items-center justify-center ">
      <form
        className="bg-gray flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray"
        onSubmit={handleSubmit}
      >
        <div className="flex mb-4">
          <label>Station : </label>
          <input
            className=" rounded-md w-20 bg-input-green pl-3 mx-2 "
            // value={dataInput.station_name}
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
        <div className="flex mb-4">
          <label className="mr-4">Assign to :</label>
          <select
            className="h-5"
            value={selectedTeacher}
            onChange={handleSelectChange}
          >
            <option value="">Select a teacher</option>
            {teacher?.map((teacher) => (
              <option key={teacher.value} value={teacher.value}>
                {teacher.teacher_name}
              </option>
            ))}
          </select>
        </div>
        <div
          className="flex flex-col w-full items-center "
          // onClick={() => addStation()}
        >
          <button onClick={() => addStation()} className="btn w-full ">
            submit
          </button>
        </div>
        {/* <TodoList /> */}
      </form>
    </div>
  );
};

export default AddExam;
