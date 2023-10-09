import SideBar from "../../components/SideBar/SideBar";
import Cookies from "js-cookie";
import IncomeForm from "../../components/incomeForm/IncomeForm";
import { axiosInstance } from "../../service/api";
import { useEffect, useState, useContext } from "react";
import { getAuthHeader } from "../../service/api";
import DisplayIncome from "../../components/DisplayIncome/DisplayIncome";
import Loader from "../../components/Loader/Loader";

const Income = ({ toggleDark }) => {
  const userDataString = Cookies.get("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [val, setVal] = useState(true);
  const [incomeData, setIncomeData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const deleteIncome = async (id) => {
    const response = await axiosInstance.delete(`/income/deleteIncome/${id}`, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });
    if (response.isSuccess) {
      {
        val === true ? setVal(false) : setVal(true);
      }
    }
  };

  const handleSubmitIncome = async (incomeData) => {
    try {
      const response = await axiosInstance.post(
        "/income/addIncome",
        incomeData,
        {
          headers: {
            Authorization: getAuthHeader(),
          },
        }
      );
      if (response.isSuccess) {
        {
          val === true ? setVal(false) : setVal(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getIncomes = async () => {
      try {
        const response = await axiosInstance.get("/income/getIncome", {
          headers: {
            Authorization: getAuthHeader(),
          },
        });
        if (response.isSuccess) {
          setIncomeData(response.data.reverse());
          const sum = response.data.reduce(
            (accumulator, currentObject) => accumulator + currentObject.amount,
            0
          );
          setTotal(sum);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getIncomes();
  }, [val]);

  return (
    <section className=" flex max-container gap-4 lg:pt-4 lg:pb-3 max-lg:pt-3 max-lg:px-2 lg:px-10 max-lg:flex-col dark:bg-slate-950 transition-all">
      <div
        id="rightSide"
        className="bg-gradient-to-b from-gray-200 to-yellow-100 shadow-xl p-4 border-[1px] dark:border-opacity-25 border-white rounded-[30px] border-white-600  flex-1  max-lg:px-0 max-lg:py-5 dark:bg-gradient-to-b  dark:from-slate-950 dark:to-gray-700 dark:via-gray-900 transition-all max-lg:min-h-screen"
      >
        
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="lg:px-6 max-lg:px-5">
              <div className="border-[1px] dark:border-opacity-25  border-white flex justify-center py-3 mb-5 mx-auto font-montserrat shadow-md bg-white-400 dark:bg-slate-700 dark:text-white">
                Total Income: <div className="text-xl ml-3 text-green-400">{total}${" "}</div>
              </div>
            </div>

            <div id="incomeContent" className="flex p-3  max-lg:flex-col">
              <div
                id="form-container"
                className=" w-[30%] max-lg:w-full flex lg:px-3 max-lg:px-2 py-1 "
              >
                <IncomeForm handleSubmitIncome={handleSubmitIncome} />
              </div>
              <div
                id="incomes"
                className=" lg:w-[70%] max-lg:w-full px-3 max-lg:px-2 font-montserrat  py-1"
              >
                {incomeData.map((item) => (
                  <DisplayIncome
                    {...item}
                    deleteIncome={deleteIncome}
                    key={item._id}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Income;
