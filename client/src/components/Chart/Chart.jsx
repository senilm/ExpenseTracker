import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)


const Chart = ({incomesData, expensesData}) => {

    
    const data = {
        labels:expensesData.map((income)=>{
            const {date} = income;
            return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'numeric', day: 'numeric' })
        }),
        datasets:[
            {
                label:'Income',
                data:[
                    ...incomesData.map((income)=>{
                        const {amount} = income;
                        return amount
                    })
                ],
                backgroundColor:'blue',
                
                tension:0.2
            },
            {
                label:'Expenses',
                data:[
                    ...expensesData.map((expense)=>{
                        const {amount} = expense;
                        return amount
                    })
                ],
                backgroundColor:'orange ',
                tension:0.2
            }
        ]
    }
    return (
        <div className=' bg-white-400 dark:bg-slate-700 dark:border-opacity-25 border-white  border-[1px] border-solid  shadow-md  p-4 rounded-[20px] h-[100%] max-lg:h-auto max-lg:w-[100%] text-white '>
            <Line data={data} />
        </div>
    )
}

export default Chart
// shadow-md