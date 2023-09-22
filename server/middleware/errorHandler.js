const {CustomAPIError} = require('../errors')
const {StatusCodes} = require('http-status-codes')

// next is very very very important
 const errorHandler = (err,req,res,next)=>{

    let customError = {
        statusCode:err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg:err.message || 'Something went wrong, please try again later' 
    }

    if( err.name==="ValidationError"){
        customError.statusCode = 400,
        customError.msg= Object.values(err.errors).map((item)=>item.message).join(' ,')
    }

    if( err.name==="CastError"){``
        customError.statusCode = 400,
        customError.msg=`Enter valid value ${err.value}`
    }

    if (err.code===11000) {
        customError.msg=`Duplicate value entered for ${Object.keys(err.keyPattern)}`
    }

    // if(err instanceof CustomAPIError ){
        // return res.status(err.statusCode).json({msg:err.message})
    // }
    // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err)
    return res.status(customError.statusCode).json({msg:customError.msg})
} 

module.exports = errorHandler




