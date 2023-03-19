import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import AddUser from "../../popup/addUser";
import { useRouter } from "next/router";
import axios from "axios";
import Logout from "../../item/logout";
import { Teacher } from "../../../api/config/roles_list";
import EditUser from "../../popup/editUser";
import Redirect from "../../item/Redirect";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

function TeacherLog() {
  const [logs, setLogs] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  let token;
  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/teacher-log`,
          config
          // `http://localhost:9000/teacher-log` , config
        );
        setLogs(response.data);
        console.log(response.data);
      } catch (error) {
        setErrMsg("Error searching for student data");
      }
    };

    fetchLogs();
  }, []);
  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }
  return (
    <div className="background">
      <div className="header-page">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="text-white mr-2 text-2xl"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="text-white font-extrabold text-xl w-full md:text-2xl">
           TEACHER LOG
          </p>
          <div className="logout-position">
            <Logout />
          </div>
        </div>
      </div>
      {/* sticky top-0 */}
      <div className="w-11/12  md:w-5/6 px-2 py-2  h-11/12 bg-slate-100 rounded-lg flex-row place-items-center relative overflow-hidden   overflow-y-scroll  ">
        {/* <div className="h-1/6 bg-main-green">asd</div> */}
        <table className="w-full  px-10">
          <thead className="rounded-xl bg-gray border-radius-table sticky top-0 z-10 bg-gray-table">
            <tr>
              <th
                scope="col"
                className="rounded-tl-lg text-header-table"
              >
                <p>Data</p>
              </th>
              <th
                scope="col"
                className="rounded-tr-lg text-header-table"
              >
                <p>Action</p>
              </th>
            </tr>
          </thead>

          <tbody className="w-full box-inside-container max-h-full ">
            {/* flex  justify-between px-4 py-2 odd:bg-table-odd even:bg-slate-50 w-full */}
            {logs?.map((log) => (
              <tr key={log.id} className="odd:bg-table-odd even:bg-slate-50 ">
                <td className="text-sm font-medium ">
                  <p>{log.timestamp}</p>
                </td>
                <td className="flex gap-1  w-full">
                  <p className="pl-3"> {log.message}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TeacherLog;
