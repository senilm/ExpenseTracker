const { BadRequestError, NotFoundError, UnauthenticatedError } = require('../errors');
const User = require('../models/user')

 const login =async (req,res)=>{
    const {email, password} = req.body;

    if(!email){
        throw new BadRequestError('Please provide email')
    }
    if(!password){
        throw new BadRequestError('Please provide password')
    }

    const user = await User.findOne({email});
    if(!user){
        throw new NotFoundError("User not Found")
    }

    const pwd = await user.verifyPassword(password);
    if(!pwd){
        throw new UnauthenticatedError('invalid credentials')
    }

    const accessToken = user.createJwt()
    const refreshToken = user.createRefJwt()
    delete user.password;
    res.status(200).json({accessToken,refreshToken,user})
}


 const register =async (req,res)=>{

    const user = await User.create(req.body)
    res.status(200).json(user)
}

module.exports= {login, register}