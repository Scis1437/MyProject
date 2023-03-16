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
            Teacher log
          </p>
          <div className="logout-position">
            <Logout />
          </div>
        </div>
      </div>
      {/* sticky top-0 */}
      <div className="container ">
        <table className="w-full">
          <thead className="rounded-xl bg-gray border-radius-table">
            <tr>
              <th
                scope="col"
                className="rounded-tl-lg text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                <p>Data</p>
              </th>
              <th
                scope="col"
                className="rounded-tr-lg text-sm font-medium text-gray-900 px-6 py-4 text-right"
              >
                <p>Action</p>
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
          {/* flex  justify-between px-4 py-2 odd:bg-table-odd even:bg-slate-50 w-full */}
            {logs?.map((log) => (
              <tr
                key={log.id}
                className="odd:bg-table-odd even:bg-slate-50 "
              >
                <th className="text-sm ">
                  <p>{log.timestamp}</p>
                </th>
                <td className="flex gap-1  w-full">
                  <p> {log.message}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* <ul>
            {logs ? (
              <ul>
                {logs?.map((log) => (
                  <li key={log.id}>
                    <p className="bg-main-green">{log.timestamp}</p>
                    <p>{log.message}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <div>Loading...</div>
            )}
          </ul> */}

        {/* <div><p>Search for user</p></div> */}
      </div>
    </div>
  );
}

export default TeacherLog;
