import { useState , useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Adduser from "../../popup/adduser";
import { useRouter } from "next/router";


const users = [
  {
    firstname: "charnnarong",
    lastname: "charoensanongkun",
    station: "cpe69",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },

  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
  {
    firstname: "Prayat",
    lastname: "kaewtew",
    station: "cpe96",
  },
];

function UserEdit() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [newOrderPostOpen, setNewOrderPostOpen] = useState("close");
  const [order, setOrder] = useState([]);
  const [data, setData] = useState(null);

  function Redirect({ to }) {
    const router = useRouter();
    console.log("Redirect_work");
    useEffect(() => {
      router.push(to);
    }, [to]);
  
    return null;
  }
  
  if (shouldRedirect) {
    return <Redirect to="/menu" />;
  }
  const onNewOrderClick = (type, data) => {
    // handle new order click
    setData(data);
    setNewOrderPostOpen(type);
  };
  console.log(newOrderPostOpen);
  let newOrderPost = null;
  switch (newOrderPostOpen) {
    case "open":
      newOrderPost = <Adduser data={data} visible={true} />;
      break;

    case "close":
      newOrderPost = null;
      break;
  }

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

      <div className="container ">
        <table className="w-full ">
          <thead className="sticky top-0 rounded-xl bg-gray border-radius-table h-7">
            <tr>
              <td className="rounded-tl-lg text-xs md:text-sm font-medium text-gray-900 md:px-6 md:py-4 text-left">
                <p>Firstname</p>
              </td>
              <td className="text-xs md:text-sm font-medium text-gray-900 md:px-6">
                <p>Lastname</p>
              </td>
              <td className="text-xs md:text-sm font-medium text-gray-900 md:px-6 ">
                <p>Station</p>
              </td >
              <td className="rounded-tr-lg "></td>
            </tr>
          </thead>
          <tbody className="">
            {users.map((item) => (
              <tr
                key={item.station}
                className="bg-gray-100 text-xs mx-4  odd:bg-table-odd even:bg-slate-50 rounded-lg"
              >
                <td className="py-4 text-xs whitespace-nowrap md:text-sm font-medium text-gray-900">
                  {item.firstname}
                </td>
                <td className="py-4  text-xs whitespace-nowrap md:text-sm font-medium text-gray-900">
                  {item.lastname}
                </td>
                <td className="py-4 text-xs whitespace-nowrap md:text-sm font-medium text-gray-900">
                  {item.station}
                </td>
                <td className="py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    className="btn "
                    onClick={() => onNewOrderClick("open", item)}
                  >
                    Edit
                  </button>
                  <button className="delete-btn">
                    Delete
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>

        <button className="btn bg-main-green" onClick={() => onNewOrderClick("open", null)}>
          Add new
        </button>
        <div
          className={`${
            newOrderPostOpen === "open"
              ? "fixed flex justify-center items-center w-screen h-screen top-0 left-0 bg-slate-500 bg-opacity-5 backdrop-blur-sm "
              : ""
          }`}
        >
          {newOrderPost}
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
