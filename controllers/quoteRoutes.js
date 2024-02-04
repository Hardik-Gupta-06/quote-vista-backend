const Quotes = require("../models/Quote");
const User = require("../models/User");



const showAllQuotes = async (req , res)=> { 
    try {
        let allQuotes = await Quotes.find({});
        res.status(200).json(allQuotes);
    }
    catch(e) {
        res.status(400).json({msg: 'something went wrong'});
    }
}

const showMyQuotes = async (req , res)=> {
    try {
        // console.log(req.user);
        let user = await User.findById(req.user._id).populate('quotes');
        res.status(200).json(user.quotes);
    }
    catch(e) {
        // console.log(e);
        res.status(400).json({msg: 'something went wrong'});
    }
}

const createQuote = async (req , res)=> {
    let {author , text} = req.body;
    let quote = new Quotes({author , text});
    let user = await User.findById(req.user._id);
    user.quotes.push(quote._id);
    await quote.save();
    await user.save();
    // await Quotes.create({text , author});
    res.status(201).json({msg: 'new Quote created successfully'});
}

const showQuote = async (req , res)=> {
    let {id} = req.params;
    const quote = await Quotes.findById(id);
    res.status(200).json(quote);
}

const editQuote = async (req , res)=> {
    try {
        let {id} = req.params;
        let {author , text} = req.body;
        await Quotes.findByIdAndUpdate(id , {author , text});
        res.status(200).json({msg : 'Quote is editted successfully'});
    }
    catch(e) {
        res.status(400).json({msg : 'something went wrong'});
    }
}

const deleteQuote = async (req , res)=> {
    try {
        let {id} = req.params;
        await Quotes.findByIdAndDelete(id);
        let userId = req.user._id;
        await User.findByIdAndUpdate(userId , {$pull : {quotes: id}} , {new: true});
        // console.log(user.quotes);
        // console.log(user.quotes);
        res.status(200).json({msg : 'Quote is deleted successfully'});
    }
    catch(e) {
        res.status(400).json({msg : 'something went wrong'});
    }
}

const likeQuote = async (req , res)=> {
    try {
        let {id} = req.params;
        let {userId} = req.body;
        let quote = await Quotes.findById(id);
        if (!quote.likes.includes(userId)) {
            quote.likes.push(userId);
            await quote.save();
        }
        res.status(200).json({msg: 'Liked successfully'})
    }
    catch(e) {
        res.status(400).json({msg: 'something went wrong'});
    }
}

const unlikeQuote = async (req , res)=> {
    try {
        let {id} = req.params;
        let {userId} = req.body;
        await Quotes.findByIdAndUpdate(id , {$pull : {likes: userId}} , {new: true});
        res.status(200).json({msg: 'Unliked successfully'})
    }
    catch(e) {
        res.status(400).json({msg: 'something went wrong'});
    }
}

module.exports = {showAllQuotes , showMyQuotes , createQuote , showQuote , editQuote , deleteQuote , likeQuote , unlikeQuote};