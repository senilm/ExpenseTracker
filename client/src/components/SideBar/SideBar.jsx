import { useState } from "react";
import { navigationLinks } from "../../constants/constants";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const SideBar = ({ toggleDark,theme }) => {
  const [showLink, setShowLink] = useState(false);
  const [selected, setSelected] = useState("Dashboard")
  
  const userDataString = Cookies.get("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const navigate = useNavigate();
  const logOut = () => {
    sessionStorage.clear();
    Cookies.remove("userData");
    navigate("/");
  };
  const toggleLink = () => {
    setShowLink(!showLink);
  };

  

  return (
    <>
    <div className=" transition-all dark:bg-slate-950   dark:text-white lg:px-4 py-3 shadow-sm dark:shadow-white  border-white border-b-[1px] border-opacity-25  border-white-500 w-[100%] ">
      <div className="flex lg:flex-row max-lg:justify-between lg:items-center lg:justify-between w-[100%] ">
        
        <div id="intro" className="">
          <div className="px-2 font-montserrat lg:text-xl max-lg:text-[15px] ">
            Hey, {userData.name.toUpperCase()}
          </div>
        </div>

        <div className=" text-blue-400 flex max-lg:flex-col  max-lg:relative lg:items-center max-lg:right-0 max-lg:top-0 max-lg:pl-4">
          <button
            className="block  lg:hidden text-black  self-center max-lg:text-[15px] font-montserrat dark:text-white"
            onClick={toggleLink}
          >
            <i class="fa-solid fa-bars"></i>
          </button>

          <ul
            className={`${
              showLink
                ? " max-lg:opacity-100  max-lg:visible"
                : " max-lg:opacity-0 max-lg:invisible"
            }  flex max-lg:flex-col lg:gap-16 justify-center items-center  max-lg:absolute max-lg:top-6 max-lg:left-[-170%] transition-all text-black dark:bg-slate-950 bg-white `}
          >
            
            {navigationLinks.map((link) => (
              <li key={link.title} className="dark:text-white transition-all  hover:scale-105 hover:bg-transparent px-2 py-[3px]">
                <div onClick={() => {
                  navigate(link.path)
                  setSelected(link.title)
                  setShowLink(false)
                  }}  className="flex gap-2">
                  <div>{link.icon}</div>
                  <div className={` ${selected === link.title ? "border-b-2 dark:border-white border-black" : "border-b-2 border-transparent" } transition-all font-montserrat cursor-pointer `}>
                    {link.title}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className=" px-2">
          <ul className="flex lg:items-center">
           
            <li className="lg:mr-3 max-lg:mt-[-2px]">
              <button
                onClick={toggleDark}
                className="font-montserrat cursor-pointer lg:px-3 max-lg:px-2  max-lg:text-[15px]  lg:max-w-[30px]"
              >
                {theme === "dark" ? <i className="fa-regular fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
              </button>
            </li>
            <li className=" ">
              <div onClick={logOut} className="font-montserrat max-lg:text-[15px] cursor-pointer">
                <i className="fas fa-sign-out-alt mr-1"></i>Log out
              </div>
            </li>
          </ul>
        </div>
      </div>
      </div>
    </>
  );
};

export default SideBar;
