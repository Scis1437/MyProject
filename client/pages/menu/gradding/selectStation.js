// import React from "react";
// import { useState } from "react";
// import { useRouter } from "next/router";
// // import StudentCheck from "../student";
// const station = [
//   { station: "Hisstory talking patient ", status: "Complete" },
//   { station: "Peptic ulcer ", status: "Incomplete" },
//   { station: "Palpation of the thyroid", status: "Complete" },
//   { station: "comunityaquired pnueumonia", status: "" },
// ];

// function Redirect({ to  , station}) {
//   const router = useRouter();
//   console.log(to);
//   console.log("Redirect_work");
//   useEffect(() => {
//     router.push(to);
//     router.push(station);
//   }, [to , station]);

//   return null;
// }

//  function gradding(props) {
//   const router = useRouter();
//   const data = props;
  
//   console.log(data.station);
//   if (props.status === "Complete") {
//     // shouldRedirect(true) ;
//     console.log("This station already grad");
//     return null;
//   } else {
   
//     console.log("Redirect");
//     return  <Redirect to="/menu/gradding/gradding"  station={data.station}/>;
//   }
// }
// const student = station.map((items) => (
//   // console.log(`${items.title}` +"  " + `${items.status}` );

//   <tr
//     className="bg-gray-100 border-b mx-4 odd:bg-white even:bg-slate-50"
//     onClick={() => gradding({ ...items })}
//   >
//     <td className=" py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//       {`${items.station}`}
//     </td>
//     <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
//       {`${items.status}`}
//     </td>
//   </tr>

//   // <div className="flex justify-between mx-2 text-sm  ">
//   //   <p className="w-1/2  inline-block overflow-hidden whitespace-nowrap "> {`${items.station}`}</p>
//   //   <p className=""> {`${items.status}`}</p>
//   // </div>
// ));
// function selectStation() {
//   const router = useRouter();
//   const { studentCode } = router.query;
//   const [shouldRedirect, setShouldRedirect] = useState(false);
//   return (
//     <div className="background">
//       <p className="text-header">SELECT STATION</p>
//       <div className="container ">
//         <div>
//           <p>student code : {`${studentCode}`}</p>
//           <p>student name : </p>
//         </div>
//         {/* <div className="flex justify-between mx-10">
//           <p className="">
//             Station
//           </p>
//           <p>
//             Status 
//           </p>
//         </div>
//         {student} */}
//         <table class="table-auto w-full  ">
//           <thead class="">
//             <tr className=" w-full  ">
//               <th class="w-1/2 px-4 py-2">Station</th>
//               <th class=" w-1/2  px-4 py-2 text-right">Status</th>
//             </tr>
//           </thead>
//           <tbody>{student}</tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// export default selectStation;

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const station = [
  { station: "Hisstory talking patient ", status: "Complete" },
  { station: "Peptic ulcer ", status: "Incomplete" },
  { station: "Palpation of the thyroid", status: "Complete" },
  { station: "community-acquired pneumonia", status: "" },
];

function Redirect({ to, station }) {
  const router = useRouter();
  console.log("Redirect");
  useEffect(() => {
    router.push({
      pathname: to,
      query: { station: station }
    });
  }, [to, station]);

  return null;
}

function Gradding({ station, status , studentCode}) {
  const router = useRouter();
  const [redirecting, setRedirecting] = useState(false);

  const handleOnClick = () => {
    if (status === "Complete") {
      console.log("This station already graded");
    } else {
      setRedirecting(true);
    }
  };

  if (redirecting) {
    router.push({
      pathname: "/menu/gradding/gradding",
      query: { station , studentCode },
    });
    return null;
  }

  return (
    <tr
      className="bg-gray-100 border-b mx-4 odd:bg-white even:bg-slate-50 cursor-pointer"
      onClick={handleOnClick}
    >
      <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {station}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
        {status}
      </td>
    </tr>
  );
}

function SelectStation() {
  const router = useRouter();
  const { studentCode } = router.query;

  return (
    <div className="background">
      <p className="text-header">SELECT STATION</p>
      <div className="container ">
        <div>
          <p>student code : {studentCode}</p>
          <p>student name : </p>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="w-full">
              <th className="w-1/2 px-4 py-2">Station</th>
              <th className="w-1/2 px-4 py-2 text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {station.map((item, index) => (
              <Gradding key={index} station={item.station} status={item.status} studentCode={studentCode} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SelectStation;
