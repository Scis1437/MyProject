import Head from "next/head";
import {  useRef, useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import axios from "axios";
import MenuItem from "../item/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Logout from "../item/logout";
import {
  faCoffee,
  faGraduationCap,
  faCircleCheck,
  faUserCheck,
  faListCheck,
  faUserPen,
  faFile,
  faUserDoctor
} from "@fortawesome/free-solid-svg-icons";

const menuName = [
  {
    title: "GRADDING",
    url: faUserPen,
    link: "menu/gradding",
  },
  {
    title: "STUDENT",
    url: faUserCheck,
    link: "menu/studentlist",
  },

  {
    title: "STATION",
    url: faListCheck,
    link: "menu/station",
  },
];
const menuName_admin = [
  {
    title: "STUDENT",
    url: faUserCheck,
    link: "menu/studentlist",
  },
  {
    title: "STATION",
    url: faListCheck,
    link: "menu/station",
  },
  {
    title: "USER",
    url: faUserDoctor,
    link: "menu/user",
  },
  {
    title : "USER LOG" ,
    url : faFile ,
    link : "menu/teacher-log"
  }
];

export default function Menu() {

  const [menu, setMenu] = useState([])
  
  const parseJwt = (bearerToken) => {
    const token = bearerToken.split(" ")[1];
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  };

   const [role, setRole] = useState(0)
  useEffect(() => {
    const data = parseJwt(`Bearer ${localStorage.getItem("access")}`);;
    // dataRef.current = data;
    setRole(data.UserInfo.role)
    setMenu(role === 1 ? menuName_admin :menuName)
  }, [role]);


  
  return (
    <div className="flex h-screen bg-main-green relative">
      <div className="p-5 m-auto items-center justify-center md:w-auto ">
        <div className={`grid grid-cols-1 gap-7 place-items-center w-full ${role === 1 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {menu?.map((menus, index) => {
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
      <div className="logout-position "><Logout/></div>
   
    </div>
  );
}
