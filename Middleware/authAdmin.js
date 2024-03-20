const jwt = require('jsonwebtoken');
const userRegister = require('../models/userRegister');
//for admin
const authAdmin =async (req, res, next)=>{
    try{
        const user = await userRegister.findOne({
            _id:user._id
        })
       
        if (req.user.user.userType!=='Admin'){
            return req.status(401).json({message:"Unauthorized!"})
        }
        next();

    }catch(err){
        return res.status(500).json({message: err.message})

    }


}

module.exports = authAdmin;