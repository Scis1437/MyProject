import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import todoList from "../../item/todoList";
import EditExam from "../../popup/editStation";
import AddExam from "../../popup/addNewStation";
import TodoList from "../../item/todoList";
import { useRouter } from "next/router";
import Logout from "../../item/logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
const subject = [
  {
    title: "Histrory taking patient",
  },
  {
    title: "peptuc ulcer",
  },
];
function Redirect({ to }) {
  const router = useRouter();
  console.log("Redirect_work");
  useEffect(() => {
    router.push(to);
  }, [to ,  router]);

  return null;
}

const Edit = () => {
  const [newOrderPostOpen, setNewOrderPostOpen] = useState("");
  const [createPostOpen, setCreatePostOpen] = useState("close");
  const [order, setOrder] = useState([]);
  const [data, setData] = useState();
  const [popupData, setPopupData] = useState();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  function onNewOrderClick(x, data) {
    setPopupData(data);
    setNewOrderPostOpen(x);
  }
  function createExamClick(status) {
    setCreatePostOpen(status);
  }
  // console.log(newOrderPostOpen);
  let newOrderPost = null;
  switch (newOrderPostOpen) {
    case "open":
      newOrderPost = <EditExam data={popupData} visible={true} />;
      break;
    case "closed":
      newOrderPost = null;
      break;
  }
  switch (createPostOpen) {
    case "open":
      newOrderPost = <AddExam visible={true} />;
      break;
    case "closed":
      newOrderPost = null;
      break;
  }

  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

 
  useEffect(() => { 
  
  
   
    const fetchStation = async () => {
    try {
      const response = await axios.get(
        `/station/`,
        config
      );

      setData(response.data);
    } catch (error) {
      setErrMsg("Error searching for student data");
    }
  };
    fetchStation();
  }, []);
  console.log(data);
  const deleteStation = async (data) => {
    const { id } = data;
    console.log(data);
    try {
      const response = await axios.delete(`${BASE_URL}/station/`, {
        data: { id },
        headers: config.headers,
      });
      //setData(response)
      console.log(data);
    } catch (error) {
      setErrMsg("");
      console.log(error);
    }
  };

  const List = (dataSet) => {
    const [dropdown, setDropdown] = useState(false);

    if (shouldRedirect) {
      return <Redirect to="/menu" />;
    }

    return (
      <tr className="flex w-full justify-between px-4 py-2 odd:bg-table-odd even:bg-slate-50">
        <td className="text-sm">{dataSet.station_name}</td>

        <td className="flex gap-1">
          <button
            className="btn"
            onClick={() => {
              onNewOrderClick("open", { ...dataSet });
            }}
          >
            Edit
          </button>
          <button
            className=" delete-btn"
            onClick={() => deleteStation({ ...dataSet })}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };
  return (
    <div className="background ">
      <div className="header-page">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="text-white mr-2 text-2xl"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>
        <p className="text-white font-extrabold text-xl w-full md:text-2xl">
          Edit station
        </p>
      </div>

      {/* <p className="text-white font-extrabold text-xl text-left w-full pl-10% md:text-2xl   ">
        Edit Exam
      </p> */}

      <div className="container ">
        <table className="w-full ">
          <thead className="rounded-xl  bg-gray border-radius-table">
            <tr className="">
              <th
                scope="col"
                className="rounded-tl-lg  text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                <p>Title</p>
              </th>
              {/* <th className=" rounded-tr-lg  text-sm font-medium text-gray-900 px-6 py-4 text-right">
              <p></p>
              </th> */}
            </tr>
          </thead>
          <tbody className="">
            {data?.map((list) => {
              return <List key={list.id} {...list} />;
            })}
          </tbody>
        </table>

        <button className="btn mt-2" onClick={() => createExamClick("open")}>
          Add new
        </button>

        <div
          className={`${
            newOrderPostOpen === "open" || createPostOpen === "open"
              ? "fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm "
              : ""
          }`}
        >
          {newOrderPost}
        </div>

        {/* <div className="fixed w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm flex justify-center items-center"><EditExam data={data} visible={true}/></div> */}
      </div>
      <div className="logout-position "><Logout/></div>
      {/* <EditExam visible={true}/> */}
    </div>
  );
};
export default Edit;
