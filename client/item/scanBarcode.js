import { useState } from "react";
// import BarcodeScannerComponent from "react-webcam-barcode-scanner";
import useScanDetection from "use-scan-detection";
import React, { Component } from "react";
import Scanner from "./Scanner";
import {Fab, TextareaAutosize, Paper} from '@material-ui/core'
import {ArrowBack} from '@material-ui/icons'
class scanBarcode extends Component {
  // const [state , setState] = useState([]);
  state = {
    results: [],
  };

  _scan = () => {
    this.setState({ scanning: !this.state.scanning });
  };

  _onDetected = (result) => {
    this.setState({ results: [] });
    this.setState({ results: this.state.results.concat([result]) });
  };

  render() {
    return (
      <div className="h-10">
       

 
  
          {" "}
          <Scanner onDetected={this._onDetected} />
   

        <p>
          {this.state.results[0]
            ? this.state.results[0].codeResult.code
            : "No data scanned"}
        </p>
        <p>student code : </p>
        <input></input>
        <button href="/" className="btn">
          confirm
        </button>
      </div>
    );
  }
}

export default scanBarcode;
