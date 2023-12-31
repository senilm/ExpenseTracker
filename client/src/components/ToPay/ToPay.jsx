import '@fortawesome/fontawesome-free/css/all.css';


const ToPay = ({_id, amount, Detail,deleteToPay}) => {
  return (
    <>
    <div className="flex justify-between px-8 max-lg:px-3 py-1 max-sm:text-[12px] ">
      <div className='font-montserrat dark:text-white'>{amount}$</div>
      <div className='font-montserrat dark:text-white'>{Detail}</div>
      <div className="mx-1 flex gap-2 dark:text-white">
        <button onClick={()=>deleteToPay(_id)}><i className="fas fa-check"></i>
</button>
        <button onClick={()=>deleteToPay(_id)}><i className="fas fa-trash"></i></button>
      </div>
    </div>
    </>
  )
}

export default ToPay