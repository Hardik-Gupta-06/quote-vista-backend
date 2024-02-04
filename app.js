if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}


const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const seedDB = require('./seed');
const cors = require('cors');

const quotesRoutes = require('./api/quoteRoutes');
const authRoutes = require('./api/authRoutes');

const MONGODBURL = process.env.MONGODBURL;

mongoose.connect(MONGODBURL)
.then( ()=> {
    console.log('DB connected successfully')
})
.catch( (err)=> {
    console.log(err);
})


app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors( {origin: ['http://localhost:3000'] , credentials: true}))
app.use(quotesRoutes);
app.use(authRoutes);

app.get('/hello' , (req , res)=> {
    res.status(200).json({msg: 'hello from quotes app'});
})

// seedDB();



app.listen(8080 , ()=> {
    console.log('server connected at port 8080')
})