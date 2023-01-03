import React, { useState } from "react";
import Item from "../item/studentChecklistItem";
import Image from "next/image";
import medImg from "../img/logoMEDCMUen-1280x227.png";

const subject = [
  { title: "OS", status: "Complete" },
  { title: "Algorithm", status: "Incomplete" },
];

const item = subject.map((items, index) => {
  return (
    <div>
      <Item key={index} title={items.title} status={items.status} />
    </div>
  );
});

const Row = (props) => {
  const { title, status } = props;
  console.log(props);
  return (
    <tr className="bg-gray-100 border-b">
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
        {title}
      </td>
      <td
        colspan="2"
        className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center"
      >
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
      <thead className="bg-white ">
        <tr>
          <th
            scope="col"
            className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
          >
            <p>Title</p>
          </th>
          <th className="text-sm font-medium text-gray-900 px-6 py-4 text-right">
            <p>Status</p>
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((row) => {
          <Row title={row.title} 
          status={row.status} />;
        })}
      </tbody>
    </table>
  );
};

function studentCheck() {
  const [rows, setRows] = useState(subject);
  return (
    <div className="h-screen  bg-main-green flex justify-center items-center">
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

export default studentCheck;
