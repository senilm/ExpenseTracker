import { useState } from "react"
import { navigationLinks } from "../../constants/constants"
import Cookies from "js-cookie"

const SideBar = ({ userData }) => {

  const [showLink, setShowLink] = useState(false)

  const logOut = () => {
    sessionStorage.clear();
    Cookies.remove('userData')
  }
  const toggleLink = () => {
    setShowLink(!showLink)
  }
  return (
    <>
      <div className="flex lg:flex-col max-lg:justify-between w-[100%] ">

        <div id='intro' className=''>
          <div className="px-2 font-montserrat lg:text-xl lg:mt-3">Hey, {userData.name.toUpperCase()}</div>
          {/* <div>{userData.age}</div>
        <div>{userData.occupation}</div>
      <div>{userData.location}</div> */}
        </div>


        <div className="lg:mt-20 text-blue-400 max-lg:flex max-lg:flex-col max-lg:relative ">
          <button
            className="block lg:hidden text-black  self-center "
            onClick={toggleLink}
          >
            Menu
          </button>

          <ul className={`${showLink ? " max-lg:opacity-100  max-lg:visible" : " max-lg:opacity-0 max-lg:invisible"
            } lg:block flex flex-col justify-center items-center m-3 max-lg:absolute max-lg:top-4 max-lg:left-[-130%] transition-all text-black max-lg:bg-white `}
          >
            {navigationLinks.map((link) => (
              <li key={link.title} className=" my-1 py-2 px-2 "><a href={link.path} className="flex gap-2" >
                <div>{link.icon}</div>
                <div className="font-montserrat ">{link.title}</div>
              </a></li>
            ))}
          </ul>
        </div>


        <div className="lg:mt-20  px-2 ">
          <ul>
            <li className="lg:flex " ><a href="/" onClick={logOut} className="font-montserrat"><i className="fas fa-sign-out-alt mr-2"></i>Log out</a></li>
          </ul>
        </div>
      </div>
    </>
  )

}

export default SideBar