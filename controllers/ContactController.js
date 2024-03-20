const Contact = require('../models/Contact');

const contactController = {
    contactus: async(req,res)=>{

        const{fullname,phone,email,message}= req.body;

        if(!fullname || !phone || !email || !message)
        return res.status(422).json({message: "Please filled all the filed!"});

        try{

            const contactexist = await Contact.findOne({email:email})
            if(contactexist)
            return res.status(422).json({message:"Email already exist!"});

            const contactus = new Contact({fullname,phone,email,message})

            await contactus.save();
           
            res.status(400).json({message:"Your message has been successfully added!"});


        } catch(err){
            console.log(err);
        }
    }

}

module.exports = contactController;