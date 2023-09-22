
import SideBar from "../../components/SideBar/SideBar"
import Cookies from "js-cookie"
import ExpenseForm from "../../components/expenseForm/expenseForm";
import { axiosInstance } from '../../service/api'
import { useEffect, useState } from "react";
import { getAuthHeader } from "../../service/api";
import DisplayExpense from "../../components/DisplayExpense/DisplayExpense";
import Loader from "../../components/Loader/Loader";



const Expense = () => {
  const userDataString = Cookies.get('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [val, setVal] = useState(true);
  const [expenseData, setExpenseData] = useState([])
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true)


  const deleteExpense = async(id) =>{
    const response = await axiosInstance.delete(`/expenses/${id}`,{
      headers:{
        Authorization:getAuthHeader()
      }
    })
    if (response.isSuccess) {
      { val === true ? setVal(false) : setVal(true) }
    }
  }    

  const handleSubmitExpense = async (expenseData) => {

    try {
      const response = await axiosInstance.post('/expenses', expenseData, {
        headers: {
          Authorization: getAuthHeader()
        }
      })
      if (response.isSuccess) {
        { val === true ? setVal(false) : setVal(true) }
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const getExpense = async () => {

      try {
        const response = await axiosInstance.get('/expenses', {
          headers: {
            Authorization: getAuthHeader()
          }
        })
        if (response.isSuccess) {
          setExpenseData(response.data.reverse())
          const sum = response.data.reduce((accumulator, currentObject)=> accumulator + currentObject.amount,0)
          setTotal(sum)
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getExpense()
  }, [val])


  return (

    <section className="flex max-container gap-4 p-3 max-lg:flex-col">
      <div id="leftSide" className="p-4 shadow-xl border-2 border-white rounded-[30px] border-white-500  basis-[20%]">
        <SideBar userData={userData} />
      </div>

      <div id="rightSide" className=" p-4 shadow-xl border-2 border-white rounded-[30px] border-white-600  flex-1 basis-[80%] max-lg:p-2">
        <h1 className='px-6 mb-4 text-3xl  font-raleway max-sm:text-2xl max-sm:mb-3 max-sm:mt-3 '>Expenses</h1>
        {isLoading ? 
        <Loader/> 
        :
        <>
        <div className="px-6">
          <div className="border-2 shadow-md border-white flex justify-center py-3 mb-5 mx-auto font-montserrat bg-white-400">Total Expenses: {total}$ </div>
        </div>
        <div id="expenseContent" className="flex p-3 max-lg:flex-col">
          <div id="form-container" className=" w-[30%] flex max-lg:w-full  px-3 py-1 font-montserrat"><ExpenseForm handleSubmitExpense={handleSubmitExpense} /></div>
          <div id="expenses" className="  w-[70%] px-3 py-1 max-lg:w-full font-montserrat">
            {expenseData.map((item)=>(
              <DisplayExpense {...item} deleteExpense={deleteExpense} key={item._id} />
            ))}
          </div>
        </div>
        </>}
      </div>
    </section>

  )
}

export default Expense