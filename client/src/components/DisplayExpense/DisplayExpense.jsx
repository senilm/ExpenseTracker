import '@fortawesome/fontawesome-free/css/all.css';

const DisplayExpense = ({amount, category, description,date,_id,user,deleteExpense}) => {
    return (
      <>
          <div className="flex border-2 border-white p-5 max-lg:p-3 mb-4 flex-col gap-3 bg-white-400 shadow-md">
              <div className="flex justify-between">
                  <div className=" self-center">{amount}$</div>
                  <div>{category}</div>
                  <div className="flex">{new Date(date).toLocaleDateString('en-US')} <div className="ml-4 cursor-pointer" onClick={()=>deleteExpense(_id)}><i className="fas fa-trash"></i></div></div>
              </div>
              <div className=" break-words">{description}</div>
          </div>
      </>
    )
  }
  
  export default DisplayExpense