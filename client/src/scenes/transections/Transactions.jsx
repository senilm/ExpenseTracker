import { useEffect, useState } from "react";
import SideBar from "../../components/SideBar/SideBar";
import Cookies from "js-cookie";
import { axiosInstance, getAuthHeader } from "../../service/api";
import TransactionItem from "../../components/TransactionsItem/TransactionItem";
import Loader from "../../components/Loader/Loader";

const Transaction = ({ toggleDark }) => {
  const userDataString = Cookies.get("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        const trans = [...expenses.data, ...incomes.data]
          .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          .reverse();
        setTransactions(trans);
        setIsLoading(false);
      }
    };
    getTransactions();
  }, []);

  return (
    <section className="flex dark:bg-slate-950 max-container max-lg:pb-4 max-lg:px-2 max-lg:pt-3 gap-4 lg:pt-4 lg:pb-3 max-lg:flex-col px-10 transition-all min-h-screen">
      <div
        id="rightSide"
        className="bg-gradient-to-b from-gray-200 to-yellow-100 dark:bg-gradient-to-b  dark:from-slate-950 dark:to-gray-700 dark:via-gray-900 shadow-xl w-full px-4 border-[1px] border-white
        min-h-[100%]  rounded-[30px] flex-1  max-lg:pt-2 transition-all  dark:shadow-sm
       dark:border-opacity-25"
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div
              id="transactionContent"
              className="flex p-3 max-lg:px-0 max-lg:py-0 "
            >
              <div id="transaction" className="px-3 py-3 max-lg:px-0 w-full ">
                {transactions.length > 0 ? (
                  transactions.map((item) => (
                    <TransactionItem {...item} key={item._id} />
                  ))
                  
                ) : (
                  <div className=" w-full  justify-center flex items-center">
                    <div className=" font-montserrat lg:text-xl max-lg:text-lg">
                      No Transactions Available
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Transaction;
