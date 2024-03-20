const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
var jwt = require('jsonwebtoken');



const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword:{
        type: String,
        required:true
    },
    image:{
        type: String,
        default:"https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png"
        
    },
    userType :{
        type : String,
        enum : ['Admin', 'user', 'seller'],
        default : 'user'

    },

    tokens:[
        {
            token:{
                type: String,
                required:true
            }
        }
    ]
}, {
    timestamps: true
})

userSchema.pre('save', async function(next){
    const salt = bcryptjs.genSaltSync(10);
    if(this.password && this.isModified('password')){
    this.password = await bcryptjs.hashSync(this.password, salt);
    this.confirmpassword = await bcryptjs.hashSync(this.confirmpassword, salt);

    }
   
    next();
})

userSchema.methods.getAuthToken = async function(data){
    let params = {
        id:this._id,
        email:this.email,
        phone:this.phone
    }
    const tokenValue = jwt.sign(params, process.env.SECRET_KEY, {expiresIn:'300000s'});
    this.tokens = this.tokens.concat({token:tokenValue})
    await this.save();
    return tokenValue;

}

module.exports = mongoose.model('Users', userSchema);