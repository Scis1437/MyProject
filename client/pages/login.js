import React, { useEffect, useState , useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import medLogo from "../img/logo1.png";
import { useRouter } from "next/router";
import axios from "axios";
import useInput from "../hook/useInput";
import useAuth from '../hook/useAuth';
import { env } from 'process'
// require('dotenv').config();
const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
//  const errRef = useRef();
function Redirect({ to, role }) {
  const router = useRouter();
  console.log("Redirect_work");
  useEffect(() => {
    router.push({
      pathname: to,
      query: { role },
    });
  }, [to, role]);
  return null;
}
function Login() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
     


const { setAuth } = useAuth();
 const [user, resetUser, userAttribs] = useInput('user', '')
// const [pwd, setPwd] = useState('');
 const [errMsg, setErrMsg] = useState('');
 const userRef = useRef();
 const errRef = useRef();
    
useEffect(() => {
    userRef.current.focus();
}, [])

useEffect(() => {
    setErrMsg('');
}, [username, password ])
const handleSubmit = async (e) => {
  e.preventDefault();

    // window.location = "/menu";
  // try {
  //   const response = await axios.post(
  //     `https://my-project-ppdr.vercel.app/auth`,
  //     {
  //      user: username.username,
  //      pwd: password.password,
  //     }
    
   
  //   );
  //   console.log(response.config);
  //   const accessToken = response.data.accessToken;
  //   localStorage.setItem("access" , accessToken);
  //   // const roles = response?.data?.roles;      
  //   // setAuth ({ username, password, roles, accessToken }); // updated
  //   // resetUser();
  //   // setPassword("");  
 
  //   if (accessToken) {
  //       console.log(response?.status);  
  //        window.location = "/menu";
  //   }
  try {
    const response = await axios.post(
      `https://my-project-ppdr.vercel.app/auth`,
      {
        user: username.username,
        pwd: password.password,
      }
    );
    console.log(response.config);
    const accessToken = response.data.accessToken;
    localStorage.setItem("access" , accessToken);

    if (accessToken) {
        console.log(response?.status);  
        // invalidate previous token if exists
        localStorage.removeItem('access');
        // set new token in local storage
        localStorage.setItem('access', accessToken);
        window.location = "/menu";
    }
  

  //    navigate( "/menu", { replace: true }); // imported from react-router-dom
  } catch (err) {
    if (!err?.response) {
      setErrMsg("No Server Response");
    } else if (err.response?.status === 400) {
      setErrMsg("Missing Username or Password");
    } else if (err.response?.status === 401) {
      setErrMsg("Unauthorized");
    } else {
      setErrMsg("Login Failed");
    }
    // errRef.current.focus();
  }
  
  }


  return (
    <div className="min-h-screen bg-main-green   flex justify-center items-center ">
      <div className=" w-10/12 h-10/12 rounded-md bg-white shadow-xl md:w-80 lg:w-96 grid place-items-center py-5 my-5">
        <Link href="">
          <Image
            className="w-48 md:w-64 max-w-full  align-middle mx-auto  "
            src={medLogo}
            alt="med"
          />
        </Link>

        <form className="gap-1 text-l uppercase text-bold py-4 flex flex-col "onSubmit={handleSubmit}>
          <label
            htmlFor="username"
            className="text-left font-bold text-lg md:text-xl md:font-extrabold text-main-green"
          >
            username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="username"
             value={username.value}
             ref={userRef}
            onChange={(e) =>
              setUsername({ username: e.target.value })
            }
            
            className="rounded-md w-60 bg-input-green pl-3 border-none"
          />
          <label
            htmlFor="upassword"
            className="text-left font-bold text-lg md:text-xl md:font-extrabold text-main-green"
          >
            password{" "}
          </label>
          <input
            type="password"
            id="password"
            name="password" value={password.value}
            onChange={(e) =>
              setPassword({  password: e.target.value })
            }
           
            placeholder="******************"
            className=" rounded-md w-60 bg-input-green pl-3 border-none "
          />{" "}
          {errMsg && (
            <div id="invalid_Login">
              <p className="text-base text-red-600"> Invalid username or password</p> 
              {/* <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
            </div>
          )}
          <div className="text-center my-5">
            <button
              className=" btn "
              type="submit"
              // onClick={
              //   () => setShouldRedirect(true)
    
              // }
            >
              sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
