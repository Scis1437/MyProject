import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css";
import { useState } from "react";
import Redirect from "../item/Redirect";
import Logout from "../item/logout";
import axios from "axios";

const ConfrimDeleteAllStudent = ({ visible, handleClose }) => {
  const [errMsg, setErrMsg] = useState();
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  }; 
  
  const deleteAllStudent = async (e) => {
    e.preventDefault();
    try {
    //   await axios.delete(
    //     `https://my-project-scis1437.vercel.app/student`,
    //     config
    //   );
    handleClose()
      
    } catch (err) {
      setErrMsg("Error delete all student ");
    }

   
  };
  return (
    <div className="bg-gray-light flex flex-col justify-center p-5 rounded-md shadow-lg shadow-gray m-4 opacity-50 ">
      <p className="text-center text-subheader">DELETE ALL STUDENT</p>
      <p>Are you sure you want to delete all student?</p>
      <div className="flex justify-center items-center w-full mt-2">
        <button
          className="logout-btn"
          onClick={(event) => {
            deleteAllStudent(event), handleClose;
          }}
        >
          Sure
        </button>
        <button className="px-4 py-2 border-2 " onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfrimDeleteAllStudent;
