const { BadRequestError, UnauthenticatedError } = require("../errors");
const jwt = require('jsonwebtoken')
const authMiddleware = (req,res,next) =>{
    const authHeader = req.headers.authorization;
    
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new BadRequestError('Please Provide Proper Token')
    }
    const token = authHeader?.split(' ')[1]; 
    
    try {
        const payload = jwt.verify(token,process.env.ACCESS_TOKEN_KEY)
        req.user= {id:payload.id, name:payload.name} 
        next()
    } catch (error) {
        throw new UnauthenticatedError(error.message)
    }

}


module.exports = authMiddleware