require('dotenv').config();
require('express-async-errors')
const express= require('express')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')
const authMiddleware = require('./middleware/authenticationMiddleware')
const notFound= require('./middleware/notFound')
const connectDB = require('./connectDB/connectDB.js')
const authRouter = require('./routes/auth.js')
const expenseRouter = require('./routes/expenses');
const incomeRouter = require('./routes/income')
const toPayRouter = require('./routes/toPay')

const app = express()

// middlewares
app.use(express.json())
app.use(express.urlencoded({limit:'30mb', extended:true}))
const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
 }
app.use(cors(corsOptions))



// routers
app.use('/auth',authRouter)
app.use('/expenses',authMiddleware,expenseRouter)
app.use('/income',authMiddleware,incomeRouter)
app.use('/toPay',authMiddleware,toPayRouter)


// endpoints
app.get('/',(req,res)=>{
    res.status(200).json('hi')
})



app.use(errorHandler)
app.use(notFound);
const PORT = process.env.PORT || 6000

const connect = async ()=>{
        try {

        await connectDB(process.env.MONGO_URL)
        app.listen(PORT,()=>{
            console.log(`running on http://localhost:${PORT} `);
        })
    } catch (error) {
        console.log(error);
    }
}

connect()