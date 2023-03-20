import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import medImg from "../img/logoMEDCMUen-1280x227.png";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Redirect from "../item/Redirect";
import useQuery from "use-query";
import axios from "axios";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
function Studentpage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [rows, setRows] = useState();
  const [studentCode, setStudentCode] = useState("");
  const [error, setError] = useState("");
  const [student, setStudent] = useState();
  const [station, setStation] = useState();
  if (shouldRedirect) {
    return <Redirect to="/" />;
  }

  const Table = (props) => {
    const { data } = props;
    console.log(data);
    //  let results = data?.filter(function async(el) {

    return (
      <table className="w-full mt-10">
        <thead className=" ">
          <tr className="rounded-lg bg-gray-table ">
            <th
              scope="col"
              className="text-header-table text-left rounded-tl-lg "
            >
              Title
            </th>
            <th className="text-header-table text-right rounded-tr-lg ">
              <p>Status</p>
            </th>
          </tr>
        </thead>
        {/* <tbody>
        {data.map((items) => (
          <tr key={items.station_Id} className="bg-gray-100 border-b">
            <td className="status-table">
              {`${items.title}`}
            </td>
            <td
              className={`text-sm font-light px-6 py-4 whitespace-nowrap text-end ${
                items.status === "Complete" ? "text-green" : "text-gray-900"
              }`}
            >
             <p></p> {`${items.status}`}
            </td>
          </tr>
        ))}
      </tbody> */}
        <tbody>
          {data?.map((items) => (
            // console.log(items)
            // console.log(`${items.title}` +"  " + `${items.status}` );

            <tr
              key={items.station_Id}
              className="bg-gray-100 mx-4  odd:bg-table-odd even:bg-table-even rounded-lg"
            >
              <td className="text-title-table">
                {`${items.station_name}`}
              </td>
              <td
                className={`text-title-table text-end ${
                  items.status === "Complete" ? "text-correct-green" : "text-red-incomplete"
                }`}
              >
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

  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };



  const handleSearch = async (e) => {
    e.preventDefault();
    const studentId = studentCode.studentCode;
    if (!studentId) {
      setError("Student code is required.");
      return;
    }
    if (!/^\d{9}$/.test(studentId)) {
      setError("Student code must be a 9-digit number.");
      return;
    }
    try {
      const checkStationResponse = await axios.get(
        `https://my-project-ppdr.vercel.app/check-station`,
        {
          params: {
            student_id: studentId,
          },
        }
      );
      console.log(checkStationResponse.data);
      const rowsData = checkStationResponse.data.map(
        (item) => item.station_name
      );

      const showStationResponse = await axios.get(
        `https://my-project-ppdr.vercel.app/show-station`
      );
      console.log(showStationResponse.data);
      const stationData = showStationResponse.data.map((station) => {
        const isIncomplete = rowsData.some(
          (item) => station.station_name === item
        );
        const status = isIncomplete ? "Incomplete" : "Complete";
        return {
          ...station,
          status,
        };
      });
      setStation(stationData);
      setRows(rowsData);
      setError("")
    } catch (error) {
      setError("Error searching for student data");
    }
    

    console.log(station);
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
          STUDENT CHECK
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
                      className="w-40 md:w-48  flex justify-start items-center "
                      src={medImg}
                      alt="med"
                    />
                  </div>
                  <div className=" flex flex-col justify-center md:justify-end items-center place-items-center">
                    <div className="flex ">
                      <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="62071xxxx"
                        value={studentCode.value}
                        onChange={(e) =>
                          setStudentCode({ studentCode: e.target.value })
                        }
                        className="input_box mr-1"
                      />
                      <button className="btn  " onClick={(e) => handleSearch(e)}>
                        SUBMIT
                      </button>{" "}
                    </div>

                    <p className="error-msg">{error}</p>
                  </div>
                </div>

                <Table data={station} />
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

export default Studentpage;