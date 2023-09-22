import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar"
import Cookies from "js-cookie"
import { axiosInstance, getAuthHeader } from "../../service/api";
import TransactionItem from "../../components/TransactionsItem/TransactionItem";
import Loader from "../../components/Loader/Loader";


const Transaction = () => {
  const userDataString = Cookies.get('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [transactions, setTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(true)

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
        const trans = [...expenses.data, ...incomes.data].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)).reverse()
        setTransactions(trans);
        setIsLoading(false)
      }
    }
    getTransactions()
  }, [])

  return (

    <section className="flex  max-container gap-4 p-3 max-lg:flex-col">
      <div id="leftSide" className="p-4 shadow-xl border-2 border-white rounded-[30px] border-white-500  basis-[20%]">
        <SideBar userData={userData} />
      </div>

      <div id="rightSide" className=" p-4 shadow-xl border-2 border-white rounded-[30px] border-white-600 min-h-screen flex-1 basis-[80%] max-lg:p-2">
        <h1 className='px-4 text-3xl font-raleway max-sm:text-2xl max-sm:mt-3 max-sm:mb-3'>Transactions</h1>
        {isLoading ?
          <Loader />
          :
          <>
            <div id="transactionContent" className="flex p-3 max-lg:px-0 max-lg:py-0 ">
              <div id="transaction" className="p-3 w-full max-sm:p-0">
                {
                  transactions.map((item) => (
                    <TransactionItem {...item} key={item._id} />
                  ))
                }
              </div>
            </div>
          </>}
      </div>
    </section>

  )
}

export default Transaction