
const {prisma} = require('../prisma/index');
const jwt=require('jsonwebtoken');

const isLoggined = async (req, res, next) => {
    try{
        const token=req.cookies.token;
        console.log('token',token);
        if(!token){
            return res.status(401).json({message:"UnAuthorized"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET); //! verify token with secret token
        console.log("userID", decoded.userId);
        const user=await prisma.user.findUnique({
            where:{
                id:decoded.userId
            }
        })

        next();
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {isLoggined};