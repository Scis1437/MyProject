import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import MenuItem from "../item/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

import {
  faCoffee,
  faGraduationCap,
  faCircleCheck,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

// const [user, setUser] = useState('');

// useEffect(() => {
//   // Get the JWT token from local storage
//   const token = localStorage.getItem("access");

//   // Make an authenticated GET request to the backend API
//   axios
//     .get("/api/user", {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then((response) => setUser(response.data))
//     .catch((error) => console.error(error));
// }, []);

// if (!user) {

//     <p>Loading...</p>

// }
const parseJwt = (bearerToken) => {
  const token = bearerToken.split(" ")[1];
  const decoded = JSON.parse(atob(token.split(".")[1]));
  return decoded;
};
let token;
if (typeof localStorage !== "undefined") {
  token = localStorage.getItem("access");
}

// function parseJwt (token) {
//   var base64Url = token.split('.')[1];
//   var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
//       return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//   }).join(''));

//   return JSON.parse(jsonPayload);
// }
const handleMenu = async () => {
  const [error, setError] = useState("");
  const data = parseJwt(`Bearer ${token}`);

  try {
    console.log(data.UserInfo.roles[0]);
    return data.UserInfo.roles[0];
    //  menu = data.UserInfo.roles === "" ? menuName_admin : menuName;
    // const response = await axios.get(
    //   `http://localhost:9000/test/${studentId}`,
    //   config
    // );
    //  setRows(response.data);
    // console.log(response.data);
  } catch (error) {
    setError("Error on load menu");
  }
};
// try {
//   const response = await axios.get(
//     `http://localhost:9000/test/${studentId}`,
//     config
//   );
//    setRows(response.data);
//   console.log(response.data);
// } catch (error) {
//   setError("Error searching for student data");
// }

export default function menu() {
  const router = useRouter();

  const menuName = [
    {
      title: "Gradding",
      url: faCircleCheck,
      link: "menu/gradding",
    },
    {
      title: "Student",
      url: faGraduationCap,
      link: "menu/studentlist",
    },

    {
      title: "edit",
      url: faGraduationCap,
      link: "menu/edit",
    },
  ];

  const menuName_admin = [
    {
      title: "Student",
      url: faGraduationCap,
      link: "menu/studentlist",
    },

    {
      title: "edit",
      url: faGraduationCap,
      link: "menu/edit",
    },
    {
      title: "Edit user",
      url: faCircleCheck,
      link: "menu/user",
    },
  ];

  const menu =
    handleMenu()===
   " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySW5mbyI6eyJ1c2VybmFtZSI6InRlc3QxIiwicm9sZXMiOlsxXX0sImlhdCI6MTY3ODAzNTUwNywiZXhwIjoxNjc4Mzk1NTA3fQ.epkXBmnZNLfNPOLuq-oMsKZPXeSjy8gAzhmDQ9oryL8" ?  menuName    : menuName_admin;

  return (
    <div className="flex h-screen bg-main-green ">
      <div className="p-5 m-auto items-center justify-center md:w-auto">
        <div className="grid gap-7 grid-cols-1 place-items-center w-full md:grid-cols-3 ">
          {menu.map((menus, index) => {
            console.log(menus);
            return (
              <MenuItem
                key={index}
                title={menus.title}
                url={menus.url}
                link={menus.link}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
