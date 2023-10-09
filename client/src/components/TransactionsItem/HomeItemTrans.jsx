

const HomeItemTrans = ({ amount, category, date, type }) => {
  const textColor = type === 'expense' ? 'text-red-400 ' : 'text-green-400'
  // const bgColor = type === 'expense' ? 'bg-red-100  bg-opacity-10 ' : 'bg-opacity-10 bg-teal-100'
  return (
    <>
      <div className={`bg-white-400 flex flex-col border-[1px] border-white my-3 dark:border-opacity-25 rounded-[30px] px-5 max-lg:px-3 dark:border-[1px] shadow-md dark:bg-slate-700`}>
        <div className="flex justify-between  py-2 px-2 max-lg:px-0">
          <div className={`${textColor} font-montserrat`}>{amount}$</div>
          <div className="font-montserrat dark:text-white max-lg:text-sm ">{category.toUpperCase()}</div>
          <div className="dark:text-white">{new Date(date).toLocaleDateString('en-US')}</div>
        </div>
      </div>
    </>
  )
}

export default HomeItemTrans