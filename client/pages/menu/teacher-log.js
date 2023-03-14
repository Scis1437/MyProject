import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import AddUser from "../../popup/addUser";
import { useRouter } from "next/router";
import axios from "axios";
import Logout from "../../item/logout";
import { Teacher } from "../../../api/config/roles_list";
import EditUser from "../../popup/editUser";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


function UserEdit() {
  return (
    <div className="background">
      <div className="header-page">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="text-white mr-2 text-2xl"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="text-white font-extrabold text-xl w-full md:text-2xl">
            Edit user
          </p>
          <div className="logout-position">
            <Logout />
          </div>
        </div>
      </div>
      {/* sticky top-0 */}
      <div className="container ">
        {/* <div><p>Search for user</p></div> */}
      </div>
    </div>
  );
}

export default UserEdit;
