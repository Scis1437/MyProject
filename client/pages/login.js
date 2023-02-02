import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import medLogo from '../img/logo1.png' ;
import todoList from "../item/todoList";
function login () {
  
    return(
        <div className="min-h-screen bg-main-green   flex justify-center items-center ">
        <div className=" w-10/12 h-10/12 rounded-md bg-white shadow-xl md:w-80 lg:w-96 grid place-items-center py-5 my-5">
     

            <Link href="index" >
              <Image
                className="w-48 md:w-72 max-w-full  align-middle mx-auto  "
                src={medLogo}
                alt="med"
              />
            </Link>
            <todoList/>
            <form
              action="/menu"
              className="gap-1 text-l uppercase text-bold py-4 flex flex-col "
            >
              <label htmlFor="username" className="text-left font-bold text-base md:font-extrabold text-xl text-main-green">
                username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="username"
                className="rounded-md w-60 bg-input-green pl-3"
              />
              <label htmlFor="upassword" className="text-left font-bold md:font-extrabold text-xl  text-main-green">password </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="******************"
                className=" rounded-md w-60 bg-input-green pl-3 "
              />{" "}
              <div className="text-center my-5">
                <Link href="/menu">
                  <button
                    className=" bg-hover-green hover:bg-light-green text-white font-bold py-2 px-5 rounded-full"
                  >
                    Log in
                  </button>
                </Link>
              </div>
            </form>
  
        </div>
    </div>
    )
}

export default login ; 