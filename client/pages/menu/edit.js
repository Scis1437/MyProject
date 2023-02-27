import React, { useState , useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import todoList from "../../item/todoList";
import EditExam from "../../popup/edit";
import TodoList from "../../item/todoList";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

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
  }, [to]);

  return null;
}

const edit = () => {
  const [newOrderPostOpen, setNewOrderPostOpen] = useState("close");
  const [order, setOrder] = useState([]);
  const [data, setData] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }
  function onNewOrderClick(x, data) {
    setData(data);
    setNewOrderPostOpen(x);
  }
  console.log(newOrderPostOpen);
  let newOrderPost = null;
  switch (newOrderPostOpen) {
    case "open":
      newOrderPost = <EditExam data={data} visible={true} />;
      break;
    case "closed":
      newOrderPost = null;
      break;
  }

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
            {subject.map((items) => (
              <tr className="flex w-full justify-between px-4 py-2 odd:bg-table-odd even:bg-slate-50">
                <td className="text-sm">{items.title}</td>

                <td className="flex gap-1">
                  <button
                    className="btn"
                    onClick={() => onNewOrderClick("open", { items })}
                  >
                    Edit
                  </button>
                  <button className=" delete-btn" data="data">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button className="btn " onClick={() => onNewOrderClick("open")}>
          Add new
        </button>

        <div
          className={`${
            newOrderPostOpen === "open"
              ? "fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm "
              : ""
          }`}
        >
          {newOrderPost}
        </div>

        {/* <div className="fixed w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm flex justify-center items-center"><EditExam data={data} visible={true}/></div> */}
      </div>

      {/* <EditExam visible={true}/> */}
    </div>
  );
};
export default edit;
