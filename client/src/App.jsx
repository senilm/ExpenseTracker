import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import { useState } from 'react'
import LandingPage from './scenes/LandingPage/LandingPage'
import Login from './scenes/Login/Login'
import Home from './scenes/Home/Home'
import Income from './scenes/Income/Income'
import Expense from './scenes/Expense/Expense'
import Transaction from './scenes/transections/Transactions'
import DataProvider from './context/DataProvider'

const PrivateRoute = ({ isAuth, ...props }) => {

  const isAuthenticated = isAuth || sessionStorage.getItem('accessToken')
  return isAuthenticated ?
    <>
      <Outlet />
    </>
    : <Navigate replace to='/login' />  
}

function App() {

  const [isAuth, setIsAuth] = useState(false)

  return <DataProvider>
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<Login setIsAuth={setIsAuth} />} />

          <Route path='/' element={<PrivateRoute isAuth={isAuth} />}>
            <Route path='/home' element={<Home />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
            <Route path='/transaction' element={<Transaction />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  </DataProvider>


}

export default App
