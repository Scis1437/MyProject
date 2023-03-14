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
  const [updated, setUpdated] = useState(false);

  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = {
      id: dataInput.id,
      username: dataInput.username,
      name: dataInput.name,
    };
    console.log(dataInput);
    console.log(data);

    try {
      const response = await axios.put(
        "https://my-project-ppdr.vercel.app/teacher",
        {
          data: {
            query: {
              id: dataInput.id,
              username: dataInput.username,
              name: dataInput.name,
            },
          },
        },
        config
      );
      console.log(response.data);
      // reset input fields after successful update
      setDataInput(null);
      console.log(data);
      // if (dataInput.password !== "" ||  dataInput.password !== null) {
      //   const data = {
      //     username: dataInput.username,
      //     pwd: dataInput.password,
      //   };
      //   try {
      //     const response = await axios.put(
      //       `https://my-project-ppdr.vercel.app/register/`,
      //       data,
      //       config
      //     );
      //   } catch (error) {
      //     setErrMsg(error.status);
      //   }

      // }
    } catch (err) {
      console.error(err);
      setErrMsg("Error updating teacher.");
    }
    //  setUpdated(true)
  };

  // if (!visible || updated) {
  //   return null;
  // }
  return (
    <div>
      <form className="bg-gray flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray m-4">
        <div className="flex flex-col space-y-4">
          <div className="space-y-4">
            <label htmlFor="id-input" className="text-gray-600 font-medium ">
              username:
            </label>
            <input
              id="id-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700"
              value={dataInput.username}
              onChange={(e) =>
                setDataInput({ ...dataInput, username: e.target.value })
              }
            />
          </div>
          <div className="mb-2 space-y-4">
            <label htmlFor="name-input" className="text-gray-600 font-medium">
              name:
            </label>
            <input
              id="name-input"
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
        <button className="btn" onClick={handleUpdate}>
          Update Teacher
        </button>
        {errMsg && <div className="text-red-500 text-center">{errMsg}</div>}
      </form>
    </div>
  );
};
export default EditUser;
