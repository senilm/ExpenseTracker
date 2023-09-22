
import SideBar from "../../components/SideBar/SideBar"
import Cookies from "js-cookie"
import IncomeForm from "../../components/incomeForm/IncomeForm";
import { axiosInstance } from '../../service/api'
import { useEffect, useState, useContext } from "react";
import { getAuthHeader } from "../../service/api";
import DisplayIncome from "../../components/DisplayIncome/DisplayIncome";
import Loader from "../../components/Loader/Loader";

const Income = () => {
  const userDataString = Cookies.get('userData');
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [val, setVal] = useState(true);
  const [incomeData, setIncomeData] = useState([])
  const [total, setTotal] = useState(0)
  const [isLoading, setIsLoading] = useState(true)


  const deleteIncome = async (id) => {
    const response = await axiosInstance.delete(`/income/deleteIncome/${id}`, {
      headers: {
        Authorization: getAuthHeader()
      }
    })
    if (response.isSuccess) {
      { val === true ? setVal(false) : setVal(true) }
    }
  }

  const handleSubmitIncome = async (incomeData) => {

    try {
      const response = await axiosInstance.post('/income/addIncome', incomeData, {
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
    const getIncomes = async () => {

      try {
        const response = await axiosInstance.get('/income/getIncome', {
          headers: {
            Authorization: getAuthHeader()
          }
        })
        if (response.isSuccess) {
          setIncomeData(response.data.reverse());
          const sum = response.data.reduce((accumulator, currentObject) => accumulator + currentObject.amount, 0);
          setTotal(sum);
          setIsLoading(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
    getIncomes()
  }, [val])




  return (

    <section className="flex max-container gap-4 py-3 px-3 max-lg:flex-col">
      <div id="leftSide" className="p-4 shadow-xl border-2 border-white rounded-[30px] border-white-500 basis-[20%]">
        <SideBar userData={userData} />
      </div>


      <div id="rightSide" className="shadow-xl p-4 border-2 border-white rounded-[30px] border-white-600  flex-1 basis-[80%] max-lg:p-2">
        <h1 className='px-6 mb-4 text-3xl font-raleway max-sm:text-2xl max-sm:mb-3 max-sm:mt-3'>Incomes</h1>
        {isLoading
          ?
          <Loader />
          :
          <>
            <div className="px-6">
              <div className="border-2  border-white flex justify-center py-3 mb-5 mx-auto font-montserrat shadow-md bg-white-400">Total Income: {total}$ </div>
            </div>

            <div id="incomeContent" className="flex p-3  max-lg:flex-col">
              <div id="form-container" className=" w-[30%] max-lg:w-full flex px-3 py-1 ">
                <IncomeForm handleSubmitIncome={handleSubmitIncome} />
              </div>
              <div id="incomes" className=" w-[70%] max-lg:w-full px-3 font-montserrat  py-1">
                {incomeData.map((item) => (
                  <DisplayIncome {...item} deleteIncome={deleteIncome} key={item._id} />
                ))}
              </div>
            </div>
          </>}
      </div>
    </section>

  )
}

export default Income