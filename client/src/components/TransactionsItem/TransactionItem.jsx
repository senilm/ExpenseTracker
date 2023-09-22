

const TransactionItem = ({amount,category,date,description,type}) => {
    const bgColor = type === 'income' ? 'text-green-500' : 'text-red-600'
  return (
    <>
    <div className="flex justify-center items-center my-4  ">
      <div className=" w-3/4 p-4 border-2 border-white rounded-lg max-lg:p-2 bg-white-400  shadow-md">
        <div className="flex   justify-between mb-3">
          <div className={`${bgColor} font-montserrat`}>{amount}$</div>
          <div className="font-montserrat">{category}</div>
          <div className="font-montserrat">{new Date(date).toLocaleDateString('en-US')}</div>
        </div>
        <div>{ description? `Note: ${description}` : ''}</div>
      </div>
    </div>
    </>
  )
}

export default TransactionItem


