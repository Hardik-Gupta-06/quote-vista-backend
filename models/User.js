const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    quotes : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Quote'
        }
    ]
});

let User = mongoose.model('User' , userSchema);

module.exports = User;