import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css";
const editExam = ({ visible, data }) => {
  console.log(data);
  if (!visible) return null;
  return (
    <div className="absolute inset-2/4 bg-opacity-30 ml-50 flex items-center justify-center ">
      <form className="bg-gray flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray">
        <div className="flex mb-4">
          <label>Station :</label>
          <input className=" rounded-md w-20 bg-input-green pl-3 mx-2"></input>
        </div>
        <div className="flex mb-4">
          <label className="mr-4">Grading method :</label>
          <select className="h-5 mx-2 rounded-md">
            <option value="1">pass/fail</option>
            <option value="2">score</option>
          </select>
        </div>
        <TodoList />
      </form>
    </div>
  );
};

export default editExam;
