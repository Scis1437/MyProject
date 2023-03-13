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

export default function Menu() {
  const router = useRouter();
  const dataRef = useRef(null);
  const [role, setRole] = useState(null);
  const [menu , setMenu] = useState()
  const parseJwt = (bearerToken) => {
    const token = bearerToken.split(" ")[1];
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  };
  const [error, setError] = useState("");
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



  useEffect(() => {
    const data= parseJwt(`Bearer ${localStorage.getItem("access")}`);;
    dataRef.current = data;
    setRole(data.UserInfo.role)  
    console.log(data.UserInfo.role)
    setMenu(  role === 1  ? menuName_admin :menuName )
   
  }, [role]);



  async function getDataPromise() {
    try {
      console.log( dataRef)
      const value = await  dataRef;
      setRole(dataRef.current.UserInfo.roles[0])
      console.log(value); 
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
   const handleMenu = async () => {
    try {
        
      await  getDataPromise()
      setRole(getDataPromise())

    } catch (error) {
      setError("Error on load menu");
    }
  }; 

  }, []);


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
