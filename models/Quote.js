const mongoose = require('mongoose');

let quotesSchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    likes: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ]
})

let Quotes = mongoose.model('Quote' , quotesSchema)

module.exports = Quotes;