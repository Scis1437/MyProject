import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css";
import { useState } from "react";
import Redirect from "../item/Redirect";
import Logout from "../item/logout";
import axios from "axios";

const ConfrimDeleteUser = ({ visible, handleClose, data }) => {
  const [errMsg, setErrMsg] = useState();
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const deleteUser = async () => {
    const username = data.username;

    try {
    await axios.delete(
        `https://my-project-ppdr.vercel.app/teacher?id=${username}`,
        config
      );

      // setTeacher((prevTeachers) =>
      //   prevTeachers.filter(
      //     (teacher) => teacher.teacher_name !== item.teacher_name
      //   )
      // );
    //   alert(`User for ${data.username} deleted`);
      handleClose()
      console.log(`delete ${data.username}`)
      // console.log(response.data);
      // return response.data;
    } catch (error) {
      setErrMsg(error.message);
    }
  };
    console.log(data)
  //   alert("delete all sudent!");
  // };

  return (
    <div className="bg-gray-light flex flex-col justify-center p-5 rounded-md shadow-lg shadow-gray m-4 opacity-50 ">
      <p className="text-center text-subheader">
        DELETE STATION{" "}
        <span className="text-red-incomplete">{data.station_name}</span>
      </p>
      <p>Are you sure you want to delete station?</p>
      <div className="flex justify-center items-center w-full mt-2">
        <button
          className="logout-btn"
          onClick={(event) => {
            deleteUser(event);
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

export default ConfrimDeleteUser ;
