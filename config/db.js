const mongoose = require('mongoose');

const connectdb = async()=>{
  const conn = await mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }).then(()=>{
      console.log("Connected to database!".blue)
  })
  .catch(()=>{
      console.log('Unable to connect!')
  })


};

module.exports = connectdb;
