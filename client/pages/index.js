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


export default function Home() {
  const [userId, setUserId] = useState([])
  const [stationId, setStationId] = useState([])

  // useEffect(() => {
  //   axios.get('http://localhost:9000/student')
  //     .then(res => {
  //       console.log(res.data[0].id)
  //       setUserId(res.data[0].id)
  //     })
  //   axios.get('http://localhost:9000/station')
  //       .then(res => {
  //         // console.log(res.data[0].ID)
  //         // setStationId(res.data[0].id)
  //         console.log(res.data)
  //       })
  // }, [setUserId])


// function showStudent(){
//   const [studentId , getStudentId] = useState([]);
//     useEffect(()=>{    
//       axios.get('http://localhost:9000/student')
//       .then(res => {
//       console.log(res.data[0].id)
//       setUserId(res.data[0].id)
//     })

//     })
// }

const menuName = [
    {
      title: "Examer",
      url: faCircleCheck,
      link: "login",
    },
    {
      title: "Student",
      url: faGraduationCap,
      link: "student",
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
          <h1 className="mb-8 font-bold text-2xl text-center text-white ">CHOOSE YOUR CHOICE</h1>
          <div className="grid gap-7 grid-cols-1 place-items-center w-full md:grid-cols-2">{menu}</div>
        </div>
      </div>
  )
}
