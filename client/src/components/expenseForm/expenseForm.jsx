import { useState } from "react"
import '@fortawesome/fontawesome-free/css/all.css';


const initialFormData = {
    amount:'',
    category:'food',
    description:'',
    date:''
  }

const ExpenseForm = ({ handleSubmitExpense }) => {
    const [expenseData, setExpenseData] = useState(initialFormData)

      const handleChange = (e) =>{
        setExpenseData({...expenseData,[e.target.name]:e.target.value})
      }

      const handleSubmit = (e) =>{
        e.preventDefault();
        handleSubmitExpense(expenseData);
        setExpenseData(initialFormData)
      }

    return (
        <div className="max-w-md rounded max-lg:mb-16">
            <form onSubmit={(e)=>handleSubmit(e)} className=" flex flex-col gap-3">
                
                
                <div className="mb-4">
                    <input type="number" id="amount" name="amount" value={expenseData.amount} className="w-full border-2 border-white rounded-[30px] px-3 py-2 focus:outline-none" min={0} placeholder="Amount" required onChange={(e)=>handleChange(e)}/>
                </div>

                <div className="mb-4">
                    
                    {/* <input type="text" id="category" name="category" class="w-full border rounded px-3 py-2" required /> */}
                    <select name="category" id="category" className="focus:outline-none border-2 border-white px-2 py-1 rounded-[30px]" value={expenseData.category} onChange={(e)=>handleChange(e)}>
                        <option value="food" >Food</option>
                        <option value="groceries">Groceries</option>
                        <option value="transportation">Transportation</option>
                        <option value="rent">Rent</option>
                        <option value="fees">Fees</option>
                        <option value="health">Health</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="work">Work</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <input type="date" id="date" name="date" value={expenseData.date} className="w-full border-2 border-white rounded-[30px] px-3 py-2 focus:outline-none" min={0}  required onChange={(e)=>handleChange(e)}/>
                </div>

                <div className="mb-4">
                    <textarea name="description" id="description" cols="52" rows="4" value={expenseData.description} placeholder="Enter note here" className="focus:outline-none w-full border-2 border-white rounded-[30px] px-3 py-2" onChange={(e)=>handleChange(e)}></textarea>
                </div>
                
                <button type="submit" className="border-2 border-white bg-gray-50  px-4 py-2 w-fit self-center rounded-[30px] active:bg-white-400 hover:bg-white-400 transition-all"><i className="fa-solid fa-plus mr-1"></i>Add Expense</button>
            </form>
        </div>
    )
}

export default ExpenseForm