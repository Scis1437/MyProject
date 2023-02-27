import useScanDetection from "use-scan-detection";
import React, { useState } from "react";
import Scanner from "./Scanner";
import { Fab, TextareaAutosize, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Link from "next/link";
import Redirect from "./Redirect";
import { useRouter } from "next/router";

function scanBarcode() {
  const [results, setResults] = useState([]);
  const [studentCode, setStudentCode] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  if (shouldRedirect) {
    return (
      <Redirect to="/menu/gradding/selectStation" studentCode={studentCode} />
    );
  }

  const handleScan = (result) => {
  let code =  result.codeResult.code ;
  code = String(code).slice(4, -1);
    setStudentCode(code);
  };

  // const handleSubmit = () => {
  //   // perform any necessary actions with the studentCode value
  //   // redirect to appropriate page
  //   <Redirect to="/menu/gradding/selectStation" studentCode={studentCode} />;
  // };

 


  return (
 
    <div className="h-10 flex flex-col justify-center">
      <Scanner onDetected={handleScan} />
      <div className="flex flex-col  justify-center w-full">
        {/* <p>{results[0] ? results[0].codeResult.code : "No data scanned"}</p> */}
        <div
          className="flex 
          justify-center w-full"
        >
          <p className="text-sm md:text-m">student code : {results[0] ? results[0].codeResult.code : ""} </p>
          <input
            id="student_code"
            value={studentCode}
            onChange={(e) => setStudentCode(e.target.value)}
          />
          <button className="btn" onClick={() => setShouldRedirect(true)}>
            confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default scanBarcode;
