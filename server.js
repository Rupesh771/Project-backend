const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
const colors = require('colors');
const connectdb = require('./config/db');

dotenv.config({
    path: '.env',
});

connectdb();

// const { urlencoded } = require('express');


const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
    }));
    
    
app.use(cookieParser());
app.use(cors());


app.use('/', express.static(path.join(__dirname, 'files')));
// app.use('/', express.static(path.join(__dirname, 'Files')));

// Routes
 app.use('/api', require('./routes/userRouter'));
 app.use('/api',require('./routes/ContactRouter'));
 app.use('/api',require('./routes/CategoryRoute'));
 app.use('/api',require('./routes/ProductsRoute'));

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Server is running on port at http://localhost:${PORT}`.yellow .bold);
})
