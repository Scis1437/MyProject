import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
const EditUser = ({ visible, data }) => {
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

  const editUser = async () => {
    const data = {
      id: dataInput.id,
      name: dataInput.name,
      username: dataInput.username,
    };
    console.log(data);

    try {
      const response = await axios.put(
        `https://my-project-ppdr.vercel.app/teacher/`, 
        {
           data, config
        }
      );

      if (dataInput.password !== "") {
        const data = {
          username: dataInput.username,
          pwd: dataInput.password,
        };
        try {
          const response = await axios.put(
            `https://my-project-ppdr.vercel.app/register/`,
            data,
            config
          );
        } catch (error) {
          setErrMsg(error.status);
        }

       
      }

      // setDataInput(response.data);
    } catch (error) {
      setErrMsg(error.message);
    }
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
        <button className="btn" onClick={editUser}>
          submit
        </button>
        {errMsg && <div className="text-red-500">{errMsg}</div>}
      </form>
    </div>
  );
};
export default EditUser;
