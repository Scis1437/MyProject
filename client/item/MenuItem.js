import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import  Link  from "next/link";
function MenuItem(props) {
  const { title, url, link } = props;

  return (
    // bg-sefid-white h-40 w-48 max-w-full flex items-center justify-center rounded-2xl drop-shadow-xl
    // flex flex-col items-center justify-items-center
  
    <Link href={link} className ="grid place-items-center ">
        <div className="select-button ">
          <div className="flex flex-col items-center justify-items-center">
            <FontAwesomeIcon  
              className=" flex items-center justify-items-center mx-auto   " size="2x md:3x"
              icon={url}
            
            ></FontAwesomeIcon>
            
              <p className="text-xl focus:text-2xl font-bold mt-1">{title}</p>
         
          
          </div>
        </div>
    </Link>

  );
}

export default MenuItem;
