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
  faBars,
} from "@fortawesome/free-solid-svg-icons";

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
    title: "Station",
    url: faGraduationCap,
    link: "menu/station",
  },
];
const menuName_admin = [
  {
    title: "Student",
    url: faGraduationCap,
    link: "menu/studentlist",
  },
  {
    title: "Station",
    url: faGraduationCap,
    link: "menu/station",
  },
  {
    title: "Edit user",
    url: faCircleCheck,
    link: "menu/user",
  },
  {
    title : "show log" ,
    url : faCircleCheck ,
    link : "menu/teacher-log"
  }
];

export default function Menu() {
  // const router = useRouter();
  // const dataRef = useRef(null);
  const [role, setRole] = useState(0)
  // const [error, setError] = useState("");
  // const [role, setRole] = useState(null);
  const [menu, setMenu] = useState([])
  
  const parseJwt = (bearerToken) => {
    const token = bearerToken.split(" ")[1];
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  };
  
  useEffect(() => {
    const data = parseJwt(`Bearer ${localStorage.getItem("access")}`);;
    // dataRef.current = data;
    setRole(data.UserInfo.role)
    setMenu(role === 1 ? menuName_admin :menuName)
  }, [role]);


  


  // let menu;
  // async function getDataPromise() {
  //   try {
  //     // console.log(data)
  //     const value = await data;
  //     // console.log(value); // 👉️ "Hello World"
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // console.log(role)
  // useEffect(async () => {
  //     try {
          
  //       // const data = await  getDataPromise()
  //       // setRole(data)
  //       return data.UserInfo.roles[0];
  //     } catch (error) {
  //       setError("Error on load menu");
  //     }
  //   }, []);
  //   menu = role  === 1  ? menuName_admin :menuName ;
    
  // const printAddress = () => {
  //   data.then((a) => {
  //     console.log(a);
  //   });
  // };

  // const printAddress = async () => {
  //   const a = await handleMenu();
  //   return a;
  // };

  // }, []);

  // }else {
  //   <Teacher/>
  // }

  return (
    <div className="flex h-screen bg-main-green relative">
      <div className="p-5 m-auto items-center justify-center md:w-auto ">
        <div className="grid gap-7 grid-cols-1 place-items-center w-full md:grid-cols-3 ">
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
