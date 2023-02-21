import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ScanBarcode from "../../item/scanBarcode";


const gradding = () => {
    return(
        <div className="h-screen bg-main-green   flex flex-col justify-center items-center ">
            <p className="text-header">SCAN BARCODE</p>
            <div className="container">
                <ScanBarcode/>
       
            </div>
        </div>
    )
}
export default gradding ; 