import React from "react";
import TodoList from "../item/todoList";
const editExam = ({visible}) => {
  console.log("work");
  if(!visible) return null ;
  return (
    <div className=" absolute  inset-0  bg-opacity-30 backdrop-blur-sm w-full h-full rounded-md justify-center ">
      <form className="bg-gray">
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
        <TodoList/>
      </form>
   

    </div>
  );
};

export default editExam;
