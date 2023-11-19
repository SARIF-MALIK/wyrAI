const mongoose = require('mongoose') 
require('dotenv').config();


const connectDB = async() => {
    try {
        const connectInstance =  await mongoose.connect(process.env.MONGODB_URI);
        console.log('mongodb connected connectionInstance: ', connectInstance)
        
    } catch (error) {
        console.log('mongodb error', error); 
        process.exit(1); 
    }
}

module.exports = connectDB; 