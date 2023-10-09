

const TransactionItem = ({amount,category,date,description,type}) => {
    const bgColor = type === 'income' ? 'text-green-500' : 'text-red-600'
  return (
    <>
    <div className="flex justify-center items-center my-4 max-lg:w-full  ">
      <div className=" lg:w-3/4 max-lg:w-full px-4 py-4 max-lg:px-[0.3rem] border-[1px] dark:border-opacity-25 border-white rounded-lg max-lg:p-2 bg-white-400 dark:bg-slate-700  shadow-md">
        <div className="flex   justify-between mb-3">
          <div className={`${bgColor} font-montserrat`}>{amount}$</div>
          <div className="font-montserrat dark:text-white">{category}</div>
          <div className="font-montserrat dark:text-white">{new Date(date).toLocaleDateString('en-US')}</div>
        </div>
        <div className="dark:text-white font-montserrat">{ description? `Note: ${description}` : ''}</div>
      </div>
    </div>
    </>
  )
}

export default TransactionItem


