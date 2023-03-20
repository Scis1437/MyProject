import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css";
import { useState } from "react";
import axios from "axios";
const EditUser = ({ visible, data, handleClose }) => {
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
    // const data = {
    //     username: dataInput.username,
    //     name : dataInput.name
    //            pwd: dataInput.password,
    //   // id : dataInput.id ,
    //   // username : dataInput.username,
    //   // name : dataInput.name,
    // };
    // console.log(data);
    // console.log(dataInput);
    // try {
    //   const response = await axios.put(
    //     "https://my-project-ppdr.vercel.app/teacher",
    //   {  data},
    //     config
    //   );
    //   console.log(response.data);

    try {
      const response = await axios.put(
        `https://my-project-ppdr.vercel.app/register/`,
        {
          user: dataInput.username,
          name: dataInput.name,
          pwd: dataInput.password,
        },
        config
      );
      console.log(data);
      alert("update user");
      // console.log(dataInput.password !== "" || dataInput.password !== null);
      // if (dataInput.password !== "" || dataInput.password !== null) {
      //   const data = {
      //     user: dataInput.username,
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
  };
  if (!visible) {
    return null;
  }
  return (
    <div>
      <form className="bg-gray-light flex flex-col justify-between  p-2 rounded-md shadow-xl shadow-gray m-4 ">
        <div className="flex flex-col  justify-between space-y-4">
          {/* <div className="space-y-4">
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
          </div> */}
          <div className="space-y-4 flex justify-between mb-4">
            <label htmlFor="name-input" className="text-gray-600 font-medium md:text-lg ">
              name:
            </label>
            <input
              id="name-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700 "
              value={dataInput.name}
              onChange={(e) =>
                setDataInput({ ...dataInput, name: e.target.value })
              }
            />
          </div>
          <div className="space-y-4 flex justify-between mb-4">
            <label
              htmlFor="password-input"
              className="text-gray-600 font-medium md:text-lg "
            >
              password:
            </label>
            <input
              id="password-input"
              className="rounded-md w-48 py-1 px-3 bg-input-green text-gray-700 border-none"
              type="password"
              placeholder=""
              onChange={(e) =>
                setDataInput({ ...dataInput, password: e.target.value })
              }
            />
          </div>
        </div>
        <div className="flex  w-full items-center gap-1">
          <button
            className="btn w-full mr-1 ml-1"
            onClick={(e) => {
              handleUpdate(e), handleClose();
            }}
          >
            Update
          </button>
          <button
          className="delete-btn w-full mr-1 ml-1"
            onClick={() => {
              handleClose();
            }}
          >
            Cancle
          </button>
        </div>

        {errMsg && <div className="text-red-500 text-center">{errMsg}</div>}
      </form>
    </div>
  );
};
export default EditUser;
