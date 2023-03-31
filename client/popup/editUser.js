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
  const validateInput = (input) => {
    if (!input) {
      setErrMsg("Invalid input please  fill all data.");
      return "Some input value empty";
    }
    // if (!/^[a-zA-Z\s]+$/.test(input)) {
    //   return "Input value can only contain letters and spaces";
    // }
    return null;
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const errname = validateInput(dataInput.name);
    const pwd = validateInput(dataInput.password);
    if (!errname || !pwd) {
      setErrMsg("Invalid input plese fill all data.")
      return null;
    } else  {
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
        handleClose();
        window.location.reload(false);
      } catch (err) {
        console.error(err);
        setErrMsg("Error updating teacher.");
      }
    }
  };
  if (!visible) {
    return null;
  }
  return (
    <div>
      <form className="confirm-popup  ">
        <div className="flex flex-col  justify-between space-y-4">
          <div className="space-y-4 flex justify-between mb-4">
            <label
              htmlFor="name-input"
              className="text-gray-600 font-medium md:text-lg "
            >
              name:
            </label>
            <input
              id="name-input"
              className="rounded-md w-48 py-1 px-3 bg-gray-input text-gray-700 "
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
              className="rounded-md w-48 py-1 px-3 bg-gray-input text-gray-700 border-none"
              type="password"
              placeholder=""
              onChange={(e) =>
                setDataInput({ ...dataInput, password: e.target.value })
              }
            />
          </div>
        </div>
        <p className="error-msg text-center">{errMsg}</p>
        <div className="flex  w-full items-center gap-1 mt-2">
          <button
            className="btn w-full mr-1 ml-1"
            onClick={(e) => {
              handleUpdate(e);
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
      </form>
    </div>
  );
};
export default EditUser;
