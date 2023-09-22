

const HomeItemTrans = ({ amount, category, date, type }) => {
  const textColor = type === 'expense' ? 'text-red-400 ' : 'text-green-400'
  // const bgColor = type === 'expense' ? 'bg-red-100  bg-opacity-10 ' : 'bg-opacity-10 bg-teal-100'
  return (
    <>
      <div className={`bg-white-400 flex flex-col border-2 border-white my-3 rounded-[30px] px-5  shadow-md`}>
        <div className="flex justify-between p-2">
          <div className={`${textColor} font-montserrat`}>{amount}$</div>
          <div className="font-montserrat">{category}</div>
          <div>{new Date(date).toLocaleDateString('en-US')}</div>
        </div>
      </div>
    </>
  )
}

export default HomeItemTrans