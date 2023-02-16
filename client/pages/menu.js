import Head from 'next/head'
import { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import MenuItem from "../item/MenuItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faCoffee,
  faGraduationCap,
  faCircleCheck,
  faBars,
} from "@fortawesome/free-solid-svg-icons";


export default function menu() {
 

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
  
  const menu = menuName.map((menus, index) => {
    console.log(menus);
    return (
      <MenuItem
        key={index}
        title={menus.title}
        url={menus.url}
        link={menus.link}    
      />
    );
  });

  return (

      <div className="flex h-screen bg-main-green ">
        <div className="p-5 m-auto items-center justify-center md:w-auto">
          <div className="grid gap-7 grid-cols-1 place-items-center w-full md:grid-cols-3 ">{menu}</div>
        </div>
      </div>
  )
}
