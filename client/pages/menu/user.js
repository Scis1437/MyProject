import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import AddUser from "../../popup/addUser";
import { useRouter } from "next/router";
import axios from "axios";
import Logout from '../../item/logout'
import { Teacher } from "../../../api/config/roles_list";
import EditUser from "../../popup/editUser";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL 
// const users = [
//   {
//     firstname: "charnnarong",
//     lastname: "charoensanongkun",
//     station: "cpe69",
//   },
//   {
//     firstname: "Prayat",
//     lastname: "kaewtew",
//     station: "cpe96",
//   },
// ]



function UserEdit() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [newOrderPostOpen, setNewOrderPostOpen] = useState("close");
  const [editUserPopup , setEditUserPopup] = useState("close")
  // const [order, setOrder] = useState([]);
  const [data, setData] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [errorMsg, setErrMsg] = useState(null);
  let token;

  if (typeof localStorage !== "undefined") {
    token = localStorage.getItem("access");
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
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
  console.log(newOrderPostOpen);
  let newOrderPost = null;
  let newEditpost = null ;
  switch (newOrderPostOpen) {
    case "open":
      newOrderPost = <AddUser visible={true} />;
      break;

    case "close":
      newOrderPost = null;
      break;
  }

  switch (  editUserPopup ) {
    case "open":
      newEditpost = <EditUser visible={true} data={data} />;
      break;

    case "close":
      newEditpost = null;
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
    fetchTeacher();
  }, []);

  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }
  // setTeacher();
  console.log(teacher)
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
        <p className="text-white font-extrabold text-xl w-full md:text-2xl">
          Edit user
        </p>
      </div>
      {/* sticky top-0 */}
      <div className="container ">
        {/* <div><p>Search for user</p></div> */}
        <table className="table-auto w-full ">
          <thead className="sticky top-0 rounded-xl bg-gray border-radius-table h-7">
            <tr>
              <td className="rounded-tl-lg text-xs md:text-sm font-medium text-gray-900 md:px-6 md:py-4 text-left">
                <p>Username</p>
              </td>

              <td className="text-xs md:text-sm font-medium text-gray-900 md:px-6 text-center ">
                <p>Name</p>
              </td>
              <td className="rounded-tr-lg "></td>
            </tr>
          </thead>

          <tbody className="w-full  h-auto overflow-y-auto">
            {teacher?.map((item) => (
              <tr
                key={item.teacher_name}
                className="bg-gray-100 text-xs mx-4  odd:bg-table-odd even:bg-slate-50 rounded-lg "
              >
                <td className="py-4 text-xs whitespace-nowrap md:text-sm font-medium text-gray-900 ">
                  {item.username}
                </td>

                <td className="py-4 text-xs whitespace-nowrap md:text-sm font-medium text-gray-900 text-center ">
                  {item.name}
                </td>
                <td className="py-4 whitespace-nowrap text-right text-sm font-medium flex gap-1 justify-end mr-1">
                  <button
                    className="btn "
                    onClick={() => newPopup ("open", item)}
                  >
                    Edit
                  </button>
                  <button className="delete-btn"  onClick={() => deleteUser()}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          className="btn bg-main-green"
          onClick={() => onNewOrderClick("open", null)}
        >
          Add new
        </button>
        <div
          className={`${
            newOrderPostOpen === "open" || editUserPopup === "open"
              ? "fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm "
              : ""
          }`}
        >
          {newEditpost}
          {newOrderPost}
        </div>
      </div>
      <div className="absolute top-3.5 right-3.5 "><Logout/></div>
    </div>
  );
}



export default UserEdit;