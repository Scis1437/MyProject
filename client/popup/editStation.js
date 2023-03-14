import React, { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const EditExam = ({ visible, data }) => {
  const [dataInput, setDataInput] = useState(data);
  const [errMsg, setErrMsg] = useState("");
  const [teacher, setTeacher] = useState();
  const [subTest, setSubtest] = useState();
  const [maxId, setMaxId] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  function generateId(data) {
    let maxId = Math.max(...data?.map((item) => item.test_number));
    if (!isFinite(maxId) || maxId <= 0) {
      maxId = 1; // Set a default value of 1
      setMaxId(maxId);
    } else {
      setMaxId(maxId + 1);
    }

    // if (isFinite(maxId) || maxId <= 0) {
    //   setMaxId(1)
    // } else {

    // }
  }
  const fetchSubtest = async () => {
    const station_Id = data.id;

    try {
      const response = await axios.get(
        `https://my-project-ppdr.vercel.app/subtest`,
        {
          params: { station_Id },
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      await setSubtest(response.data);
      await generateId(response.data);

      {
      }
    } catch (error) {
      setErrMsg(error);
    }
  };

  const fetchTeacher = async () => {
    try {
      const response = await axios.get(
        `https://my-project-ppdr.vercel.app/teacher/`,
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

  const TodoList = ({ data, test }) => {
    const [list, setList] = useState(
      subTest?.map((item) => ({
        id: item.station_Id,
        test_name: item.test_name,
        test_number: item.test_number,
      })) || []
    );
    const [input, setInput] = useState("");
    const station_Id = data.id;
    console.log(input);
    console.log(station_Id);
    console.log(maxId);
    console.log(subTest);
    console.log(list);

    // console.log(data.station_name)
    // console.log(dataSet)
    // console.log(station_Id )
    // useEffect(() => {
    //   setList(
    //     subTest?.map((item) => ({ id: item.id, todo: item.test_name })) || []
    //   );
    // }, []);
    console.log(list);

    const updateStation = async (e) => {
      e.preventDefault();
      const data = {
        id: dataInput.id,
        station_name: dataInput.station_name,
        station_teacher: parseInt(selectedTeacher),
      };
      try {
        console.log(data);
        const response = await axios.put(
          `https://my-project-ppdr.vercel.app/station`,
          // {
          //   // data,
          //   data: {
          //     id: dataInput.id,
          //     station_name: dataInput.station_name,

          //   },
          //   config,
          // }
          data,
          config
        );
        alert("Station data saved successfully");
        setDataInput(response.data);
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };

    const addTodo = (todo) => {
      const newTodo = {
        id: Math.random(),
        todo: todo,
        // id: 1 ,
        // todo:"csadsda"
      };

      // add the todo to the list
      setList([...list, newTodo]);
      console.log(list);
      // clear input box
      setInput("");
    };
    // const datatest = {
    //   station_Id: station_Id,
    //   test_name: input,
    //   test_number: maxId,
    //   station_name: data.station_name,
    // };
    // console.log(datatest)

    const addSubTest = async (e) => {
      e.preventDefault();
      const dataSet = {
        station_Id: station_Id,
        test_name: input,
        test_number: maxId,
        station_name: data.station_name,
      };
      try {
        const response = await axios.post(
          `https://my-project-ppdr.vercel.app/subtest/`,
          dataSet,
          config
        );
        const newSubtest = {
          id: maxId,
          todo: input,
        };
        setList([...list, newSubtest]);
        // setSubtest(response);
        // console.log(response.data);
        // setList(
        //   subTest?.map((item) => ({ id: item.id, todo: item.test_name })) || []
        // );
        console.log(dataSet);
      } catch (error) {
        setErrMsg(error);
      }
    };

    const deleteTodo = async (todo) => {
      console;
      try {
        const response = await axios.delete(
          `https://my-project-ppdr.vercel.app/subtest/`,
          {
            data: {
              station_Id: todo.id,
              test_number: todo.test_number,
            },

            config,
          }
        );
        // const newList = list.filter((todo) => todo.id !== id);
        // setSubtest(response.data);
        // setList(newList);
        alert("delete success");
        console.log(response.data);
      } catch (error) {
        setErrMsg(error);
      }
    };

    const deleteSubTest = async (data) => {
      const dataSet = {
        station_Id: data.id,
        test_number: data.test_number,
      };
      try {
        const response = await axios.delete(
          `https://my-project-ppdr.vercel.app/subtest/`,
          {
            data: {
              station_Id: data.id,
              test_number: data.test_number,
            }
          },
          //dataSet
          config
        );
        
        //   {
        //     data: {
        //       station_Id:data.id,
        //       test_number: data.test_number,
        //     },

        //     config,
        //   }
        // );

        // setSubtest(response.data);
        console.log(dataSet);
        alert("delete success");
      } catch (error) {
        setErrMsg(error);
      }
    };
    // const test = { station_Id: 2 };
    // const test2 = test.data;

    console.log(list);
    return (
      <div className="">
        <h1>title</h1>{" "}
        <ul className="mx-3 ">
          {list?.map((todo) => (
            <li
              key={todo.test_number}
              className="flex justify-between "
              // onClick={() => deleteTodo(todo.id)}
            >
              {todo.test_name}
              <button
                className="delete-btn"
                onClick={() => deleteSubTest(todo)}
              >
                x
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
          <button className="btn" onClick={(e) => addSubTest(e)}>
            Add
          </button>
          {/* <button className="btn" onClick={() => addSubTest()}>
            Add
          </button> */}
        </div>
        <div className="flex flex-col w-full items-center ">
          <button className="btn w-full " onClick={(e) => updateStation(e)}>
            submit
          </button>
        </div>
      </div>
    );
  };

  // if (!visible) return null;
  console.log(teacher);
  const handleSelectChange = (event) => {
    setSelectedTeacher(event.target.value);
  };
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
          {/* <label className="mr-4">Grading method :</label>
          <select className="h-5 mx-2 rounded-md">
            <option value="1">pass/fail</option>
            <option value="2">score</option>
          </select> */}
        </div>
        <div className="flex mb-4">
          <label className="mr-4">Assign to :</label>
          <select
            className="h-5"
            value={selectedTeacher}
            onChange={handleSelectChange}
          >
            <option value="">Select a teacher</option>
            {teacher?.map((teacher) => (
              <option key={teacher.id} value={teacher.id}>
                {teacher.name}
              </option>
            ))}
          </select>
        </div>
        <TodoList data={data} test={subTest} />
      </form>
    </div>
  );
};

export default EditExam;
