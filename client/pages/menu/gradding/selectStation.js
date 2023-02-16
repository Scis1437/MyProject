import React from "react";
import { useState } from "react";
// import StudentCheck from "../student";
const students = [
  { student: "620612141", status: "Complete" },
  { student: "620612142", status: "Complete" },
  { student: "620612143", status: "Complete" },
  { student: "620612144", status: "" },
  { student: "620612145", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612147", status: "Complete" },
  { student: "620612148", status: "Complete" },
  { student: "620612149", status: "Complete" },
  { student: "620612150", status: "Complete" },
  { student: "620612151", status: "Complete" },
  { student: "620612152", status: "Complete" },
  { student: "620612153", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
  { student: "620612146", status: "Complete" },
];
function Redirect({ to }) {
    const router = useRouter();
    console.log("Redirect_work")
    useEffect(() => {
      router.push(to);
    }, [to]);
  
    return null;
  }


function gradding (props) {
    // const [shouldRedirect, setShouldRedirect] = useState(false);
    // shouldRedirect(true) ;

    if(true) {
        return <Redirect to="/menu" />;
    }
}
const student = students.map((items) => (
  // console.log(`${items.title}` +"  " + `${items.status}` );

  <tr className="bg-gray-100 border-b" onClick={() =>gradding( {items})}>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
      {`${items.student}`}
    </td>
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap text-end">
      {`${items.status}`}
    </td>
  </tr>
));
function selectStation() {
  return (
    <div className="background">
      <p className="text-header">SELECT STATION</p>
      <div className="container ">
        <table class="table-auto w-full text-left">
          <thead class="bg-gray-800">
            <tr>
              <th class="px-4 py-2">Column 1</th>
              <th class="px-4 py-2">Column 2</th>
            </tr>
          </thead>
          <tbody>{student}</tbody>
        </table>
      </div>
    </div>
  );
}
export default selectStation;
