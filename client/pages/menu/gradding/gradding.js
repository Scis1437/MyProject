import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Redirect from "../../../item/Redirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const title = {
  1: "active listening",
  2: "Demonstrating empathy in response patient cues",
  3: "An appropriate level of eye contact thoughtout the consulation",
  4: "open, relax yet professional body language",
};

function Gradding() {
  const router = useRouter();
  const { station, studentCode , method ,data} = router.query;
  const [points, setPoints] = useState({});
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const handlePointChange = (titleId, pointValue) => {
    setPoints((prevPoints) => ({ ...prevPoints, [titleId]: pointValue }));
  };
  if (shouldRedirect) {
    return <Redirect to="/menu/gradding" />;
  }

  function MethodCheck() {
    const {method} = router.query; 
    console.log(method)
    if (method === "point") {
      return (
        <select

        >
          <option value=""></option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      );
    } else if (method === "pass/fail") {
      return (
        <select
    
        >
          <option value=""></option>
          <option value="pass">pass</option>
          <option value="fail">fail</option>
        </select>
      );
    }
  }

  return (
    <div className="background">
      <div className="header-page">
        <div className="flex items-center ">
          <FontAwesomeIcon
            className="backward-btn"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>{" "}
        <p className="text-header">{station}</p>
      </div>

      <div className="container ">
        <div>
          <p>student code : {studentCode}</p>
          <p>student name : {data.name} </p>
        </div>
        <table className="table-auto w-full">
          <thead>
            <tr className="w-full">
              <th className="w-1/2 px-4 py-2">Title</th>
              <th className="w-1/2 px-4 py-2 text-right">Point</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(title).map(([id, title]) => (
              <tr
                key={id}
                className="bg-gray-100 border-b mx-4 odd:bg-white even:bg-slate-50 cursor-pointer"
              >
                <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {title}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
                  <MethodCheck />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between">
          <div className="flex">
            {" "}
            <p>comment : </p>
            <input></input>
          </div>

          <button className="btn" onClick={() => setShouldRedirect(true)}>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default Gradding;
