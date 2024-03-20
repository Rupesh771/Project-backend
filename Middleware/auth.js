const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const userRegister = require('../models/userRegister');

const auth = (req, res, next)=>{
    try{
       const token = req.headers.authorization.split(" ")[1];
       if(!token) return res.status(400).json({message:"invalid Authentication!"})

        jwt.verify(token, process.env.SECRET_KEY, (err, user)=>{
           if(err) return res.status(400).json({message:"invalid Authentication"})
           req.user = user
           next();
       });
       
    } catch(error){
        res.status(401).send(error);
    }
}



module.exports = auth;

