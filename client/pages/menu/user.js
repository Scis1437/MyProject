import { useEffect, useState } from "react";
import React from "react";
const user = [
  {
    firstname: "charnnarong",
    lastname: "charoensanongkun",
    station: "cpe69",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
];
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
              <th className="">Station</th>
              <th> sd</th>
            </tr>
          </thead>
          {/* <tbody class = "">
            <tr class="bg-gray-100 ">
              <td class="px-4 py-2">John Smith</td>
              <td class="px-4 py-2">john.smith@example.com</td>
              <td class="px-4 py-2">john.smith@example.com</td>
            </tr>
            <tr class="bg-white">
              <td class="px-4 py-2">Jane Doe</td>
              <td class="px-4 py-2">jane.doe@example.com</td>
              <td class="px-4 py-2">john.smith@example.com</td>
            </tr>
            <tr class="bg-gray-100">
              <td class="px-4 py-2">Bob Johnson</td>
              <td class="px-4 py-2">bob.johnson@example.com</td>
              <td class="px-4 py-2">john.smith@example.com</td>
            </tr>
          </tbody> */}
        </table>
        <tbody class="">
          {user.map((items) => (
            <tr class="bg-gray-100 ">
              <td class="px-4 py-2">{items.firstname}</td>
              <td class="px-4 py-2">{items.lastname}</td>
              <td class="px-4 py-2">{items.station}</td>
            </tr>

            // <div className="flex w-full justify-between px-4 my-1">
            //   <p className="text-sm">{items.firstname}</p>
            //   <p className="text-sm">{items.lastname}</p>
            //   <p className="text-sm">{items.station}</p>

            //   <div className="flex gap-1">
            //     <button
            //       className="btn"
            //       onClick={() => onNewOrderClick("open", { items })}
            //     >
            //       Edit
            //     </button>
            //     <button
            //       className=" rounded-2xl px-3 py-1 font-semibold text-white bg-btn-red"
            //       data="data"
            //     >
            //       Delete
            //     </button>
            //   </div>

            // </div>
          ))}{" "}
        </tbody>
        <div>
          <button className="btn">add user</button>
        </div>
        {/* <div className="fixed w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm flex justify-center items-center"><EditExam data={data} visible={true}/></div> */}
      </div>

      {/* <EditExam visible={true}/> */}
    </div>
  );
}

export default userEdit;
