import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import todoList from "../../item/todoList";
import EditExam from "../../popup/editStation";
import AddExam from "../../popup/addNewStation";
import TodoList from "../../item/todoList";
import { useRouter } from "next/router";
import Logout from "../../item/logout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronCircleLeft,
  faSlash,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import MyApp from "../_app";
import AppContext from "../../context/AppContext";
import ConfrimDeleteStation from "../../popup/confirmDeleteStation";
import ConfirmDeletePopup from "../../popup/confirmDeletePopup";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function Redirect({ to }) {
  const router = useRouter();
  console.log("Redirect_work");
  useEffect(() => {
    router.push(to);
  }, [to, router]);

  return null;
}

const Edit = () => {
  const [
    newOrderPostOpen,
    setNewOrderPostOpen,
    createPostOpen,
    setCreatePostOpen,
    prop,
  ] = useContext(AppContext);

  const [order, setOrder] = useState();
  const [data, setData] = useState();
  const [popupData, setPopupData] = useState();
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [teacher, setTeacher] = useState();
  const [allStation, setAllStation] = useState();
const[deleteData , setDeleteData ] = useState()
  const [confirmDeleteStation , setConfirmDeleteStation] = useState(false) ;
  function onNewOrderClick(data) {
    setPopupData(data);
    setNewOrderPostOpen(true);
    console.log(data);
  }
  function createExamClick() {
    setCreatePostOpen(true);
  }  
  const deleteStation = async (data) => {
    setConfirmDeleteStation(true);
    setDeleteData(data)
  };
  const closeOrderPost = () => {
    setNewOrderPostOpen(false);
    setCreatePostOpen(false); 
    setConfirmDeleteStation(false);
  };
  

  let conponentConfirm = null;
  switch (confirmDeleteStation) {
    case true:
      conponentConfirm = (
        <ConfrimDeleteStation visible={false} handleClose={closeOrderPost} data={deleteData}/>
      );
      break;
    case false:
      conponentConfirm = null;
      break;
  }

  let newOrderPost = null;
  let newEditPost = null;


  switch (newOrderPostOpen) {
    case true:
      newEditPost = (
        <EditExam
          data={popupData}
          visible={true}
          handleClose={closeOrderPost}
        />
      );
      break;
    case false:
      newEditPost = null;
      break;
  }
  switch (newOrderPostOpen) {
    case true:
      newEditPost = (
        <EditExam
          data={popupData}
          visible={true}
          handleClose={closeOrderPost}
        />
      );
      break;
    case false:
      newEditPost = null;
      break;
  }

  switch (createPostOpen) {
    case true:
      newOrderPost = <AddExam visible={true} handleClose={closeOrderPost} />;
      break;
    case false:
      newOrderPost = null;
      break;
  }

  console.log(prop);
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const parseJwt = (bearerToken) => {
    const token = bearerToken.split(" ")[1];
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  };
  useEffect(() => {
    const fetchTeacher = async () => {
      const user = await parseJwt(`Bearer ${localStorage.getItem("access")}`);
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/teacher/`,
          config
        );
        const filterData = response.data.filter(
          (item) => item.username === user.UserInfo.username
        );
        console.log(filterData[0]);
        await setTeacher(filterData[0]);
  
        // Call fetchStation after setting the teacher state
        fetchStation(filterData[0]);
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };
  
    const fetchStation = async (teacher) => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/station/`,
          config
        );
     
        if (teacher?.roles === "ADMIN") {
          setData(response.data);
        } else {
          const filterData = response.data.filter(
            (item) => item.station_teacher === teacher.id
          );
          setData(filterData);
        }
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };
  
    fetchTeacher();
  }, []);
  

  console.log(data);
  // const deleteStation = async (data) => {
  //   const idStation = data.id;
  //   console.log(data);
  //   try {
  //     const response = await axios.delete(
  //       `https://my-project-ppdr.vercel.app/station?id=${idStation}`,
  //       config
  //     );

  //     // setData(response);
  //     console.log(data);
  //   } catch (error) {
  //     setErrMsg("");
  //     console.log(error);
  //   }
  // };

  const List = (dataSet) => {
    const [dropdown, setDropdown] = useState(false);

    return (
      <tr className="flex w-full justify-between px-4 py-2 odd:bg-table-odd even:bg-table-even ">
        <td className="text-sm">{dataSet.station_name}</td>

        <td className="flex gap-1">
          <button
            className="semi-btn"
            onClick={() => {
              onNewOrderClick({ ...dataSet });
            }}
          >
            Edit
          </button>
          <button
            className="semi-delete-btn"
            onClick={(e) => deleteStation({ ...dataSet }, e)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };
  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }

  // console.log(teacher.roles === "ADMIN")
  return (
    <div className="background ">
      <div className="header-page ">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="backward-btn"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="text-white font-extrabold text-xl w-full md:text-2xl">
            STATION
          </p>
          <div className="logout-position">
            <Logout />
          </div>
        </div>
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
                className="rounded-tl-lg rounded-tr-lg bg-gray-table text-sm font-medium text-gray-900 px-6 py-4 text-left text-header-table"
              >
                <p>Station</p>
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
            {/* {teacher?.roles === "ADMIN"
              ? allStation?.map((list) => <List key={list.id} {...list} />)
              : data?.map((list) => <List key={list.id} {...list} />)} */}
          </tbody>
        </table>
        {/* {`btn mt-2 ${ teacher?.roles !== 1 ? 'hidden' : ''}`} */}
        <button className={`btn mt-2 ${ teacher?.roles !== "ADMIN" ? 'hidden' : ''}`}  onClick={() => createExamClick()}>
          Add new
        </button>

        <div
          className={`${
            newOrderPostOpen === true || createPostOpen === true || confirmDeleteStation ===true
              ? "fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm z-20 "
              : ""
          }`}
        >
          {newOrderPost}
          {conponentConfirm}
          {newEditPost}
        </div>

        {/* <div className="fixed w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm flex justify-center items-center"><EditExam data={data} visible={true}/></div> */}
      </div>

      {/* <EditExam visible={true}/> */}
    </div>
  );
};
export default Edit;
