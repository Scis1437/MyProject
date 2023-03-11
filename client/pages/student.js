import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import medImg from "../img/logoMEDCMUen-1280x227.png";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Redirect from "../item/Redirect";
import useQuery from "use-query";
import axios from "axios";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

function studentpage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [rows, setRows] = useState();
  const [studentCode, setStudentCode] = useState("");
  const [error, setError] = useState("");
  if (shouldRedirect) {
    return <Redirect to="/" />;
  }
  const Table = (props) => {
    const { data } = props;

    console.log(data)
    // let results = data?.filter(function async(el) {
    //   return el.id == studentCode.studentCode;
    // });
    //  results = results.tests
    // console.log(results);
    //   const set = {results}
    // console.log(set[0])
    return (
      <table className="w-full">
        <thead className=" ">
          <tr className="rounded-lg bg-gray ">
            <th
              scope="col"
              className="text-title-table text-left rounded-tl-lg "
            >
              Title
            </th>
            <th className="text-title-table text-right rounded-tr-lg ">
              <p>Status</p>
            </th>
          </tr>
        </thead>

        <tbody>
          {data?.map((items) => (
            // console.log(items)
            // console.log(`${items.title}` +"  " + `${items.status}` );

            <tr key={items.station_Id} className="bg-gray-100 mx-4  odd:bg-table-odd even:bg-slate-50 rounded-lg">
              <td className=" py-4 whitespace-nowrap  px-6 text-sm font-medium text-gray-900">
                {`${items.station_name}`}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
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
  const handleSearch = async (e) => {
    e.preventDefault();
    const studentId = studentCode.studentCode;
    const token = localStorage.getItem("access");

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      const response = await axios.get("http://localhost:9000/check-station", {
        student_id: studentId, 
      });
      setRows(response.data[0].tests);
      console.log(response.data[0].tests);
    } catch (error) {
      setError("Error searching for student data");
    }
  };

  return (
    <div className="background">
      <div className="pl-10% flex flex-row w-full justify-start">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="  backward-btn"
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
                      placeholder="62061xxxx"
                      value={studentCode.value}
                      onChange={(e) =>
                        setStudentCode({ studentCode: e.target.value })
                      }
                      className="rounded-md  w-40 md:w-auto h-6 bg-input-green p-2 mr-1"
                    />
                    <button className="btn" onClick={(e) => handleSearch(e)}>
                      SUBMIT
                    </button>{" "}
                    <p>{error}</p>
                  </div>
                </div>

                <Table data={rows} student={studentCode} />
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
