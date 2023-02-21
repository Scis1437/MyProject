
// // import BarcodeScannerComponent from "react-webcam-barcode-scanner";
// import useScanDetection from "use-scan-detection";
// import React, { useEffect, useState , Component} from "react";
// import Scanner from "./Scanner";
// import { Fab, TextareaAutosize, Paper } from "@material-ui/core";
// import { ArrowBack } from "@material-ui/icons";
// import Link from "next/link";
// import Redirect from './Redirect';

// //  const [shouldRedirect, setShouldRedirect] = useState(false);
  

// class scanBarcode extends Component {
//   state = {
//     results: [],
//   };

//   _scan = () => {
//     this.setState({ scanning: !this.state.scanning });
//   };

//   _onDetected = (result) => {
//     this.setState({ results: [] });
//     this.setState({ results: this.state.results.concat([result]) });
//   };

//   render() {
//     return (
//       <div className="h-10 flex flex-col">
//         <Scanner onDetected={this._onDetected} />
//         <div className="flex flex-col">
//           <p>
//             {this.state.results[0]
//               ? this.state.results[0].codeResult.code
//               : "No data scanned"}
//           </p>
//           <div>
    
//             {/* <p>student code : {document.getElementById("student_code")} </p> */}
//             <input id="student_code"></input>
//             {/* onClick={() => <Redirect to="/menu/gradding/selectStation" studentCode= "131233" />} */}
//             <button className="btn" >
//               confirm
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default scanBarcode;
import useScanDetection from "use-scan-detection";
import React, { useState } from "react";
import Scanner from "./Scanner";
import { Fab, TextareaAutosize, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import Link from "next/link";
import Redirect from './Redirect';
import { useRouter } from "next/router";

function scanBarcode() {
  const [results, setResults] = useState([]);
  const [studentCode, setStudentCode] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
if(shouldRedirect){

  return     <Redirect to="/menu/gradding/selectStation" studentCode={studentCode} />;
}

  const handleScan = (result) => {

    setStudentCode(result.codeResult.code);
  };

  // const handleSubmit = () => {
  //   // perform any necessary actions with the studentCode value
  //   // redirect to appropriate page
  //   <Redirect to="/menu/gradding/selectStation" studentCode={studentCode} />;
  // };

  return (
    <div className="h-10 flex flex-col">
      <Scanner onDetected={handleScan} />
      <div className="flex flex-col">
        {/* <p>{results[0] ? results[0].codeResult.code : "No data scanned"}</p> */}
        <div>
          <p>student code : {results[0] ? results[0].codeResult.code : ""} </p>
          <input id="student_code" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} />
          <button className="btn"  onClick={
                () => setShouldRedirect(true)
            
              } >
            confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export default scanBarcode;
