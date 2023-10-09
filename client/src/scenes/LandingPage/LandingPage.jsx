import NavbarLow from "../../components/Navbar/NavbarLow";
import { useNavigate } from "react-router-dom";
import hero from '../../assets/hero.png' 
const LandingPage = ({ toggleDark }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="bg-gradient-to-b from-gray-100 to-yellow-100 min-h-screen max-container bg-opacity-25">
        <NavbarLow />
        <div className="flex max-lg:flex-col">

        <section
          id="home"
        className="lg:mx-20 max-lg:mx-5  flex basis-[80%]  lg:mt-10 "
        >
          <div className="w-full flex gap-20 flex-col pt-3">
            
            <h1 className="text-3xl max-lg:text-2xl max-lg:leading-10 ml-[-4px] mt-14 font-montserrat ">
              Personal <div className="text-8xl max-lg:text-[60px] max-lg:leading-[68px] ml-[-4px] font-raleway max-md:mb-3">Expense Tracker</div>
            </h1>
            <p className="font-montserrat z-10  text-lg lg:w-[70%] mt-[-4rem]  max-sm:text-md  text-gray-600">
              Track your expenses with ease & take control of your finances
              like never before.
            </p>
            <button
              className="border border-black mt-[-2rem] p-3 mb-10 w-[20%] max-lg:w-[35%] bg-black text-white active:bg-white-400 hover:bg-transparent shadow-lg  z-20 rounded-md hover:text-black  transition-all"
              onClick={() => navigate("/login")}
            >
              <div className=" hover:scale-105 transition-all">Get started</div>
            </button>
          </div>
        </section>

        <section className=" lg:basis-[40%] mt-2 max-md:mt-[-12.9rem] lg:mr-20 ">
          <div className="">
            <img src={hero} alt=""  className="h-[34rem] -z-10  w-full"/>
          </div>
        </section>
          </div>
      </div>
    </>
  );
};

export default LandingPage;
