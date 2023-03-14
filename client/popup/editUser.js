import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css";
import { useState } from "react";
const EditUser = ({ visible, data }) => {
  const station = [
    "History talking patient ",
    "Peptic ulcer ",
    "Palpation of the thyroid",
  ];

  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }
  const [selectedOption, setSelectedOption] = useState("");
  const [errMsg, setErrMsg] = useState(null);
  const [dataInput, setDataInput] = useState(data);
  console.log(dataInput);
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

 console.log(dataInput)
  console.log(dataInput.username);
  const changePassword =async (props) => {
    const data = {
      username : props.username ,
      pwd : props.password
    }
    try {
      const response = await axios.put(
        `https://my-project-ppdr.vercel.app/register/`,
        data,
        config
      )
    }     catch (error) {
      setErrMsg(error.status);
    }
  }
  const datas = {
    id: dataInput.id,
    name: dataInput.name,
    username: dataInput.username,
  };
  console.log(datas)
  const editUser = async () => {
    const data = {
      id: dataInput.id,
      name: dataInput.name,
      username: dataInput.username,
    };
    console.log(data)
  
    try {
      const response = await axios.put(
        `https://my-project-ppdr.vercel.app/teacher/`,
        {
          id: dataInput.id,
          name: dataInput.name,
          username: dataInput.username,
        },
        config
      );
      if(dataInput.password != null && (dataInput.password).length == 0){
      
        changePassword(dataInput)
     }
     console.log(response.data)
      setDataInput(response.data);
    } catch (error) {
      setErrMsg(error);
    }
  };
  const TodoList_user = () => {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");

    const addTodo = (todo) => {
      const newTodo = {
        id: Math.random(),
        todo: todo,
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
        <h1></h1>{" "}
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
          {/* <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className=" input"
          /> */}

          <select
            id="station"
            value={selectedOption}
            onChange={handleOptionChange}
          >
            <option value="">Select an station</option>
            {station.map((station) => (
              <option key={station} value={station}>
                {station}
              </option>
            ))}
          </select>

          <button className="btn" onClick={() => addTodo(selectedOption)}>
            Add
          </button>
        </div>
        <div className="flex flex-col w-full items-center ">
          <button className="btn w-full ">submit</button>
        </div>
      </div>
    );
  };
  return (
    <div>
      <form className="bg-gray flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray m-4">
        <div className="flex flex-col space-y-4">
          <div className="space-y-4">
            <label
              htmlFor="firstname-input"
              className="text-gray-600 font-medium "
            >
              username:
            </label>
            <input
              id="firstname-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
              value={dataInput.username}
              onChange={(e) =>
                setDataInput({ ...dataInput, username: e.target.value })
              }
            />
          </div>
          <div className="mb-2 space-y-4">
            <label
              htmlFor="lastname-input"
              className="text-gray-600 font-medium"
            >
              name:
            </label>
            <input
              id="lastname-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
              value={dataInput.name}
              onChange={(e) =>
                setDataInput({ ...dataInput, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <label
              htmlFor="password-input"
              className="text-gray-600 font-medium"
            >
              password:
            </label>
            <input
              id="password-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
              type="password"
              placeholder=""
              onChange={(e) =>
                setDataInput({ ...dataInput, password: e.target.value })
              }
            />
          </div>
        </div>
        <button className="btn" onClick={() => editUser()}>
          submit
        </button>
        <div>
          {/* <label>Station</label> */}
          {/* <TodoList_user /> */}
        </div>
      </form>
    </div>
  );
};
export default EditUser;
