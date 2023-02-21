import { useEffect, useState } from "react";
import React from "react";

function userEdit() {
  return (
    <div className={`background`}>
      <p className="text-white font-extrabold text-xl text-left w-full pl-10% md:text-2xl   ">
        Edit user
      </p>

      <div className="container ">
        <table class="table-auto w-full">
          <thead>
            <tr>
              <th class="px-4 py-2">Firstname</th>
              <th class="px-4 py-2">Lastname</th>
              <th className="" >Station</th>
            </tr>
          </thead>
          <tbody>
            <tr class="bg-gray-100">
              <td class="px-4 py-2">John Smith</td>
              <td class="px-4 py-2">john.smith@example.com</td>
            </tr>
            <tr class="bg-white">
              <td class="px-4 py-2">Jane Doe</td>
              <td class="px-4 py-2">jane.doe@example.com</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="px-4 py-2">Bob Johnson</td>
              <td class="px-4 py-2">bob.johnson@example.com</td>
            </tr>
          </tbody>
        </table>

        {/* <div className="fixed w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm flex justify-center items-center"><EditExam data={data} visible={true}/></div> */}
      </div>

      {/* <EditExam visible={true}/> */}
    </div>
  );
}

export default userEdit;
