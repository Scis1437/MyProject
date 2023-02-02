import React from "react";
import { useState } from "react";
const todoList = () => {
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
      <h1>Title</h1>{" "}
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
      <div className="flex gap-1">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className=" input"
        />
        <button className="btn" onClick={() => addTodo(input)}>
          Add
        </button>
      </div>
      <div className="flex items-center  m-auto">
        <button className="btn">submit</button>
      </div>
    </div>
  );
};

export default todoList;
