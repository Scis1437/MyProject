import Head from "next/head";
import {  useRef, useState, useEffect } from "react";
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

export default function Menu() {
  const router = useRouter();
  const dataRef = useRef(null);
  let roles;

  const parseJwt = (bearerToken) => {
    const token = bearerToken.split(" ")[1];
    const decoded = JSON.parse(atob(token.split(".")[1]));
    return decoded;
  };
  const [error, setError] = useState("");

  useEffect(() => {
    const data= parseJwt(`Bearer ${localStorage.getItem("access")}`);;
    dataRef.current = data;
  }, []);

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

  const [role, setRole] = useState(null);

  let menu;
  async function getDataPromise() {
    try {
      console.log(data)
      const value = await data;
      setRole(value.UserInfo.roles[0])
      console.log(value); // 👉️ "Hello World"
    } catch (err) {
      console.log(err);
    }
  }

  console.log(role)
  const handleMenu = async () => {
    try {
        
      await  getDataPromise()
      setRole(getDataPromise())
      return data.UserInfo.roles[0];
    } catch (error) {
      setError("Error on load menu");
    }
  };  
  useEffect(() => {
  //  (handleMenu());
  
  }, [handleMenu]);

  // const printAddress = () => {
  //   data.then((a) => {
  //     console.log(a);
  //   });
  // };

  // const printAddress = async () => {
  //   const a = await handleMenu();
  //   return a;
  // };

  // console.log(printAddress()) 

  // const Admin = () => {
  //   return (
  //     <div className="flex h-screen bg-main-green ">
  //       <div className="p-5 m-auto items-center justify-center md:w-auto">
  //         <div className="grid gap-7 grid-cols-1 place-items-center w-full md:grid-cols-3 ">
  //           {menuName_admin.map((menus, index) => {
  //             console.log(menus);
  //             return (
  //               <MenuItem
  //                 key={index}
  //                 title={menus.title}
  //                 url={menus.url}
  //                 link={menus.link}
  //               />
  //             );
  //           })}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // };

  // const Teacher = () => {
  //   return(
  //     <div className="flex h-screen bg-main-green ">
  //     <div className="p-5 m-auto items-center justify-center md:w-auto">
  //       <div className="grid gap-7 grid-cols-1 place-items-center w-full md:grid-cols-3 ">
  //         {menuName.map((menus, index) => {
  //           console.log(menus);
  //           return (
  //             <MenuItem
  //               key={index}
  //               title={menus.title}
  //               url={menus.url}
  //               link={menus.link}
  //             />
  //           );
  //         })}
  //       </div>
  //     </div>
  //   </div>
  //   )
  // }
  // console.log(role === 1)
  // if(role == 1 ){
  //   <Admin/>

  // }else {
  //   <Teacher/>
  // }
  menu = role  === 1  ? menuName_admin :menuName ;

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
