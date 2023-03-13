import React from 'react'
import { useState , useEffect } from 'react'
import { useRouter } from "next/router";
import ConfrimLogout from '../popup/comfirmLogout';

function Logout() {
  const [popup , setPopup] = useState("closed")
  let newOrderPost = null;    

  const closePopup = () => {
    setPopup("closed");
  }
 
  switch (popup) {

    case "open":
      newOrderPost = <ConfrimLogout visible={true} onCancel={closePopup} />;
      break;
    case "closed":
      newOrderPost = null;
      break;
  }

   return (
    <div       
    >
      <button className="delete-btn"  onClick={() => {
      setPopup("open")}}>
             log out
      </button>
      <div
          className={`${
            popup === "open" 
              ? "fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm "
              : ""
          }`}
        >
          {newOrderPost}
        </div>
      </div>
   )
}
  export default Logout;
