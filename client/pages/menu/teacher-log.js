import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import AddUser from "../../popup/addUser";
import { useRouter } from "next/router";
import axios from "axios";
import Logout from "../../item/logout";
import { Teacher } from "../../../api/config/roles_list";
import EditUser from "../../popup/editUser";
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
  async function fetchLogs() {
    try {
      const response = await axios.get(
        `https://my-project-ppdr.vercel.app/teacher-log`,
        config
      );
      setLogs(response.data);
      console.log(response.data)
    } catch (error) {
      setErrMsg("Error searching for student data");
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

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
        <div>
          <ul>
            {logs ? (
              <ul>
                {logs.map((log) => (
                  <li key={log.id}>
                    <strong>{log.timestamp}</strong> {log.message}
                  </li>
                ))}
              </ul>
            ) : (
              <div>Loading...</div>
            )}
          </ul>
        </div>
        {/* <div><p>Search for user</p></div> */}
      </div>
    </div>
  );
}

export default TeacherLog;
