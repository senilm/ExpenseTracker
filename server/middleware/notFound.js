const notFound= (req,res,next) =>{
   return res.status(400).send('Route does not exist')
}

module.exports = notFound