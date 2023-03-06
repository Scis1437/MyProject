import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const station = [
  { "History talking patient ": [1, 2, 3] },
  { "Peptic ulcer": [4, 5, 6] },
];

// const stations = stationTitle.map((station) => {
//   return (
//     <div>
//         station
//     </div>
//     )
// });
// const List = (props) => {
//   const [dropdown, setDropdown] = useState(false);
//   const list = props;
//   const stationTitle = list.station;

//   return (
//     <div className="py-2">
//       <div
//         className="rounded-md bg-light-green "
//         onClick={() => setDropdown(!dropdown)}
//       >
//         <p className="text-sm mx-1">{list.studentCode}</p>
//       </div>

//       {dropdown ? (
//     <div className="">
//       <label> {list.station}</label>
//       <div>
//         <form className="flex justify-between ">
//           <label className="text-xs mx-3" htmlFor="activeListening">
//          { subStations}
//           </label>
//           <select className="h-5">
//             <option value="1">1</option>
//             <option value="2">2</option>
//             <option value="3">3</option>
//           </select>
//         </form>
//       </div>
//     </div>
//   ) : null}
// </div>
//   );
// };
function Redirect({ to }) {
  const router = useRouter();
  console.log("Redirect_work");
  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

const List = (dataSet) => {
  // if (!Array.isArray(dataSet)) {
  //   return <div>Data set is not an array</div>;
  // }

  const [dropdown, setDropdown] = useState(false);
  // const { id, name } =props.data;

  // const subStationOptions = substation.map((item) => (
  //   <div key={item} value={item} className = "w-full flex justify-between">
  //     {item}
  //     <select className="h-5">
  //               <option value="1">1</option>
  //               <option value="2">2</option>
  //               <option value="3">3</option>
  //               <option value="4">4</option>
  //               <option value="5">5</option>
  //             </select>
  //   </div>
  // ));

  return (
    <div className="py-2 " key={dataSet.id}>
      <div
        className="rounded-md bg-table-odd h-7 py-5 flex items-center"
        onClick={() => setDropdown(!dropdown)}
      >
        <p className="text-sm mx-1 flex ">{dataSet.id}</p>
      </div>

      {dropdown ? (
        <div className="">
          <label> {dataSet.name}</label>
          <div>
            <form className="flex justify-between w-full">
              <label className="text-xs mx-3 w-full" htmlFor="subStation">
                {/* subStationOptions */}
              </label>
            </form>
          </div>
          <button className="btn">SAVE</button>
        </div>
      ) : null}
    </div>
  );
};

function studentlist() {
  const [error, setError] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [studentCode, setStudentCode] = useState("");
  const [data, setData] = useState([]);


  const fetchStudent = async () => {
    let token;
    if (typeof localStorage !== "undefined") {
      token = localStorage.getItem("access");
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get(
        `http://localhost:9000/student/`,
        config
      );

      setData(response.data);
      
    } catch (error) {
      setError("Error searching for student data");
    }
  };
  useEffect(() => {
    fetchStudent();
  }, []);

  const searchStudent = async (e) => {
    e.preventDefault();
    const studentId = studentCode.studentCode;

    const student = data.find((student) => student.id === studentId)
  
      setData([student])
  }

 
  console.log(data)

  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }

  return (
    <div className="background">
      <div className="header-page">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="backward-btn"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>
        <p className="text-white font-extrabold text-xl w-full md:text-2xl">
          Student list
        </p>
      </div>
      <div className="container ">
        <div className="flex w-full items-center justify-start">
          <p className="text-subheader ">search for student : </p>
          <input
            type="text"
            id="studentCode"
            name="studentCode"
            placeholder="62061xxxx"
            value={studentCode.value}
            onChange={(e) => setStudentCode({ studentCode: e.target.value })}
            className="rounded-md  w-40 md:w-auto h-6 bg-input-green p-2 mr-1"
          />

          <button className="btn" onClick={(e) => {searchStudent(e)}}>
            SUBMIT
          </button>
        </div>
        <div className="overflow-y-scroll">
          {data.map((list ) => {
            return <List key={list.id} {...list} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default studentlist;
