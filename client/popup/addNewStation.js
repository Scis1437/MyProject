import React, { useState, useEffect } from "react";
import Homemodule from "../styles/Home.module.css";
import axios from "axios";

const addExam = ({ visible }) => {
  const [dataInput , setDataInput] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [teacher, setTeacher] = useState();
  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }
    
  const [error, setError] = useState("");

    const  token = localStorage.getItem("access");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
  console.log(dataInput) 
   const fetchTeacher = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/teacher/`,
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
  
const addStation = async () => {


    try {
        
      const response = await axios.post(
        `http://localhost:9000/station/`,
        
        { station_name: dataInput.station_name },
        config
       
      );
      console.log(response)
      setDataInput(response);
      setError("");
    } catch (error) {
        setError(error.response.data.message);
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
      <form className="bg-gray flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray">
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
          <label className="mr-4">Grading method :</label>
          <select className="h-5 mx-2 rounded-md">
            <option value="1">pass/fail</option>
            <option value="2">score</option>
          </select>
        </div>
        <div className="flex mb-4">
          <label className="mr-4">Assign to :</label>
          <select
            className="h-5 mx-2 rounded-md"
            // value={this.state.selectValue}
          >
            {teacher?.map((obj) => (
              <option key={obj.teacher_name} value={obj.value}>
                {obj.teacher_name} 
              </option>
            ))}

     
          </select>
        </div>
        <TodoList />
      </form>
    </div>
  );
};

export default addExam;
