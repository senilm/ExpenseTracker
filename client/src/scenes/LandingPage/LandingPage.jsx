import NavbarLow from "../../components/Navbar/NavbarLow"
import { useNavigate } from "react-router-dom"

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <NavbarLow />
      <section id="home" className="p-2 flex justify-center items-center flex-col w-[100%] lg:h-[70vh] max-sm:h-[70vh]">
        <div className="w-full flex justify-center items-center flex-col pt-5">
          <div className="text-xl font-montserrat">Welcome</div>
          <h1 className="text-4xl mt-1 font-raleway max-sm:text-3xl ">Personal Expense Tracker</h1>
          <p className="font-montserrat text-slate-gray text-lg mt-2 text-center max-sm:text-sm ">Track your expenses with ease and take control of your finances like never before.</p>
          <button className="border border-black mt-8 p-3 rounded-lg active:bg-white-400 hover:bg-white-400 transition-all"
            onClick={() => navigate('/login')}>
            Get Started
          </button>
        </div>

      </section>
      <p>
      </p>
    </>
  )
}

export default LandingPage