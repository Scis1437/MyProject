import React, { useState, useEffect } from "react";
import Item from "../item/studentChecklistItem";
import Image from "next/image";
import medImg from "../img/logoMEDCMUen-1280x227.png";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {

  faChevronCircleLeft,
} from "@fortawesome/free-solid-svg-icons";

const subject = [
  { title: "OS", status: "Complete" },
  { title: "Algorithm", status: "Incomplete" },
  { title: "OOP", status: "Incomplete" },
];

const item = subject.map((items, index) => {
  return (
    <div>
      <Item key={index} title={items.title} status={items.status} />
    </div>
  );
});
function Redirect({ to }) {
  const router = useRouter();
  console.log("Redirect_work");
  useEffect(() => {
    router.push(to);
  }, [to]);

  return null;
}

const Row = (props) => {
  const { title, status } = props;
  console.log(title);
  return (
    <tr className="bg-gray-100 border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {title}
      </td>
      <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-left">
        {status}
      </td>
    </tr>
  );
};

const Table = (props) => {
  const { data } = props;
  console.log(data);

  return (
    <table className="w-full">
      <thead className=" ">
        <tr className="rounded-lg bg-gray ">
          <th
            scope="col"
            className="rounded-tl-lg text-sm   font-medium text-gray-900 px-6 py-4 text-left "
          >
            <p>station</p>
          </th>
          <th className="rounded-tr-lg rounded-tb-md text-sm font-medium text-gray-900 px-6 py-4 text-right">
            <p>Status</p>
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((items) => (
          // console.log(items)
          // console.log(`${items.title}` +"  " + `${items.status}` );

          <tr class="bg-gray-100 mx-4  odd:bg-table-odd even:bg-slate-50 rounded-lg">
            <td class=" py-4 whitespace-nowrap  px-6 text-sm font-medium text-gray-900">
              {`${items.title}`}
            </td>
            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
              {`${items.status}`}
            </td>
          </tr>
        ))}

        {/* // {data.map(row => {
        //   <Row title={row.title} 
        //   status={row.status} />;
        // })} */}
      </tbody>
    </table>
  );
};

function studentpage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [rows, setRows] = useState(subject);
  if (shouldRedirect) {
    return <Redirect to="/" />;
  }
  return (
    <div className="background">
      <div className="pl-10% flex flex-row w-full justify-start">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="  text-white mr-2   text-2xl"
            icon={faChevronCircleLeft}
            onClick={() => {
              setShouldRedirect(true);
            }}
          ></FontAwesomeIcon>
        </div>

        <p className="text-white font-extrabold text-xl  w-full md:text-2xl ">
          StudentCheck
        </p>
      </div>
      <div className="container">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-1 inline-block min-w-full sm:px-6 lg:px-8 ">
              <div className="overflow-hidden">
                <div className="grid grid-cols-1  w-full h-12 mb-5 md:grid-cols-2 px-5 ">
                  <div className="flex justify-center md:justify-start items-center mb-4 md:mb-0">
                    <Image
                      className="w-32 md:w-44  flex justify-start items-center "
                      src={medImg}
                      alt="med"
                    />
                  </div>
                  <div className=" flex  justify-center md:justify-end items-center place-items-center">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="62061xxxx , charnnarong"
                      className="rounded-md  w-40 md:w-auto h-6 bg-input-green p-2 mr-1"
                    />
                    <button className="bg-main-green hover:bg-hover-green flex place-items-center text-white font-semibold py-1 px-2 h-6 rounded-md ">
                      SUBMIT
                    </button>
                  </div>
                </div>

                <Table data={rows} />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="grid grid-cols-1  w-full h-12 mb-5 md:grid-cols-2 px-5">
          <div className="flex justify-center md:justify-start items-center mb-4 md:mb-0">
            <Image
              className="w-32 md:w-44  flex justify-start items-center "
              src={medImg}
              alt="med"
            />
          </div>
          <div className=" flex  justify-center md:justify-end items-center place-items-center">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="62061xxxx , charnnarong"
              className="rounded-md  w-40 md:w-auto h-6 bg-input-green p-2 mr-1"
            />
            <button
              className="bg-main-green hover:bg-hover-green flex place-items-center text-white font-semibold py-1 px-2 h-6 rounded-md "
            >
              SUBMIT
            </button>
          </div>
        </div>

        <div className="flex-row place-items-center overflow-y-scroll mt-10 mx-4 h-5/6 displayNone">
          {item}
        </div> */}
      </div>

      {/* <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          className="rounded-md w-60 bg-gray-light gap-y-10"
          value={searchID}
        /> */}
    </div>
  );
}

export default studentpage;
