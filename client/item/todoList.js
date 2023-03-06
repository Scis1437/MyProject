import React from "react";
import { useState } from "react";
import EditExam from "../popup/editStation";
const TodoList = () => {
  const [list, setList] = useState([]);
  const [input, setInput] = useState("");

  const addTodo = (todo) => {
    const newTodo = {
      id: Math.random(),
      todo: todo,
      // id: 1 , 
      // todo:"csadsda" 
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
      <h1>title</h1>{" "}
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
        onClick={<EditExam visible={false} />}
      >
        <button className="btn w-full ">submit</button>
      </div>
    </div>
  );
};

export default TodoList;
