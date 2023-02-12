import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css"
const editExam = ({ visible, data }) => {
  console.log(data);
  if (!visible) return null;
  return (

     
    
      <div   className="absolute bg-opacity-30 backdrop-blur-sm h-full rounded-md justify-center">
        <form className="bg-gray w-4/5 absolute  inset-x-0">
          <div className="flex">
            <label>Station :</label>
            <input className=" rounded-md w-20  bg-input-green pl-3"></input>
          </div>
          <div>
            <label>Gradding method :</label>
            <select className="h-5">
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
