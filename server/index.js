const express = require('express')
const app = express(); 
const database = require('./db/index.js')
database(); 
const cors = require('cors'); 
require('dotenv').config();

app.use(cors()); 
app.use(express.json())


app.use('/api', require('./Routes/LoginUser')); 
app.use('/api', require('./Routes/CreateUser'));
app.use('/api', require('./Routes/GenerateNsendOTP')); 
app.use('/api', require('./Routes/VerifyOTP.js')); 

app.get('/', (req, res)=>{
    res.send('hello')
})

app.listen(8080, ()=>{
    console.log('server listening to port 8080')
})

