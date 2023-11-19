const mongoose = require('mongoose'); 

const {Schema} = mongoose; 

const CompanydetailSchema = new Schema({
    CompanyName : {
        type : String, 
        required : true 
    },
    CompanyAddress : {
        type : String, 
        required : true,
    }, 
    Country : {
        type : String, 
        required : true
    },
    City : {
        type : String, 
        required : true, 
    },  
    Pincode : {
        type : Number, 
        required : true, 
    },
    date : {
        type : Date,
        default : Date.now, 
        required : true 
    }
})

const CompanyDetails = mongoose.model('companydetail', CompanydetailSchema);
module.exports = CompanyDetails; 