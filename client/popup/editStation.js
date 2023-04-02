import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus } from "@fortawesome/free-solid-svg-icons";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const EditExam = ({ visible, data, handleClose }) => {
  const [dataInput, setDataInput] = useState(data);
  const [errMsg, setErrMsg] = useState("");
  const [teacher, setTeacher] = useState();
  const [subTest, setSubtest] = useState();
  const [maxId, setMaxId] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();
  // let token;
  // if (typeof localStorage !== "undefined") {
  //   token = localStorage.getItem("access");
  // }
  const token = localStorage.getItem("access");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  console.log(data);
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

  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/teacher/`,
          config
        );
        setTeacher(response.data);
        const filterData = response.data.filter(
          (item) => item.id === dataInput.station_teacher
        );
        setSelectedTeacher(filterData[0].username);
      } catch (error) {
        setErrMsg(error);
      }
    };
    fetchTeacher();
  }, []);

  // console.log(teacher);
  // console.log(subTest);
  // console.log(errMsg);

  useEffect(() => {
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
        generateId(response.data);
        console.log(response.data);
        setSubtest(response.data);

        {
        }
      } catch (error) {
        setErrMsg(error);
      }
    };

    fetchSubtest();
  }, []);
  const TodoList = ({ data }) => {
    const [list, setList] = useState(
      subTest?.map((item) => ({
        id: item.station_Id,
        test_name: item.test_name,
        test_number: item.test_number,
      })) || []
    );

    const [input, setInput] = useState("");
    const station_Id = data.id;
    // console.log(input);
    // console.log(station_Id);
    // console.log(maxId);
    // console.log(subTest);
    // console.log(list);

    console.log(dataInput);
    const updateStation = async (e) => {
      e.preventDefault();
      const data = {
        id: dataInput.id,
        station_name: dataInput.station_name,
        // station_teacher: dataInput.station_teacher,
      };
      try {
        console.log(data);
        const response = await axios.put(
          `https://my-project-ppdr.vercel.app/station`,

          data,
          config
        );
        // alert("Station data saved successfully");
        setDataInput(response.data);
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };

    const addSubTest = async (e) => {
      e.preventDefault();
      const dataSet = {
        station_Id: station_Id,
        test_name: input,
        test_number: maxId,
        station_name: data.station_name,
      };
      console.log(dataSet);
      try {
         await axios.post(
          `https://my-project-ppdr.vercel.app/subtest/`,
          dataSet,
          config
        );
        const newSubTest = {
          id: station_Id,
          test_name: input,
          test_number: maxId,
        };
        // setDataInput("")
        // add the todo to the list

        // setDataInput([...list, newTodo]);
        const updatedList = [...list, newSubTest];
        setList(updatedList);
        console.log(list)
        setInput(""); // clear the input field
      } catch (error) {
        setErrMsg(error);
      }
    };

    const deleteSubTest = async (data, e) => {
      e.preventDefault();
      const dataSet = data.test_name;

      console.log(config);
      try {
        // console.log(data.test_name)
        const response = await axios.delete(
          `https://my-project-ppdr.vercel.app/subtest?test_name=${dataSet}`,
          config
        );
        const updatedList = list.filter((item) => item.test_name !== data.test_name);
        setList(updatedList);
        // console.log(response.data)
        // alert("delete subtest success");

        // setSubtest(response.data);
      } catch (error) {
        setErrMsg(error);
      }
    };
    // const test = { station_Id: 2 };
    // const test2 = test.data;


    return (
      <div className="">
        <h1 className="text-lg">Title</h1>{" "}
        <ul className="mx-3 ">
          {list?.map((todo) => (
            <li
              key={todo.test_number}
              className="flex justify-between "
              // onClick={() => deleteTodo(todo.id)}
            >
              {todo.test_name}
              {/* <FontAwesomeIcon icon="fa-solid fa-circle-minus" /> */}
              <ClearRoundedIcon
                className="delete-btn-todo"
                onClick={(e) => deleteSubTest(todo, e)}
              />
            </li>
          ))}
        </ul>
        <div className="flex gap-1 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="input_box h-7"
          />

          {/* <select className="h-5 mx-2">
            <option value="1">pass/fail</option>
            <option value="2">score</option>
          </select> */}
          
          <button
            className="semi-btn"
            onClick={(e) => {
              addSubTest(e);
            }}
          >
            Add
          </button>
          {/* <button className="btn" onClick={() => addSubTest()}>
            Add
          </button> */}
        </div>
        <div className="flex gap-1 w-full items-center ">
          <button
            className="btn w-full "
            onClick={(e) => {
              updateStation(e), handleClose();
            }}
          >
            submit
          </button>
          <button
            onClick={() => {
              handleClose();
            }}
            className="delete-btn w-full "
          >
            cancle
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
  console.log(selectedTeacher);
  return (
    <div className="absolute inset-2/4 bg-opacity-30 ml-50  flex items-center  bg-gray-light justify-center p-5 rounded-md shadow-lg shadow-gray">
      <form className=" flex flex-col ">
        <div className="flex mb-4 text-lg">
          <label>Station : </label>
          <input
            className="input_box "
            value={dataInput.station_name}
            onChange={(e) =>
              setDataInput({ ...dataInput, station_name: e.target.value })
            }
          ></input>
        </div>
        <div className="flex">
          {/* <label className="mr-4">Grading method :</label>
      <select className="h-5 mx-2 rounded-md">
        <option value="1">pass/fail</option>
        <option value="2">score</option>
      </select> */}
        </div>
        <div className="flex ">
          {/* <label className="mr-4">Assign to :</label>
          <select
        className="h-5"
        value={selectedTeacher}
        onChange={(e) => {
          setSelectedTeacher(e.target.value);
          setDataInput({ ...dataInput, station_teacher: e.target.value });
        }}
      >
        <option value="null">Select a teacher</option>
        {teacher?.map((teacher) => (
          <option key={teacher.id} value={teacher.username}>
            {teacher.username}
          </option>
        ))}
      </select> */}
        </div>
        <TodoList data={data} test={subTest} />
      </form>
    </div>
  );
};

export default EditExam;
