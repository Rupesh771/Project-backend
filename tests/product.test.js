const mongoose = require('mongoose');
const userRegister = require('../models/userRegister');
const Products = require('../models/ProductModel');
const Contact = require('../models/Contact');

const url = 'mongodb://localhost:27017/Handicrafts';


beforeAll(async() =>{
    await mongoose.connect(url, {
    useNewUrlParser:true,
    useCreateIndex:true
    });
    });

    afterAll(async() =>{
        await mongoose.connection.close();
    });

         
describe('contact  Schema testanything', () =>{
    it('create contact testinganything', () =>{
    const usercontact= {
        fullname :'nabin ghale',
        phone:'9867543212',
        email:"nabinghale@gmail.com",
        message:"I want to buy some handocrafts foods"

    };
    return Contact.create(usercontact)
        .then((pro_ret) =>{
        expect(pro_ret.fullname).toEqual('nabin ghale');
    });
     });
     
   })

    


