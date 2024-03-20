const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true
    },
    phone:{
        type: Number
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true

})

module.exports = mongoose.model('contact', ContactSchema);

