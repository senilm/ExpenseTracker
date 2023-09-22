
import {  useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import SideBar from '../../components/SideBar/SideBar';
import Chart from '../../components/Chart/Chart';
import { axiosInstance } from '../../service/api';
import { getAuthHeader } from '../../service/api';
import HomeItemTrans from '../../components/TransactionsItem/HomeItemTrans';
import ToPay from '../../components/ToPay/ToPay'
import Loader from '../../components/Loader/Loader';

const toPayInitial = {
  amount: "",
  Detail: ""
}
const Home = () => {

  const userDataString = Cookies.get('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [incomesData, setIncomesData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [transactions, setTransactions] = useState([])
  const [balance, setBalance] = useState(0);
  const [toPayData, setToPayData] = useState([]);
  const [val, setVal] = useState(true);
  const [toPayForm, setToPayForm] = useState(toPayInitial)
  const [isLoading, setIsLoading] = useState(true)

  const textColor = balance > 0 ? 'text-green-500' : 'text-red-500'


  useEffect(() => {
    const getTransactions = async () => {
      const expenses = await axiosInstance.get('/expenses', {
        headers: {
          Authorization: getAuthHeader()
        }
      })
      const incomes = await axiosInstance.get('/income/getIncome', {
        headers: {
          Authorization: getAuthHeader()
        }
      })
      if (expenses.isSuccess && incomes.isSuccess) {
        setIsLoading(false)
        setIncomesData(incomes.data.sort((a, b) => new Date(a.date) - new Date(b.date)));
        setExpensesData(expenses.data.sort((a, b) => new Date(a.date) - new Date(b.date)))
        const trans = [...expenses.data, ...incomes.data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).reverse().slice(0, 4)
        setTransactions(trans)

        const totalIncomeData = incomes.data.reduce((accumulator, currentObject) => accumulator + currentObject.amount, 0);
        setTotalIncome(totalIncomeData)
        const totalExpenseData = expenses.data.reduce((accumulator, currentObject) => accumulator + currentObject.amount, 0);
        setTotalExpense(totalExpenseData)
        setBalance(totalIncomeData - totalExpenseData)
        
      }
    }
    getTransactions()
  }, [])

  useEffect(() => {
    const getToPay = async () => {
      try {
        const response = await axiosInstance.get('/toPay', {
          headers: {
            Authorization: getAuthHeader()
          }
        })
        if (response.isSuccess) {
          setToPayData(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getToPay()
  }, [val])

  const submitToPay = async (e) => {
    e.preventDefault();
    console.log('submitted');
    const response = await axiosInstance.post('/toPay', toPayForm, {
      headers: {
        Authorization: getAuthHeader()
      }
    })
    if (response.isSuccess) {
      setVal(!val)
      setToPayForm(toPayInitial)
    }
  }

  const ChangeToPay = (e) => {
    setToPayForm({ ...toPayForm, [e.target.name]: e.target.value })
  }

  const deleteToPay = async (_id) => {
    const response = await axiosInstance.delete(`/toPay/${_id}`, {
      headers: {
        Authorization: getAuthHeader()
      }
    })
    if (response.isSuccess) {
      setVal(!val)
    }
  }


  return (
    
    <>
    
    <section className="flex max-container gap-4 py-3 px-3 max-h-[100vh] max-lg:flex-col">

      {/* left side */}
      <div id="leftSide" className="p-4 shadow-xl border-white border-2 rounded-[30px] border-white-500 basis-[20%] max-lg:w-[100%] flex flex-col   max-lg:flex-row">
        <SideBar userData={userData} />
      </div>

      {/* right side */}
      <div id="rightSide" className="shadow-xl p-4 border-2 border-white rounded-[30px] border-white-600  flex-1 basis-[80%] max-lg:pt-2">
        <h1 className='px-3 text-3xl font-raleway max-sm:text-2xl max-sm:mb-3 max-sm:mt-3'>Dashboard</h1>

          {isLoading 
          ? 
          <Loader/> 
          :
        <div className='flex max-lg:flex-col'>
          {/* left */}
          <div className=' basis-[50%]'>

            <div className="p-3 ">
              <Chart incomesData={incomesData} expensesData={expensesData} />
            </div>

            <div className='flex justify-around mt-3'>

              <div className=' rounded-[30px] w-[46%] flex justify-center border-2 border-white shadow-md  bg-pink-100  bg-opacity-10 items-center gap-1 flex-col max-lg:gap-2 ' >

                <div className='text-3xl text-red-500 max-lg:text-2xl max-lg:mt-3 font-montserrat'>{totalExpense}$</div><div className=' mb-3 font-montserrat'>Total Expense</div>
              </div>
              <div className='border-2 border-white shadow-md w-[46%] rounded-[30px] bg-opacity-10 bg-teal-100  flex justify-center items-center gap-1 flex-col ' >
                <div className='text-3xl text-green-500 max-lg:text-2xl max-lg:mt-3  font-montserrat'>{totalIncome}$</div><div className='mb-3 font-montserrat'>Total Income</div>
              </div>

            </div>

            <div className='flex justify-center items-center '>
              <div className='border-2 border-white w-[46%] flex rounded-[30px] shadow-md bg-white-400 justify-center items-center gap-1 flex-col mt-5'>
                <div className={`text-3xl ${textColor} max-lg:text-2xl max-lg:mt-3 font-montserrat`}>{balance}$</div><div className='mb-3 font-montserrat'>Balance</div>
              </div>
            </div>
          </div>


          {/* right */}
          <div className='basis-[50%] '>
            <div className="p-4">

              <div className='flex flex-col max-lg:border-2 max-lg:border-white max-lg:mt-10 max-lg:p-2 rounded-[30px] '>
                <h1 className='text-xl text-center max-lg:m-2 font-montserrat'>Recent Transactions</h1>
                <div>
                  {transactions.map((item) => {
                    return <HomeItemTrans {...item} key={item._id} />
                  })}
                </div>
              </div>

              <div className="min-h-[200px] mt-7 flex flex-col rounded-[30px] p-3 justify-between shadow-md border-2 border-white max-lg:mt-14 ">
                <h1 className=' text-center font-montserrat'>To Pay List</h1>
                <div className='border-2 border-white rounded-[23px] bg-white-400 shadow-md '>
                  <div className='flex flex-col max-h-[100px] overflow-y-auto '>
                    {toPayData.map((item) => (
                      <ToPay {...item} deleteToPay={deleteToPay} key={item._id} />
                    ))}
                  </div>
                </div>
                <div >
                  <form method='POST' className='flex justify-around mt-1 ' onSubmit={(e) => submitToPay(e)}>

                    <input type="number" name="amount" id="amount" className='focus:outline-none border-2 shadow-md border-white rounded-[23px] py-1 px-3 w-[100px] max-lg:w-[90px]' placeholder='Amount' value={toPayForm.amount} min={0} onChange={(e) => ChangeToPay(e)} />

                    <input type="text" name="Detail" id="detail" placeholder='Detail' className='focus:outline-none shadow-md border-2 border-white rounded-[23px] py-1 px-3 w-[130px] max-lg:w-[90px]' value={toPayForm.Detail} onChange={(e) => ChangeToPay(e)} />

                    <button type="submit" className='shadow-md border-2 border-white rounded-[30px] p-1 w-[50px] max-lg:w-[40px] max-lg:p-0 bg-white-400'><i className="fa-solid fa-plus fa-sm"></i></button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
        }
      </div>
    </section>
    
    </>
    
  )
}

export default Home