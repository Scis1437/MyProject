import React from "react";
import TodoList from "../item/todoList";
// import Homemodule from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
const AddUser = ({ visible }) => {
  const station = [
    "History talking patient ",
    "Peptic ulcer ",
    "Palpation of the thyroid",
  ];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }
  const regUser = async (e) => {
    e.preventDefault();
    let token;
    if (typeof localStorage !== "undefined") {
      token = localStorage.getItem("access");
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(name,username,password)
    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        { username: username,
          
          name: name,
          password:password,},
        config
      );
      visible = false;
      console.log(response.status);
    } catch (error) {
      setError("reg error");
    }
  };
  // useEffect(() => {
  //   fetchStudent();
  // }, []);
  const [selectedOption, setSelectedOption] = useState("");

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
          <button className="btn w-full  " onClick={(e) => regUser(e)}>
            submit
          </button>
        </div>
      </div>
    );
  };
  if (!visible) return null;

  return (
    <div>
      <form className="bg-gray flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray m-4">
        <div className="flex flex-col space-y-4">
          <div className="space-y-4">
            <label
              htmlFor="firstname-input"
              className="text-gray-600 font-medium "
            >
              USERNAME :
            </label>
            <input
              id="firstname-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
              onChange={(e) =>
                setUsername({ ...username, username: e.target.value })
              }
            />
          </div>
          <div className="mb-2 space-y-4"></div>{" "}
          <div className="space-y-4">
            <label
              htmlFor="password-input"
              className="text-gray-600 font-medium"
            >
              NAME :
            </label>
            <input
              id="password-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
              type=""
              placeholder="Charnnarong chaoroensanongkun"
              onChange={(e) =>
                setName({ ...name, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-4">
            <label
              htmlFor="password-input"
              className="text-gray-600 font-medium"
            >
              PASSWORD:
            </label>
            <input
              id="password-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
              type="password"
              placeholder=""
              onChange={(e) =>
                setPassword({ ...password, password: e.target.value })
              }
            />
          </div>
        </div>


          <div className="flex flex-col w-full items-center ">
          <button className="btn w-full  " onClick={(e) => regUser(e)}>
            submit
          </button>
          <button className="delete-btn w-full  " onClick={() => visible = false}>
            cancel
          </button>
        </div>
          {/* <TodoList_user /> */}

      </form>
    </div>
  );
};

// return (
//   <div className="absolute inset-2/4 bg-opacity-30 ml-50 flex items-center justify-center ">
//     <form className="bg-gray flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray m-4">
//       <div className="flex flex-col space-y-4">
//         <div className="space-y-4">
//           <label
//             htmlFor="firstname-input"
//             className="text-gray-600 font-medium "
//           >
//             Firstname:
//           </label>
//           <input
//             id="firstname-input"
//             className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
//             value={dataInput.firstname}
//             onChange={(e) =>
//               setDataInput({ ...dataInput, firstname: e.target.value })
//             }
//           />
//         </div>
//         <div className="mb-2 space-y-4">
//           <label
//             htmlFor="lastname-input"
//             className="text-gray-600 font-medium"
//           >
//             Lastname:
//           </label>
//           <input
//             id="lastname-input"
//             className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
//             value={dataInput.lastname}
//             onChange={(e) =>
//               setDataInput({ ...dataInput, lastname: e.target.value })
//             }
//           />
//         </div>
//         <div className="space-y-4">
//           <label
//             htmlFor="password-input"
//             className="text-gray-600 font-medium"
//           >
//             Password:
//           </label>
//           <input
//             id="password-input"
//             className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
//             type="password"
//             placeholder=""
//           />
//         </div>
//       </div>

//       <div>
//         <label>Station</label>
//         <TodoList_user />
//       </div>
//     </form>
//   </div>
// );

export default AddUser;
