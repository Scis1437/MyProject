
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Redirect from "../../../item/Redirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const station = [
  { station: "Hisstory talking patient ", status: "Complete" , method:"point" },
  { station: "Peptic ulcer ", status: "Incomplete"  , method:"pass/fail"},
  { station: "Palpation of the thyroid", status: "Complete" , method:"point" },
  { station: "community-acquired pneumonia", status: "Incomplete"  , method:"pass/fail"},
];



function Gradding({ station, status , studentCode , method}) {
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
      query: { station , studentCode , method },
    });
    return null;
  }

  return (
    <tr
      className="bg-gray-100 mx-4  odd:bg-table-odd even:bg-slate-50cursor-pointer"
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
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if(shouldRedirect){
   return <Redirect to ="/menu/gradding"/>
  }
  return (
    <div className="background"> <div className="header-page">
    <div className="flex items-center">
      <FontAwesomeIcon
        className="text-white mr-2 text-2xl"
        icon={faChevronCircleLeft}
        onClick={() => setShouldRedirect(true)}
      />
    </div>
    <p className="text-header">SELECT STATION</p>
  </div>
 
      <div className="container ">
        <div>
          <p>student code : {studentCode}</p>
          <p>student name : </p>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="w-full rounded-lg bg-gray ">
              <th className="rounded-tl-lg text-sm  md:text-lg font-medium text-gray-900 px-6 py-4 ">Station</th>
              <th className="rounded-tr-lg text-sm  md:text-lg font-medium text-gray-900 px-6 py-4 ">Status</th>
            </tr>
          </thead>
          <tbody>
            {station.map((item, index) => (
              <Gradding key={index} station={item.station} status={item.status} studentCode={studentCode} method={item.method}/>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default SelectStation;
