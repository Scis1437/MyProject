import React from "react";
import TodoList from "../item/todoList";
// import Homemodule from "../styles/Home.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
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

    try {
      const data = {
        user: username,
        teacher_name: name,
        pwd: password,
      };
      console.log(data);
      const response = await axios.post(
        `https://my-project-ppdr.vercel.app/register`,
        { user: username, teacher_name: name, pwd: password },
        config
      );
      // visible = false;
      console.log(response.data);
    } catch (error) {
      setError("reg error");
    }
  };

  const [selectedOption, setSelectedOption] = useState("");

  if (!visible) return null;


  return (
    <div className="">
      <form className="bg-gray flex flex-col justify-between  p-2 rounded-md shadow-lg shadow-gray m-4 ">
        <div className="flex flex-col  justify-between space-y-4">
          <div className="space-y-4 flex justify-between mb-4">
            <label
              htmlFor="firstname-input"
              className="text-gray-600 font-medium "
            >
              USERNAME :
            </label>
            <input
              id="firstname-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="space-y-4 flex justify-between mb-4">
            <label className="text-gray-600 font-medium">NAME :</label>
            <input
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
              type=""
              placeholder="Charnnarong chaoroensanongkun"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-4  flex justify-between mb-4">
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
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="flex  w-full items-center gap-1 ">
        
            <button className="btn w-full mr-1 ml-1 " onClick={(e) => regUser(e)}>
              submit
            </button>
            <button
              className="delete-btn w-full  mr-1 ml-1"
              onClick={() => (visible = false)}
            >
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
