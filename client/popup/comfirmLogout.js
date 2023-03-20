import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css";
import { useState } from "react";
import Redirect from "../item/Redirect";
import Logout from "../item/logout";
import axios from "axios";

const ConfrimLogout = ({ visible, onCancel }) => {
  const [popup, setPopup] = useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  if (popup) {
    <Logout visible={false} />;
    return null;
  }
  if (shouldRedirect) {
    return <Redirect to="/" />;
  }
  let token; 
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const handleLogout = async () => {

    try {
      const response = await axios.post(`https://my-project-ppdr.vercel.app/logout`,config);
      localStorage.removeItem("access")
      setShouldRedirect(true)

    } catch (error) {
      setErrMsg("Error searching for student data");
    }
  };
  return (
    <div className="confirm-popup">
      <p className="text-center text-subheader "> LOG OUT</p>
      <p>Are you sure you want to log out?</p>
      <div className="flex justify-center items-center w-full">
        <button
          className="logout-btn"
          onClick= {handleLogout}
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
