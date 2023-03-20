import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import AddUser from "../../popup/addUser";
import { useRouter } from "next/router";
import axios from "axios";
import Logout from "../../item/logout";
import { Teacher } from "../../../api/config/roles_list";
import EditUser from "../../popup/editUser";
import ConfirmDeletePopup from "../../popup/confirmDeletePopup";
import ConfrimDeleteUser from "../../popup/confirmDeleteUser";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;


let token;

if (typeof localStorage !== "undefined") {
  token = localStorage.getItem("access");
}
const config = {
  headers: { Authorization: `Bearer ${token}` },
};



function UserEdit() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [newOrderPostOpen, setNewOrderPostOpen] = useState(false);
  const [editUserPopup, setEditUserPopup] = useState(false);
  const [confirmDelete , setComfirmDelete]  = useState(false);
  // const [order, setOrder] = useState([]);
  const [data, setData] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [errorMsg, setErrMsg] = useState(null);

  function Redirect({ to }) {
    const router = useRouter();
    console.log("Redirect_work");
    useEffect(() => {
      router.push(to);
    }, [to, router]);
    // window.location("/menu")
    return null;
  }

  const onNewOrderClick = (type) => {
    // handle new order click
    setNewOrderPostOpen(type);
  };

  const newPopup = (type, data) => {
    // handle new order click
    setData(data);
    setEditUserPopup(type);
  };

  const deleteUser = (type, data) => {
    setData(data);
    setComfirmDelete(type);
  }

  const closeOrderPost = () => {
    setNewOrderPostOpen(false);
    setEditUserPopup(false)
    setComfirmDelete(false)
  };

  console.log(newOrderPostOpen);
  let newOrderPost = null;
  let newEditpost = null;
  let newDeletePopup = null ;
  switch (newOrderPostOpen) {
    case true:
      newOrderPost = <AddUser visible={true} handleClose={closeOrderPost} />;
      break;

    case false:
      newOrderPost = null;
      break;
  }

  switch (editUserPopup) {
    case true:
      newEditpost = <EditUser visible={true} data={data} handleClose={closeOrderPost} />;
      break;

    case false:
      newEditpost = null;
      break;
  }

  switch (confirmDelete) {
    case true:
      newDeletePopup = <ConfrimDeleteUser visible={true} data={data}  handleClose={closeOrderPost}/>;
      break;

    case false:
      newDeletePopup = null;
      break;
  }
  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const response = await axios.get(
          `https://my-project-ppdr.vercel.app/teacher/`,
          config
        );
        console.log(response);
    
        setTeacher(response.data);
        // return(response.data)
      } catch (error) {
        // setErrMsg(error);
      }
    };
    if (newOrderPostOpen === true) return;

    fetchTeacher();
  }, [newOrderPostOpen]);

  // const deleteUser = async (item) => {
  //   const username = item.username;

  //   try {
  //     const response = await axios.delete(
  //       `https://my-project-ppdr.vercel.app/teacher?id=${username}`,
  //       config
  //     );

  //     // setTeacher((prevTeachers) =>
  //     //   prevTeachers.filter(
  //     //     (teacher) => teacher.teacher_name !== item.teacher_name
  //     //   )
  //     // );
  //     alert(`User for ${item.username} deleted`);

  //     // console.log(response.data);
  //     // return response.data;
  //   } catch (error) {
  //     setErrMsg(error.message);
  //   }
  // };
  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }
  // setTeacher();
  console.log(teacher);
  return (
    <div className="background">
      <div className="header-page">
        <div className="flex items-center">
          <FontAwesomeIcon
            className="backward-btn"
            icon={faChevronCircleLeft}
            onClick={() => setShouldRedirect(true)}
          />
        </div>
        <div className="flex flex-row justify-between w-full">
          <p className="text-white font-extrabold text-xl w-full md:text-2xl">
           EDIT USER
          </p>
          <div className="logout-position">
            <Logout />
          </div>
        </div>
      </div>
      {/* sticky top-0 */}
      <div className="w-11/12  md:w-5/6 px-2 py-2  h-11/12 bg-slate-100 rounded-lg flex-row place-items-center relative overflow-hidden   overflow-y-scroll  ">
        {/* <div><p>Search for user</p></div> */}
        <table className="table-auto w-full  ">
          <thead className="sticky top-0 rounded-xl bg-gray border-radius-table h-7  px-5 bg-gray-table">
            <tr>
              <td className="rounded-tl-lg text-xs md:text-sm font-medium text-gray-900 md:px-6 md:py-4 text-left">
                <p>Username</p>
              </td>

              <td className="text-xs md:text-sm font-medium text-gray-900 md:px-6 text-left ">
                <p>Name</p>
              </td>
              <td className="rounded-tr-lg "></td>
            </tr>
          </thead>

          <tbody className="w-full overflow-y-scroll ">
            {teacher?.map((item) => (
              <tr
                key={item.teacher_name}
                className="bg-gray-100 text-xs  w-full  odd:bg-table-odd even:bg-table-even rounded-lg  "
              >
                <td className="pl-5 text-xs whitespace-nowrap md:text-sm font-medium text-gray-900 ">
                  {item.username}
                </td>

                <td className="py-4 text-xs whitespace-nowrap md:text-sm font-medium text-gray-900 text-left ">
                  {item.name}
                </td>
                <td className="py-4 whitespace-nowrap text-right text-sm font-medium flex gap-1 justify-end ">
                  <button
                    className="semi-btn"
                    onClick={() => newPopup(true, item)}
                  >
                    Edit
                  </button>
                  <button
                    className=" semi-delete-btn"
                    onClick={() => deleteUser(true , item)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            
          </tbody>

        </table>
               
         <button
           className="btn bg-main-green mt-5"
           onClick={() => onNewOrderClick(true, null)}
         >
           Add new
         </button> 
        <div
          className={`${
            newOrderPostOpen === true || editUserPopup === true || confirmDelete ===true
              ? "fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm z-10 "
              : ""
          }`}
        >
          {newEditpost}
          {newOrderPost}
          {newDeletePopup}
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
