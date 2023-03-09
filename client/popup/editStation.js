import React, { useState, useEffect } from "react";
import axios from "axios";

const editExam = ({ visible, data }) => {
  const [dataInput, setDataInput] = useState(data);
  const [errMsg, setErrMsg] = useState("");
  const [teacher, setTeacher] = useState();
  const [subTest, setSubtest] = useState();    
  const [maxId , setMaxId] = useState();
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };


  function generateId(data) {
    let maxId = Math.max(...data?.map(item => item.test_number));
    console.log(maxId) // find the largest ID in the array
    setMaxId( maxId + 1);
  }
  
  const fetchSubtest = async () => {
    const station_Id = data.id;

    try {
      const response = await axios.get(`http://localhost:9000/subtest`, {
        params: { station_Id },
        headers: { Authorization: `Bearer ${token}` },
      });      
      console.log(response.data);  
      await setSubtest(response.data);
      await generateId(response.data)
   

      {
      }
    } catch (error) {
      setErrMsg(error);
    }
  };

  const fetchTeacher = async () => {
    try {
      const response = await axios.get(
        `http://localhost:9000/teacher/`,
        config
      );

      setTeacher(response.data);
    } catch (error) {
      setErrMsg(error);
    }
  };
  useEffect(() => {
    fetchTeacher();
    fetchSubtest();
  }, []);



  // console.log(teacher);
  // console.log(subTest);
  // console.log(errMsg);
  const editStation = async () => {
    try {
      console.log(dataInput);
      const response = await axios.put(
        `http://localhost:9000/station`,
        dataInput,
        config.headers
      );
      setDataInput(response.data);
    } catch (error) {
      setErrMsg("Error searching for student data");
    }
  };

  const TodoList = ({data}) => {
    const [list, setList] = useState((subTest?.map((item) => ({ id: item.id, todo: item.test_name })) || []));
    const [input, setInput] = useState("");   
    const station_Id = data.id;
  
   const dataSet = {
        station_Id: station_Id,
        test_name: input,
         test_number:maxId,
        station_name : data.station_name ,
      }; 
      // console.log(data.station_name)
      // console.log(dataSet) 
      // console.log(station_Id )
    // useEffect(() => {
    //   setList(
    //     subTest?.map((item) => ({ id: item.id, todo: item.test_name })) || []
    //   );
    // }, []);
 
    const addTodo = (todo) => {
      const newTodo = {
        id: Math.random(),
        todo: todo,
        // id: 1 ,
        // todo:"csadsda"
      };

      // add the todo to the list
      setList([...list, newTodo]);
      console.log(list)
      // clear input box
      setInput("");
    };
    console.log(input)
    const addSubTest = async (e) => {
        e.preventDefault();
     
      try {
        const response = await axios.post(
          `http://localhost:9000/subtest/`,
          dataSet,
          config
        );
        const newSubtest = {
          id: maxId,
          todo: dataInput,
  
        };
        setList([...list, newSubtest ]);
       setSubtest(response);
        console.log(response.data);
        setList(
          subTest?.map((item) => ({ id: item.id, todo: item.test_name })) || []
        );
        {
        }
      } catch (error) {
        setErrMsg(error);
      }
    };
    const deleteTodo = (id) => {
      // Filter out todo with the id
      const newList = list.filter((todo) => todo.id !== id);

      setList(newList);
    };   
    const test = { station_Id: 2} 
    const test2 = test.data ;
   
     const deleteSubTest = async () => {
    
 
    try {
      const response = await axios.delete(
        `http://localhost:9000/subtest/`,{
          test ,
          // data : {  station_Id: 4}      
          config}
          
  
      );
  
      // setSubtest(response.data);
      console.log(response.data);
      {
      }
    } catch (error) {
      setErrMsg(error);
    }
  };

    return (
      <div className="">
        <h1>title</h1>{" "}
        <ul className="mx-3 ">
          {list.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between "
              // onClick={() => deleteTodo(todo.id)}
            >
              {todo.todo}
              <button
                className="delete-btn"
                onClick={() => deleteSubTest()}
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

          <button className="btn" onClick={(e) =>  addSubTest(e)}>
            Add
          </button>
        </div>
        <div
          className="flex flex-col w-full items-center "
          onClick={() => editStation()}
        >
          <button className="btn w-full ">submit</button>
        </div>
      </div>
    );
  };

  if (!visible) return null;

  return (
    <div className="absolute inset-2/4 bg-opacity-30 ml-50 flex items-center justify-center ">
      <form className="bg-gray flex flex-col justify-center p-2 rounded-md shadow-lg shadow-gray">
        <div className="flex mb-4">
          <label>Station : </label>
          <input
            className=" rounded-md w-20 bg-input-green pl-3 mx-2 "
            value={dataInput.station_name}
            onChange={(e) =>
              setDataInput({ ...dataInput, station_name: e.target.value })
            }
          ></input>
        </div>
        <div className="flex mb-4">
          <label className="mr-4">Grading method :</label>
          <select className="h-5 mx-2 rounded-md">
            <option value="1">pass/fail</option>
            <option value="2">score</option>
          </select>
        </div>
        <div className="flex mb-4">
          <label className="mr-4">Assign to :</label>
          <select
            className="h-5 mx-2 rounded-md"
            // value={this.state.selectValue}
          >
            {teacher?.map((obj) => (
              <option key={obj.teacher_name} value={obj.value}>
                {obj.teacher_name}
              </option>
            ))}
          </select>
        </div>
        <TodoList data = {data}/>
      </form>
    </div>
  );
};

export default editExam;
