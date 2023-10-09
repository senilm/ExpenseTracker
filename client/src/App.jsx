import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import LandingPage from './scenes/LandingPage/LandingPage'
import Login from './scenes/Login/Login'
import Home from './scenes/Home/Home'
import Income from './scenes/Income/Income'
import Expense from './scenes/Expense/Expense'
import Transaction from './scenes/transections/Transactions'
import DataProvider from './context/DataProvider'
import { DataContext } from './context/DataProvider'
import SideBar from './components/SideBar/SideBar'
const PrivateRoute = ({ isAuth,theme,toggleDark, ...props }) => {

  const isAuthenticated = isAuth || sessionStorage.getItem('accessToken')
  return isAuthenticated ?
    <>
      <SideBar toggleDark={toggleDark} theme={theme}/>
      <Outlet />
    </>
    : <Navigate replace to='/login' />  
}

function App() {

  const [isAuth, setIsAuth] = useState(false)
  const [theme, setTheme] = useState("light");

  useEffect(() => {

    const storedTheme = localStorage.getItem("theme");
    setTheme(storedTheme || "light");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    } 
  }, [theme]);
  
  const toggleDark = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  
    
    localStorage.setItem("theme", newTheme);
  };

  return <DataProvider>
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />

          <Route path='/' element={<PrivateRoute isAuth={isAuth} toggleDark={toggleDark} theme={theme} />}>
            <Route path='/home' element={<Home toggleDark={toggleDark} />}  />
            <Route path='/income' element={<Income toggleDark={toggleDark}/>} />
            <Route path='/expense' element={<Expense toggleDark={toggleDark}/>} />
            <Route path='/transaction' element={<Transaction toggleDark={toggleDark}/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  </DataProvider>


}

export default App
