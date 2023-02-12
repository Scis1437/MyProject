import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import medLogo from "../img/logo1.png";

import { useRouter } from "next/router";

  function Redirect({ to }) {
    const router = useRouter();
    console.log("Redirect_work")
    useEffect(() => {
      router.push(to);
    }, [to]);
  
    return null;
  }
function Login() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const users = [
    {
      id: "test",
      password: "1234",
    },
  ];

  if (shouldRedirect) {


    if (document.getElementById("username").value === users[0].id && document.getElementById("password").value  === users[0].password) {
      console.log("true"); 
      return <Redirect to="/menu" />;
    } else {
      console.log("false");
      return <Redirect to="/" />;
    }
  
  }
  //  function signIn(username, password) {

  //   const user = username.value;
  //   const pass = password.value;

  //   if (user === users[0].id && pass === users[0].password) {
  //     console.log("true"); 
  //     return <Redirect to="/menu" />;
  //   } else {
  //     console.log("false");
  //     return <Redirect to="/" />;
  //   }
  // }

  return (
    <div className="min-h-screen bg-main-green   flex justify-center items-center ">
      
      <div className=" w-10/12 h-10/12 rounded-md bg-white shadow-xl md:w-80 lg:w-96 grid place-items-center py-5 my-5">
        <Link href="">
          <Image
            className="w-48 md:w-72 max-w-full  align-middle mx-auto  "
            src={medLogo}
            alt="med"
          />
        </Link>
 
        <form
          className="gap-1 text-l uppercase text-bold py-4 flex flex-col "
        >
          <label
            htmlFor="username"
            className="text-left font-bold text-base md:font-extrabold text-xl text-main-green"
          >
            username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
            className="rounded-md w-60 bg-input-green pl-3"
          />
          <label
            htmlFor="upassword"
            className="text-left font-bold md:font-extrabold text-xl  text-main-green"
          >
            password{" "}
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="******************"
            className=" rounded-md w-60 bg-input-green pl-3 "
          />{" "}

{/* {("hidden" , shouldRedirect ?  'ture' : 'visible'  ) } */}
          <div className={`hidden &{!shouldRedirect && 'visible'}}`} id="invalid_Login">
            <p className="text-xs text-red-600">username or password wrong</p>
          </div>
          <div className="text-center my-5">

              <button
                className=" bg-hover-green hover:bg-light-green text-white font-bold py-2 px-5 rounded-full"
                onClick={() =>
                setShouldRedirect(true)
                  // signIn(
                  //   document.getElementById("username"),
                  //   document.getElementById("password")
                  // ) 
                }
              >
                signIn
              </button>
       
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
