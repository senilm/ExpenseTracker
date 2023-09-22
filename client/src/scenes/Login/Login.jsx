import { useState,useContext } from "react"
import {useNavigate} from 'react-router-dom'
import { axiosInstance } from "../../service/api"
import { useGetData } from "../../context/DataProvider" //we'll use this custom hook to get info of DataContext 
import { DataContext } from "../../context/DataProvider" //this is our context of context api and we won't use the useContext
import Cookies from 'js-cookie';


const initialLogin = {
  email:"",
  password:""
}

const initialRegister = {
  name:'',
  age:'',
  location:'',
  occupation:'',
  email:'',
  password:''
}


const Login = ({setIsAuth}) => {


  const [loginInfo, setLoginInfo] = useState(initialLogin)
  const [RegisterInfo, setRegisterInfo] = useState(initialRegister)
  const [errorMsg, setErrorMsg] = useState('')
  const [formType, setFormType] = useState('login');
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  // const {setAccount} = useContext(DataContext)
  const {setAccount} = useGetData()

  const loginUser = async (e) =>{
    e.preventDefault()
    
    try {
      const response = await axiosInstance.post('/auth/login',loginInfo)
      if(response.isSuccess){
        sessionStorage.setItem('accessToken', `Bearer ${response.data.accessToken}`)
        sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`)
        setErrorMsg('')
        // setAccount({
        //   name:response.data.user.name,
        //   location:response.data.user.location,
        //   occupation:response.data.user.occupation,
        //   age:response.data.user.age,
        //   id:response.data.user._id
        // })
        const userData = {
          name:response.data.user.name,
          location:response.data.user.location,
          occupation:response.data.user.occupation,
          age:response.data.user.age,
          id:response.data.user._id
        }
        Cookies.set('userData',JSON.stringify(userData),{expires:1})
        setLoginInfo(initialLogin)
        setIsAuth(true)
        navigate('/home')
      }
    } catch (error) {
      setErrorMsg(error.msg)
    }
  }

  const registerUser = async(e) =>{
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/auth/register',RegisterInfo)
      if (response.isSuccess) {
        setErrorMsg('');
        setRegisterInfo(initialRegister);
        setFormType('login')
      }
    } catch (error) {
      setErrorMsg(error.msg)
    }
    console.log();
  }

  const handleFormType = () =>{
    {
      formType === 'login' ? 
    (()=>{
      setFormType('register')
      setErrorMsg('')
    })()
     : 
    (()=>{
      setFormType('login')
      setErrorMsg('')
    })() 
    }
  }
  const handleChange = (e) =>{
    {formType === 'login' ? setLoginInfo({...loginInfo,[e.target.name]:e.target.value}) : setRegisterInfo({...RegisterInfo, [e.target.name]:e.target.value})}
    
  }

  const togglePasswordVisibility = () =>{
    setShowPassword(!showPassword)
  }
  return (
    <section className="flex justify-center items-center h-[100vh] max-sm:h-[90vh] flex-col">

      {formType === 'login' 
      
      ?
      <>
      {errorMsg && <div className="text-center text-red-500 mb-5">{errorMsg}</div>}
      <form className=" w-[20%] max-sm:w-[70%] font-montserrat" onSubmit={(e)=>loginUser(e)}>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none "
          placeholder="Enter your email"
          onChange={(e)=>handleChange(e)}
        />
      </div>
      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-gray-600 mb-2">Password</label>
        <input
          type={showPassword ? 'text' : 'password'}
          id="password"
          name="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none "
          placeholder="Enter your password"
          autoComplete='true'
          onChange={(e)=>handleChange(e)}
        />
        <span
          onClick={togglePasswordVisibility}
          className="absolute bottom-[12px] right-[12px] pl-3 flex items-center cursor-pointer"
        >
          {showPassword ? (
            <i className="fas fa-eye-slash" style={{ color: "#000000" }}></i>
          ) : (
            <i className="fas fa-eye" style={{ color: "#000000" }}></i>
          )}
        </span>
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="border border-black py-2 px-4 rounded-md active:bg-white-400 hover:bg-white-400 font-montserrat mt-5 transition-all"
        >
          Login
        </button>
      </div>
        <div className="text-center my-5">OR</div>
        <div className="text-center">
        <button
          onClick={handleFormType}
          className="border border-black py-2 px-4 rounded-md active:bg-white-400 hover:bg-white-400 font-montserrat transition-all"
        >
          Register
        </button>
      </div>
      </form>  
      </>

    :


    <>
    {errorMsg && <div className="text-center text-red-500">{errorMsg}</div>}
    <form className=" w-[20%] max-sm:w-[70%] font-montserrat mt-10 " onSubmit={(e)=>registerUser(e)}>
      <div className="mb-4">
       
        <input
          type="text"
          id="name"
          name="name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none "
          placeholder="Enter your name"
          onChange={(e)=>handleChange(e)}
        />
      </div>
      <div className="mb-4">
        
        <input
          type="number"
          id="age"
          name="age"
          className="w-full px-4 py-2 border rounded-md focus:outline-none "
          placeholder="Enter your age"
          onChange={(e)=>handleChange(e)}
        />
      </div>
      <div className="mb-4">
        
        <input
          type="text"
          id="location"
          name="location"
          className="w-full px-4 py-2 border rounded-md focus:outline-none "
          placeholder="Enter your location"
          onChange={(e)=>handleChange(e)}
        />
      </div>
      <div className="mb-4">
        
        <input
          type="text"
          id="occupation"
          name="occupation"
          className="w-full px-4 py-2 border rounded-md focus:outline-none "
          placeholder="Enter your occupation"
          onChange={(e)=>handleChange(e)}
          />
      </div>
      <div className="mb-4">
        
        <input
          type="text"
          id="email"
          name="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none "
          placeholder="Enter your email"
          onChange={(e)=>handleChange(e)}
        />
      </div>
      <div className="mb-4">
        
        <input
          type="password"
          id="password"
          name="password"
          className="w-full px-4 py-2 border rounded-md focus:outline-none "
          placeholder="Enter your password"
          autoComplete="true"
          onChange={(e)=>handleChange(e)}
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="border border-black py-2 px-4 rounded-md hover:bg-white-400 active:bg-white-400 transition-all mt-5"
        >
          Register
        </button>
      </div>
        <div className="text-center my-5">OR</div>
        <div className="text-center">
        <button
          onClick={handleFormType}
          className="border border-black py-2 px-4 rounded-md active:bg-white-400 hover:bg-white-400 transition-all"
          >
          Login
        </button>
      </div>
      </form>
      </>
    }
    </section>
  )
}
  

export default Login




    
 


