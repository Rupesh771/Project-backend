
const userRegister = require('../models/userRegister');
const OtpSchema = require('../models/Otp');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sentMail = require('./SendMail');

const {CLIENT_URL} = process.env

const userController = {
    userRegister: async(req,res)=>{
        let image = (req.file) ? req.file.filename:null;
        const {fullname, email, phone, password, confirmpassword}= req.body;

        if(!fullname || !email || !password || !confirmpassword)
            return res.status(422).json({ error: "Please filled all the field!"});
    
        try{
            if(!validateEmail(email))
            return res.status(400).json({message:"Invalid emails!"});
            
            const userExist = await userRegister.findOne({email: email});
    
            if(userExist)
                return res.status(422).json({error: "Email already Exist!"});

                if(password.length <6)
                return res.status(422).json({message:"Password is at least 6 characters long!"})

              if(password !== confirmpassword)
                return res.status(422).json({error : "password are not matching!"});
    
                const user = new userRegister({fullname, email, phone, password, confirmpassword,image});
                // console.log(user);
    
                await user.save();

                 res.status(201).json({message:"User registered successfully!"});
    
        } catch(err){
            res.status(400).send(err);
        }

        function validateEmail(email) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        }

        const createActivationToken = (payload)=>{
            return jwt.sign(payload,process.env.ACTIVATION_TOKEN_SECRET, {expiresIn:'5m'})
        }

        const createAccessToken = (payload)=>{
            return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
        }

        const createRefreshToken = (payload)=>{
            return jwt.sign(payload,process.env.ACREFRESH_TOKEN_SECRET,{expiresIn:'7d'})
        }

    },
    userlogin: async(req,res)=>{
        try {
            let myToken;
            const {email,password} = req.body;

            if(!email || !password)
            return res.status(422).json({message:'Please select email/password'});
            
            const loginuser = await userRegister.findOne({email});
            if(!loginuser) 
            return res.status(422).json({message:"User does not exist!"});

            const userLogin = await userRegister.findOne({email:email});
            if(userLogin){
                const isMatch = await bcryptjs.compare(password, userLogin.password);
                myToken = await userLogin.getAuthToken();
              

                res.cookie('jwtoken',myToken,{
                    expires:new Date(Date.now() + 25892000000),
                    httpOnly:true
                })
                if(!isMatch) {
                 res.status(422).json({message:"Incorrect password!"});
                } else{
                 res.status(201).json({message:"User login succssfully",token:myToken});
                }
                
            }
            
        }catch(err){
            res.status(400).send(err);
        }
    },

     emailsend: async(req,res)=>{
         
         const {email} = req.body;
         if(email==="")
         return res.status(422).json({message:"Please enter your email"});
         try{
             let data = await userRegister({email: req.body.email});
            
             if(data){
                const user = await userRegister.findOne({email})
                if(!user) return res.status(422).json({message: "User does not exist."});

                 let otpcode = Math.floor((Math.random()*1000000)+1);
                 let otpData = new OtpSchema({
                     email:req.body.email,
                     code:otpcode,
                     expireIn: new Date().getTime() + 300*1000

                 })

                 let otpResponse = await otpData.save();
                 console.log(otpResponse);
                  res.status(201).json({message:'Please check your email!'});

             } else{
                return res.status(422).json({message:'Email Id doesnot exist!'});

             }
             

         }catch(err){
            res.status(400).send(err);

         }
     },

     changepassword: async (req,res)=>{
         try{
             
        let data = await OtpSchema.find({email:req.body.email,code:req.body.otpcode});
      
         
    if(data){
        let currentTime = new Date().getTime();
        let diff = data.expireIn - currentTime;

        if(diff < 0){
           return res.status(422).json({message:"Token expire"});
        } else{
            let user = await userRegister.findOne({email:req.body.email})
         
            user.password = req.body.password;
            user.save();
          return res.status(201).json({message:"password changed successfully!"});

        }
    } else{
      return res.status(422).json({message:"Invalid otp!"});
    }
         }catch(err){
            res.status(500).send(err);
         }
     },

     displayuserdatabyid: async(req, res)=>{
         try{

            const userdata = await userRegister.findById(req.params.id);

            if(!userdata)
            return res.status(404).json({Message:"User doesn't exist!"})

            res.status(200).json({
                success:true,
                data:userdata
            })

         }catch(err){
             res.status(500).send(err);
         }
     },
     Updateuser: async(req,res)=>{
         try{
             
             const updatestudent = await userRegister.findByIdAndUpdate(req.params.id, req.body);

             if(!updatestudent)
             return res.status(404).json({message:"No user found!"});

             await userRegister.updateOne(updatestudent);

             res.status(200).json({
                 success: true,
                 count:updatestudent.length,
                 data:{}
             })


         }catch(err){
             res.status(500).send(err);
         }
     }
  

}

module.exports = userController;


