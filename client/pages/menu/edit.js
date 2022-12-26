import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const subject = [
  {
    title: "Phy",

  },
  {
    title: "eng",
  },
];
const edit = () => {
  return (
    <div className="h-screen bg-main-green   flex flex-col justify-center items-center ">
      <p className="text-white font-extrabold text-xl text-left w-full pl-10 md:pl-24 md:text-2xl">
        Edit Exam
      </p>
      <div className="container">
        
      
{/*         
            {subject.map(({ title }) => (
              <tr key={title}>
                <td>{title}</td>
                <td>
                  <button className="">Edit</button>
                </td>
              </tr>
            ))}
       */}
   
      </div>
    </div>
  );
};
export default edit;
