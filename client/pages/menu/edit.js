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
      <table className="w-full">
      <thead className="bg-white ">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            <p>Title</p>
          </th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-right">
            <p></p>
          </th>
        </tr>
      </thead>
      
      <tbody>
       
      </tbody>
    </table>
      
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
