const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const createAccount = async (req , res)=> {
    // console.log(req.body);
    let {username , email , password} = req.body;
    
    let user = await User.findOne({email});
    if (user) {
        return res.json({msg : 'This mail is already registered'});
    }
    password = await bcrypt.hash(password , 10);
    await User.create({username , email , password});
    res.json({msg : 'Account is created successfully'});
}

const allowAccess = async (req , res)=> {
    let {email , password} = req.body;
    let user = await User.findOne({email});
    if (!user) {
        return res.json({msg : 'Create your account first'});
    }
    let validPass = await bcrypt.compare(password , user.password);
    if (!validPass) {
        return res.json({msg : 'Incorrect password'});
    }
    // console.log(user);
    user = JSON.stringify(user);
    // console.log(user);
    const token = jwt.sign({user} , process.env.SECRET_KEY);
    res.cookie('token' , token , {expires: Date.now() + 1000 * 60 * 60 * 24 * 7 , maxAge : 1000 * 60 * 60 * 24 * 7 , httpOnly : true});
    user = JSON.parse(user);
    // let obj = {
    //     name: user.username,
    //     mail: user.email,
    //     time: Date.now()
    // }
    res.json({id: user._id , username: user.username , email: user.email , time: Date.now()});
    // res.json(user);
}

const disableAccess = (req , res)=> {
    if (req.cookies.token) {
        res.clearCookie('token');
    }
    res.json({msg : 'Logged out successfully'});
}

const allowAutoAccess = async (req, res) => {
    const {email} = req.body;
    let user = await User.findOne({email});

    user = JSON.stringify(user);

    const token = jwt.sign({user} , process.env.SECRET_KEY);
    res.cookie('token' , token , {expires: Date.now() + 1000 * 60 * 60 * 24 * 7 , maxAge : 1000 * 60 * 60 * 24 * 7 , httpOnly : true});
    user = JSON.parse(user);
    // let obj = {
    //     name: user.username,
    //     mail: user.email,
    //     time: Date.now()
    // }
    res.json({id: user._id , username: user.username , email: user.email , time: Date.now()});
}

module.exports = {createAccount , allowAccess , disableAccess , allowAutoAccess};