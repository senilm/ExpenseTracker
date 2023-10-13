import { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import SideBar from "../../components/SideBar/SideBar";
import Chart from "../../components/Chart/Chart";
import { axiosInstance } from "../../service/api";
import { getAuthHeader } from "../../service/api";
import HomeItemTrans from "../../components/TransactionsItem/HomeItemTrans";
import ToPay from "../../components/ToPay/ToPay";
import Loader from "../../components/Loader/Loader";
import { DataContext } from "../../context/DataProvider";

const toPayInitial = {
  amount: "",
  Detail: "",
};
const Home = ({ toggleDark }) => {
  const userDataString = Cookies.get("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [incomesData, setIncomesData] = useState([]);
  const [expensesData, setExpensesData] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const [toPayData, setToPayData] = useState([]);
  const [val, setVal] = useState(true);
  const [toPayForm, setToPayForm] = useState(toPayInitial);
  const [isLoading, setIsLoading] = useState(true);
  const textColor = balance > 0 ? "text-green-500" : "text-red-500";

  useEffect(() => {
    const getTransactions = async () => {
      const expenses = await axiosInstance.get("/expenses", {
        headers: {
          Authorization: getAuthHeader(),
        },
      });
      const incomes = await axiosInstance.get("/income/getIncome", {
        headers: {
          Authorization: getAuthHeader(),
        },
      });
      if (expenses.isSuccess && incomes.isSuccess) {
        setIsLoading(false);
        setIncomesData(
          incomes.data.sort((a, b) => new Date(a.date) - new Date(b.date))
        );
        setExpensesData(
          expenses.data.sort((a, b) => new Date(a.date) - new Date(b.date))
        );
        const trans = [...expenses.data, ...incomes.data]
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .reverse()
          .slice(0, 4);
        setTransactions(trans);

        const totalIncomeData = incomes.data.reduce(
          (accumulator, currentObject) => accumulator + currentObject.amount,
          0
        );
        setTotalIncome(totalIncomeData);
        const totalExpenseData = expenses.data.reduce(
          (accumulator, currentObject) => accumulator + currentObject.amount,
          0
        );
        setTotalExpense(totalExpenseData);
        setBalance(totalIncomeData - totalExpenseData);
      }
    };
    getTransactions();
  }, []);

  useEffect(() => {
    const getToPay = async () => {
      try {
        const response = await axiosInstance.get("/toPay", {
          headers: {
            Authorization: getAuthHeader(),
          },
        });
        if (response.isSuccess) {
          setToPayData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getToPay();
  }, [val]);

  const submitToPay = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const response = await axiosInstance.post("/toPay", toPayForm, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });
    if (response.isSuccess) {
      setVal(!val);
      setToPayForm(toPayInitial);
    }
  };

  const ChangeToPay = (e) => {
    setToPayForm({ ...toPayForm, [e.target.name]: e.target.value });
  };

  const deleteToPay = async (_id) => {
    const response = await axiosInstance.delete(`/toPay/${_id}`, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });
    if (response.isSuccess) {
      setVal(!val);
    }
  };

  return (
    <>
      <section className="  max-container gap-4 max-lg:pt-3 pb-4 lg:pt-4 lg:pb-3 lg:px-10 max-lg:px-2 lg:max-h-[100vh] dark:bg-slate-950  lg:w-[100%] max-lg:w-[100%]">
        

        {/* right side */}
        <div
          id="rightSide"
          className="bg-gradient-to-b from-gray-100 to-yellow-100 dark:bg-gradient-to-b  dark:from-slate-950 dark:to-gray-700 dark:via-gray-900 shadow-xl w-full px-4 border-[1px] border-white
           min-h-[100%]  rounded-[30px] flex-1  max-lg:pt-2 transition-all  dark:shadow-sm
          dark:border-opacity-25"
        >
          
           
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex max-lg:flex-col justify-around">
              {/* left */}
              <div className=" basis-[45%] max-lg:basis-[50%]">
                <div className="max-lg:px-[0.4rem] max-lg:pt-4  lg:pt-4 ">
                  <Chart
                    incomesData={incomesData}
                    expensesData={expensesData}
                  />
                </div>

                <div className="min-h-[200px] max-lg:min-h-[150px] flex items-center max-lg:items-end  lg:mt-4">
                <div className="flex justify-around h-full w-full cursor-pointer">
                  
                  <div className=" rounded-[30px] max-lg:w-[30%] lg:w-[31%] flex justify-center border-[1px] border-white shadow-md bg-white-400 dark:bg-slate-700  items-center gap-1 flex-col max-lg:gap-2 dark:border-opacity-25  dark:shadow-sm ">
                    <div className="text-3xl text-red-500 max-lg:mb-2 max-lg:text-xl max-lg:mt-3 font-montserrat">
                      {totalExpense}$
                    </div>
                    <div className=" mb-3 max-lg:leading-4 font-montserrat dark:text-white max-lg:text-center max-lg:text-[16px] ">Total Expense</div>
                  </div>


                  <div className="border-[1px] border-white max-lg:w-[30%] shadow-md w-[31%] rounded-[30px]  bg-white-400    flex justify-center items-center bg-opacity-50 gap-1 flex-col dark:border-opacity-25  dark:shadow-sm dark:bg-slate-700">
                    <div className="text-3xl text-green-500 max-lg:text-xl max-lg:mt-3 max-lg:mb-2 font-montserrat">
                      {totalIncome}$
                    </div>
                    <div className="max-lg:text-[16px] mb-3 max-lg:w-[90%]  font-montserrat dark:text-white max-lg:text-center max-lg:leading-4"> Total Income</div>
                  </div>


                  <div className="border-[1px] border-white w-[31%] flex max-lg:w-[30%] rounded-[30px] shadow-md bg-white-400 justify-center items-center gap-1 flex-col dark:border-opacity-25  dark:shadow-sm  dark:bg-slate-700">
                    <div
                      className={`text-3xl ${textColor} max-lg:mb-2 max-lg:text-xl max-lg:mt-3 font-montserrat`}
                    >
                      {balance}$
                    </div>
                    <div className="mb-3 max-lg:text-[16px] font-montserrat dark:text-white max-lg:text-center max-lg:leading-4">Current Balance</div>
                  </div>
                </div>
                </div>

              </div>

              {/* right */}
              <div className="basis-[50%] max-lg:basis-[50%]  ">
                <div className="px-4 py-4 max-lg:px-[0.4rem] max-lg:py-0 ">
                  <div className="min-h-[284px] flex flex-col max-lg:border-[1px] max-lg:border-white max-lg:mt-14 max-lg:p-2 rounded-[30px] max-lg:border-opacity-25 ">
                    <h1 className="text-xl text-center max-lg:m-2 font-montserrat mb-1 dark:text-white">
                      Recent Transactions
                    </h1>
                    <div>
                      {transactions.length === 0 ? (
                  <div className=" w-full  justify-center flex items-center">
                    <div className=" font-montserrat lg:text-md max-lg:text-sm dark:text-white ">
                      No Transactions Available
                    </div>
                  </div> ): transactions.map((item) => {
                        return <HomeItemTrans {...item} key={item._id} />;
                      })}
                    </div>
                  </div>

                  <div className="min-h-[200px] mt-5 flex flex-col rounded-[30px] px-3 pt-1 pb-2 justify-between shadow-md  max-lg:mt-14 border-[1px] max-lg:mb-4 border-white dark:border-opacity-25 ">
                    <h1 className=" text-center font-montserrat text-xl mb-1 dark:text-white">
                      To Pay List
                    </h1>
                    <div className="border-[1px] border-white border-opacity-25 rounded-[23px] bg-white-400 dark:bg-slate-700 shadow-md ">
                      <div className="flex flex-col max-h-[100px] overflow-y-auto ">
                        {toPayData.length > 0 ? toPayData.map((item) => (
                          <ToPay
                            {...item}
                            deleteToPay={deleteToPay}
                            key={item._id}
                          />
                        )):<div className=" text-center max-lg:text-sm font-montserrat dark:text-white">No Dues</div>}
                      </div>
                    </div>
                    <div>
                      <form
                        method="POST"
                        className="flex justify-around mt-1 "
                        onSubmit={(e) => submitToPay(e)}
                      >
                        <input
                          type="number"
                          name="amount"
                          id="amount"
                          className="focus:outline-none border-2 shadow-md border-white rounded-[23px] py-1 px-3 w-[150px] max-lg:w-[90px]"
                          placeholder="Amount"
                          value={toPayForm.amount}
                          min={0}
                          onChange={(e) => ChangeToPay(e)}
                        />

                        <input
                          type="text"
                          name="Detail"
                          id="detail"
                          placeholder="Detail"
                          className="focus:outline-none shadow-md border-2 border-white rounded-[23px] py-1 px-3 w-[180px] max-lg:w-[90px]"
                          value={toPayForm.Detail}
                          onChange={(e) => ChangeToPay(e)}
                        />

                        <button
                          type="submit"
                          className="shadow-md border-2 border-white rounded-[30px] p-1 w-[50px] max-lg:w-[40px] max-lg:p-0 bg-white-400"
                        >
                          <i className="fa-solid fa-plus fa-sm"></i>
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Home;
