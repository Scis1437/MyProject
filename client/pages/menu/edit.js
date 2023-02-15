import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import todoList from "../../item/todoList";
import EditExam from "../../popup/edit";
import TodoList from "../../item/todoList";

const subject = [
  {
    title: "Histrory taking patient",
  },
  {
    title: "peptuc ulcer",
  },
];

const edit = () => {
  const [newOrderPostOpen, setNewOrderPostOpen] = useState("close");
  const [order, setOrder] = useState([]);
  const [data, setData] = useState(null);

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
    <div className={`background`} >
      <p className="text-white font-extrabold text-xl text-left w-full pl-10% md:text-2xl   ">
        Edit Exam
      </p>

      <div className="container ">
        <table className="w-full ">
          <thead className="rounded-xl  bg-gray border-radius-table">
            <tr className="">
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                <p>Title</p>
              </th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-right">
                <p></p>
              </th>
            </tr>
          </thead>

          <tbody></tbody>
        </table>

        {subject.map((items) => (
          <div className="flex w-full justify-between px-4 my-1">
            <p className="text-sm">{items.title}</p>

            <div className="flex gap-1">
              <button
                className="btn"
                onClick={() => onNewOrderClick("open", { items })}
              >
                Edit
              </button>
              <button
                className=" rounded-2xl px-3 py-1 font-semibold text-white bg-btn-red"
                data="data"
              >
                Delete
              </button>
            </div>
      
          </div>
        ))}

        <button className="btn " onClick={() => onNewOrderClick("open")}>
          Add new
        </button>

          <div className= {`${newOrderPostOpen === "open" ? "fixed w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm" : ""}`}>
              {newOrderPost}
          </div>
        
   
        {/* <div className="absolute inset-0  bg-opacity-30 backdrop-blur-sm  h-full rounded-md  "><EditExam data={data} visible={true}/></div> */}
      </div>

      {/* <EditExam visible={true}/> */}
    </div>
  );
};
export default edit;
