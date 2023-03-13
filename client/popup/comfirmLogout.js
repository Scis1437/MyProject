import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css";
import { useState } from "react";
import Redirect from "../item/Redirect";
import Logout from "../item/logout";
import axios from "axios";

const ConfrimLogout = ({ visible, onCancel }) => {
  const [popup, setPopup] = useState(false);

  const [errMsg, setErrMsg] = useState(null);
  if (popup) {
    <Logout visible={false} />;
    return null;
  }
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleLogout = async () => {
    console.log("log out ");
    try {
      const response = await axios.put(`http://localhost:9000/logout`);
      alert("You have been logged out.");
      <Redirect to="/" />;
    } catch (error) {
      setErrMsg("Error searching for student data");
    }
  };
  return (
    <div className="bg-gray-light flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray m-4 opacity-">
      <p className="text-center text-subheader">Log out</p>
      <p>Are you sure you want to log out?</p>
      <div className="flex justify-center items-center w-full">
        <button
          className="logout-btn"
          onClick={() => {handleLogout}}
        >
          Sure
        </button>
        <button className="px-4 py-2 border-2 " onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfrimLogout;
