import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";



const gradding = () => {
    return(
        <div className="h-screen bg-main-green   flex flex-col justify-center items-center ">
            <p>SCAN BARCODE</p>
            <div className="container">
            <p>student code : </p>
            <input></input>
            <button href="/" className="btn">
                confirm
            </button>
            </div>
        </div>
    )
}
export default gradding ; 