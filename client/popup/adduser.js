import React from "react";
import TodoList from "../item/todoList";
import Homemodule from "../styles/Home.module.css";
import { useState } from "react";
const adduser = ({ visible }) => {
  const TodoList_user = () => {
    const [list, setList] = useState([]);
    const [input, setInput] = useState("");
  
    const addTodo = (todo) => {
      const newTodo = {
        id: Math.random(),
        todo: todo,
      };
  
      // add the todo to the list
      setList([...list, newTodo]);
  
      // clear input box
      setInput("");
    };
  
    const deleteTodo = (id) => {
      // Filter out todo with the id
      const newList = list.filter((todo) => todo.id !== id);
  
      setList(newList);
    };
  
    return (
      <div className="">
        <h1></h1>{" "}
        <ul>
          {list.map((todo) => (
            <li key={todo.id}>
              {todo.todo}
              <button
                className="bg-btn-red rounded-md"
                onClick={() => deleteTodo(todo.id)}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-1 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className=" input"
          />
  
         
          {/* <select className="h-5 mx-2">
            <option value="1">pass/fail</option>
            <option value="2">score</option>
          </select> */}
  
          <button className="btn" onClick={() => addTodo(input)}>
            Add
          </button>
        </div>
        <div
          className="flex flex-col w-full items-center "
    
        >
          <button className="btn w-full ">submit</button>
        </div>
      </div>
    );
  };
  console.log("add user active");
  if (!visible) return null;
  return (
    <div className="absolute inset-2/4 bg-opacity-30 ml-50 flex items-center justify-center ">
      <form className="bg-gray flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray">
        <div className="flex flex-col mb-4">
          <div>
            <label>Firstname :</label>
            <input className=" rounded-md w-20 bg-input-green pl-3 mx-2"></input>
          </div>
          <div>
            {" "}
            <label>Lastname :</label>
            <input className=" rounded-md w-20 bg-input-green pl-3 mx-2"></input>
          </div>
          <div>
            <label>Password :</label>
            <input className=" rounded-md w-20 bg-input-green pl-3 mx-2"></input>
          </div>
        </div>
        <div>
          <label>Station</label>
          <TodoList_user />
        </div>
      </form>
    </div>
  );
};

export default adduser;
