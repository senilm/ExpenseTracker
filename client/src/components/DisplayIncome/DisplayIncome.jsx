

const DisplayIncome = ({amount, category, description,date,_id,user,deleteIncome}) => {
  return (
    <>
        <div className="flex border-[1px] dark:border-opacity-25 dark:text-white border-white p-5 max-lg:px-1 max-lg:py-3 mb-4 flex-col gap-3 dark:bg-slate-700 bg-white-400 shadow-md w-full ">
            <div className="flex justify-between">
                <div className=" self-center max-lg:text-[13px]">{amount}$</div>
                <div className="max-lg:text-[13px]">{category.toUpperCase()}</div>
                <div className="flex max-lg:text-[13px]">{new Date(date).toLocaleDateString('en-US')} <div className="ml-4 cursor-pointer max-lg:text-sm dark:text-white" onClick={()=>deleteIncome(_id)}><i className="fas fa-trash"></i></div></div>
            </div>
            {description.length !== 0 && <hr className=' w-[90%] lg:w-[50%]  h-[1px] mx-auto'/>}
            <div className=" break-words text-center">{description}</div>
        </div>
    </>
  )
}

export default DisplayIncome