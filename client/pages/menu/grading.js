import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScanBarcode from "../../item/scanBarcode";
import Redirect from "../../item/Redirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Logout from "../../item/logout";

const Gradding = () => {
    const [shouldRedirect, setShouldRedirect] = useState(false);
    if (shouldRedirect) {
      return <Redirect to="/menu"  />;
    }
  return (
    <div className="h-screen bg-main-green   flex flex-col justify-center items-center ">
      <div className="header-page">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="text-white mr-2 text-2xl"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="text-white font-extrabold text-xl w-full md:text-2xl">
            SCAN BARCODE
          </p>
          <div className="logout-position">
            <Logout />
          </div>
        </div>
      </div>
      <div className="container">
        <ScanBarcode />
        
      </div>
        </div>
  );
};
export default Gradding;
