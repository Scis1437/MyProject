import React, { useState , useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const station = [
  { "History talking patient ": [1, 2, 3] },
  { "Peptic ulcer": [4, 5, 6] },
];
const data = [
  {
    studentCode: "6206xxx2",
    station: "History talking patient ",
    substation: ["History talking patient ", "Peptic ulcer"],
  },

  {
    studentCode: "6206xxx3",
    station: "History talking patient ",
    substation: ["History talking patient ", "Peptic ulcer"],
  },
  {
    studentCode: "6206xxx4",
    station: "History talking patient ",
    substation: ["History talking patient ", "Peptic ulcer"],
  },
  {
    studentCode: "6206xxx4",
    station: "History talking patient ",
    substation: ["History talking patient ", "Peptic ulcer"],
  },
  {
    studentCode: "6206xxx4",
    station: "History talking patient ",
    substation: ["History talking patient ", "Peptic ulcer"],
  },
  {
    studentCode: "6206xxx4",
    station: "History talking patient ",
    substation: ["History talking patient ", "Peptic ulcer"],
  },
  {
    studentCode: "6206xxx4",
    station: "History talking patient ",
    substation: ["History talking patient ", "Peptic ulcer"],
  },
  {
    studentCode: "6206xxx4",
    station: "History talking patient ",
    substation: ["History talking patient ", "Peptic ulcer"],
  },
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

const List = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const { studentCode, station, substation } = props;

  const subStationOptions = substation.map((item) => (
    <div key={item} value={item} className = "w-full flex justify-between">
      {item}
      <select className="h-5">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
    </div>
  ));

  return (
    <div className="py-2 ">
      <div
        className="rounded-md bg-table-odd h-7 flex items-center"
        onClick={() => setDropdown(!dropdown)}
      >
        <p className="text-sm mx-1 flex ">{studentCode}</p>
      </div>

      {dropdown ? (
        <div className="">
          <label> {station}</label>
          <div>
            <form className="flex justify-between w-full">
              <label className="text-xs mx-3 w-full" htmlFor="subStation">
                {subStationOptions}
              </label>
          
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const student = data.map((list) => {
  console.log(list.substation);
  return <List {...list} />;
});
function studentlist() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }
  return (
    <div className="background">
            <div className="header-page">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="text-white mr-2 text-2xl"
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
          <p className="text-subheader">search for student :  </p>
          <input className="rounded-md w-36 bg-input-green pl-3 "></input>
        </div>

        {student}
        <button className="btn">
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default studentlist;
