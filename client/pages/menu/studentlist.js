import React, { useState } from "react";
const station = [
  { "History talking patient ": [1, 2, 3] },
  { "Peptic ulcer": [4, 5, 6] },
];
const data = [
  // {
  //   studentCode: "6206xxx1",
  //   station : [
  //     { "History talking patient ": [1, 2, 3] },
  //     { "Peptic ulcer": [4, 5, 6] },
  //   ]
  // },
  {
    studentCode: "6206xxx2",
    station: "History talking patient "[" Active Listening"],
  },

  {
    studentCode: "6206xxx3",
    station: "History talking patient "[" Active Listening"],
  },

  // station: "History talking patient "[" Active Listening"],
];

const List = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const list = props;
  const stationTitle= list.station ; 
  console.log();
  // const stations = stationTitle.map((station) => {
  //   return (
  //     <div>
  //         station
  //     </div>
  //     )
  // });
  return (
    <div className="py-2">
      <div
        className="rounded-md bg-light-green "
        onClick={() => setDropdown(!dropdown)}
      >
        <p className="text-sm mx-1">{list.studentCode}</p>
      </div>

      {dropdown ? (
        <div className="">
          <p>{list.station[1]}</p>
          <div>
            <form className="flex justify-between ">
              <label className="text-xs mx-3" for="activeListening">
                {list.station}
              </label>
              <select className="h-5">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

const student = data.map((list) => {
  return <List {...list} />;
});
function studentlist() {
  return (
    <div className="background">
      <p className="text-header">Student list</p>
      <div className="container ">
        <div className="flex w-full items-center justify-start">
          <p className="text-subheader">student code : </p>
          <input className="rounded-md w-36 bg-input-green pl-3 "></input>
        </div>

        {student}
      </div>
    </div>
  );
}

export default studentlist;
