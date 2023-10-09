import { useState } from "react"
import { useRef } from "react"

const initialFormData = {
    amount:'',
    category:'job',
    description:'',
    date:'  '
  }

const IncomeForm = ({ handleSubmitIncome }) => {
    const [incomeData, setIncomeData] = useState(initialFormData)

      const handleChange = (e) =>{
        setIncomeData({...incomeData,[e.target.name]:e.target.value})
      }

      const handleSubmit = (e) =>{
        e.preventDefault();
        handleSubmitIncome(incomeData);
        setIncomeData(initialFormData)
      }

    return (
        <div className="lg:max-w-md rounded max-lg:mb-16">
            
            <form onSubmit={(e)=>handleSubmit(e)} className=" flex flex-col gap-3 max-lg:gap-1">
                
                <div className="mb-4">
                    <input type="number" id="amount" name="amount" value={incomeData.amount} className=" focus:outline-none font-montserrat w-full border-2 border-white rounded-[30px] px-3 py-2" min={0} placeholder="Amount" required onChange={(e)=>handleChange(e)}/>
                </div>

                <div className="mb-4">
                    
                    {/* <input type="text" id="category" name="category" class="w-full border rounded px-3 py-2" required /> */}
                    <select name="category" id="category" className="focus:outline-none border-2 border-white px-2 py-1 rounded-[30px] font-montserrat" value={incomeData.category} onChange={(e)=>handleChange(e)}>
                        <option value="job" >Job</option>
                        <option value="dropshipping">Dropshipping</option>
                        <option value="youtube">Youtube</option>
                        <option value="stocks">Stocks</option>
                        <option value="rent">Rent</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    
                    <input type="date" id="date" name="date" value={incomeData.date} className="focus:outline-none font-montserrat w-full border-2 border-white rounded-[30px] px-3 py-2" min={0} placeholder="Date" required onChange={(e)=>handleChange(e)}/>
                </div>


                <div className="mb-4">
                    <textarea name="description" id="description" placeholder="Enter note here" cols="52" rows="4" value={incomeData.description} className="w-full border-2 border-white rounded-[30px] px-3 py-2 font-montserrat focus:outline-none" onChange={(e)=>handleChange(e)}></textarea>
                </div>
                
                <button type="submit" className="border-[1px] dark:border-opacity-25 dark:text-white border-white dark:bg-slate-700  text-black px-4 py-2 w-fit self-center rounded-[30px]  active:bg-white-400 hover:bg-transparent bg-white dark:hover:bg-transparent transition-all font-montserrat "><i className="fa-solid fa-plus mr-1"></i>Add Income</button>
            </form>
        </div>
    )
}

export default IncomeForm