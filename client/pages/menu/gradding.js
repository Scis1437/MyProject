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
        <p className="text-white font-extrabold text-xl w-full md:text-2xl">
          SCAN BARCODE
        </p>
      </div>
      <div className="container">
        <ScanBarcode />
        
      </div>
      <div className="absolute top-3.5 right-3.5 "><Logout/></div>
    </div>
  );
};
export default Gradding;
